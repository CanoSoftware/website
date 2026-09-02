const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Product subdomains that embed this same signup form and call it cross-origin.
const ALLOWED_ORIGIN_RE = /^https:\/\/([a-z0-9-]+\.)?canosoftware\.net$/;

export async function onRequestOptions(context) {
  return new Response(null, { status: 204, headers: corsHeaders(context.request) });
}

export async function onRequestPost(context) {
  const { request, env } = context;
  const cors = corsHeaders(request);

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Invalid request.' }, 400, cors);
  }

  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const company = typeof body.company === 'string' ? body.company.trim() : '';

  // Honeypot field — bots fill every input, real users never see it.
  if (company) {
    return json({ ok: true }, 200, cors);
  }

  if (!email || !EMAIL_RE.test(email) || email.length > 320) {
    return json({ error: 'Enter a valid email address.' }, 400, cors);
  }

  if (!env.RESEND_API_KEY) {
    return json({ error: 'Signups are not configured yet.' }, 500, cors);
  }

  const resendRes = await fetch('https://api.resend.com/contacts', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, unsubscribed: false }),
  });

  if (!resendRes.ok) {
    const errBody = await resendRes.json().catch(() => ({}));
    // Resend returns 409 when the contact already exists — treat as success.
    if (resendRes.status === 409 || /already exists/i.test(errBody.message || '')) {
      return json({ ok: true }, 200, cors);
    }
    return json({ error: 'Something went wrong. Try again later.' }, 502, cors);
  }

  return json({ ok: true }, 200, cors);
}

function corsHeaders(request) {
  const origin = request.headers.get('Origin') || '';
  if (!ALLOWED_ORIGIN_RE.test(origin)) return {};
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

function json(data, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...extraHeaders },
  });
}
