import { next } from '@vercel/edge';

export const config = {
  matcher: ['/tim.html'],
};

const LOGIN_PATH = '/tim-login.html';

async function hmacSha256(secret: string, data: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(data));
  return Array.from(new Uint8Array(sig))
    .map((b: number) => b.toString(16).padStart(2, '0'))
    .join('');
}

function getCookieValue(cookieHeader: string | null, name: string): string {
  if (!cookieHeader) return '';
  for (const part of cookieHeader.split(';')) {
    const [k, v] = part.trim().split('=');
    if (k === name && v !== undefined) return v;
  }
  return '';
}

export default async function middleware(req: Request): Promise<Response> {
  const secret = process.env['TIM_AUTH_SECRET'] ?? '';
  const password = process.env['TIM_PASSWORD'] ?? '';

  if (!secret || !password) {
    return Response.redirect(new URL(LOGIN_PATH, req.url), 302);
  }

  const expected = await hmacSha256(secret, password);
  const cookieVal = getCookieValue(req.headers.get('cookie'), 'tim_auth');

  if (cookieVal === expected) {
    return next();
  }

  return Response.redirect(new URL(LOGIN_PATH, req.url), 302);
}
