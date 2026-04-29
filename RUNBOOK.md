# RUNBOOK — snowit-site

**Service:** SnowIT Corporate Website
**Production URL:** https://snowit.ba (alias: www.snowit.ba)
**Oncall:** Alem Basic (alem@alai.no, +47 404 74 251)
**Client contact:** Enis Selimovic (enis@snowit.ba, +387 62 329 076) — SnowIT CTO
**Last reviewed:** 2026-04-29
**Next review trigger:** After first production incident, or 2026-07-01 (quarterly)

---

## 1. Service Overview

SnowIT's public-facing corporate website, showcasing services, portfolio, verticals (salons, auto, bakeries, cafes), and careers. Multi-language (Bosnian/Serbian primary, English/German/Croatian via i18n.js). Hosted on Vercel (Cloudflare Pages migration rejected — DNS is AWS Route 53, not CF).

**Critical dependencies:** Vercel Edge Network, AWS Route 53 DNS, GitHub repo (snowitba/snowit-site).

**Users:** Public visitors (potential clients in Bosnia), SnowIT team (internal `/tim.html` page).

**SLO:** Paid client site — 99.5% availability, P95 latency <2s. Downtime impacts SnowIT's online presence and lead generation.

**Reference:** See [BUILD-BLUEPRINT.md](./BUILD-BLUEPRINT.md) for architecture, tech stack, access control design (tim.html gating), DNS verification (Route 53, NOT Cloudflare).

---

## 2. Dependencies

### Required Services
| Service | Purpose | Impact if down |
|---------|---------|----------------|
| Vercel Edge Network | CDN + hosting | Total outage — site unreachable |
| AWS Route 53 | DNS (snowit.ba → Vercel) | Total outage — domain does not resolve |
| GitHub (snowitba/snowit-site) | Source code repo | Degraded — cannot deploy new changes |

### Optional Services
| Service | Purpose | Impact if down |
|---------|---------|----------------|
| Google Fonts (Space Grotesk, JetBrains Mono) | Web fonts | Degraded — fallback to system fonts |
| Vercel Analytics | Visitor tracking | Degraded — no traffic metrics |

### Credentials
- **Vercel CLI token:** Retrieve from Vaultwarden item `vercel-cli-token`
- **GitHub repo access:** Alem's GitHub account (alembasic) has admin access to snowitba org
- **AWS Route 53 access:** TBD — retrieve from Vaultwarden (CEO to confirm item name)

---

## 3. Deploy Procedure

### Pre-Flight Checks (ZAKON PI2)
```bash
# 1. Verify site is currently accessible
curl -sI https://snowit.ba | head -5
# Expected: HTTP/2 200

# 2. Check recent commits (what will be deployed)
cd /Users/makinja/projects/snowit-site
git log main -5 --oneline

# 3. Verify Vercel project status
vercel ls --scope johns-projects-4b43bfa9 | grep snowit-site
# Expected: Active project with recent deployment timestamp

# 4. Check DNS still points to Vercel
dig NS snowit.ba | grep awsdns
# Expected: AWS Route 53 nameservers (NOT Cloudflare)
dig snowit.ba | grep "76.76.21.21"
# Expected: Vercel Edge IP (or CNAME to vercel-dns.com)
```

### Deploy Steps (Manual — Fallback Method)
```bash
cd /Users/makinja/projects/snowit-site

# 1. Ensure on main branch
git checkout main
git pull origin main

# 2. Deploy to Vercel production
vercel --prod --yes

# Expected output:
# 🔍  Inspect: https://vercel.com/johns-projects-4b43bfa9/snowit-site/XXXXXXXXX
# ✅  Production: https://snowit.ba [DEPLOY_TIME]

# Copy deployment URL for verification
```

**Automatic Deploy (Preferred):**
If Vercel Git integration is connected (main branch auto-deploy):
```bash
# Push to main triggers auto-deploy
git push origin main

# Monitor deployment:
vercel ls --scope johns-projects-4b43bfa9 | head -5
# Check Vercel dashboard: https://vercel.com/johns-projects-4b43bfa9/snowit-site/deployments
```

### Post-Deploy Verification (ZAKON PI2)
```bash
DEPLOY_URL="https://snowit.ba"  # Or use Vercel preview URL from deploy output

# 1. HTTP success
curl -sI $DEPLOY_URL | grep "200"
# Expected: HTTP/2 200 OK

# 2. Vercel serving (not stale cache)
curl -sI $DEPLOY_URL | grep -i "x-vercel-id"
# Expected: x-vercel-id: XXXXX

# 3. Serbian linguistic fixes (if recent deploy includes Vizu commit b62a482)
curl -s $DEPLOY_URL | grep -c "Pozovi Enisa"
# Expected: >0 (was "Asmira" before fix)

curl -s $DEPLOY_URL/i18n.js | grep -c "Šta nas"
# Expected: >0 (was "Što nas" before fix)

# 4. Visual smoke test
open $DEPLOY_URL
# Manually verify:
# - Landing page loads (hero section, SnowIT logo)
# - Navigation works (Usluge, Portfolio, Careers links)
# - Language switcher (BS/EN/DE/HR buttons)
# - tim.html NOT in public navigation (should be secret URL)

# 5. tim.html access control (if MC #9977 implemented)
curl -s https://snowit.ba/tim.html | grep "401\|302\|login"
# Expected: 401 Unauthorized OR 302 redirect to login (if gated)
# Current state (pre-MC #9977): 200 OK (security-by-obscurity, no auth)

# 6. No console errors (browser DevTools)
# Open https://snowit.ba in browser → F12 Console
# Expected: No red errors (JS load, CORS, 404s)
```

**Evidence:** Capture pre-flight + post-deploy verification to `/tmp/snowit-deploy-YYYYMMDD.txt`.

---

## 4. Common Failure Modes

| Alert / Symptom | Diagnosis | Fix | Escalation |
|----------------|-----------|-----|------------|
| **Site unreachable (timeout)** | Vercel Edge down OR DNS failure | 1. Check Vercel status: https://www.vercel-status.com/<br/>2. Check DNS: `dig snowit.ba`<br/>3. If DNS issue → check AWS Route 53 console | CEO → AWS support (DNS) OR Vercel support (Edge) |
| **500 Internal Server Error** | Vercel Edge Middleware crash (if tim.html auth deployed) | 1. Check Vercel deployment logs: `vercel logs --scope johns-projects-4b43bfa9`<br/>2. Check `middleware.ts` syntax errors<br/>3. Rollback deploy (see Section 5) | Codecraft (middleware code fix) |
| **DNS resolves to wrong IP** | Route 53 record changed or Vercel IP migration | 1. Check DNS: `dig snowit.ba`<br/>2. Compare to Vercel project settings (Custom Domains)<br/>3. Update Route 53 A/CNAME record if needed | CEO → AWS Route 53 console |
| **tim.html publicly accessible (should be gated)** | MC #9977 not deployed yet OR auth bypass | 1. Verify `vercel.json` headers for `/tim.html`<br/>2. Verify Edge Middleware deployed<br/>3. Test: `curl -s https://snowit.ba/tim.html` (should NOT return 200) | Securion (auth bypass investigation) |
| **Slow page loads (>5s)** | Vercel Edge cold start OR large JS bundle | 1. Check bundle size: `ls -lh *.js *.css`<br/>2. Check Vercel Analytics for TTFB<br/>3. Optimize images (convert to WebP) or lazy-load JS | Vizu (performance optimization) |
| **Language switcher broken** | i18n.js load failure OR JSON parse error | 1. Check browser console: `F12 → Console`<br/>2. Check i18n.js syntax: `node -c i18n.js`<br/>3. Check JSON dictionaries (BS, EN, DE, HR keys) | Codecraft (i18n bug fix) |
| **Contact form not working** | Form submission script broken OR email delivery failure | 1. Check browser console for JS errors<br/>2. Check Vercel Functions logs (if form uses API route)<br/>3. Verify email delivery (spam folder) | Codecraft (form logic) OR Securion (email deliverability) |

---

## 5. Rollback Procedure

**Scenario:** New deploy broke site (500 errors, layout broken, tim.html leaked).

**Rollback steps (< 3 minutes):**

### Method 1: Vercel Dashboard (GUI)
```bash
# 1. Go to Vercel dashboard
open https://vercel.com/johns-projects-4b43bfa9/snowit-site/deployments

# 2. Find last known-good deployment (green checkmark, before breakage)
# 3. Click "..." menu → "Promote to Production"
# 4. Confirm → site rolls back immediately
# 5. Verify: curl -sI https://snowit.ba | grep "200"
```

### Method 2: Vercel CLI
```bash
# 1. List recent deployments
vercel ls --scope johns-projects-4b43bfa9

# Example output:
# Age   Deployment                 Status   Duration
# 2m    snowit-site-abc123         Ready    15s
# 1h    snowit-site-xyz789         Ready    12s  ← Last known good
# 2h    snowit-site-old456         Ready    10s

# 2. Rollback to previous deployment
vercel rollback snowit-site-xyz789.vercel.app --scope johns-projects-4b43bfa9

# 3. Verify
curl -sI https://snowit.ba | grep "200"
```

### Method 3: Git Revert + Redeploy
```bash
cd /Users/makinja/projects/snowit-site

# 1. Identify bad commit
git log main -10 --oneline

# 2. Revert to previous commit
git checkout COMMIT_HASH_BEFORE_DEPLOY

# OR: Create revert commit
git revert COMMIT_HASH_THAT_BROKE_IT --no-edit

# 3. Redeploy
vercel --prod --yes

# 4. Verify
curl -sI https://snowit.ba | grep "200"
```

**Escalation:** If rollback fails (all recent deploys broken), escalate to CEO + Codecraft. Consider deploying from backup branch or archived snapshot.

---

## 6. Database Access

**N/A.** Static site. No database. Content is in HTML files.

---

## 7. Log Access

### Vercel Deployment Logs (Web UI)
```bash
# Open Vercel dashboard
open https://vercel.com/johns-projects-4b43bfa9/snowit-site/deployments

# Click on deployment → "Build Logs" tab
# Shows build output, errors, warnings
```

### Vercel Runtime Logs (CLI)
```bash
# Real-time logs (if Edge Functions or Middleware deployed)
vercel logs --scope johns-projects-4b43bfa9 --follow

# Last 100 log lines
vercel logs --scope johns-projects-4b43bfa9 --limit 100
```

### DNS Query Logs (AWS Route 53)
**TBD:** CEO to confirm AWS console access. Route 53 query logging (if enabled) shows DNS resolution requests.

### Analytics (Vercel Dashboard)
```bash
# Open Vercel Analytics
open https://vercel.com/johns-projects-4b43bfa9/snowit-site/analytics

# Metrics:
# - Unique visitors (last 7/30 days)
# - Top pages (/, /usluge.html, /portfolio.html)
# - Geographic distribution (Bosnia, Croatia, Serbia)
# - Referrers (Google, direct, social)
```

---

## 8. Escalation Contacts

| Role | Contact | When to escalate |
|------|---------|------------------|
| **Primary oncall (ALAI)** | Alem Basic (alem@alai.no, +47 404 74 251) | All production incidents (site down, deploy failures) |
| **Client contact (SnowIT)** | Enis Selimovic (enis@snowit.ba, +387 62 329 076) | P0 incidents (>5 min downtime), security breaches (tim.html leak) |
| **Fallback (ALAI)** | Edita Selimovic (edita@alai.no, phone TBD) | If Alem unreachable >15 min |
| **Code fixes** | Codecraft agent (via John) | Bugs, JS errors, i18n issues |
| **Security issues** | Securion agent (via John) | tim.html access control, XSS, CSRF |
| **Design issues** | Vizu agent (via John) | Layout broken, font loading, mobile responsive |
| **Infrastructure** | FlowForge agent (via John) | Vercel config, Edge Middleware, Route 53 DNS |

**P0 definition:** Site unreachable for >5 minutes (confirmed by external monitoring or client report). Impacts SnowIT's online presence and lead generation.

**P1 definition:** Degraded service (slow, partial outage), tim.html publicly accessible, language switcher broken on one language.

---

## 9. Admin Procedures

### Update Content (Edit HTML)
```bash
cd /Users/makinja/projects/snowit-site

# 1. Checkout main branch
git checkout main
git pull origin main

# 2. Edit HTML file (e.g., add new service to usluge.html)
# Use code editor (VSCode, vim, etc.)

# 3. Test locally
python3 -m http.server 8000
open http://localhost:8000

# 4. Commit changes
git add usluge.html
git commit -m "Add new service: Cloud Infrastructure"

# 5. Push to GitHub
git push origin main

# 6. Auto-deploy triggers (if Git integration connected)
# OR manually: vercel --prod --yes
```

### Update i18n Translations (Add New Language)
```bash
cd /Users/makinja/projects/snowit-site

# 1. Edit i18n.js
# Add new language key (e.g., "IT" for Italian)
# Add translations for all keys

# 2. Test language switcher
python3 -m http.server 8000
open http://localhost:8000
# Click language buttons (BS, EN, DE, HR, IT)

# 3. Deploy (see above)
```

### Add New Page
```bash
cd /Users/makinja/projects/snowit-site

# 1. Create new HTML file (copy template from index.html)
cp index.html new-page.html

# 2. Edit content (replace hero, sections, etc.)

# 3. Add to navigation (edit index.html, usluge.html, etc.)
# <a href="/new-page.html">New Page</a>

# 4. Add to sitemap.xml (if public page)
# <url><loc>https://snowit.ba/new-page.html</loc></url>

# 5. Deploy (see above)
```

### Update vercel.json (Headers, Redirects, Rewrites)
```bash
cd /Users/makinja/projects/snowit-site

# 1. Edit vercel.json
# Example: Add HSTS header
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Strict-Transport-Security",
          "value": "max-age=31536000; includeSubDomains"
        }
      ]
    }
  ]
}

# 2. Test locally (vercel.json only applies on Vercel, not local python server)
# Deploy to preview first:
vercel  # Without --prod flag → preview URL

# 3. Verify preview URL:
curl -sI https://snowit-site-PREVIEW.vercel.app | grep "Strict-Transport-Security"

# 4. Deploy to production:
vercel --prod --yes
```

### Reconnect Vercel Git Integration (If Auto-Deploy Broken)
```bash
# Method 1: Vercel CLI
vercel git ls  # Check current integration
vercel git connect snowitba/snowit-site  # Reconnect

# Method 2: Vercel Dashboard (requires Alem's Vercel account)
# 1. Open https://vercel.com/johns-projects-4b43bfa9/snowit-site/settings/git
# 2. Click "Connect Git Repository"
# 3. Select snowitba/snowit-site
# 4. Branch: main
# 5. Save
# 6. Test: push to main → verify auto-deploy triggered
```

### Check Vercel Project Settings
```bash
# List all projects
vercel ls --scope johns-projects-4b43bfa9

# Inspect project details
vercel inspect snowit-site --scope johns-projects-4b43bfa9

# Output: Project ID, Git repo, build settings, environment variables
```

---

## 10. Monitoring & Dashboards

### Current State: BetterStack (TBD)
**Status:** BetterStack monitoring NOT yet configured for snowit.ba.

**Recommended setup (MC task TBD):**
1. BetterStack HTTP check on https://snowit.ba (every 1 min)
2. Alert on status code ≠ 200 or response time >5s
3. Alert destination: Email to alem@alai.no + Telegram alert via PA layer
4. SMS to Enis (enis@snowit.ba) for P0 incidents (>5 min downtime)

### Vercel Analytics (Live)
```bash
# Access via Vercel dashboard
open https://vercel.com/johns-projects-4b43bfa9/snowit-site/analytics

# Metrics tracked:
# - Page views (total, per page)
# - Unique visitors (last 7/30 days)
# - Geographic distribution (country-level)
# - Referrers (Google, direct, social media)
# - Device types (desktop, mobile, tablet)
```

### Manual Health Check (Interim Solution)
```bash
# From any machine
curl -sI https://snowit.ba | grep "200"
# Expected: HTTP/2 200 OK

# Check latency
time curl -s https://snowit.ba > /dev/null
# Expected: <2 seconds (P95 SLO)

# Check from external location (not ALAI network)
# Use online tool: https://tools.pingdom.com or https://www.webpagetest.org
```

**ESCALATE to Proveo:** Set up BetterStack monitoring for snowit.ba (MC task, priority H — paid client site).

---

## 11. Known Issues & Workarounds

### Issue: tim.html publicly accessible (no auth)
**Impact:** Internal pricing + sales tactics exposed to anyone with URL.
**Workaround:** Security-by-obscurity (URL not in sitemap, not linked from public pages).
**Permanent fix:** MC #9977 — deploy Vercel Edge Middleware with email-cookie gate. Deadline: TBD.

### Issue: No automated monitoring (BetterStack not configured)
**Impact:** Downtime may go unnoticed until client reports it.
**Workaround:** Manual curl checks + Vercel status page subscription.
**Permanent fix:** Set up BetterStack (MC task, priority H).

### Issue: DNS not on Cloudflare (cannot use Cloudflare Access)
**Impact:** Cannot use Cloudflare Access for tim.html gating (original plan rejected).
**Workaround:** Vercel Edge Middleware for auth (see MC #9977 corrected scope).
**Permanent fix:** N/A — Vercel Middleware is the correct approach for Route 53 DNS + Vercel hosting.

### Issue: No build step (raw HTML/CSS/JS)
**Impact:** Cannot use modern frameworks (React, Next.js) without refactor.
**Workaround:** Static HTML is sufficient for current needs. Fast, simple, no dependencies.
**Permanent fix:** If SnowIT requests dynamic features (CMS, contact form backend), migrate to Next.js (major project, out of scope).

### Issue: MX records missing for @snowit.ba email
**Impact:** Email sent to @snowit.ba bounces. Enis uses enis@snowit.ba, but that address does not work.
**Workaround:** Use enis's personal email or phone for client contact.
**Permanent fix:** ESCALATE to CEO → configure MX records in AWS Route 53 (point to Google Workspace, Microsoft 365, or Proton Mail). MC task TBD.

---

## 12. Next Review

**Trigger events for runbook update:**
1. First production incident (site down, deploy failure)
2. tim.html auth deployed (MC #9977 completed)
3. BetterStack monitoring enabled
4. MX records configured (email working)
5. Quarterly review: 2026-07-01

**Owner:** Skillforge (runbook maintenance) + Proveo (incident postmortems) + Vizu (design/UX updates)

---

**Sources:** BUILD-BLUEPRINT.md, DEPLOY-MAP.md, CLAUDE.md, vercel.json, ALAI-PROJECT-BLUEPRINT.md Section 4.7, MC #9977 context (tim.html gating)

**Evidence of gaps:** tim.html not gated yet (MC #9977 pending). BetterStack monitoring not configured. MX records missing. This runbook documents the current state (warts and all) and provides paths to fix known issues.

**Client impact:** This is a LIVE client site (SnowIT). Downtime or security breach (tim.html leak) directly impacts ALAI's reputation with SnowIT. Treat all incidents as P0 until resolved.
