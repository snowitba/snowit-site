# SnowIT Website
**Type:** Client (Website) | **Status:** Active — production (GitHub Pages)

## About
SnowIT static website deployed on GitHub Pages. Multi-page (index, careers, portfolio, usluge). Serbian language. Inter font, custom CSS design system.

## Key Paths
- **Root:** ~/projects/snowit-site/
- index.html / careers.html / portfolio.html / usluge.html
- styles.css + variables.css — design system
- DEPLOYMENT.md — deployment procedure
- CNAME — custom domain config (DO NOT DELETE)

## Tech Stack
- Static HTML/CSS/JS
- **Vercel production deployment** (team: johns-projects-4b43bfa9, project: prj_6kWI33mxaX2PClQwe1xt1OUbSxP6)
- Inter font, CSS variables

## Deployment
- **Platform:** Vercel (snowit.ba CNAME → Vercel Edge)
- **Auto-deploy:** Push to main → Vercel build (when Git integration connected)
- **Manual:** `vercel --prod --yes` from project root
- **Full procedure:** See DEPLOY-MAP.md (ZAKON PI2 compliance)

## Rules
1. NIKAD deploy direktno — follow DEPLOY-MAP.md (pre-flight + post-deploy verification)
2. CNAME file — DO NOT DELETE (custom domain config for Vercel)
3. Language: Serbian (bokmål for comments)
4. CSS variables centralized in variables.css
5. OG image (og-image.png) for social sharing

---
> Boundaries: NEVER write outside ~/projects/snowit-site/. Global rules: ~/system/rules/
