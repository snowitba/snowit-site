# SnowIT Landing Page

Professional sales-focused landing page for SnowIT (snowit.ba) - A technology company specializing in enterprise IT solutions.

## Overview

SnowIT is a technology company based in Bosnia and Herzegovina, headed by Asmir Merdžanović. They are a serious enterprise IT partner delivering solutions for healthcare, transportation, and critical infrastructure.

## Features

- **Single-page responsive design** - Mobile-first approach
- **Conversion-focused** - Multiple CTAs throughout the page
- **Professional enterprise styling** - Dark navy (#1B2A4A) + electric blue (#2E86DE) + white
- **Modern animations** - Smooth scrolling, fade-in effects, counter animations
- **Lead capture form** - Contact form with validation
- **SEO optimized** - Proper meta tags and semantic HTML

## Sections

1. **Hero** - "Technology Solutions That Move Industries Forward"
2. **About** - Company overview with stats
3. **Services** - 4 key service areas:
   - Healthcare IT Systems
   - Transportation & Railway Systems
   - Enterprise Infrastructure
   - Future-Ready Solutions
4. **Why SnowIT** - 6 competitive advantages
5. **Contact** - Lead capture form with company details
6. **Footer** - Navigation and credits

## Tech Stack

- Pure HTML5
- CSS3 with CSS Variables
- Vanilla JavaScript
- Inter font (Google Fonts)
- No frameworks or dependencies

## Files

```
snowit-site/
├── index.html      # Main HTML structure
├── styles.css      # All styling
├── script.js       # Interactions and form handling
└── README.md       # This file
```

## Deployment

### Option 1: Static Hosting (Recommended)

Deploy to any static hosting service:

**Netlify:**
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
cd snowit-site
netlify deploy --prod
```

**Vercel:**
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd snowit-site
vercel --prod
```

**GitHub Pages:**
1. Create a GitHub repository
2. Push the files
3. Enable GitHub Pages in repository settings

### Option 2: Traditional Web Hosting

1. Upload all files via FTP/SFTP
2. Ensure `index.html` is in the root directory
3. Configure domain to point to snowit.ba

### Option 3: Nginx/Apache

Copy files to web server directory:
```bash
# Nginx
sudo cp -r snowit-site/* /var/www/html/

# Apache
sudo cp -r snowit-site/* /var/www/html/
```

## Configuration

### Contact Form Integration

The contact form currently uses a placeholder submission. To integrate with a real backend:

**Option A: Formspree**
```html
<!-- In index.html, update form action -->
<form id="contactForm" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

**Option B: Custom API**
```javascript
// In script.js, replace the TODO section with:
const response = await fetch('https://your-api.snowit.ba/contact', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
});
```

**Option C: Email Service**
Use services like:
- [EmailJS](https://www.emailjs.com/)
- [SendGrid](https://sendgrid.com/)
- [Mailgun](https://www.mailgun.com/)

### Email Address

Update the email address in `index.html` (line ~450) if different:
```html
<div class="contact-item-value">info@snowit.ba</div>
```

### Analytics

Add Google Analytics or similar before closing `</head>` tag:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## Customization

### Colors

Update CSS variables in `styles.css`:
```css
:root {
    --navy: #1B2A4A;      /* Primary dark color */
    --blue: #2E86DE;      /* Accent color */
    --white: #FFFFFF;     /* Background */
}
```

### Content

All content is in `index.html`. Each section is clearly marked with comments.

### Stats

Update statistics in the About section (lines ~150-170 in index.html):
```html
<div class="stat-number">10+</div>
<div class="stat-label">Years Experience</div>
```

## Browser Support

- Chrome/Edge (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Minimal dependencies (only Google Fonts)
- Optimized CSS with efficient selectors
- Lazy loading animations
- Mobile-first responsive design

## SEO Checklist

- [x] Semantic HTML5 structure
- [x] Meta description
- [x] Proper heading hierarchy
- [x] Alt text for images (SVG icons)
- [x] Mobile responsive
- [ ] Add favicon (see below)
- [ ] Add Open Graph tags for social sharing
- [ ] Submit sitemap to search engines

### Adding Favicon

Create and add to `<head>`:
```html
<link rel="icon" type="image/png" href="favicon.png">
<link rel="apple-touch-icon" href="apple-touch-icon.png">
```

### Adding Open Graph Tags

For better social media sharing:
```html
<meta property="og:title" content="SnowIT - Technology Solutions That Move Industries Forward">
<meta property="og:description" content="Enterprise-grade IT solutions for healthcare, transportation, and critical infrastructure.">
<meta property="og:image" content="https://snowit.ba/og-image.jpg">
<meta property="og:url" content="https://snowit.ba">
<meta name="twitter:card" content="summary_large_image">
```

## Maintenance

### Regular Updates

- Review and update project statistics
- Add new case studies or services
- Update team information
- Refresh testimonials (if added)

### Monitoring

Monitor form submissions and set up:
- Email notifications for new leads
- Google Analytics conversion tracking
- Monthly traffic reports

## Support

Built by **John Eriksen** at **Basic AS**
- Website: [basicconsulting.no](https://basicconsulting.no)
- Email: john@basicconsulting.no

## License

Proprietary - © 2024 SnowIT. All rights reserved.

---

**Note:** Remember to test the contact form thoroughly before going live and set up proper email notifications for lead capture.
