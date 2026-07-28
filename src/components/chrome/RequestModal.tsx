'use client';

import { useCallback, useEffect, useRef, useState, type FormEvent } from 'react';
import { gsap, prefersReducedMotion, registerGsap } from '@/lib/motion';
import { trapFocus } from '@/lib/focusTrap';
import { useSite } from '@/components/SiteProvider';
import { MODAL } from '@/content/site';
import { Close, LogoMark } from '@/components/ui/icons';
import { PillButton } from '@/components/ui/PillButton';

type Errors = Partial<Record<'name' | 'email' | 'message' | 'form', string>>;

export function RequestModal() {
  const { modalOpen } = useSite();
  if (!modalOpen) return null;
  return <RequestModalPanel />;
}

const FIELD =
  'w-full rounded-control border border-line bg-surface/50 px-4 py-3 text-sm transition-colors outline-none focus:border-foreground/30 focus:bg-white';
const CAPTION =
  'text-xs font-medium tracking-[.025em] text-foreground/50 uppercase';

function RequestModalPanel() {
  const { closeModal } = useSite();
  const panelRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [status, setStatus] = useState<'form' | 'sending' | 'success'>('form');
  const [errors, setErrors] = useState<Errors>({});

  useEffect(() => {
    registerGsap();
    if (prefersReducedMotion()) return;
    gsap.fromTo(
      panelRef.current,
      { opacity: 0, y: 28 },
      { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' }
    );
  }, []);

  const dismiss = useCallback(() => {
    if (prefersReducedMotion()) {
      closeModal();
      return;
    }
    gsap.to(panelRef.current, {
      opacity: 0,
      y: 18,
      duration: 0.4,
      ease: 'power3.out',
      onComplete: closeModal,
    });
  }, [closeModal]);

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    return trapFocus(panel, dismiss);
  }, [dismiss]);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    /* Honeypot — bots fill it, humans never see it. */
    if (String(data.get('company') ?? '').trim()) {
      setStatus('success');
      return;
    }

    const name = String(data.get('name') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const message = String(data.get('message') ?? '').trim();
    const emailInput = form.elements.namedItem('email') as HTMLInputElement | null;

    const next: Errors = {};
    if (!name) next.name = 'Please tell me your name.';
    if (!email || !emailInput?.validity.valid) next.email = 'A valid email, please.';
    if (message.length < 10) next.message = 'A little more detail helps — 10 characters minimum.';

    setErrors(next);
    if (Object.keys(next).length) return;

    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      setStatus('success');
    } catch {
      setStatus('form');
      setErrors({ form: "That didn't send. Try again, or email me directly." });
    }
  };

  return (
    <div
      className="fixed inset-0 z-[110] flex items-end justify-center bg-foreground/30 p-4 backdrop-blur-[16px] sm:items-center"
      onClick={dismiss}
      role="dialog"
      aria-modal="true"
      aria-labelledby="request-modal-title"
    >
      <div
        ref={panelRef}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg overflow-hidden rounded-card bg-white p-6 shadow-2xl ring-1 ring-line sm:p-8"
      >
        <button
          type="button"
          onClick={dismiss}
          aria-label="Close"
          className="absolute top-4 right-4 grid size-9 place-items-center rounded-pill bg-surface text-foreground/60 hover:bg-surface-2 hover:text-foreground"
        >
          <Close className="text-sm" />
        </button>

        {status === 'success' ? (
          <div className="flex flex-col items-center gap-4 py-8 text-center">
            <span className="grid size-14 place-items-center rounded-pill bg-ink text-2xl text-accent-from">
              <LogoMark />
            </span>
            <h2 id="request-modal-title" className="text-2xl font-semibold">
              {MODAL.successTitle}
            </h2>
            <p className="max-w-[34ch] text-sm text-foreground/60">{MODAL.successBody}</p>
            <PillButton variant="dark" onClick={dismiss}>
              Close
            </PillButton>
          </div>
        ) : (
          <>
            <div className="mb-6 flex flex-col gap-1.5">
              <span className="inline-flex items-center gap-2 text-sm font-medium text-foreground/60">
                <span className="size-1.5 rounded-pill bg-accent" aria-hidden="true" />
                {MODAL.eyebrow}
              </span>
              <h2
                id="request-modal-title"
                className="text-2xl font-semibold tracking-[-.01em] sm:text-3xl"
              >
                {MODAL.heading}
              </h2>
            </div>

            <form ref={formRef} onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
              <label className="flex flex-col gap-2">
                <span className={CAPTION}>Name</span>
                <input
                  name="name"
                  type="text"
                  required
                  placeholder="Your name"
                  autoComplete="name"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'err-name' : undefined}
                  className={FIELD}
                />
                {errors.name ? (
                  <span id="err-name" className="text-xs text-accent">
                    {errors.name}
                  </span>
                ) : null}
              </label>

              <label className="flex flex-col gap-2">
                <span className={CAPTION}>Email</span>
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="you@company.com"
                  autoComplete="email"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'err-email' : undefined}
                  className={FIELD}
                />
                {errors.email ? (
                  <span id="err-email" className="text-xs text-accent">
                    {errors.email}
                  </span>
                ) : null}
              </label>

              <label className="flex flex-col gap-2">
                <span className={CAPTION}>Project</span>
                <textarea
                  name="message"
                  rows={4}
                  required
                  placeholder="A few words about the project, timeline, and budget."
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'err-message' : undefined}
                  className={`${FIELD} resize-none`}
                />
                {errors.message ? (
                  <span id="err-message" className="text-xs text-accent">
                    {errors.message}
                  </span>
                ) : null}
              </label>

              {/* honeypot */}
              <input
                name="company"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hidden"
              />

              {errors.form ? (
                <p className="text-xs text-accent" role="alert">
                  {errors.form}
                </p>
              ) : null}

              <div className="mt-2 flex items-center justify-between gap-4">
                <span className="text-xs text-foreground/45">{MODAL.note}</span>
                <PillButton
                  variant="dark"
                  arrow="up-right"
                  type="submit"
                  disabled={status === 'sending'}
                  busy={status === 'sending'}
                >
                  {status === 'sending' ? MODAL.sending : MODAL.submit}
                </PillButton>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
