# BUILD-BLUEPRINT — snowit-site

**Last updated:** 2026-04-28
**Repo:** `git@github.com:snowitba/snowit-site.git`
**Local path:** `/Users/makinja/projects/snowit-site`
**Production URL:** https://snowit.ba (alias: www.snowit.ba)

## Architecture

Static HTML site. Multi-language (BS primary, EN/DE/HR via `data-i18n` attributes + JSON dictionaries).

- **Hosting:** Vercel (project `snowit-site`, ID `prj_6kWI33mxaX2PClQwe1xt1OUbSxP6`, team `johns-projects-4b43bfa9`)
- **DNS:** AWS Route 53 (NOT Cloudflare — confirmed 2026-04-28 via `dig NS snowit.ba` → `awsdns-*`)
- **CDN:** Vercel Edge Network only. NO Cloudflare layer.
- **Build:** No build step required (raw HTML/CSS/JS). Vercel uses `Output Directory: . or public`.
- **Branch mapping:** `main` → production. PRs deploy preview URLs.

## Pages

| File | URL | Public? | Notes |
|------|-----|---------|-------|
| `index.html` | `/` | Public | Landing |
| `usluge.html` | `/usluge.html` | Public | Services |
| `portfolio.html` | `/portfolio.html` | Public | Portfolio |
| `careers.html` | `/careers.html` | Public | Careers |
| `za-frizere.html` | `/za-frizere.html` | Public | Vertical: salons |
| `za-autoservise.html` | `/za-autoservise.html` | Public | Vertical: auto |
| `za-pekare.html` | `/za-pekare.html` | Public | Vertical: bakeries |
| `za-kafice.html` | `/za-kafice.html` | Public | Vertical: cafes |
| `tim.html` | `/tim.html` | **INTERNAL** | Cjenovnik + sales taktike + KPI + tim contacts. NOT in sitemap. Currently public via security-by-obscurity (HTTP 200 to anyone with URL). MC #9977 to gate. |

## Dependencies

- Google Fonts (Space Grotesk, JetBrains Mono) — loaded via `<link>` from index/tim
- No JS framework, no npm dependencies in current state
- Sitemap at `/sitemap.xml`, robots at `/robots.txt`

## Access control

- **Public pages:** No auth, no rate limiting (Vercel default).
- **`tim.html`:** Currently NO access control. Plan (MC #9977 corrected 2026-04-28):
  1. `vercel.json` headers → `X-Robots-Tag: noindex, nofollow` on `/tim.html` route
  2. Vercel Edge Middleware → email-cookie gate; allowlist: alem@alai.no, enis@snowit.ba, john@alai.no
  3. Verify: external `curl https://snowit.ba/tim.html` (no cookie) → 401 or 302 to login
  4. Long-term: migrate to BookStack `snowit-tim` group (separate task, post-Akershus 2026-05-04)

**Original plan (Cloudflare Access) was REJECTED** — domain DNS is Route 53, not CF. Cannot use CF Access without DNS migration (out of scope).

## Specialist routing

| Concern | Agent |
|---------|-------|
| Security policy (cookie scope, auth design) | Securion / Parisa Tabriz |
| Vercel config (vercel.json, Edge Middleware) | FlowForge / Kelsey Hightower |
| Verification (curl + Playwright screenshot) | Proveo / Angie Jones |
| Documentation (BookStack page) | Skillforge |

## Out of scope (do NOT modify in tim.html-gating tasks)

- DNS records (AWS Route 53 — touch only via separate infra task)
- Other public pages' headers/auth (no global vercel.json header rules without explicit task)
- Vercel project settings (root, framework, build) — already configured
- Git history rewrite or branch strategy

## Known dead artifacts

- `/Users/makinja/ALAI/web-snowit/` — STALE local repo (only `index.html`, 108 lines). `.vercel/project.json` points to deleted `web-snowit` Vercel project. Do NOT use this path. Use `/Users/makinja/projects/snowit-site/` instead.
