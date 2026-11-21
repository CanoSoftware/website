// TestFlight access requests for the apps that are still in beta (Ledger, Splitbook).
// Sends one notification email to TJ through Resend. Nothing is stored: the email is the record,
// and Reply-To is the requester, so answering it goes straight to them.
//
// Env: RESEND_API_KEY (required, needs "Sending access"), TESTFLIGHT_TO and TESTFLIGHT_FROM (optional).

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Product subdomains (ledger.canosoftware.net) can post here cross-origin, same as /api/subscribe.
const ALLOWED_ORIGIN_RE = /^https:\/\/([a-z0-9-]+\.)?canosoftware\.net$/;

const DEFAULT_TO = 'tj@canosoftware.net';
const DEFAULT_FROM = 'CanoSoftware TestFlight <testflight@canosoftware.net>';

export const APPS = {
  splitbook: { name: 'Splitbook', platforms: ['iPhone', 'iPad'] },
  ledger: { name: 'Ledger', platforms: ['iPhone', 'iPad', 'Mac'] },
};
const DEVICES = ['iPhone', 'iPad', 'Mac'];

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

  // Honeypot: bots fill every input, people never see this one.
  if (str(body.company)) return json({ ok: true }, 200, cors);

  const parsed = parseRequest(body);
  if (parsed.error) return json({ error: parsed.error }, 400, cors);

  if (!env.RESEND_API_KEY) {
    return json({ error: 'Requests are not set up yet. Email tj@canosoftware.net instead.' }, 500, cors);
  }

  const { subject, html, text } = buildEmail(parsed.value);
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: env.TESTFLIGHT_FROM || DEFAULT_FROM,
      to: [env.TESTFLIGHT_TO || DEFAULT_TO],
      reply_to: parsed.value.email,
      subject,
      html,
      text,
      tags: [{ name: 'kind', value: 'testflight-request' }],
    }),
  });

  if (!res.ok) {
    return json({ error: 'Something went wrong. Try again later, or email tj@canosoftware.net.' }, 502, cors);
  }
  return json({ ok: true }, 200, cors);
}

/* ---------- validation ---------- */

export function parseRequest(body) {
  const name = str(body.name).replace(/\s+/g, ' ').slice(0, 100);
  const email = str(body.email);
  const note = str(body.note).slice(0, 1000);
  const apps = uniq(arr(body.apps).filter((a) => Object.prototype.hasOwnProperty.call(APPS, a)));
  const devices = uniq(arr(body.devices).filter((d) => DEVICES.includes(d)));
  const page = str(body.page).slice(0, 80);

  if (!name) return { error: 'Add your name.' };
  if (!email || !EMAIL_RE.test(email) || email.length > 320) return { error: 'Enter a valid email address.' };
  if (!apps.length) return { error: 'Pick at least one app.' };
  if (!devices.length) return { error: 'Pick at least one device.' };

  return { value: { name, email, apps, devices, note, page } };
}

/* ---------- email (CanoSoftware design system: email/ templates) ---------- */
// Table-based, 600px, inline styles, Georgia for the headline, no CSS variables or web fonts.

const SANS = "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";
const SERIF = "Georgia,'Iowan Old Style','Palatino Linotype',serif";
const MARK = 'https://canosoftware.net/assets/email/mark-132.png';

export function buildEmail({ name, email, apps, devices, note, page }) {
  const appNames = apps.map((a) => APPS[a].name);
  const appList = joinAnd(appNames);
  const first = name.split(/\s+/)[0];

  // Devices that none of the requested apps run on (Splitbook has no Mac app).
  const supported = new Set(apps.flatMap((a) => APPS[a].platforms));
  const unsupported = devices.filter((d) => !supported.has(d));

  const subject = `TestFlight request: ${appList} from ${name}`;
  const preheader = `${name} wants to test ${appList} on ${joinAnd(devices)}.`;

  const rows = [
    ['Name', esc(name)],
    ['Invite to', `<a href="mailto:${esc(email)}" style="color:#9C462E;text-decoration:none;">${esc(email)}</a>`],
    ['Apps', esc(appList)],
    ['Devices', esc(joinAnd(devices)) + (unsupported.length
      ? `<br><span style="font-size:13px;color:#73500C;">${esc(joinAnd(unsupported))}: not supported by ${esc(appList)}</span>`
      : '')],
  ];
  if (page) rows.push(['Sent from', esc(page)]);

  const rowHtml = rows.map(([k, v], i) => `
<tr>
<td valign="top" style="padding:12px 0;${i ? 'border-top:1px solid #E7E1D6;' : ''}width:120px;font-family:${SANS};font-size:13.5px;line-height:1.5;color:#6B6259;">${k}</td>
<td valign="top" style="padding:12px 0;${i ? 'border-top:1px solid #E7E1D6;' : ''}font-family:${SANS};font-size:15px;line-height:1.5;color:#262220;">${v}</td>
</tr>`).join('');

  const noteHtml = note ? `
<tr><td style="padding:24px 32px 0;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#F7F3EC;border:1px solid #E7E1D6;border-radius:10px;">
<tr><td style="padding:16px 18px;font-family:${SANS};">
<div style="font-size:11.5px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#6B6259;padding-bottom:6px;">Their note</div>
<div style="font-size:15px;line-height:1.6;color:#262220;">${esc(note).replace(/\n/g, '<br>')}</div>
</td></tr></table>
</td></tr>` : '';

  const html = `<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(subject)}</title></head>
<body style="margin:0;padding:0;background:#EFE9DD;">
<div style="display:none;font-size:1px;color:#EFE9DD;max-height:0;overflow:hidden;">${esc(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#EFE9DD;padding:32px 12px;">
<tr><td align="center">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:600px;background:#FFFFFF;border:1px solid #E7E1D6;border-radius:16px;">
<tr><td style="padding:28px 32px 0;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
<td style="padding-right:12px;"><img src="${MARK}" width="44" height="28" alt="" style="display:block;border:0;"></td>
<td style="font-family:${SANS};font-size:17px;font-weight:600;letter-spacing:-0.01em;color:#262220;">CanoSoftware</td>
</tr></table></td></tr>
<tr><td style="padding:28px 32px 0;font-family:${SANS};font-size:12px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#6B6259;">TestFlight request</td></tr>
<tr><td style="padding:10px 32px 0;font-family:${SERIF};font-size:28px;line-height:1.2;letter-spacing:-0.01em;color:#262220;">${esc(first)} wants to test ${esc(appList)}.</td></tr>
<tr><td style="padding:12px 32px 0;font-family:${SANS};font-size:16px;line-height:1.65;color:#262220;">Add them as an external tester in App Store Connect and TestFlight emails the invite. Reply to this email and it goes to ${esc(first)}.</td></tr>
<tr><td style="padding:20px 32px 0;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${rowHtml}
</table></td></tr>${noteHtml}
<tr><td style="padding:28px 32px 0;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
<td style="background:#9C462E;border-radius:10px;"><a href="https://appstoreconnect.apple.com/apps" style="display:inline-block;padding:13px 22px;font-family:${SANS};font-size:15px;font-weight:600;color:#FBF3EC;text-decoration:none;">Open App Store Connect</a></td>
</tr></table></td></tr>
<tr><td style="padding:28px 32px 0;"><div style="height:1px;background:#E7E1D6;"></div></td></tr>
<tr><td style="padding:20px 32px 28px;font-family:${SANS};font-size:13.5px;line-height:1.6;color:#6B6259;">Nothing was saved anywhere else. This email is the only copy of the request.</td></tr>
</table>
<table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:600px;">
<tr><td style="padding:20px 8px 0;font-family:${SANS};font-size:12px;line-height:1.6;color:#6B6259;">
CanoSoftware · Maryland · <a href="https://canosoftware.net" style="color:#9C462E;text-decoration:none;">canosoftware.net</a><br>
Sent by the TestFlight request form.
</td></tr></table>
</td></tr></table>
</body></html>`;

  const text = [
    `TestFlight request: ${appList}`,
    '',
    `Name: ${name}`,
    `Invite to: ${email}`,
    `Apps: ${appList}`,
    `Devices: ${joinAnd(devices)}${unsupported.length ? ` (${joinAnd(unsupported)} not supported)` : ''}`,
    page ? `Sent from: ${page}` : null,
    note ? `\nTheir note:\n${note}` : null,
    '',
    'Add them as an external tester: https://appstoreconnect.apple.com/apps',
    `Reply to this email and it goes to ${first}.`,
  ].filter((l) => l !== null).join('\n');

  return { subject, html, text };
}

/* ---------- helpers ---------- */

function str(v) { return typeof v === 'string' ? v.trim() : ''; }
function arr(v) { return Array.isArray(v) ? v.filter((x) => typeof x === 'string') : []; }
function uniq(a) { return Array.from(new Set(a)); }
function joinAnd(a) {
  if (a.length <= 1) return a.join('');
  return a.slice(0, -1).join(', ') + ' and ' + a[a.length - 1];
}
function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
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
