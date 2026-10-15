import { useId, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { CircleAlert, CircleCheck, Info, Loader2, Send } from 'lucide-react'
import { events } from '../config/wedding'
import type { EventId } from '../config/wedding'
import type { Messages } from '../i18n'
import { useLanguage } from '../i18n/useLanguage'
import { formatDate } from '../lib/dates'
import { RsvpError, getRsvpMode, submitRsvp } from '../services/rsvp'
import type { Attendance, RsvpMode } from '../services/rsvp'
import { LotusDecoration } from './illustrations'
import { SectionHeading } from './SectionHeading'

interface FormState {
  name: string
  phone: string
  attendees: number
  attendance: Attendance | ''
  events: EventId[]
  dietary: string
  message: string
}

type Errors = Partial<Record<'name' | 'phone' | 'attendees' | 'attendance' | 'events', string>>

type Status =
  | { kind: 'idle' }
  | { kind: 'submitting' }
  | { kind: 'success'; mode: RsvpMode; saved: boolean; accepted: boolean }
  | { kind: 'error'; message: string }

const initial: FormState = { name: '', phone: '', attendees: 1, attendance: '', events: [], dietary: '', message: '' }

const PHONE_RE = /^\+?[0-9][0-9\s-]{6,17}$/

function validate(f: FormState, t: Messages['rsvp']): Errors {
  const e: Errors = {}
  if (f.name.trim().length < 2) e.name = t.errName
  if (f.phone.trim() && !PHONE_RE.test(f.phone.trim())) e.phone = t.errPhone
  if (!f.attendance) e.attendance = t.errAttendance
  if (f.attendance === 'accepts') {
    if (!Number.isInteger(f.attendees) || f.attendees < 1 || f.attendees > 20) e.attendees = t.errAttendees
    if (f.events.length === 0) e.events = t.errEvents
  }
  return e
}

const ORDER: (keyof Errors)[] = ['name', 'phone', 'attendance', 'attendees', 'events']

export function RSVPForm() {
  const { t } = useLanguage()
  const r = t.rsvp
  const uid = useId()
  const mode = getRsvpMode()
  const [form, setForm] = useState<FormState>(initial)
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<Status>({ kind: 'idle' })
  const inFlight = useRef(false)
  const formRef = useRef<HTMLFormElement>(null)
  const resultRef = useRef<HTMLDivElement>(null)

  const submitting = status.kind === 'submitting'
  const accepts = form.attendance === 'accepts'
  const id = (k: string) => `${uid}-${k}`

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((f) => ({ ...f, [key]: value }))
    if (errors[key as keyof Errors]) setErrors((e) => ({ ...e, [key]: undefined }))
  }

  const toggleEvent = (eid: EventId) => {
    set('events', form.events.includes(eid) ? form.events.filter((x) => x !== eid) : [...form.events, eid])
  }

  const onSubmit = async (ev: FormEvent) => {
    ev.preventDefault()
    if (inFlight.current) return // blocks double taps before React re-renders
    const found = validate(form, r)
    setErrors(found)
    const first = ORDER.find((k) => found[k])
    if (first) {
      const target = formRef.current?.querySelector<HTMLElement>(`[data-field="${first}"]`)
      target?.focus()
      return
    }

    inFlight.current = true
    setStatus({ kind: 'submitting' })
    try {
      const res = await submitRsvp({
        name: form.name.trim(),
        phone: form.phone.trim(),
        attendance: form.attendance as Attendance,
        attendees: accepts ? form.attendees : 0,
        events: accepts ? form.events : [],
        dietary: accepts ? form.dietary.trim() : '',
        message: form.message.trim(),
      })
      setStatus({ kind: 'success', mode: res.mode, saved: res.saved, accepted: accepts })
      setForm(initial)
      requestAnimationFrame(() => resultRef.current?.focus())
    } catch (err) {
      setStatus({ kind: 'error', message: err instanceof RsvpError ? err.message : r.errGeneric })
      requestAnimationFrame(() => resultRef.current?.focus())
    } finally {
      inFlight.current = false
    }
  }

  const errorList = ORDER.filter((k) => errors[k])
  const describe = (k: keyof Errors, extra?: string) => [errors[k] ? id(`${k}-err`) : null, extra].filter(Boolean).join(' ') || undefined

  return (
    <section id="rsvp" aria-labelledby="rsvp-title" className="bg-ivory px-5 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-2xl">
        <SectionHeading id="rsvp-title" eyebrow={r.eyebrow} title={r.title}>
          {r.intro}
        </SectionHeading>

        {mode === 'demo' && (
          <div role="note" className="mb-6 flex gap-3 rounded-xl border border-gold bg-turmeric-light/60 p-4 text-[0.98rem]">
            <Info size={20} className="mt-0.5 shrink-0 text-gold-dark" aria-hidden="true" />
            <p className="m-0">
              <strong>{r.demoStrong}</strong> {r.demoNote}
            </p>
          </div>
        )}

        <div className="frame p-5 sm:p-8">
          {status.kind === 'success' ? (
            <div ref={resultRef} tabIndex={-1} role="status" className="text-center outline-none">
              <LotusDecoration className="mx-auto h-12 w-24 text-gold" />
              {status.saved ? (
                <>
                  <h3 className="mt-3 flex items-center justify-center gap-2 text-3xl font-semibold">
                    <CircleCheck className="text-sage-deep" aria-hidden="true" /> {r.thankYou}
                  </h3>
                  <p className="mt-2">{status.accepted ? r.successAccept : r.successDecline}</p>
                </>
              ) : (
                <>
                  <h3 className="mt-3 text-3xl font-semibold">{r.demoComplete}</h3>
                  <p className="mt-2">{r.demoBody}</p>
                </>
              )}
              <button type="button" className="btn btn-outline mt-6" onClick={() => setStatus({ kind: 'idle' })}>
                {r.another}
              </button>
            </div>
          ) : (
            <form ref={formRef} onSubmit={onSubmit} noValidate className="grid gap-6">
              {status.kind === 'error' && (
                <div ref={resultRef} tabIndex={-1} role="alert" className="flex gap-3 rounded-xl border border-[#a31515] bg-[#fff6f4] p-4 outline-none">
                  <CircleAlert size={20} className="mt-0.5 shrink-0 text-[#a31515]" aria-hidden="true" />
                  <p className="m-0">
                    <strong>{r.couldNotSend}</strong> {status.message}
                  </p>
                </div>
              )}

              {errorList.length > 0 && (
                <div role="alert" className="rounded-xl border border-[#a31515] bg-[#fff6f4] p-4">
                  <p className="m-0 font-semibold text-[#8a1010]">{r.fixFollowing}</p>
                  <ul className="m-0 mt-1 list-disc pl-5">
                    {errorList.map((k) => (
                      <li key={k}>{errors[k]}</li>
                    ))}
                  </ul>
                </div>
              )}

              <fieldset disabled={submitting} className="m-0 grid gap-6 border-0 p-0">
                <div>
                  <label htmlFor={id('name')} className="mb-1 block font-semibold">
                    {r.guestName} <span className="text-[#a31515]" aria-hidden="true">*</span>
                    <span className="sr-only"> {r.required}</span>
                  </label>
                  <input
                    id={id('name')}
                    data-field="name"
                    className="field"
                    type="text"
                    autoComplete="name"
                    required
                    aria-required="true"
                    aria-invalid={errors.name ? true : undefined}
                    aria-describedby={describe('name')}
                    value={form.name}
                    onChange={(e) => set('name', e.target.value)}
                    placeholder={r.namePlaceholder}
                  />
                  {errors.name && (
                    <p id={id('name-err')} className="mt-1 text-sm font-medium text-[#a31515]">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor={id('phone')} className="mb-1 block font-semibold">
                    {r.phone} <span className="font-normal text-ink/70">{r.optional}</span>
                  </label>
                  <input
                    id={id('phone')}
                    data-field="phone"
                    className="field"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    aria-invalid={errors.phone ? true : undefined}
                    aria-describedby={describe('phone')}
                    value={form.phone}
                    onChange={(e) => set('phone', e.target.value)}
                    placeholder="+91 98765 43210"
                  />
                  {errors.phone && (
                    <p id={id('phone-err')} className="mt-1 text-sm font-medium text-[#a31515]">
                      {errors.phone}
                    </p>
                  )}
                </div>

                <fieldset className="m-0 border-0 p-0" aria-describedby={describe('attendance')}>
                  <legend className="mb-2 p-0 font-semibold">
                    {r.willAttend} <span className="text-[#a31515]" aria-hidden="true">*</span>
                    <span className="sr-only"> {r.required}</span>
                  </legend>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {([
                      ['accepts', r.accepts],
                      ['declines', r.declines],
                    ] as const).map(([value, label], i) => (
                      <label
                        key={value}
                        className={`flex min-h-14 cursor-pointer items-center gap-3 rounded-xl border-[1.5px] px-4 py-3 has-[:focus-visible]:outline has-[:focus-visible]:outline-[3px] has-[:focus-visible]:outline-maroon ${
                          form.attendance === value ? 'border-maroon bg-blush/60' : 'border-gold/70 bg-ivory'
                        }`}
                      >
                        <input
                          type="radio"
                          name={id('attendance')}
                          data-field={i === 0 ? 'attendance' : undefined}
                          className="h-5 w-5 accent-[var(--color-maroon)]"
                          value={value}
                          checked={form.attendance === value}
                          onChange={() => set('attendance', value)}
                          required
                        />
                        <span className="font-medium">{label}</span>
                      </label>
                    ))}
                  </div>
                  {errors.attendance && (
                    <p id={id('attendance-err')} className="mt-1 text-sm font-medium text-[#a31515]">
                      {errors.attendance}
                    </p>
                  )}
                </fieldset>

                {accepts && (
                  <>
                    <div>
                      <label htmlFor={id('attendees')} className="mb-1 block font-semibold">
                        {r.attendees} <span className="font-normal text-ink/70">{r.includingYou}</span>
                      </label>
                      <input
                        id={id('attendees')}
                        data-field="attendees"
                        className="field sm:max-w-[10rem]"
                        type="number"
                        inputMode="numeric"
                        min={1}
                        max={20}
                        step={1}
                        aria-invalid={errors.attendees ? true : undefined}
                        aria-describedby={describe('attendees')}
                        value={Number.isNaN(form.attendees) ? '' : form.attendees}
                        onChange={(e) => set('attendees', e.target.value === '' ? NaN : Number(e.target.value))}
                      />
                      {errors.attendees && (
                        <p id={id('attendees-err')} className="mt-1 text-sm font-medium text-[#a31515]">
                          {errors.attendees}
                        </p>
                      )}
                    </div>

                    <fieldset className="m-0 border-0 p-0" aria-describedby={describe('events')}>
                      <legend className="mb-2 p-0 font-semibold">
                        {r.eventsAttending} <span className="text-[#a31515]" aria-hidden="true">*</span>
                        <span className="sr-only"> {r.selectAtLeastOne}</span>
                      </legend>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {events.map((e, i) => (
                          <label
                            key={e.id}
                            className={`flex min-h-14 cursor-pointer items-center gap-3 rounded-xl border-[1.5px] px-4 py-3 has-[:focus-visible]:outline has-[:focus-visible]:outline-[3px] has-[:focus-visible]:outline-maroon ${
                              form.events.includes(e.id) ? 'border-maroon bg-blush/60' : 'border-gold/70 bg-ivory'
                            }`}
                          >
                            <input
                              type="checkbox"
                              data-field={i === 0 ? 'events' : undefined}
                              className="h-5 w-5 accent-[var(--color-maroon)]"
                              checked={form.events.includes(e.id)}
                              onChange={() => toggleEvent(e.id)}
                            />
                            <span>
                              <span className="block font-medium">{t.events.byId[e.id].name}</span>
                              <span className="block text-sm text-ink/75">{formatDate(e.dateISO, t)}</span>
                            </span>
                          </label>
                        ))}
                      </div>
                      <button
                        type="button"
                        className="mt-2 min-h-11 text-sm font-semibold text-burgundy underline underline-offset-4"
                        onClick={() => set('events', form.events.length === events.length ? [] : events.map((e) => e.id))}
                      >
                        {form.events.length === events.length ? r.clearAll : r.selectAll}
                      </button>
                      {errors.events && (
                        <p id={id('events-err')} className="mt-1 text-sm font-medium text-[#a31515]">
                          {errors.events}
                        </p>
                      )}
                    </fieldset>

                    <div>
                      <label htmlFor={id('dietary')} className="mb-1 block font-semibold">
                        {r.dietary} <span className="font-normal text-ink/70">{r.optional}</span>
                      </label>
                      <input
                        id={id('dietary')}
                        className="field"
                        type="text"
                        maxLength={200}
                        value={form.dietary}
                        onChange={(e) => set('dietary', e.target.value)}
                        placeholder={r.dietaryPlaceholder}
                      />
                    </div>
                  </>
                )}

                <div>
                  <label htmlFor={id('message')} className="mb-1 block font-semibold">
                    {r.message} <span className="font-normal text-ink/70">{r.optional}</span>
                  </label>
                  <textarea
                    id={id('message')}
                    className="field min-h-28 resize-y"
                    maxLength={600}
                    value={form.message}
                    onChange={(e) => set('message', e.target.value)}
                    placeholder={r.messagePlaceholder}
                  />
                </div>
              </fieldset>

              <button type="submit" className="btn btn-primary w-full sm:w-auto sm:self-center sm:px-10" aria-disabled={submitting} disabled={submitting}>
                {submitting ? (
                  <>
                    <Loader2 size={20} className="animate-spin motion-reduce:animate-none" aria-hidden="true" /> {r.sending}
                  </>
                ) : (
                  <>
                    <Send size={18} aria-hidden="true" /> {r.send}
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
