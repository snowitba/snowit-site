# Security Design — tim.html Access Control
**MC Task:** #9977
**Author:** Securion / Parisa Tabriz
**Date:** 2026-04-28
**Status:** DESIGN COMPLETE — awaiting FlowForge (Subtask 2) and Proveo (Subtask 3)
**Scope:** Vercel Edge Middleware auth gate on `/tim.html` only. No DNS changes. No Cloudflare.

---

## 1. Threat Model

### 1.1 What We Protect

`/tim.html` is an internal sales intelligence document containing:

- **Pricing structure** — exact EUR/KM rates for all SnowIT packages (200 EUR to 5,000 KM range)
- **Sales tactics** — Nick Saraev methodology, closing scripts, anchor pricing strategy, follow-up cadence
- **KPI targets** — outreach volume, conversion targets, revenue goals (1,500 EUR/30d benchmark)
- **Team contacts** — Enis's personal WhatsApp (+387 62 329 076), direct email addresses, role mapping
- **Competitive intelligence** — what SnowIT charges vs. what competitors could undercut

Exposure of this data to a competitor allows direct price undercutting, poaching of sales tactics, and targeted harassment of named individuals.

**Confirmed live exposure:** As of 2026-04-28 12:52 UTC, `curl -sI https://snowit.ba/tim.html` returns HTTP/2 200 with no auth challenge, no `X-Robots-Tag` header, and `access-control-allow-origin: *`. The page is fully public to any HTTP client that knows the URL.

Note: The HTML file includes `<meta name="robots" content="noindex, nofollow">` — this is a browser hint only, not enforced by servers. It does NOT appear in HTTP headers. Crawlers that ignore meta tags (e.g. Googlebot via Caffeine, CommonCrawl) may index the content anyway. This is one of the gaps this design closes.

### 1.2 Adversary Profile

**In-scope adversaries (this design defends against):**

| Adversary | Method | Likelihood | Impact |
|-----------|--------|------------|--------|
| Curious competitor | Direct URL guess or referrer leak from a sales call | Medium | High — pricing intelligence |
| Bot / web scraper | Automated crawl via CommonCrawl, SEMrush, Ahrefs, GPTBot | High | Medium — indexed pricing |
| Opportunistic stranger | URL shared accidentally (Slack, email forward, screenshot) | Medium | Medium — contact data exposure |
| Disgruntled former user | Bookmarked URL after access revocation | Low | Low (post-implementation) |

**Threat vectors for each:**
- Guessing the URL path (`/tim.html`) — trivially guessable from HTML source or referrer headers
- Google/Bing cache serving a previously indexed copy (mitigated by `X-Robots-Tag` header + noindex)
- CommonCrawl dataset including the page (mitigated by header enforcement at edge)
- Referrer header leaking the URL when a team member clicks an outbound link from tim.html

### 1.3 What We DO NOT Defend Against

This design explicitly excludes:

- **Nation-state / sophisticated APT:** Vercel platform-level compromise, certificate pinning attacks, or supply-chain attacks on Vercel Edge infrastructure are out of scope. If Vercel is compromised, middleware does not help.
- **Social engineering of Enis:** If Enis shares the URL directly (verbally, screenshot, forwarded link), no technical control prevents it.
- **Insider threat — authorized user:** Alem, Enis, or John with valid cookies can screenshot and redistribute. This is a people/policy control, not a technical one.
- **Brute-force of magic link:** Rate limiting (specified below) reduces but does not eliminate targeted enumeration. This is not a high-security system — we are protecting sales docs, not banking credentials.
- **Cookie theft via local device compromise:** If an authorized user's device is compromised (malware, XSS on another domain), the auth cookie could be stolen. HttpOnly mitigates browser-based theft but not OS-level malware.
- **Timing attacks on HMAC comparison:** jose library uses constant-time comparison; acceptable risk for this threat model.
- **Vercel env var exposure:** If `TIM_AUTH_SECRET` is leaked from Vercel dashboard (requires dashboard access), all issued JWTs are forgeable. Treat as a Vercel admin credential — Bitwarden storage required.

### 1.4 Residual Risk After This Design

| Risk | Severity | Mitigation |
|------|----------|-----------|
| Google cache serving old version | Low | X-Robots-Tag forces deindex over ~2 weeks; submit removal request via Search Console |
| Authorized user shares URL + valid cookie | Low | Policy control only; logged in middleware (future) |
| JWT secret rotation failure | Medium | Recovery procedure in Section 4 |
| Middleware crash on bad deploy | Low | Vercel rollback path in Section 4 |
| Magic link email interception | Low | HTTPS delivery via transactional email provider; acceptable for this data classification |
| Long-term: tim.html in CommonCrawl dataset already | Medium | Cannot be retroactively removed; new adversary with old data. Mitigated by rotating KPIs and pricing periodically. |

**Acceptable residual risk:** This design moves tim.html from "fully public via security-by-obscurity" to "requires authenticated email in allowlist." This is appropriate for internal sales documentation at this company size and threat level. It is not PCI-DSS or GDPR-sensitive data.

---

## 2. vercel.json Header Rule

This is the complete `vercel.json` file. The file does NOT currently exist at `/Users/makinja/projects/snowit-site/vercel.json`. FlowForge creates it from scratch.

```json
{
  "headers": [
    {
      "source": "/tim.html",
      "headers": [
        {
          "key": "X-Robots-Tag",
          "value": "noindex, nofollow, noarchive, nosnippet"
        },
        {
          "key": "Content-Security-Policy",
          "value": "default-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; img-src 'self' data:; script-src 'none'; frame-ancestors 'none'; base-uri 'self'; form-action 'self' /api/tim-auth"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "Referrer-Policy",
          "value": "no-referrer"
        },
        {
          "key": "Permissions-Policy",
          "value": "camera=(), microphone=(), geolocation=(), payment=(), usb=()"
        },
        {
          "key": "Cache-Control",
          "value": "no-store, no-cache, must-revalidate, private"
        }
      ]
    },
    {
      "source": "/api/tim-auth",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "no-store"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        }
      ]
    }
  ]
}
```

**Header rationale:**

- `X-Robots-Tag: noindex, nofollow, noarchive, nosnippet` — HTTP-level enforcement of crawl exclusion. Unlike `<meta name="robots">`, this header is respected even by crawlers that never execute JavaScript and by HTTP-only bots. `noarchive` prevents Google/Bing caching a copy. `nosnippet` prevents featured snippets in case a legacy index entry exists.

- `Content-Security-Policy` — Restricts resource loading to known-safe origins. `script-src 'none'` is aggressive but correct: tim.html has zero JavaScript. `style-src unsafe-inline` is required because tim.html uses inline `<style>` block (confirmed in source). `form-action 'self' /api/tim-auth` scope-limits any form submissions. `frame-ancestors 'none'` replaces X-Frame-Options in modern browsers.

- `X-Frame-Options: DENY` — Legacy browsers that do not understand `frame-ancestors` in CSP. Belt-and-suspenders.

- `Referrer-Policy: no-referrer` — Prevents the URL of tim.html from appearing in outbound link referrer headers. If a user clicks an external link from tim.html (e.g., mailto: link to enis@snowit.ba), the destination server does not see `Referer: https://snowit.ba/tim.html`. This reduces URL leakage.

- `Permissions-Policy` — Disables hardware API access (camera, mic, geolocation, payment) that is irrelevant to this page. Defense in depth against future injected scripts.

- `Cache-Control: no-store, no-cache, must-revalidate, private` — Prevents Vercel CDN edge from caching an authenticated response. Without this, a cached 200 response could be served to an unauthenticated client after the first authorized access warms the cache. The current live response shows `x-vercel-cache: HIT` and `age: 3184` — meaning tim.html is actively cached at edge. This header eliminates that vector.

**Schema validation note:** This vercel.json uses the Vercel headers configuration documented at vercel.com/docs/projects/project-configuration (headers array, source/headers pattern). The `source` field uses Vercel path matching (exact string match, no regex needed for this use case). Verified against Vercel config schema v2.

**Public pages:** No headers added to public routes. The `source: "/tim.html"` rule is scoped only to that path. `usluge.html`, `portfolio.html`, `careers.html`, and `/` are not affected.

---

## 3. Edge Middleware Auth Design

### 3.1 Chosen Option: Option A — Magic-Link Login (one-time PIN to email)

**Justification:** Option A is selected over B (pre-shared cookie) and C (Vercel SSO) for the following reasons:

- **vs. Option B (pre-shared cookie):** A pre-shared secret stored in Bitwarden requires manual distribution to each authorized user and manual rotation. If Enis is on a sales call and needs access on a new device, there is no self-service path — he must contact John or Alem. Magic link is self-service and auditable (sent to allowlisted email only).

- **vs. Option C (Vercel Auth/SSO):** Vercel Authentication is available on Pro/Enterprise plans. The current Vercel project is under `johns-projects-4b43bfa9` (team plan status unconfirmed). Even if Pro plan is active, Vercel Auth requires all authorized users to have Vercel accounts, which Enis does not have. Adding Enis to a Vercel team creates a billing and access-scope issue. Magic link requires only an email address.

- **Magic link advantages for this context:** The allowlist is 3 emails. The use case is "Enis needs to pull up pricing data before a sales meeting." Self-service auth with a 30-minute OTP fits that workflow exactly. No passwords to forget, no cookies to manually install.

- **Magic link disadvantage acknowledged:** Requires a transactional email provider (nodemailer is already a dependency — `package.json` has `nodemailer: ^6.10.1`). Email delivery is not instantaneous. If Enis's email is slow, the OTP could arrive 2-3 minutes late. Mitigation: OTP validity is 15 minutes (generous); login flow clearly shows "check your email."

### 3.2 Auth Flow Detail

```
1. User visits /tim.html (no valid cookie)
2. Middleware intercepts → 302 redirect to /tim-login.html
3. User enters email address in login form
4. Form POST to /api/tim-auth (action: "request-otp")
5. API checks email against TIM_ALLOWED_EMAILS allowlist
   - Not in list → 200 with message "If this email is authorized, a link has been sent."
     (Generic message — do NOT reveal whether email is in allowlist. Prevents enumeration.)
   - In list → generate OTP (6-digit numeric, CSPRNG), store OTP+email+expiry in KV or signed JWT
6. Send magic-link email: https://snowit.ba/api/tim-auth?action=verify&token=<signed-jwt>
7. User clicks link in email
8. /api/tim-auth (action: "verify") validates signed JWT
   - Invalid/expired → redirect to /tim-login.html?error=expired
   - Valid → set auth cookie → redirect to /tim.html
9. Middleware reads cookie on /tim.html → 200 OK
```

### 3.3 Token / OTP Design

**OTP storage:** The OTP is NOT stored server-side (no KV store on Vercel Hobby/Pro without additional setup). Instead, the magic link contains a self-contained signed JWT that carries the OTP payload. The JWT is signed with `TIM_AUTH_SECRET`. The `/api/tim-auth?action=verify` endpoint verifies the JWT signature and expiry.

**Magic link JWT payload:**
```json
{
  "sub": "alem@alai.no",
  "purpose": "tim-otp",
  "iat": 1714308000,
  "exp": 1714308900
}
```
(exp = iat + 900 seconds = 15-minute validity)

**Signing:** HS256 with `TIM_AUTH_SECRET` (256-bit minimum, base64url encoded). Use the `jose` library (pure ESM, Vercel Edge-compatible, zero native dependencies). Do NOT use `jsonwebtoken` — it uses Node.js crypto APIs not available in Vercel Edge Runtime.

### 3.4 Auth Cookie Specification

| Attribute | Value | Rationale |
|-----------|-------|-----------|
| Name | `tim_session` | Non-generic enough to not collide with other cookies; not so descriptive that it signals the resource |
| Value | Signed JWT (see below) | Self-contained, no server-side session storage needed |
| Secure | true | HTTPS only. snowit.ba has HSTS (`strict-transport-security: max-age=63072000` confirmed live) |
| HttpOnly | true | Not accessible to JavaScript. XSS cannot steal the cookie |
| SameSite | Strict | Prevents CSRF. Since tim.html is not a public-facing resource that requires cross-site embedding, Strict is correct |
| Path | /tim.html | Scopes the cookie to the protected path only. Auth cookie is not sent on requests to /, /usluge.html, etc. |
| Domain | snowit.ba | Explicit domain; do NOT use `.snowit.ba` (with leading dot) — that would scope to all subdomains |
| Max-Age | 43200 | 12 hours. Enis uses it during business hours; expires overnight. Forces re-auth daily |

**Session JWT payload (inside the cookie):**
```json
{
  "sub": "enis@snowit.ba",
  "purpose": "tim-session",
  "iat": 1714308900,
  "exp": 1714352100
}
```
(exp = iat + 43200 = 12-hour session)

Signed with the same `TIM_AUTH_SECRET`. Middleware verifies signature + exp on every request to `/tim.html`.

### 3.5 Env Vars

| Var | Value (example) | Source |
|-----|-----------------|--------|
| `TIM_AUTH_SECRET` | 32-byte base64url-encoded random string | Generate: `node -e "console.log(require('crypto').randomBytes(32).toString('base64url'))"` → store in Bitwarden item "snowit-tim-auth-secret" → set in Vercel project env |
| `TIM_ALLOWED_EMAILS` | `alem@alai.no,enis@snowit.ba,john@alai.no` | Plain comma-separated string, no spaces |
| `TIM_EMAIL_FROM` | `no-reply@snowit.ba` | Sender address for magic link email |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` | Transactional SMTP credentials | Bitwarden — recommend Resend.com (free tier 3,000/month, reliable delivery, nodemailer-compatible). Alternatively: Zoho SMTP (already in use for SnowIT email if configured) |

### 3.6 Allowlist Mechanism

```
TIM_ALLOWED_EMAILS.split(',').map(e => e.trim().toLowerCase())
```

Compare against `input.toLowerCase()`. Case-insensitive match. The list is read from env at middleware cold-start — no file read, no network call. Vercel injects env vars at build/runtime.

### 3.7 Endpoint and Middleware Pattern

| Concern | Path | Notes |
|---------|------|-------|
| Login page | `/tim-login.html` | Static HTML, public (no auth required — it IS the login form) |
| Auth API | `/api/tim-auth` | Vercel Serverless Function (Node.js runtime, NOT Edge). Needs nodemailer for SMTP. |
| Protected page | `/tim.html` | Intercepted by Edge Middleware |
| Middleware file | `middleware.ts` (repo root) | Matches `/tim.html` only — see matcher config below |

**middleware.ts matcher config:**
```typescript
export const config = {
  matcher: ['/tim.html'],
};
```

This is critical: the matcher must be explicit. Do NOT use `matcher: ['/((?!api|_next).*)']` — that would run auth on every page. Auth runs on `/tim.html` ONLY.

### 3.8 Logout Flow

Logout is triggered by a GET request to `/api/tim-auth?action=logout`.

The API response sets the cookie with `Max-Age=0` (immediate expiry) and redirects to `/tim-login.html?logged_out=1`.

The login page detects `?logged_out=1` and shows "You have been logged out." message.

A "Log out" link should be present on tim.html (visible at the top, near the INTERNO notice banner). This is a UX/design decision for FlowForge/Vizu — see Open Questions.

### 3.9 Cookie Expiry — Graceful Re-Auth

When the session cookie is expired (12-hour Max-Age reached), the middleware redirects to `/tim-login.html?reason=expired`. The login page shows "Your session expired. Enter your email to continue." — not a generic login prompt. The user re-enters their email, receives a new magic link, and is redirected back to `/tim.html` after verification.

The redirect target is hardcoded to `/tim.html` (not a dynamic `?next=` param). This prevents open redirect attacks where an attacker constructs `/api/tim-auth?action=verify&token=...&next=https://evil.com`.

### 3.10 Rate Limiting on Auth Endpoint

Vercel does not provide built-in rate limiting on Serverless Functions without additional infrastructure (e.g., Upstash Redis). For this threat model, implement lightweight in-memory rate limiting within the function:

**Approach:** Use a module-level Map (persists across invocations within the same Lambda instance, not across instances). Limit: 5 OTP requests per email per 10 minutes.

**Limitation acknowledged:** Module-level state is not shared across Lambda instances. Under concurrent load, rate limiting effectiveness degrades. For the expected usage (3 users, low frequency), this is acceptable. A Redis-based rate limiter is the correct long-term solution but introduces infrastructure cost and complexity out of scope for this task.

**Alternative for enumeration defense:** The API always returns the same generic message ("If this email is authorized, a link has been sent") regardless of whether the email is in the allowlist. This prevents enumeration even if rate limiting fails — an attacker learns nothing from the response.

---

## 4. Failure Modes and Recovery

### 4.1 Locked-Out Enis (email typo, expired cookie mid-sales-call)

**Detection signal:** Enis reports he cannot access `/tim.html`. He is redirected to `/tim-login.html`.

**Cause A — Email typo in allowlist:** If `TIM_ALLOWED_EMAILS` contains `ensi@snowit.ba` instead of `enis@snowit.ba`, the magic link is never sent (the allowlist check fails silently). Detection: Enis reports "I never received an email." John checks the env var in Vercel dashboard.

**Recovery A:** John updates `TIM_ALLOWED_EMAILS` in Vercel project environment variables → Vercel automatically re-deploys middleware (env var change triggers redeployment). No code change required. Time to recovery: ~2 minutes.

**Cause B — Expired cookie mid-sales-call:** Cookie Max-Age is 12 hours. If Enis started a session at 08:00 and is still in a meeting at 20:30, his cookie has expired.

**Recovery B:** Self-service. Enis enters his email on `/tim-login.html`, receives magic link, clicks it, gets a new 12-hour session. Total time: ~30-90 seconds depending on email delivery speed.

**Emergency override (if email is unavailable):** John can generate a pre-signed JWT manually:
```bash
node -e "
const { SignJWT } = require('jose');
// run this with TIM_AUTH_SECRET available in env
// outputs a cookie value to paste directly into browser DevTools
"
```
This is an emergency procedure — document it in the Bitwarden item notes for "snowit-tim-auth-secret".

### 4.2 Lost JWT Secret (rotated by mistake)

**Detection signal:** All users immediately get "invalid signature" errors on cookie verification → middleware redirects every request to `/tim-login.html` even with a valid-looking cookie. Additionally, newly issued magic-link JWTs fail verification.

**Impact:** All active sessions invalidated. All users must re-authenticate. No data loss.

**Recovery:**
1. John generates a new secret: `node -e "console.log(require('crypto').randomBytes(32).toString('base64url'))"`
2. Stores new secret in Bitwarden item "snowit-tim-auth-secret" (update existing item, keep previous value in notes with date)
3. Sets `TIM_AUTH_SECRET` in Vercel dashboard → Vercel triggers redeployment (~1 minute)
4. All users re-authenticate via magic link flow (self-service)

**Rotation schedule:** Quarterly rotation is recommended. Add to Bitwarden reminder system. Rotation does not require code changes — env var update only.

### 4.3 Middleware Crash (typo in code, unhandled exception)

**Detection signal:** All requests to `/tim.html` return Vercel's default error page (500 or edge function timeout). Alternatively, middleware may fail open (Vercel behavior on middleware crash) and serve `/tim.html` unauthenticated — this is the dangerous scenario.

**Vercel middleware fail behavior:** If Edge Middleware throws an unhandled exception, Vercel will by default return a 500 error — it does NOT serve the underlying file. The protected resource is not exposed. However, this should be confirmed by FlowForge during testing.

**Recovery:**
1. Vercel Dashboard → `johns-projects-4b43bfa9/snowit-site` → Deployments tab
2. Identify last known-good deployment (the one before the bad middleware deploy)
3. Click "..." → "Promote to Production"
4. Time to recovery: ~2-3 minutes

**Or via CLI:**
```bash
vercel rollback <DEPLOYMENT_URL> --scope johns-projects-4b43bfa9
```

**Prevention:** FlowForge must test middleware locally with `vercel dev` before deploying. The middleware should have a try/catch at the top level that redirects to `/tim-login.html` on any unexpected error, rather than crashing. This prevents accidental fail-open and avoids 500 errors.

---

## 5. Test Plan for Proveo (Subtask 3)

### 5.1 Unauth Access — Must Block

```bash
# Test 1: Unauthenticated request — must NOT return 200
curl -sI https://snowit.ba/tim.html
# EXPECTED: HTTP/2 302 with Location: /tim-login.html
# OR: HTTP/2 401 with WWW-Authenticate header
# FAIL if: HTTP/2 200 (current behavior — regression)

# Test 2: Explicit no-cookie header
curl -sI https://snowit.ba/tim.html -H "Cookie: "
# EXPECTED: Same as Test 1

# Test 3: Tampered/garbage cookie
curl -sI https://snowit.ba/tim.html -H "Cookie: tim_session=garbage.notavalidjwt.atall"
# EXPECTED: 302 redirect to /tim-login.html (invalid signature detected)

# Test 4: Expired cookie (pre-generate an expired JWT for test)
# FlowForge to provide expired test token during handoff
curl -sI https://snowit.ba/tim.html -H "Cookie: tim_session=<EXPIRED_JWT_TOKEN>"
# EXPECTED: 302 redirect to /tim-login.html?reason=expired
```

### 5.2 Header Verification

```bash
# Test 5: X-Robots-Tag present on tim.html (unauthenticated response headers still visible)
curl -sI https://snowit.ba/tim.html | grep -i "x-robots-tag"
# EXPECTED: x-robots-tag: noindex, nofollow, noarchive, nosnippet

# Test 6: Cache-Control is private/no-store
curl -sI https://snowit.ba/tim.html | grep -i "cache-control"
# EXPECTED: cache-control: no-store, no-cache, must-revalidate, private

# Test 7: X-Frame-Options
curl -sI https://snowit.ba/tim.html | grep -i "x-frame-options"
# EXPECTED: x-frame-options: DENY

# Test 8: Referrer-Policy
curl -sI https://snowit.ba/tim.html | grep -i "referrer-policy"
# EXPECTED: referrer-policy: no-referrer
```

### 5.3 Public Pages — Must Not Regress

```bash
# Test 9: Homepage still public
curl -sI https://snowit.ba/ | head -1
# EXPECTED: HTTP/2 200

# Test 10: usluge.html still public
curl -sI https://snowit.ba/usluge.html | head -1
# EXPECTED: HTTP/2 200

# Test 11: portfolio.html still public
curl -sI https://snowit.ba/portfolio.html | head -1
# EXPECTED: HTTP/2 200

# Test 12: careers.html still public
curl -sI https://snowit.ba/careers.html | head -1
# EXPECTED: HTTP/2 200

# Test 13: Login page itself is public (no auth loop)
curl -sI https://snowit.ba/tim-login.html | head -1
# EXPECTED: HTTP/2 200 (login page must not require auth to load)
```

### 5.4 Auth Flow Happy Path — Playwright

Proveo runs these as Playwright assertions (not curl — requires real browser for cookie handling):

```javascript
// Test 14: Full magic-link happy path
// Prerequisites: Playwright has access to a test email inbox (use Mailhog or Mailtrap for CI)
// OR: FlowForge provides a pre-signed session JWT for test injection

test('tim.html auth happy path', async ({ page, context }) => {
  // Step 1: Unauthenticated visit redirects to login
  await page.goto('https://snowit.ba/tim.html');
  await expect(page).toHaveURL(/tim-login\.html/);

  // Step 2: Submit allowlisted email
  await page.fill('input[type="email"]', 'enis@snowit.ba');
  await page.click('button[type="submit"]');
  await expect(page.locator('.confirmation-message')).toBeVisible();
  // Message must NOT confirm email is in allowlist specifically

  // Step 3: Simulate magic link click (inject pre-signed JWT via API)
  // FlowForge provides a /api/tim-auth?action=test-token endpoint (dev only, disabled in prod)
  // OR: Proveo manually constructs a valid JWT using TIM_AUTH_SECRET from test env
  const testToken = process.env.TIM_TEST_TOKEN; // pre-generated valid JWT
  await page.goto(`https://snowit.ba/api/tim-auth?action=verify&token=${testToken}`);

  // Step 4: Should land on tim.html with 200
  await expect(page).toHaveURL('https://snowit.ba/tim.html');
  await expect(page.locator('.notice')).toContainText('INTERNO');

  // Step 5: Cookie attributes check
  const cookies = await context.cookies('https://snowit.ba');
  const timCookie = cookies.find(c => c.name === 'tim_session');
  expect(timCookie).toBeDefined();
  expect(timCookie.httpOnly).toBe(true);
  expect(timCookie.secure).toBe(true);
  expect(timCookie.sameSite).toBe('Strict');
  expect(timCookie.path).toBe('/tim.html');
  expect(timCookie.domain).toBe('snowit.ba');
});
```

### 5.5 Bad Email Rejected

```bash
# Test 15: Non-allowlisted email via curl
curl -s -X POST https://snowit.ba/api/tim-auth \
  -H "Content-Type: application/json" \
  -d '{"action":"request-otp","email":"attacker@evil.com"}'
# EXPECTED: 200 with generic message (not 403 — 403 reveals the email is blocked)
# Body MUST contain same message as for allowlisted email: "If this email is authorized..."
# FAIL if: message differs between allowlisted and non-allowlisted email
```

### 5.6 Enumeration Defense

```bash
# Test 16: Response timing must be similar for in-list vs out-of-list emails
# Run 10 requests each, compare average response time
# EXPECTED: No statistically significant difference (< 50ms variance)
# This confirms the API does not short-circuit on allowlist check
```

---

## 6. Implementation Handoff for FlowForge (Subtask 2)

### 6.1 Files to Create

| File | Purpose | Notes |
|------|---------|-------|
| `/Users/makinja/projects/snowit-site/vercel.json` | Vercel config with header rules | Exact content in Section 2 above |
| `/Users/makinja/projects/snowit-site/middleware.ts` | Edge Middleware — cookie gate | Must use Vercel Edge Runtime (not Node.js). Use `jose` for JWT. Matcher: `/tim.html` only. |
| `/Users/makinja/projects/snowit-site/api/tim-auth.ts` | Serverless Function — OTP send/verify/logout | Node.js runtime (for nodemailer SMTP). NOT Edge Runtime. |
| `/Users/makinja/projects/snowit-site/tim-login.html` | Login form page | Static HTML. Must handle `?reason=expired` and `?logged_out=1` query params. Must NOT expose the allowlist. |

### 6.2 Dependencies to Add to package.json

```json
{
  "dependencies": {
    "jose": "^5.9.6",
    "nodemailer": "^6.10.1"
  }
}
```

Note: `nodemailer` already present. `jose` must be added. `jose` v5 is pure ESM and Edge-compatible for the middleware JWT verification. The `api/tim-auth.ts` serverless function uses Node.js runtime and can use both.

### 6.3 Vercel Env Vars to Set

Set in Vercel Dashboard → `johns-projects-4b43bfa9/snowit-site` → Settings → Environment Variables. Set for **Production** environment (not Preview/Development, unless testing):

| Variable | Value | How to Generate |
|----------|-------|----------------|
| `TIM_AUTH_SECRET` | 32-byte base64url random string | `node -e "console.log(require('crypto').randomBytes(32).toString('base64url'))"` |
| `TIM_ALLOWED_EMAILS` | `alem@alai.no,enis@snowit.ba,john@alai.no` | Literal string |
| `TIM_EMAIL_FROM` | `no-reply@snowit.ba` | Literal string |
| `SMTP_HOST` | From Bitwarden (Resend/Zoho SMTP) | Bitwarden lookup |
| `SMTP_PORT` | 587 (STARTTLS) or 465 (SSL) | Per SMTP provider |
| `SMTP_USER` | From Bitwarden | Bitwarden lookup |
| `SMTP_PASS` | From Bitwarden | Bitwarden lookup |

`TIM_AUTH_SECRET` MUST be stored in Bitwarden item name: `"snowit-tim-auth-secret"`. Item notes field must include generation date and next rotation date (quarterly: 2026-07-28).

### 6.4 Files to NOT Touch

- Any HTML file other than `tim-login.html` (new) and optionally `tim.html` (add logout button only if John approves — see Open Questions)
- `robots.txt` (currently allows all — DO NOT add `/tim.html` disallow; that discloses the path to crawlers reading robots.txt)
- `sitemap.xml` (tim.html must NOT be in sitemap — verify it is absent before deploy)
- `CNAME` — critical for Vercel domain routing, do not touch
- DNS (AWS Route 53) — out of scope
- Vercel project settings (framework, build command, output directory)

### 6.5 Pre-Deploy Checks

```bash
# From /Users/makinja/projects/snowit-site:

# 1. Verify tim.html is NOT in sitemap
grep -i "tim" /Users/makinja/projects/snowit-site/sitemap.xml
# EXPECTED: no output (tim.html absent from sitemap)

# 2. Local dev test
vercel dev
# Then: curl -sI http://localhost:3000/tim.html
# EXPECTED: 302 redirect to /tim-login.html

# 3. Build check
vercel build
# EXPECTED: no errors. Middleware compiles. vercel.json validated.

# 4. Pre-flight per ZAKON PI2 (from DEPLOY-MAP.md)
curl -sI https://snowit.ba | head -5
git log main -5 --oneline
```

### 6.6 Deploy Command

Per DEPLOY-MAP.md:
```bash
cd /Users/makinja/projects/snowit-site
vercel --prod --yes
```

Capture deployment URL from output. Provide URL to Proveo for post-deploy verification.

### 6.7 Post-Deploy Smoke Check (FlowForge responsibility before handing to Proveo)

```bash
DEPLOY_URL="https://snowit.ba"

# Auth gate active
curl -sI $DEPLOY_URL/tim.html | head -3
# Must show: HTTP/2 302

# Login page accessible
curl -sI $DEPLOY_URL/tim-login.html | head -3
# Must show: HTTP/2 200

# Public pages intact
curl -sI $DEPLOY_URL/ | head -3 && curl -sI $DEPLOY_URL/usluge.html | head -3
# Both must show: HTTP/2 200
```

---

## 7. Open Questions / Decisions for John

The following require Alem or John to decide before FlowForge can implement. FlowForge is blocked on items marked [BLOCKER].

**[BLOCKER] Q1 — SMTP provider for magic-link email:**
Which transactional email service should send the magic-link OTPs? Options:
- **Resend.com** (recommended): free tier 3,000 emails/month, excellent deliverability, simple API, nodemailer-compatible, `resend.com` from domain `@snowit.ba` requires DNS TXT record (MX/SPF update in Route 53). Requires Alem to create a Resend account and add DNS record.
- **Zoho SMTP** (if already configured for SnowIT email): no new account needed, but SMTP credentials must be in Bitwarden.
- **Gmail SMTP** (alem@alai.no or enis@snowit.ba): works but subject to Google's abuse filters for automated mail; not recommended for production.

John must select provider and ensure credentials are in Bitwarden before FlowForge can set env vars.

**[BLOCKER] Q2 — Logout button on tim.html:**
Should a "Log out" link be added to `tim.html`? The INTERNO notice banner at the top of tim.html is a natural location. This requires modifying tim.html (currently unchanged in this design). If yes: Vizu or FlowForge adds a small "Log ud" (Bosnian: "Odjavi se") link to the notice div. If no: users can clear cookies manually from browser. Recommendation: yes, add logout link. It completes the auth UX and avoids confused users.

**[NON-BLOCKER] Q3 — Session duration (12h vs 24h):**
The design specifies 12-hour cookie Max-Age (expires overnight). If Enis works evening hours or across time zones, 24 hours may be more practical. Tradeoff: longer session = longer window if cookie is somehow stolen. 12 hours is the security-recommended default. John confirm or override.

**[NON-BLOCKER] Q4 — Magic link OTP validity (15min vs 30min):**
15-minute OTP window means Enis has 15 minutes to click the link after requesting it. If his email is slow (e.g., Zoho SMTP delivery lag), this could cause frustration. Recommend 30 minutes for better UX at marginal security cost. John confirm.

**[NON-BLOCKER] Q5 — Test email for Proveo:**
Proveo needs a valid allowlisted email with a real inbox to test the full magic-link flow, OR FlowForge provides a `/api/tim-auth?action=test-token` dev endpoint (disabled in production via `NODE_ENV` check). Recommend the latter to avoid test emails in production logs. John confirm approach.

**[NON-BLOCKER] Q6 — Long-term migration to BookStack:**
BUILD-BLUEPRINT.md notes "Long-term: migrate to BookStack `snowit-tim` group (separate task, post-Akershus 2026-05-04)." This design is explicitly a short-term gate. John should ensure MC task exists for BookStack migration so this Vercel middleware is treated as temporary infrastructure, not permanent architecture.

---

## Appendix A — Attack Surface Summary (for Proveo reference)

| Attack surface | Defense in this design |
|---------------|------------------------|
| Direct URL access | Edge Middleware → 302 to login |
| Search engine indexing | X-Robots-Tag header (HTTP level) |
| Edge cache serving auth bypass | Cache-Control: no-store, private |
| Clickjacking | X-Frame-Options: DENY + CSP frame-ancestors |
| Referrer URL leakage | Referrer-Policy: no-referrer |
| Email enumeration via OTP API | Generic response regardless of allowlist match |
| OTP replay | Single-use JWT with 15-min exp; signature verification |
| CSRF on logout | SameSite: Strict cookie |
| XSS cookie theft | HttpOnly: true |
| Cookie scope bleed | Path: /tim.html; Domain: snowit.ba (exact) |

---

*Design produced by Securion / Parisa Tabriz. Read-only analysis of live site confirmed via curl 2026-04-28. No writes to production performed.*
