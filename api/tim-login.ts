import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createHmac } from 'crypto';

// Rate limiting — in-memory map: IP → { count, resetAt }
// Vercel serverless functions may have multiple instances, so this is
// best-effort rate limiting within a single instance. Sufficient for a
// low-traffic internal page.
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60 * 1000; // 1 minute

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return true; // allow
  }

  if (entry.count >= RATE_LIMIT) {
    return false; // deny
  }

  entry.count += 1;
  return true; // allow
}

function computeHmac(secret: string, data: string): string {
  return createHmac('sha256', secret).update(data).digest('hex');
}

function getClientIp(req: VercelRequest): string {
  // Vercel sets x-real-ip for the originating client
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string') {
    return forwarded.split(',')[0].trim();
  }
  if (Array.isArray(forwarded)) {
    return forwarded[0].trim();
  }
  return req.headers['x-real-ip'] as string ?? 'unknown';
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).end('Method Not Allowed');
  }

  const ip = getClientIp(req);

  if (!checkRateLimit(ip)) {
    return res.status(429).send('Previše pokušaja. Sačekaj minutu.');
  }

  const secret = process.env.TIM_AUTH_SECRET ?? '';
  const envPassword = process.env.TIM_PASSWORD ?? '';

  if (!secret || !envPassword) {
    console.error('tim-login: TIM_AUTH_SECRET or TIM_PASSWORD env var not set');
    return res.status(500).send('Server konfiguracija nije ispravna.');
  }

  // Parse password from URL-encoded or JSON body
  let submittedPassword = '';
  const contentType = req.headers['content-type'] ?? '';

  if (contentType.includes('application/json')) {
    submittedPassword = (req.body as Record<string, string>)?.password ?? '';
  } else {
    // application/x-www-form-urlencoded — Vercel parses this into req.body
    submittedPassword = (req.body as Record<string, string>)?.password ?? '';
  }

  if (!submittedPassword) {
    return res.status(400).send('Nedostaje polje lozinke.');
  }

  if (submittedPassword !== envPassword) {
    return res.status(401).send('Pogrešna lozinka');
  }

  // Correct password — compute HMAC token
  const token = computeHmac(secret, envPassword);

  // Set auth cookie: Secure, HttpOnly, SameSite=Lax, 30 days, Path=/
  const cookieValue = [
    `tim_auth=${token}`,
    'Path=/',
    'HttpOnly',
    'Secure',
    'SameSite=Lax',
    'Max-Age=2592000', // 30 days
  ].join('; ');

  res.setHeader('Set-Cookie', cookieValue);
  res.setHeader('Location', '/tim.html');
  return res.status(302).end();
}
