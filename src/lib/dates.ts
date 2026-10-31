import type { Messages } from '../i18n'
import { localizeDigits } from './numerals'

export interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
  /** True once the target moment has been reached. */
  done: boolean
}

export interface ClockParts {
  hour12: number
  minute: number
  period: 'am' | 'pm'
}

/** Pure countdown maths: everything is derived from `now`, nothing is hardcoded. */
export function getTimeLeft(targetMs: number, nowMs: number = Date.now()): TimeLeft {
  const diff = Math.max(0, targetMs - nowMs)
  const totalSeconds = Math.floor(diff / 1000)
  return {
    days: Math.floor(totalSeconds / 86_400),
    hours: Math.floor((totalSeconds % 86_400) / 3_600),
    minutes: Math.floor((totalSeconds % 3_600) / 60),
    seconds: totalSeconds % 60,
    done: diff === 0,
  }
}

function parts(dateISO: string) {
  const [y, m, d] = dateISO.split('-').map(Number)
  // Date.UTC avoids any local-timezone shift for a plain calendar date.
  const weekday = new Date(Date.UTC(y, m - 1, d)).getUTCDay()
  return { y, m, d, weekday }
}

/** Parse a card time such as "7:00 PM" or "11:00 AM". */
export function parseClock(time: string): ClockParts | null {
  const match = time.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i)
  if (!match) return null
  return {
    hour12: Number(match[1]),
    minute: Number(match[2]),
    period: match[3].toLowerCase() as 'am' | 'pm',
  }
}

export function clockHour24(parts: ClockParts): number {
  if (parts.period === 'am') return parts.hour12 === 12 ? 0 : parts.hour12
  return parts.hour12 === 12 ? 12 : parts.hour12 + 12
}

/** Localized clock: English keeps "7:00 PM"; Hindi uses सायं / प्रातः. */
export function formatClock(time: string, messages: Messages): string {
  const parsed = parseClock(time)
  if (!parsed) return time
  const hm = localizeDigits(`${parsed.hour12}:${String(parsed.minute).padStart(2, '0')}`, messages)
  return parsed.period === 'am' ? messages.clock.am(hm) : messages.clock.pm(hm)
}

/** "Tuesday, 1 December 2026" (or localized equivalent). */
export function formatLongDate(dateISO: string, messages: Messages): string {
  const { y, m, d, weekday } = parts(dateISO)
  return `${messages.weekdays[weekday]}, ${localizeDigits(d, messages)} ${messages.months[m - 1]} ${localizeDigits(y, messages)}`
}

/** { day: "1", month: "Dec" } for date seals. */
export function formatSealDate(dateISO: string, messages: Messages): { day: string; month: string } {
  const { m, d } = parts(dateISO)
  return { day: localizeDigits(d, messages), month: messages.monthsShort[m - 1] }
}

/** "1 December 2026" (or localized equivalent). */
export function formatDate(dateISO: string, messages: Messages): string {
  const { y, m, d } = parts(dateISO)
  return `${localizeDigits(d, messages)} ${messages.months[m - 1]} ${localizeDigits(y, messages)}`
}
