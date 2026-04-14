# SnowIT Infrastructure - Quick Reference

Essential commands and information for day-to-day operations.

## Service URLs

| Service | URL | Admin Email |
|---------|-----|-------------|
| BookStack | https://docs.snowit.ba | admin@admin.com (change!) |
| Planka | https://planka.snowit.ba | Create on first login |
| Documenso | https://sign.snowit.ba | Create on first login |
| Archive | https://arkiva.snowit.ba | N/A |

## SSH Access

```bash
# BookStack
ssh -i ~/.ssh/snowit-deploy-key.pem ubuntu@<IP>

# Planka
ssh -i ~/.ssh/snowit-deploy-key.pem ubuntu@<IP>

# Documenso
ssh -i ~/.ssh/snowit-deploy-key.pem ubuntu@<IP>
```

Get IPs from Terraform: `terraform output`

## Common Docker Commands

```bash
# Check status
docker-compose ps

# View logs
docker-compose logs -f [service]

# Restart service
docker-compose restart [service]

# Stop all
docker-compose down

# Start all
docker-compose up -d

# Update images
docker-compose pull
docker-compose up -d
```

## Database Operations

### BookStack (MySQL)

```bash
# Backup
docker exec bookstack_db mysqldump -u root -p'PASSWORD' bookstack > backup-$(date +%Y%m%d).sql

# Restore
docker exec -i bookstack_db mysql -u root -p'PASSWORD' bookstack < backup.sql

# Access database
docker exec -it bookstack_db mysql -u root -p
```

### Planka & Documenso (PostgreSQL)

```bash
# Backup Planka
docker exec planka_db pg_dump -U planka planka > planka-backup-$(date +%Y%m%d).sql

# Backup Documenso
docker exec documenso_db pg_dump -U documenso documenso > documenso-backup-$(date +%Y%m%d).sql

# Restore
docker exec -i [db_container] psql -U [user] [database] < backup.sql

# Access database
docker exec -it planka_db psql -U planka planka
docker exec -it documenso_db psql -U documenso documenso
```

## S3 Archive Operations

```bash
# Upload file
aws s3 cp file.pdf s3://snowit-archive-324480209768/2026/documents/

# Download file
aws s3 cp s3://snowit-archive-324480209768/2026/documents/file.pdf .

# List files
aws s3 ls s3://snowit-archive-324480209768/ --recursive

# Sync folder
aws s3 sync ./local-folder/ s3://snowit-archive-324480209768/remote-folder/

# Set public read (if needed for specific file)
aws s3api put-object-acl --bucket snowit-archive-324480209768 --key path/to/file.pdf --acl public-read
```

## Nginx Operations

```bash
# Test config
sudo nginx -t

# Reload config
sudo systemctl reload nginx

# Restart
sudo systemctl restart nginx

# View logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/[service]_access.log
```

## SSL Certificate Management

```bash
# Check certificate status
sudo certbot certificates

# Renew all certificates
sudo certbot renew

# Renew specific domain
sudo certbot renew --cert-name docs.snowit.ba

# Test renewal (dry run)
sudo certbot renew --dry-run

# Force renewal
sudo certbot renew --force-renewal
```

## Terraform Operations

```bash
cd ~/projects/snowit-site/infrastructure/terraform

# Show current state
terraform show

# List resources
terraform state list

# Get outputs
terraform output

# Plan changes
terraform plan

# Apply changes
terraform apply

# Destroy specific resource
terraform destroy -target=aws_instance.bookstack

# Refresh state
terraform refresh
```

## AWS CLI Quick Commands

```bash
# List EC2 instances
aws ec2 describe-instances --region eu-central-1 --query 'Reservations[*].Instances[*].[InstanceId,PublicIpAddress,State.Name,Tags[?Key==`Name`].Value|[0]]' --output table

# List S3 buckets
aws s3 ls

# Check SES sending statistics
aws ses get-send-statistics --region eu-central-1

# List Route53 hosted zones
aws route53 list-hosted-zones

# Check CloudFront distributions
aws cloudfront list-distributions
```

## Monitoring & Health Checks

```bash
# Check service response
curl -I https://docs.snowit.ba
curl -I https://planka.snowit.ba
curl -I https://sign.snowit.ba

# Check SSL certificate expiry
echo | openssl s_client -servername docs.snowit.ba -connect docs.snowit.ba:443 2>/dev/null | openssl x509 -noout -dates

# Check disk usage
df -h

# Check memory
free -h

# Check docker disk usage
docker system df
```

## Backup Automation

Create cron jobs on each instance:

```bash
# Edit crontab
crontab -e

# Daily backup at 2 AM
0 2 * * * /opt/app/backup.sh >> /var/log/backup.log 2>&1
```

Example backup script (`/opt/app/backup.sh`):

```bash
#!/bin/bash
BACKUP_DIR="/opt/backups"
DATE=$(date +%Y%m%d)

mkdir -p $BACKUP_DIR

# Backup database
docker exec bookstack_db mysqldump -u root -p'PASSWORD' bookstack > $BACKUP_DIR/bookstack-$DATE.sql

# Upload to S3
aws s3 cp $BACKUP_DIR/bookstack-$DATE.sql s3://snowit-archive-324480209768/backups/bookstack/

# Keep only last 7 days locally
find $BACKUP_DIR -name "bookstack-*.sql" -mtime +7 -delete
```

## Troubleshooting

### Service won't start
```bash
docker-compose logs -f [service]
docker-compose down
docker-compose up -d
```

### Out of disk space
```bash
# Remove unused Docker resources
docker system prune -a
docker volume prune
```

### Database connection issues
```bash
# Check if database is running
docker-compose ps
docker-compose logs [db_service]

# Restart database
docker-compose restart [db_service]
```

### SSL certificate issues
```bash
# Check certificate
sudo certbot certificates

# Regenerate
sudo certbot delete --cert-name [domain]
sudo certbot --nginx -d [domain]
```

## Cost Monitoring

```bash
# Check current month costs
aws ce get-cost-and-usage \
  --time-period Start=2026-04-01,End=2026-04-30 \
  --granularity MONTHLY \
  --metrics BlendedCost \
  --region us-east-1

# Set up billing alerts in AWS Console
# Navigate to: Billing → Budgets → Create Budget
```

## Emergency Shutdown

If costs are running away:

```bash
# Stop all Docker services (on each instance)
docker-compose down

# Stop EC2 instances (from local machine)
aws ec2 stop-instances --instance-ids i-xxx i-yyy i-zzz --region eu-central-1

# Disable CloudFront distribution (from AWS Console)
```

## Support Contacts

- **ALAI Support**: alem@alai.no / +47 404 74 251
- **AWS Support**: AWS Console → Support Center
- **Domain Support**: [Domain registrar contact]

---

Last updated: 2026-04-14
