import type { Messages } from '../i18n'
import type { WeddingEvent } from '../config/wedding'
import { localizeDigits } from './numerals'

const VENUES: Record<string, keyof Messages['places']['venues']> = {
  'Arya Samaj Bhawan': 'aryaSamaj',
  'Royal Banquet': 'royalBanquet',
  'Rajbari Banquet': 'rajbariBanquet',
}

const ADDRESSES: Record<string, keyof Messages['places']['addresses']> = {
  '19, Bidhan Sarani, Kolkata – 700006': 'bidhanSarani',
  'Reekjoyoni, Kalaberia, Kolkata – 700135 (Rajarhat)': 'kalaberia',
  '85, Bechu Chatterjee Street, Kolkata – 700009': 'bechuChatterjee',
}

const LANDMARKS: Record<string, keyof Messages['places']['landmarks']> = {
  'Near Aster Garden Complex': 'asterGarden',
}

export function localizeVenue(venue: string, t: Messages): string {
  const key = VENUES[venue]
  return localizeDigits(key ? t.places.venues[key] : venue, t)
}

export function localizeAddress(line: string, t: Messages): string {
  const key = ADDRESSES[line]
  return localizeDigits(key ? t.places.addresses[key] : line, t)
}

export function localizeLandmarkName(landmark: string, t: Messages): string {
  const key = LANDMARKS[landmark]
  return localizeDigits(key ? t.places.landmarks[key] : landmark, t)
}

export function localizedEventPlaces(event: WeddingEvent, t: Messages) {
  return {
    venue: localizeVenue(event.venue, t),
    addressLines: event.addressLines.map((line) => localizeAddress(line, t)),
    landmark: event.landmark ? localizeLandmarkName(event.landmark, t) : undefined,
    baraatAddress: event.baraatStart ? localizeAddress(event.baraatStart.address, t) : undefined,
  }
}
