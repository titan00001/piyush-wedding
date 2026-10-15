import type { EventId } from '../config/wedding'

export type Lang = 'en' | 'hi' | 'bn'

export interface EventCopy {
  name: string
  subtitle?: string
  baraatLabel?: string
  maps: string[]
}

export interface Messages {
  meta: { htmlLang: string; nativeName: string; shortName: string }
  skipToCelebrations: string
  language: string
  nav: { home: string; events: string; families: string; venue: string; rsvp: string }
  navAria: string
  openMenu: string
  closeMenu: string
  hero: {
    celebrationsOf: string
    heading: string
    invitation: string
    datesDisplay: string
    location: string
    explore: string
  }
  countdown: {
    to: (date: string) => string
    begun: string
    days: string
    hours: string
    minutes: string
    seconds: string
    aria: (date: string) => string
    remaining: (d: number, h: number, m: number) => string
  }
  share: {
    label: string
    aria: string
    message: string
  }
  events: {
    eyebrow: string
    title: string
    intro: string
    byId: Record<EventId, EventCopy>
    banquet: string
    landmark: (place: string) => string
  }
  families: {
    eyebrow: string
    title: string
    intro: string
    brideFamily: string
    groomFamily: string
    relations: Record<string, string>
    address: string
    contactHint: string
    call: (name: string) => string
    whatsapp: (name: string) => string
  }
  venue: {
    eyebrow: string
    title: string
    intro: string
    weddingVenue: string
    receptionVenue: string
    baraatLocation: string
    accommodation: string
    transport: string
    comingSoon: string
    mapAria: (label: string, name: string) => string
  }
  rsvp: {
    eyebrow: string
    title: string
    intro: string
    demoNote: string
    demoStrong: string
    guestName: string
    required: string
    namePlaceholder: string
    phone: string
    optional: string
    willAttend: string
    accepts: string
    declines: string
    attendees: string
    includingYou: string
    eventsAttending: string
    selectAtLeastOne: string
    clearAll: string
    selectAll: string
    dietary: string
    dietaryPlaceholder: string
    message: string
    messagePlaceholder: string
    send: string
    sending: string
    thankYou: string
    successAccept: string
    successDecline: string
    demoComplete: string
    demoBody: string
    another: string
    couldNotSend: string
    fixFollowing: string
    errName: string
    errPhone: string
    errAttendance: string
    errAttendees: string
    errEvents: string
    errGeneric: string
  }
  footer: {
    signoff: string
    closing: string
    backToTop: string
    aria: string
  }
  months: string[]
  monthsShort: string[]
  weekdays: string[]
}
