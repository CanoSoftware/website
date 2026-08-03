const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function onRequestPost(context) {
  const { request, env } = context;

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Invalid request.' }, 400);
  }

  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const company = typeof body.company === 'string' ? body.company.trim() : '';

  // Honeypot field — bots fill every input, real users never see it.
  if (company) {
    return json({ ok: true });
  }

  if (!email || !EMAIL_RE.test(email) || email.length > 320) {
    return json({ error: 'Enter a valid email address.' }, 400);
  }

  if (!env.RESEND_API_KEY) {
    return json({ error: 'Signups are not configured yet.' }, 500);
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
      return json({ ok: true });
    }
    return json({ error: 'Something went wrong. Try again later.' }, 502);
  }

  return json({ ok: true });
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
