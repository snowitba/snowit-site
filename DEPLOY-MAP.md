# DEPLOY-MAP — SnowIT Website

## Infrastructure
- **Repository:** snowitba/snowit-site
- **Branch:** main
- **Platform:** Vercel
- **Project:** johns-projects-4b43bfa9/snowit-site
- **Project ID:** prj_6kWI33mxaX2PClQwe1xt1OUbSxP6
- **Live URL:** https://snowit.ba
- **DNS:** snowit.ba CNAME → Vercel Edge (76.76.21.21)

## Deploy Method
**Primary:** Vercel auto-deploy on push to main (once Git integration reconnected)
**Fallback:** `vercel --prod --yes` from project root

## Pre-Flight Checks (ZAKON PI2)
```bash
# 1. Domain health
curl -sI https://snowit.ba | head -5

# 2. Recent commits
git log main -5 --oneline

# 3. Vercel project status
vercel ls --scope johns-projects-4b43bfa9 | grep snowit-site
```

## Deploy Steps (Manual Fallback)
```bash
cd /Users/makinja/projects/snowit-site
vercel --prod --yes
```

Capture deployment URL from output (e.g., `https://snowit-site-abc123.vercel.app`)

## Post-Deploy Verification
```bash
DEPLOY_URL="<from vercel output or https://snowit.ba>"

# Serbian linguistic fixes (Vizu commit b62a482)
curl -s $DEPLOY_URL | grep -c "Pozovi Enisa"  # expect >0 (was "Asmira")
curl -s $DEPLOY_URL/i18n.js | grep -c "Šta nas"  # expect >0 (was "Što nas")
curl -s $DEPLOY_URL | grep -c "dijakritici"  # expect >0 (diacritic fix)

# HTTP success
curl -sI $DEPLOY_URL | grep "200 OK"

# Vercel serving
curl -sI $DEPLOY_URL | grep -i "x-vercel-id"
```

## Rollback
1. Vercel Dashboard → johns-projects-4b43bfa9/snowit-site → Deployments
2. Find last known-good deployment
3. Click "Promote to Production"

Or via CLI:
```bash
vercel rollback [DEPLOYMENT_URL] --scope johns-projects-4b43bfa9
```

## Git Integration (Setup)
If auto-deploy not working:
```bash
vercel git ls  # check current integration
vercel git connect snowitba/snowit-site  # reconnect
```

Or manual (requires Alem):
1. https://vercel.com/johns-projects-4b43bfa9/snowit-site/settings/git
2. Click "Connect Git Repository"
3. Select snowitba/snowit-site
4. Branch: main
5. Save

## Deployment History
| Date | Event | Status |
|------|-------|--------|
| 2026-04-23 | Vizu BS linguistic fixes (b62a482) not auto-deploying | BLOCKED |
| 2026-04-23 | FlowForge manual deploy + Git integration fix | TARGET |

## Evidence Files
- Pre-flight: capture to `/tmp/snowit-preflight-YYYYMMDD.txt`
- Post-deploy: capture to `/tmp/snowit-verify-YYYYMMDD.txt`

## Notes
- GitHub Actions `.github/workflows/static.yml` REMOVED (was deploying to inactive GH Pages)
- CNAME file MUST remain in repo root (Vercel respects it for custom domain)
- Local test server: `python3 -m http.server 8000` (no build step, static files)
