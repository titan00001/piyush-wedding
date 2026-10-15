import { bn } from './bn'
import { en } from './en'
import { hi } from './hi'
import type { Lang, Messages } from './types'

export type { Lang, Messages, EventCopy } from './types'

export const LANGS: Lang[] = ['en', 'hi', 'bn']

export const locales: Record<Lang, Messages> = { en, hi, bn }

export const STORAGE_KEY = 'wedding-lang'
