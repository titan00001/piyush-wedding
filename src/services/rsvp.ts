import type { EventId } from '../config/wedding'

export type Attendance = 'accepts' | 'declines'

export interface RsvpPayload {
  name: string
  phone: string
  attendees: number
  attendance: Attendance
  events: EventId[]
  dietary: string
  message: string
}

/**
 * - `supabase`: VITE_SUPABASE_URL + VITE_SUPABASE_ANON_KEY are set.
 * - `rest`:     VITE_RSVP_ENDPOINT is set.
 * - `demo`:     no backend configured. Nothing is stored or sent anywhere.
 */
export type RsvpMode = 'supabase' | 'rest' | 'demo'

export interface RsvpResult {
  mode: RsvpMode
  /** True only when a backend accepted the response. Always false in demo mode. */
  saved: boolean
}

export class RsvpError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'RsvpError'
  }
}

const TIMEOUT_MS = 15_000

export function getRsvpMode(): RsvpMode {
  const { VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY, VITE_RSVP_ENDPOINT } = import.meta.env
  if (VITE_SUPABASE_URL && VITE_SUPABASE_ANON_KEY) return 'supabase'
  if (VITE_RSVP_ENDPOINT) return 'rest'
  return 'demo'
}

async function post(url: string, headers: Record<string, string>, body: unknown): Promise<void> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...headers },
      body: JSON.stringify(body),
      signal: controller.signal,
    })
    if (!res.ok) throw new RsvpError(`The server responded with status ${res.status}.`)
  } catch (err) {
    if (err instanceof RsvpError) throw err
    if (err instanceof DOMException && err.name === 'AbortError') {
      throw new RsvpError('The request timed out. Please check your connection and try again.')
    }
    throw new RsvpError('We could not reach the server. Please check your connection and try again.')
  } finally {
    clearTimeout(timer)
  }
}

/**
 * Single entry point for sending an RSVP. The form only talks to this function,
 * so swapping the backend never touches UI code.
 */
export async function submitRsvp(payload: RsvpPayload): Promise<RsvpResult> {
  const mode = getRsvpMode()
  const submittedAt = new Date().toISOString()

  if (mode === 'supabase') {
    const base = import.meta.env.VITE_SUPABASE_URL!.replace(/\/+$/, '')
    const key = import.meta.env.VITE_SUPABASE_ANON_KEY!
    const table = import.meta.env.VITE_SUPABASE_TABLE || 'rsvps'
    await post(
      `${base}/rest/v1/${encodeURIComponent(table)}`,
      { apikey: key, Authorization: `Bearer ${key}`, Prefer: 'return=minimal' },
      {
        name: payload.name,
        phone: payload.phone || null,
        attendees: payload.attendees,
        attendance: payload.attendance,
        events: payload.events,
        dietary: payload.dietary || null,
        message: payload.message || null,
      },
    )
    return { mode, saved: true }
  }

  if (mode === 'rest') {
    await post(import.meta.env.VITE_RSVP_ENDPOINT!, {}, { ...payload, submittedAt })
    return { mode, saved: true }
  }

  // Demo mode: simulate latency so loading states can be reviewed, and store nothing.
  await new Promise((resolve) => setTimeout(resolve, 900))
  return { mode, saved: false }
}
