# SnowIT Deployment Guide

Quick deployment guide for the SnowIT landing page.

## Pre-Deployment Checklist

- [ ] Review all content for accuracy
- [ ] Test contact form
- [ ] Set up form submission endpoint
- [ ] Add favicon
- [ ] Configure analytics
- [ ] Test on mobile devices
- [ ] Verify all links work
- [ ] Check spelling and grammar
- [ ] Optimize images (if any added)
- [ ] Set up SSL certificate

## Quick Deploy Options

### 1. Netlify (Recommended - Easiest)

**Via Netlify Drop:**
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag the `snowit-site` folder
3. Get instant URL
4. Configure custom domain in settings

**Via CLI:**
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
cd snowit-site
netlify deploy --prod

# Configure custom domain
netlify domains:add snowit.ba
```

**Custom Domain Setup:**
1. Go to Domain Settings in Netlify
2. Add `snowit.ba`
3. Update DNS records at your registrar:
   ```
   Type    Name    Value
   A       @       75.2.60.5
   CNAME   www     your-site.netlify.app
   ```

### 2. Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd snowit-site
vercel --prod

# Add custom domain
vercel domains add snowit.ba
```

### 3. GitHub Pages

```bash
# Create repository
git init
git add .
git commit -m "Initial commit - SnowIT landing page"
git branch -M main
git remote add origin https://github.com/yourusername/snowit-site.git
git push -u origin main

# Enable GitHub Pages in repository settings
# Select main branch, root folder
```

### 4. Traditional Hosting (cPanel/FTP)

**Via FTP:**
1. Connect to FTP server using FileZilla or similar
2. Navigate to `public_html` or `www` directory
3. Upload all files from `snowit-site` folder
4. Ensure `index.html` is in root
5. Set permissions if needed (755 for directories, 644 for files)

**Via cPanel:**
1. Login to cPanel
2. Go to File Manager
3. Navigate to `public_html`
4. Upload all files
5. Extract if uploaded as zip

## Post-Deployment Steps

### 1. Configure Contact Form

Choose one option:

**Option A: Formspree (Simplest)**
1. Sign up at [formspree.io](https://formspree.io)
2. Create new form
3. Get form endpoint
4. Update `index.html`:
   ```html
   <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```

**Option B: Custom Backend**
1. Set up API endpoint at `https://api.snowit.ba/contact`
2. Update `script.js` with actual endpoint
3. Configure CORS if needed
4. Set up email notifications

**Option C: Email Service (EmailJS)**
1. Sign up at [emailjs.com](https://www.emailjs.com/)
2. Create email service
3. Add template
4. Get public key
5. Update script.js with EmailJS integration

### 2. Set Up Analytics

**Google Analytics:**
```html
<!-- Add before </head> in index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### 3. SSL Certificate

**With Netlify/Vercel:** Automatic

**With Traditional Hosting:**
- Use Let's Encrypt (free)
- Or purchase SSL from hosting provider
- Force HTTPS in `.htaccess`:
  ```apache
  RewriteEngine On
  RewriteCond %{HTTPS} off
  RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
  ```

### 4. DNS Configuration

Point `snowit.ba` to your hosting:

**For Netlify:**
```
Type    Name    Value
A       @       75.2.60.5
CNAME   www     your-site.netlify.app
```

**For Traditional Hosting:**
```
Type    Name    Value
A       @       Your.Server.IP.Address
CNAME   www     snowit.ba
```

### 5. Email Setup

Configure `info@snowit.ba`:
1. Set up email hosting
2. Configure MX records
3. Create `info@snowit.ba` mailbox
4. Test form submissions arrive correctly

### 6. Performance Optimization

**Add to .htaccess (if using Apache):**
```apache
# Enable GZIP compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript
</IfModule>

# Browser caching
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType text/javascript "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
</IfModule>
```

## Testing

### Pre-Launch Testing

1. **Functionality:**
   - [ ] All navigation links work
   - [ ] Mobile menu toggles correctly
   - [ ] Contact form submits successfully
   - [ ] Form validation works
   - [ ] Smooth scrolling functions

2. **Responsive Design:**
   - [ ] Desktop (1920px, 1440px, 1024px)
   - [ ] Tablet (768px)
   - [ ] Mobile (375px, 414px)

3. **Browser Testing:**
   - [ ] Chrome
   - [ ] Firefox
   - [ ] Safari
   - [ ] Edge
   - [ ] Mobile browsers

4. **Performance:**
   - [ ] Run [PageSpeed Insights](https://pagespeed.web.dev/)
   - [ ] Check load time < 3 seconds
   - [ ] Verify mobile performance score > 80

5. **SEO:**
   - [ ] Run [Google Search Console](https://search.google.com/search-console)
   - [ ] Verify meta tags
   - [ ] Check mobile-friendliness
   - [ ] Submit sitemap

## Monitoring

### Set Up Monitoring

1. **Uptime Monitoring:**
   - [UptimeRobot](https://uptimerobot.com/) (free)
   - [StatusCake](https://www.statuscake.com/)

2. **Analytics Dashboard:**
   - Google Analytics
   - Track form submissions
   - Monitor traffic sources

3. **Form Notifications:**
   - Email alerts for new submissions
   - Slack/Discord webhook integration
   - SMS notifications for urgent leads

## Troubleshooting

### Form Not Working
- Check console for JavaScript errors
- Verify form action URL is correct
- Test network requests in DevTools
- Check CORS settings if using custom API

### Styling Issues
- Clear browser cache
- Check CSS file is loaded
- Verify file paths are correct
- Test in incognito mode

### Mobile Menu Not Opening
- Check JavaScript console for errors
- Verify script.js is loaded
- Test on actual mobile device

## Maintenance Schedule

**Weekly:**
- Check form submissions
- Monitor analytics
- Review any errors

**Monthly:**
- Update content as needed
- Review and respond to all leads
- Check for broken links
- Update statistics

**Quarterly:**
- Performance audit
- Content refresh
- Security updates
- Backup files

## Support Contacts

**Developer:** John Eriksen (Basic AS)
- Email: john@basicconsulting.no
- Website: basicconsulting.no

**Client:** SnowIT
- Email: info@snowit.ba
- Contact: Asmir Merdžanović

---

**Ready to Deploy?** Follow the checklist and choose your deployment method!
