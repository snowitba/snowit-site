# SnowIT AWS Infrastructure

Complete AWS infrastructure for SnowIT using Terraform and Docker.

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                        AWS Account                          │
│                      324480209768                           │
│                     eu-central-1                            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Route53: snowit.ba Hosted Zone                       │  │
│  │  ├─ docs.snowit.ba    → EC2 (BookStack)             │  │
│  │  ├─ planka.snowit.ba  → EC2 (Planka)                │  │
│  │  ├─ sign.snowit.ba    → EC2 (Documenso)             │  │
│  │  └─ arkiva.snowit.ba  → CloudFront → S3             │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ VPC: 10.0.0.0/16                                     │  │
│  │  ├─ Public Subnets (10.0.1.0/24, 10.0.2.0/24)       │  │
│  │  │   ├─ EC2: BookStack (t3.micro)                   │  │
│  │  │   ├─ EC2: Planka (t3.micro)                      │  │
│  │  │   └─ EC2: Documenso (t3.small)                   │  │
│  │  └─ Private Subnets (10.0.11.0/24, 10.0.12.0/24)    │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ S3 + CloudFront                                      │  │
│  │  └─ snowit-archive bucket                           │  │
│  │     ├─ Versioning enabled                           │  │
│  │     └─ Lifecycle: 90 days → Glacier                 │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ SES (Simple Email Service)                           │  │
│  │  ├─ Domain: snowit.ba                               │  │
│  │  ├─ DKIM verified                                   │  │
│  │  └─ Emails: info@, enis@                            │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ ACM (Certificate Manager)                            │  │
│  │  └─ *.snowit.ba wildcard certificate                │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Services Deployed

| Service | Domain | Port | Instance Type | Purpose |
|---------|--------|------|---------------|---------|
| BookStack | docs.snowit.ba | 8080 | t3.micro | Internal wiki/documentation |
| Planka | planka.snowit.ba | 8081 | t3.micro | Kanban board for clients |
| Documenso | sign.snowit.ba | 8082 | t3.small | Document signing |
| Archive | arkiva.snowit.ba | - | S3+CloudFront | File archive with CDN |

## Prerequisites

1. **AWS Account**: 324480209768 (alem@alai.no)
2. **AWS CLI**: Configured with credentials
3. **Terraform**: Version 1.0 or higher
4. **SSH Key**: For EC2 access
5. **Domain**: snowit.ba (for Route53 nameserver configuration)

## Initial Setup

### 1. Generate Secrets

```bash
cd ~/projects/snowit-site/infrastructure/scripts
./generate-secrets.sh
```

Save the output securely. You'll need these values for the next steps.

### 2. Create SSH Key Pair

```bash
# Create SSH key pair locally
ssh-keygen -t rsa -b 4096 -f ~/.ssh/snowit-deploy-key -C "snowit-deploy"

# Import to AWS
aws ec2 import-key-pair \
  --key-name snowit-deploy-key \
  --public-key-material fileb://~/.ssh/snowit-deploy-key.pub \
  --region eu-central-1
```

### 3. Configure Terraform Variables

```bash
cd ~/projects/snowit-site/infrastructure/terraform

# Copy example file
cp terraform.tfvars.example terraform.tfvars

# Edit with your values
nano terraform.tfvars
```

Fill in:
- Database passwords (from step 1)
- Encryption keys (from step 1)
- Your office/home IP for `allowed_ssh_ips`
- Verify domain name and other settings

### 4. Deploy Infrastructure

```bash
# Initialize Terraform
terraform init

# Review plan
terraform plan

# Apply (create infrastructure)
terraform apply
```

**IMPORTANT**: After `terraform apply` completes:
1. Note the Route53 nameservers from output
2. Configure these nameservers at your domain registrar (snowit.ba)
3. Wait for DNS propagation (can take 24-48 hours)

### 5. Generate SES SMTP Credentials

```bash
# Create IAM access key for SES SMTP user
aws iam create-access-key --user-name snowit-ses-smtp

# Note the AccessKeyId and SecretAccessKey
# Convert to SMTP credentials using AWS SES console or this script:
# https://docs.aws.amazon.com/ses/latest/dg/smtp-credentials.html
```

### 6. Verify SES Email Addresses

Check your email (info@snowit.ba, enis@snowit.ba) for verification emails from AWS SES and click the verification links.

## Application Deployment

After infrastructure is created and DNS is configured, deploy applications to each EC2 instance.

### SSH to Instances

```bash
# Get connection strings from terraform output
terraform output ssh_connection_bookstack
terraform output ssh_connection_planka
terraform output ssh_connection_documenso

# Example:
ssh -i ~/.ssh/snowit-deploy-key.pem ubuntu@<instance-ip>
```

### Deploy BookStack

```bash
# SSH to BookStack instance
ssh -i ~/.ssh/snowit-deploy-key.pem ubuntu@<bookstack-ip>

# Clone infrastructure repo or copy files
# Then run:
cd /opt/app
~/infrastructure/scripts/deploy-bookstack.sh
```

After deployment:
1. Configure Nginx reverse proxy: `~/infrastructure/scripts/setup-nginx.sh bookstack`
2. Access: https://docs.snowit.ba
3. Login: admin@admin.com / password
4. **CHANGE PASSWORD IMMEDIATELY**

### Deploy Planka

```bash
# SSH to Planka instance
ssh -i ~/.ssh/snowit-deploy-key.pem ubuntu@<planka-ip>

# Deploy
~/infrastructure/scripts/deploy-planka.sh
```

After deployment:
1. Configure Nginx: `~/infrastructure/scripts/setup-nginx.sh planka`
2. Access: https://planka.snowit.ba
3. Create admin account

### Deploy Documenso

```bash
# SSH to Documenso instance
ssh -i ~/.ssh/snowit-deploy-key.pem ubuntu@<documenso-ip>

# Deploy
~/infrastructure/scripts/deploy-documenso.sh
```

After deployment:
1. Configure Nginx: `~/infrastructure/scripts/setup-nginx.sh documenso`
2. Access: https://sign.snowit.ba
3. Create admin account

## S3 Archive Usage

The archive bucket is private and only accessible through CloudFront.

### Upload Files

```bash
# Upload file
aws s3 cp file.pdf s3://snowit-archive-324480209768/path/to/file.pdf

# Upload directory
aws s3 sync ./local-dir s3://snowit-archive-324480209768/remote-dir/
```

### Access Files

Files are accessible via CloudFront:
```
https://arkiva.snowit.ba/path/to/file.pdf
```

## Monitoring & Maintenance

### Check Service Status

```bash
# On each instance
sudo docker-compose ps
sudo docker-compose logs -f [service-name]
```

### Backup Strategy

1. **Databases**: Automated daily backups
```bash
# BookStack
docker exec bookstack_db mysqldump -u root -p bookstack > backup.sql

# Planka
docker exec planka_db pg_dump -U planka planka > backup.sql

# Documenso
docker exec documenso_db pg_dump -U documenso documenso > backup.sql
```

2. **S3 Archive**: Versioning enabled, automatic Glacier archival after 90 days

3. **Application Data**: Docker volumes
```bash
# List volumes
docker volume ls

# Backup volume
docker run --rm -v volume_name:/data -v $(pwd):/backup ubuntu tar czf /backup/backup.tar.gz /data
```

### Update Applications

```bash
# Pull latest images
docker-compose pull

# Restart with new images
docker-compose up -d
```

### SSL Certificate Renewal

Certificates are auto-renewed by certbot. Verify:
```bash
sudo certbot certificates
sudo certbot renew --dry-run
```

## Cost Estimation

Based on $5,000 AWS Activate credits:

| Resource | Monthly Cost (estimate) |
|----------|------------------------|
| 3x EC2 instances (t3.micro/small) | ~$25 |
| EBS volumes (70GB total) | ~$7 |
| NAT Gateway | ~$32 |
| Route53 hosted zone | $0.50 |
| S3 storage (100GB) | ~$2.50 |
| CloudFront (50GB transfer) | ~$4 |
| Data transfer | ~$10 |
| **Total** | **~$81/month** |

**Credits last**: ~61 months (5+ years)

## Security Checklist

- [ ] Changed default passwords for all applications
- [ ] Restricted SSH access to specific IPs in `terraform.tfvars`
- [ ] Enabled MFA on AWS root account
- [ ] Configured AWS CloudWatch alerts
- [ ] Regular security updates on EC2 instances
- [ ] Backup verification and restore testing
- [ ] SES SMTP credentials stored securely (not in git)

## Troubleshooting

### DNS not resolving
- Check Route53 nameservers are configured at domain registrar
- Wait 24-48 hours for DNS propagation
- Verify with: `dig snowit.ba NS`

### SSL certificate not working
- Ensure DNS is resolving before running certbot
- Check nginx configuration: `sudo nginx -t`
- View certbot logs: `sudo tail -f /var/log/letsencrypt/letsencrypt.log`

### Docker container not starting
- Check logs: `docker-compose logs -f [service]`
- Verify environment variables in `.env` file
- Check disk space: `df -h`

### SES emails not sending
- Verify email addresses in SES console
- Check SES sending limits (sandbox vs production)
- Verify SMTP credentials are correct

## Support & Contact

**Deployed by**: ALAI Holding AS (FlowForge)
**Client**: SnowIT
**Infrastructure Code**: ~/projects/snowit-site/infrastructure/
**AWS Account**: 324480209768

For support, contact: alem@alai.no

## License

Proprietary - ALAI Holding AS © 2026
