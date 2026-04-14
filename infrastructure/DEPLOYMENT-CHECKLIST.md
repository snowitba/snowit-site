# SnowIT AWS Deployment Checklist

Use this checklist to ensure complete deployment of all services.

## Pre-Deployment

- [ ] AWS CLI configured with correct account (324480209768)
- [ ] Terraform installed (version 1.0+)
- [ ] Generated all secrets using `./scripts/generate-secrets.sh`
- [ ] Secrets stored securely (not in git)
- [ ] SSH key pair created and imported to AWS
- [ ] `terraform.tfvars` created and filled with correct values
- [ ] Verified domain ownership (snowit.ba)

## Infrastructure Deployment

- [ ] `terraform init` completed successfully
- [ ] `terraform plan` reviewed (no unexpected changes)
- [ ] `terraform apply` completed successfully
- [ ] Route53 nameservers noted from output
- [ ] Nameservers configured at domain registrar
- [ ] DNS propagation verified (`dig snowit.ba NS`)

## SES Configuration

- [ ] SES SMTP credentials generated
- [ ] SMTP credentials saved securely
- [ ] info@snowit.ba email verified
- [ ] enis@snowit.ba email verified
- [ ] SES moved out of sandbox (if needed)
- [ ] DKIM records verified in Route53

## BookStack (docs.snowit.ba)

- [ ] SSH connection tested to BookStack instance
- [ ] Docker and Docker Compose installed
- [ ] Infrastructure files copied to instance
- [ ] `.env` file created with database password
- [ ] `deploy-bookstack.sh` executed successfully
- [ ] BookStack accessible on http://localhost:8080
- [ ] Nginx configured with `setup-nginx.sh bookstack`
- [ ] SSL certificate obtained with certbot
- [ ] https://docs.snowit.ba accessible
- [ ] Default admin password changed
- [ ] First wiki page created (test)
- [ ] Database backup configured

## Planka (planka.snowit.ba)

- [ ] SSH connection tested to Planka instance
- [ ] Docker and Docker Compose installed
- [ ] Infrastructure files copied to instance
- [ ] `.env` file created with DB password and secret key
- [ ] `deploy-planka.sh` executed successfully
- [ ] Planka accessible on http://localhost:8081
- [ ] Nginx configured with `setup-nginx.sh planka`
- [ ] SSL certificate obtained with certbot
- [ ] https://planka.snowit.ba accessible
- [ ] Admin account created
- [ ] First board created (test)
- [ ] Database backup configured

## Documenso (sign.snowit.ba)

- [ ] SSH connection tested to Documenso instance
- [ ] Docker and Docker Compose installed
- [ ] Infrastructure files copied to instance
- [ ] `.env` file created with all required credentials
- [ ] SES SMTP credentials added to `.env`
- [ ] `deploy-documenso.sh` executed successfully
- [ ] Database migrations completed
- [ ] Documenso accessible on http://localhost:8082
- [ ] Nginx configured with `setup-nginx.sh documenso`
- [ ] SSL certificate obtained with certbot
- [ ] https://sign.snowit.ba accessible
- [ ] Admin account created
- [ ] Email sending tested
- [ ] First document signed (test)
- [ ] Database backup configured

## S3 Archive (arkiva.snowit.ba)

- [ ] S3 bucket created
- [ ] CloudFront distribution deployed
- [ ] Test file uploaded to S3
- [ ] Test file accessible via CloudFront URL
- [ ] https://arkiva.snowit.ba accessible
- [ ] Lifecycle policy verified (90 days to Glacier)
- [ ] Versioning enabled and tested

## Security Hardening

- [ ] All default passwords changed
- [ ] SSH access restricted to specific IPs
- [ ] Security groups verified (minimal ports open)
- [ ] SSL/TLS certificates valid
- [ ] Firewall rules reviewed
- [ ] AWS CloudWatch alarms configured
- [ ] Backup retention policies set

## Documentation & Handoff

- [ ] All credentials documented securely
- [ ] README.md reviewed and updated
- [ ] Backup procedures documented
- [ ] Monitoring setup documented
- [ ] Client training scheduled
- [ ] Support contact information provided
- [ ] Invoice prepared for client

## Post-Deployment Monitoring

- [ ] Week 1: Daily health checks
- [ ] Week 2-4: Every 3 days health checks
- [ ] Month 2+: Weekly health checks
- [ ] SSL certificate expiration monitoring
- [ ] AWS cost monitoring
- [ ] Backup verification

---

## Emergency Contacts

**ALAI Support**: alem@alai.no
**AWS Account**: 324480209768
**Domain Registrar**: [Add registrar details]

## Rollback Plan

If deployment fails at any stage:

1. **Terraform resources**: `terraform destroy`
2. **Individual service**: `docker-compose down` on affected instance
3. **DNS**: Revert nameservers at domain registrar
4. **Notify**: Immediately contact client and ALAI

---

**Deployment Date**: _____________
**Deployed By**: _____________
**Client Sign-off**: _____________
