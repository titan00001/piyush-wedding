import type { WeddingEvent } from '../config/wedding'
import { clockHour24, parseClock } from './dates'

const pad = (n: number) => String(n).padStart(2, '0')

function icsEscape(value: string): string {
  return value.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n')
}

function foldLine(line: string): string {
  if (line.length <= 75) return line
  const chunks: string[] = []
  let rest = line
  chunks.push(rest.slice(0, 75))
  rest = rest.slice(75)
  while (rest.length) {
    chunks.push(` ${rest.slice(0, 74)}`)
    rest = rest.slice(74)
  }
  return chunks.join('\r\n')
}

/** Card start time for the calendar: event time, or baraat time for the Shaadi. */
export function eventStartTime(event: WeddingEvent): string | undefined {
  return event.time ?? event.baraatStart?.time
}

function localStamp(dateISO: string, time: string): string | null {
  const clock = parseClock(time)
  if (!clock) return null
  const [y, m, d] = dateISO.split('-')
  return `${y}${m}${d}T${pad(clockHour24(clock))}${pad(clock.minute)}00`
}

export function buildEventIcs(event: WeddingEvent, title: string): string | null {
  const time = eventStartTime(event)
  if (!time) return null
  const start = localStamp(event.dateISO, time)
  if (!start) return null

  const location = [event.venue, ...event.addressLines, event.landmark].filter(Boolean).join(', ')
  const stamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z')
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Piyush and Priya Wedding//EN',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    `UID:${event.id}-${event.dateISO}@piyush-priya-wedding`,
    `DTSTAMP:${stamp}`,
    `DTSTART;TZID=Asia/Kolkata:${start}`,
    'DURATION:PT3H',
    `SUMMARY:${icsEscape(title)}`,
    `LOCATION:${icsEscape(location)}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ]

  return `${lines.map(foldLine).join('\r\n')}\r\n`
}

export function downloadEventIcs(event: WeddingEvent, title: string): void {
  const ics = buildEventIcs(event, title)
  if (!ics) return
  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `${event.id}.ics`
  link.click()
  URL.revokeObjectURL(url)
}
