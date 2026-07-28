import { SITE } from '@/content/site';

/* ──────────────────────────────────────────────────────────────────
   Contact endpoint.

   Wired for Resend over its REST API, so there's no SDK dependency.
   Set RESEND_API_KEY (and optionally CONTACT_FROM) in .env.local to
   start delivering. Without a key the handler validates and logs the
   submission server-side and still reports success, so the UI is
   fully exercised in development.
─────────────────────────────────────────────────────────────────── */

type Payload = { name: string; email: string; message: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function parse(body: unknown): Payload | null {
  if (typeof body !== 'object' || body === null) return null;
  const { name, email, message } = body as Record<string, unknown>;

  if (typeof name !== 'string' || typeof email !== 'string' || typeof message !== 'string') {
    return null;
  }

  const trimmed = {
    name: name.trim(),
    email: email.trim(),
    message: message.trim(),
  };

  if (!trimmed.name || !EMAIL_RE.test(trimmed.email) || trimmed.message.length < 10) {
    return null;
  }
  /* Cheap abuse guard — nothing here needs to be this long. */
  if (trimmed.name.length > 200 || trimmed.email.length > 320 || trimmed.message.length > 5000) {
    return null;
  }

  return trimmed;
}

export async function POST(request: Request) {
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return Response.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  const payload = parse(raw);
  if (!payload) {
    return Response.json({ error: 'Invalid submission.' }, { status: 422 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.info('[contact] no RESEND_API_KEY set — submission logged only:', payload);
    return Response.json({ ok: true, delivered: false });
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM ?? 'Portfolio <onboarding@resend.dev>',
        to: [SITE.email],
        reply_to: payload.email,
        subject: `New project enquiry — ${payload.name}`,
        text: `From: ${payload.name} <${payload.email}>\n\n${payload.message}`,
      }),
    });

    if (!res.ok) {
      console.error('[contact] resend rejected the send:', res.status, await res.text());
      return Response.json({ error: 'Could not send the message.' }, { status: 502 });
    }
  } catch (error) {
    console.error('[contact] send failed:', error);
    return Response.json({ error: 'Could not send the message.' }, { status: 502 });
  }

  return Response.json({ ok: true, delivered: true });
}
