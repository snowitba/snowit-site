import { NextRequest, NextResponse } from 'next/server';

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
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export default async function middleware(req: NextRequest): Promise<NextResponse> {
  const secret = process.env.TIM_AUTH_SECRET ?? '';
  const password = process.env.TIM_PASSWORD ?? '';

  if (!secret || !password) {
    // Env vars not configured — block access
    return NextResponse.redirect(new URL(LOGIN_PATH, req.url));
  }

  const expected = await hmacSha256(secret, password);
  const cookieVal = req.cookies.get('tim_auth')?.value ?? '';

  if (cookieVal === expected) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL(LOGIN_PATH, req.url));
}
