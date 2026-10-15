/**
 * Single source of truth for every fact shown on the invitation.
 * Edit here; components only render what is defined below.
 * Display copy (English / Hindi / Bengali) lives in `src/i18n/`.
 * Nothing in this file is invented: anything not supplied by the families
 * (for example the time of the Shaadi and Reception) is left undefined.
 */

export type EventId = 'mehendi' | 'haldi' | 'shaadi' | 'reception'
export type EventTheme = 'sage' | 'blush' | 'turmeric' | 'maroon' | 'burgundy'
export type IllustrationKey = 'mehendi' | 'haldi' | 'baraat' | 'mandap' | 'reception'
export type NavId = 'home' | 'events' | 'families' | 'venue' | 'rsvp'

export interface MapLink {
  url: string
}

export interface WeddingEvent {
  id: EventId
  /** Calendar date, YYYY-MM-DD (no timezone: it is a local calendar date in Kolkata). */
  dateISO: string
  /** Display time exactly as supplied. Undefined when no time has been given. */
  time?: string
  venue: string
  addressLines: string[]
  landmark?: string
  /** Where the baraat sets off from (Shaadi only). */
  baraatStart?: { address: string }
  illustration: IllustrationKey
  theme: EventTheme
  maps: MapLink[]
  email?: string
}

export const site = {
  title: 'Piyush & Priya | Wedding Invitation | December 2026',
} as const

export const couple = {
  groomFull: 'Piyush Arya',
  brideFull: 'Priya Chaurasia',
  groomFirst: 'Piyush',
  brideFirst: 'Priya',
} as const

/**
 * Countdown target: the first moment of 3 December 2026 in India Standard Time
 * (the wedding ceremony day). No ceremony time was supplied, so the countdown
 * runs to the start of the day. The fixed +05:30 offset keeps it identical for
 * guests in any timezone.
 */
export const countdownTarget = '2026-12-03T00:00:00+05:30'
export const countdownDateISO = '2026-12-03'

const MAPS = {
  arya_samaj: 'https://maps.app.goo.gl/VXgPvB2RhoEqDrZa9',
  baraat_start: 'https://maps.app.goo.gl/s2Jm2dVsXeoMGukXA',
  royal_banquet: 'https://maps.app.goo.gl/d1jRrnmahuCo618WA',
  rajbari: 'https://maps.app.goo.gl/jBPFYumYSHMaBrGGA',
} as const

const ARYA_SAMAJ = {
  venue: 'Arya Samaj',
  addressLines: ['Bidhan Sarani, Kolkata'],
  maps: [{ url: MAPS.arya_samaj }],
}

const KALABERIA_ADDRESS = ['Reekjoyoni, Kalaberia, Kolkata – 700135']
const LANDMARK = 'Near Aster Garden Complex'
const BANQUET_EMAIL = 'royalhotelandvilla@gmail.com'

export const events: WeddingEvent[] = [
  {
    id: 'mehendi',
    dateISO: '2026-12-01',
    time: '7:00 PM',
    ...ARYA_SAMAJ,
    illustration: 'mehendi',
    theme: 'sage',
  },
  {
    id: 'haldi',
    dateISO: '2026-12-02',
    time: '2:00 PM',
    ...ARYA_SAMAJ,
    illustration: 'haldi',
    theme: 'turmeric',
  },
  {
    id: 'shaadi',
    dateISO: '2026-12-03',
    venue: 'Royal Banquet',
    addressLines: KALABERIA_ADDRESS,
    landmark: LANDMARK,
    baraatStart: {
      address: '85, Bechu Chatterjee Street, Kolkata',
    },
    illustration: 'baraat',
    theme: 'maroon',
    maps: [{ url: MAPS.baraat_start }, { url: MAPS.royal_banquet }],
    email: BANQUET_EMAIL,
  },
  {
    id: 'reception',
    dateISO: '2026-12-06',
    venue: 'Rajbari Rajarhat',
    addressLines: KALABERIA_ADDRESS,
    landmark: LANDMARK,
    illustration: 'reception',
    theme: 'burgundy',
    maps: [{ url: MAPS.rajbari }],
  },
]

export interface FamilyMember {
  relation: string
  name: string
}

export interface Family {
  side: 'bride' | 'groom'
  name: string
  monogram: string
  members: FamilyMember[]
  address: string
}

export const families: { bride: Family; groom: Family } = {
  bride: {
    side: 'bride',
    name: 'Priya Chaurasia',
    monogram: 'C',
    members: [
      { relation: 'Father', name: 'Garun Kumar Chaurasia' },
      { relation: 'Mother', name: 'Ruby Chaurasia' },
      { relation: 'Grandfather', name: 'Hari Prasad Chaurasia' },
      { relation: 'Grandmother', name: 'Late Raj Kishori Devi' },
    ],
    address: 'Power House Gate, Zamania, Uttar Pradesh',
  },
  groom: {
    side: 'groom',
    name: 'Piyush Arya',
    monogram: 'A',
    members: [
      { relation: 'Father', name: 'Ashok Kumar Arya' },
      { relation: 'Mother', name: 'Surekha Arya' },
      { relation: 'Grandfather', name: 'Late Raja Ram Arya' },
      { relation: 'Grandmother', name: 'Kalawati Devi Arya' },
    ],
    address: 'Bechu Chatterjee Street, Kolkata, West Bengal',
  },
}

export const representatives = {
  vineet: ['Ashok Arya', 'Santosh Arya', 'Ayush Arya', 'Cyrush Arya'],
  darshanabhilashi: ['Santosh Arya', 'Ayush Arya', 'Cyrush Arya'],
} as const

export const navIds: NavId[] = ['home', 'events', 'families', 'venue', 'rsvp']

export const eventById = (id: EventId): WeddingEvent => {
  const found = events.find((e) => e.id === id)
  if (!found) throw new Error(`Unknown event: ${id}`)
  return found
}

/** Venues shown in the Venue & Travel section, derived from the events above. */
export const venueEmail = BANQUET_EMAIL
export const venueLandmark = LANDMARK
