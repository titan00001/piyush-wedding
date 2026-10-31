import type { Messages } from '../i18n'

const HI = '०१२३४५६७८९'
const BN = '০১২৩৪৫৬৭৮৯'

/** Map ASCII digits to the script of the active locale. English is unchanged. */
export function localizeDigits(value: string | number, messages: Messages, pad = 0): string {
  let text = String(value)
  if (pad > 0) text = text.padStart(pad, '0')
  const table = messages.meta.htmlLang === 'hi' ? HI : messages.meta.htmlLang === 'bn' ? BN : null
  if (!table) return text
  return text.replace(/\d/g, (digit) => table[Number(digit)] ?? digit)
}
