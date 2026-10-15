import type { Messages } from '../i18n'

export interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
  /** True once the target moment has been reached. */
  done: boolean
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

/** "Tuesday, 1 December 2026" (or localized equivalent). */
export function formatLongDate(dateISO: string, messages: Messages): string {
  const { y, m, d, weekday } = parts(dateISO)
  return `${messages.weekdays[weekday]}, ${d} ${messages.months[m - 1]} ${y}`
}

/** { day: "1", month: "Dec" } for date seals. */
export function formatSealDate(dateISO: string, messages: Messages): { day: string; month: string } {
  const { m, d } = parts(dateISO)
  return { day: String(d), month: messages.monthsShort[m - 1] }
}

/** "1 December 2026" (or localized equivalent). */
export function formatDate(dateISO: string, messages: Messages): string {
  const { y, m, d } = parts(dateISO)
  return `${d} ${messages.months[m - 1]} ${y}`
}
