import type { EventId, FamilyPersonId, RepresentativeId } from '../config/wedding'

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
  nav: { home: string; events: string; families: string; venue: string }
  navAria: string
  openMenu: string
  closeMenu: string
  names: { groomFirst: string; brideFirst: string; and: string }
  hero: {
    omLabel: string
    celebrationsOf: string
    cordiallyInvited: string
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
    remaining: (d: string, h: string, m: string) => string
  }
  share: {
    label: string
    aria: string
    intro: string
    body: string
    linkLabel: string
    closing: string
  }
  clock: {
    am: (hm: string) => string
    pm: (hm: string) => string
  }
  events: {
    eyebrow: string
    title: string
    intro: string
    addToCalendar: string
    addToCalendarAria: (name: string) => string
    byId: Record<EventId, EventCopy>
    banquet: string
    landmark: (place: string) => string
    timelineAria: string
  }
  families: {
    eyebrow: string
    title: string
    intro: string
    brideFamily: string
    groomFamily: string
    lineage: {
      bride: { grandparents: string; parents: string }
      groom: { grandparents: string; parents: string }
    }
    and: string
    address: string
    contactHint: string
    call: (name: string) => string
    whatsapp: (name: string) => string
    vineetTitle: string
    darshanabhilashiTitle: string
    people: Record<FamilyPersonId, string>
    addresses: { bride: string; groom: string }
    representatives: Record<RepresentativeId, string>
  }
  venue: {
    eyebrow: string
    title: string
    intro: string
    weddingVenue: string
    receptionVenue: string
    baraatLocation: string
    mapAria: (label: string, name: string) => string
  }
  places: {
    venues: { aryaSamaj: string; royalBanquet: string; rajbariBanquet: string }
    addresses: { bidhanSarani: string; kalaberia: string; bechuChatterjee: string }
    landmarks: { asterGarden: string }
  }
  footer: {
    signoff: string
    awaiting: string
    closing: string
    backToTop: string
    aria: string
  }
  months: string[]
  monthsShort: string[]
  weekdays: string[]
}
