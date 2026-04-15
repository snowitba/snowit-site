# BookStack Deployment Report — SnowIT
**Date:** 2026-04-15
**Server:** 18.184.235.227 (eu-central-1, Frankfurt)
**Domain:** docs.snowit.ba
**Status:** ✅ DEPLOYED (HTTP) — SSL pending DNS propagation

---

## Deployment Summary

### ✅ Completed
1. **SSH Access** — Added temporary IP (46.46.251.168/32) to security group
2. **Docker Containers** — BookStack + MySQL 8.0 running
3. **Nginx Reverse Proxy** — HTTP proxy on port 80 configured
4. **Route53 DNS** — A record configured (docs.snowit.ba → 18.184.235.227)
5. **BookStack Configuration** — Database initialized, migrations complete

### ⏳ Pending
1. **DNS Propagation** — snowit.ba domain still using old nameservers
2. **SSL Certificate** — Waiting for DNS to point to Route53
3. **First Login** — Admin account creation after SSL setup

---

## Infrastructure Details

### EC2 Instance
- **Instance ID:** i-09e9ee0937f2e95ec
- **Public IP:** 18.184.235.227
- **Region:** eu-central-1 (Frankfurt)
- **Type:** t3.micro
- **SSH Key:** ~/.ssh/snowit-deploy-key.pem
- **Security Group:** sg-04e8ad297a53b381d

### Docker Services
```yaml
Services:
  - bookstack: lscr.io/linuxserver/bookstack:latest (port 8080→80)
  - bookstack_db: mysql:8.0 (internal)

Environment:
  - APP_URL: https://docs.snowit.ba
  - APP_LANG: bs (Bosnian)
  - APP_TIMEZONE: Europe/Sarajevo
  - DB_PASSWORD: [stored in .env]
  - APP_KEY: [generated and stored]
```

### Nginx Configuration
- **Config:** /etc/nginx/sites-available/bookstack
- **Proxy:** localhost:8080 → port 80
- **Max body size:** 100M (for large uploads)
- **Logs:** /var/log/nginx/bookstack_{access,error}.log

### DNS Configuration
```
Current nameservers (old):
  ns.au-globaldns.com
  ns.us-globaldns.com
  ns.eu-globaldns.ba
  ns.cn-globaldns.com
  ns.eu-globaldns.com

Route53 nameservers (new — not active yet):
  ns-1077.awsdns-06.org
  ns-1958.awsdns-52.co.uk
  ns-402.awsdns-50.com
  ns-524.awsdns-01.net

Route53 Hosted Zone: Z04121493CAJZ75TQUPIW
A Record: docs.snowit.ba → 18.184.235.227 (TTL 300)
```

---

## Access & Credentials

### Current Access (HTTP only)
```
URL: http://18.184.235.227
Status: ✅ Working (redirects to https://docs.snowit.ba/login)
```

### After DNS Propagation
```
URL: https://docs.snowit.ba
Status: ⏳ Pending DNS + SSL setup
```

### Default BookStack Credentials
```
Email: admin@admin.com
Password: password
```
⚠️ **IMPORTANT:** Change these immediately after first login!

### Database Credentials
```
Root Password: [stored in terraform.tfvars]
Database: bookstack
User: bookstack
Password: [same as BOOKSTACK_DB_PASSWORD in .env]
```

---

## Next Steps (Manual)

### 1. Update Domain Nameservers
**Action Required:** Change nameservers at domain registrar to Route53.

**Where:** Registrar control panel for snowit.ba
**From:** Current GlobalDNS nameservers
**To:**
```
ns-1077.awsdns-06.org
ns-1958.awsdns-52.co.uk
ns-402.awsdns-50.com
ns-524.awsdns-01.net
```

**Verification:**
```bash
dig NS snowit.ba +short
# Should show Route53 nameservers
```

**Propagation time:** 24-48 hours (typically faster)

---

### 2. Enable SSL Certificate
**When:** After DNS propagates to Route53

**Command (on server):**
```bash
ssh -i ~/.ssh/snowit-deploy-key.pem ubuntu@18.184.235.227
./setup-ssl.sh
```

**What it does:**
- Verifies DNS points to correct IP
- Obtains Let's Encrypt certificate via Certbot
- Configures Nginx for HTTPS
- Enables automatic HTTP→HTTPS redirect

**Script location:** /home/ubuntu/setup-ssl.sh

---

### 3. Initial BookStack Setup
**When:** After SSL is configured

**Steps:**
1. Access https://docs.snowit.ba
2. Login with default credentials (admin@admin.com / password)
3. Go to Settings → Change admin email to enis@snowit.ba
4. Change admin password
5. Configure SMTP (optional — for email notifications)
6. Create first book/documentation

---

## Verification Commands

### Check DNS Propagation
```bash
# From local machine
dig docs.snowit.ba +short
# Should return: 18.184.235.227

dig NS snowit.ba +short
# Should return Route53 nameservers
```

### Check Service Status (on server)
```bash
# SSH to server
ssh -i ~/.ssh/snowit-deploy-key.pem ubuntu@18.184.235.227

# Check Docker containers
docker ps

# Check Nginx
systemctl status nginx

# Check logs
docker logs bookstack --tail 50
tail -f /var/log/nginx/bookstack_access.log
```

### Test HTTP Access
```bash
# Before DNS propagation (via IP)
curl -I http://18.184.235.227

# After DNS propagation
curl -I http://docs.snowit.ba

# After SSL setup
curl -I https://docs.snowit.ba
```

---

## Troubleshooting

### Issue: DNS not resolving
**Cause:** Nameservers not updated or not propagated yet
**Fix:**
1. Verify nameservers at registrar
2. Wait for propagation (up to 48h)
3. Check with: `dig docs.snowit.ba @8.8.8.8`

### Issue: SSL certificate fails
**Cause:** DNS not pointing to server yet
**Fix:**
1. Verify DNS resolves correctly: `dig docs.snowit.ba +short`
2. Should return 18.184.235.227
3. Re-run `./setup-ssl.sh` after DNS propagates

### Issue: BookStack not loading
**Check:**
```bash
docker ps  # Both containers should be "Up"
docker logs bookstack  # Check for errors
curl http://localhost:8080  # Test direct access
systemctl status nginx  # Nginx should be active
```

### Issue: Can't connect via SSH
**Cause:** IP changed (current whitelist: 46.46.253.96, 46.46.251.168)
**Fix:**
```bash
# Get current IP
curl https://api.ipify.org

# Add to security group
aws ec2 authorize-security-group-ingress \
  --region eu-central-1 \
  --group-id sg-04e8ad297a53b381d \
  --ip-permissions IpProtocol=tcp,FromPort=22,ToPort=22,IpRanges="[{CidrIp=YOUR_IP/32}]"
```

---

## Maintenance

### Update BookStack
```bash
cd /home/ubuntu/bookstack
docker compose pull
docker compose up -d
```

### Backup Database
```bash
docker exec bookstack_db mysqldump -u bookstack -p bookstack > backup-$(date +%Y%m%d).sql
# Password prompt: use BOOKSTACK_DB_PASSWORD from .env
```

### Renew SSL Certificate
Automatic via Certbot cron job. Manual renewal:
```bash
sudo certbot renew
sudo systemctl reload nginx
```

### View Logs
```bash
# Application logs
docker logs bookstack -f

# Nginx access logs
tail -f /var/log/nginx/bookstack_access.log

# Nginx error logs
tail -f /var/log/nginx/bookstack_error.log
```

---

## Security Notes

1. **SSH Access** — Restricted to specific IPs in security group
2. **Database** — Not exposed publicly (Docker internal network only)
3. **HTTPS** — Will be enforced after SSL setup (HTTP→HTTPS redirect)
4. **Firewall** — Security group allows only ports 22, 80, 443
5. **Updates** — Run `docker compose pull` monthly for security patches
6. **Backups** — Consider automated DB backups to S3

---

## Files & Locations

### Local (Development)
```
~/projects/snowit-site/infrastructure/
├── docker/bookstack/
│   ├── docker-compose.yml
│   └── .env.example
├── nginx/
│   └── bookstack.conf
├── scripts/
│   ├── deploy-bookstack.sh
│   └── setup-nginx.sh
├── terraform/
│   ├── terraform.tfvars (passwords)
│   └── *.tf (infrastructure as code)
└── BOOKSTACK-DEPLOYMENT-REPORT.md (this file)
```

### Server (Production)
```
/home/ubuntu/
├── bookstack/
│   ├── docker-compose.yml
│   └── .env (APP_KEY, DB_PASSWORD)
├── nginx/
│   └── bookstack.conf
├── setup-ssl.sh (SSL setup script)
└── setup-nginx.sh (Nginx setup script — already run)

/etc/nginx/
├── sites-available/bookstack
└── sites-enabled/bookstack → ../sites-available/bookstack

Docker volumes:
- bookstack_config (BookStack app data)
- bookstack_db_data (MySQL database)
```

---

## Deployment Timeline

- **22:00 (Apr 14)** — Terraform infrastructure deployed
- **07:50 (Apr 15)** — SSH access configured
- **07:51 (Apr 15)** — Docker containers deployed
- **07:53 (Apr 15)** — BookStack initialized (migrations complete)
- **07:59 (Apr 15)** — Nginx reverse proxy configured
- **08:00 (Apr 15)** — HTTP access verified ✅
- **Pending** — DNS nameserver update (manual)
- **Pending** — SSL certificate (after DNS propagation)

---

## Support Contacts

**Client:** SnowIT (Enis)
**Email:** enis@snowit.ba
**ALAI Contact:** Alem Basic (alem@alai.no)

---

**Report Generated:** 2026-04-15 08:02 UTC
**FlowForge Deployment ID:** bookstack-snowit-20260415
