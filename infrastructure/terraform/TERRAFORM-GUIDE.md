# Terraform Deployment Guide

Step-by-step guide for deploying SnowIT infrastructure with Terraform.

## Prerequisites Checklist

- [ ] AWS CLI installed and configured
- [ ] Terraform installed (v1.0+)
- [ ] AWS credentials configured (`aws configure`)
- [ ] SSH key pair created
- [ ] Secrets generated (`../scripts/generate-secrets.sh`)
- [ ] `terraform.tfvars` created from example

## Initial Setup

### 1. Configure AWS CLI

```bash
aws configure --profile snowit

# Enter:
# AWS Access Key ID: [your-access-key]
# AWS Secret Access Key: [your-secret-key]
# Default region: eu-central-1
# Default output format: json

# Verify
aws sts get-caller-identity --profile snowit
```

### 2. Create and Import SSH Key

```bash
# Generate key pair
ssh-keygen -t rsa -b 4096 -f ~/.ssh/snowit-deploy-key -C "snowit-deploy"

# Import to AWS
aws ec2 import-key-pair \
  --key-name snowit-deploy-key \
  --public-key-material fileb://~/.ssh/snowit-deploy-key.pub \
  --region eu-central-1 \
  --profile snowit

# Verify
aws ec2 describe-key-pairs --key-name snowit-deploy-key --region eu-central-1 --profile snowit
```

### 3. Generate Secrets

```bash
cd ../scripts
./generate-secrets.sh > secrets.txt

# Review and save securely
cat secrets.txt

# DO NOT COMMIT secrets.txt to git
# Store in password manager (Bitwarden, 1Password, etc.)
```

### 4. Create terraform.tfvars

```bash
# Copy example
cp terraform.tfvars.example terraform.tfvars

# Edit with your values
nano terraform.tfvars
```

Required values:
- `bookstack_db_password`: From secrets.txt
- `planka_db_password`: From secrets.txt
- `documenso_db_password`: From secrets.txt
- `documenso_encryption_key`: From secrets.txt
- `documenso_secondary_key`: From secrets.txt
- `allowed_ssh_ips`: Your office/home IP (get from: `curl ifconfig.me`)

## Deployment Steps

### 1. Initialize Terraform

```bash
terraform init
```

Expected output:
```
Terraform has been successfully initialized!
```

### 2. Validate Configuration

```bash
terraform validate
```

Expected output:
```
Success! The configuration is valid.
```

### 3. Review Plan

```bash
terraform plan -out=tfplan
```

Review the plan carefully. Expected resources to create:
- VPC with subnets and routing (~10 resources)
- 3 EC2 instances
- Security groups
- S3 bucket
- CloudFront distribution
- Route53 hosted zone and records
- SES domain and email identities
- ACM certificate

**Total**: ~40-50 resources

### 4. Apply Infrastructure

```bash
terraform apply tfplan
```

This will take 10-15 minutes. Key stages:
1. VPC and networking (2-3 min)
2. EC2 instances (3-5 min)
3. ACM certificate validation (2-5 min)
4. CloudFront distribution (5-10 min)

### 5. Save Outputs

```bash
# Save all outputs
terraform output > ../terraform-outputs.txt

# View specific outputs
terraform output route53_nameservers
terraform output bookstack_instance_ip
terraform output planka_instance_ip
terraform output documenso_instance_ip
```

## Post-Deployment Tasks

### 1. Configure DNS

```bash
# Get nameservers
terraform output route53_nameservers

# Example output:
# [
#   "ns-123.awsdns-12.com",
#   "ns-456.awsdns-45.net",
#   "ns-789.awsdns-78.org",
#   "ns-012.awsdns-01.co.uk"
# ]
```

**Action Required**: Update nameservers at your domain registrar (snowit.ba)

### 2. Verify DNS Propagation

```bash
# Check nameservers
dig snowit.ba NS

# Check A records (after propagation)
dig docs.snowit.ba
dig planka.snowit.ba
dig sign.snowit.ba
dig arkiva.snowit.ba

# Or use online tool:
# https://www.whatsmydns.net/
```

**Wait time**: 2-48 hours (usually 2-6 hours)

### 3. Generate SES SMTP Credentials

```bash
# Create IAM access key
aws iam create-access-key \
  --user-name snowit-ses-smtp \
  --profile snowit

# Save the output (AccessKeyId and SecretAccessKey)
# Convert to SMTP credentials using AWS SES documentation:
# https://docs.aws.amazon.com/ses/latest/dg/smtp-credentials.html
```

### 4. Verify SES Email Addresses

1. Check email inbox for info@snowit.ba
2. Check email inbox for enis@snowit.ba
3. Click verification links in both emails

Or resend verification:
```bash
aws ses verify-email-identity \
  --email-address info@snowit.ba \
  --region eu-central-1 \
  --profile snowit
```

## Common Terraform Commands

### Viewing State

```bash
# List all resources
terraform state list

# Show specific resource
terraform state show aws_instance.bookstack

# Show all outputs
terraform output

# Show specific output
terraform output bookstack_instance_ip
```

### Making Changes

```bash
# Plan changes
terraform plan

# Apply changes
terraform apply

# Apply specific resource
terraform apply -target=aws_route53_record.bookstack

# Refresh state from AWS
terraform refresh
```

### Resource Management

```bash
# Taint resource (force recreation)
terraform taint aws_instance.bookstack

# Untaint resource
terraform untaint aws_instance.bookstack

# Import existing resource
terraform import aws_instance.bookstack i-1234567890abcdef0

# Remove resource from state (doesn't delete in AWS)
terraform state rm aws_instance.bookstack
```

### Destruction

```bash
# Plan destruction (don't do this unless you mean it!)
terraform plan -destroy

# Destroy specific resource
terraform destroy -target=aws_instance.bookstack

# Destroy ALL infrastructure (WARNING!)
terraform destroy
```

## Troubleshooting

### Error: Invalid AWS credentials

```bash
# Verify credentials
aws sts get-caller-identity --profile snowit

# Reconfigure
aws configure --profile snowit
```

### Error: Key pair not found

```bash
# List key pairs
aws ec2 describe-key-pairs --region eu-central-1 --profile snowit

# Import key pair again
aws ec2 import-key-pair \
  --key-name snowit-deploy-key \
  --public-key-material fileb://~/.ssh/snowit-deploy-key.pub \
  --region eu-central-1 \
  --profile snowit
```

### Error: ACM certificate validation timeout

**Cause**: DNS not configured or not propagated

**Solution**:
1. Verify Route53 nameservers are set at registrar
2. Wait for DNS propagation
3. Run `terraform apply` again (it will continue validation)

### Error: Resource already exists

```bash
# Import existing resource
terraform import [resource_type].[resource_name] [resource_id]

# Example:
terraform import aws_instance.bookstack i-1234567890abcdef0
```

### Error: State lock

```bash
# If terraform crashed and left a lock
# ONLY use if you're sure no other terraform process is running
terraform force-unlock [LOCK_ID]
```

## State Management

### Backup State

```bash
# Backup current state
cp terraform.tfstate terraform.tfstate.backup-$(date +%Y%m%d-%H%M%S)

# List backups
ls -lh terraform.tfstate.backup-*
```

### Remote State (Recommended for Production)

To enable remote state in S3:

```bash
# Create S3 bucket for state
aws s3 mb s3://snowit-terraform-state-324480209768 --region eu-central-1 --profile snowit

# Enable versioning
aws s3api put-bucket-versioning \
  --bucket snowit-terraform-state-324480209768 \
  --versioning-configuration Status=Enabled \
  --profile snowit

# Update main.tf backend configuration:
# backend "s3" {
#   bucket = "snowit-terraform-state-324480209768"
#   key    = "infrastructure/terraform.tfstate"
#   region = "eu-central-1"
# }

# Migrate state
terraform init -migrate-state
```

## Cost Tracking

```bash
# Estimate costs using AWS CLI
aws ce get-cost-and-usage \
  --time-period Start=2026-04-01,End=2026-04-30 \
  --granularity MONTHLY \
  --metrics BlendedCost \
  --region us-east-1 \
  --profile snowit

# Or use external tool: infracost
# https://www.infracost.io/
```

## Security Best Practices

1. **Never commit**:
   - `terraform.tfvars` (contains passwords)
   - `terraform.tfstate` (contains sensitive data)
   - `.env` files
   - SSH private keys

2. **Always**:
   - Use strong passwords (generated)
   - Restrict SSH to specific IPs
   - Enable MFA on AWS account
   - Review security groups regularly
   - Rotate credentials quarterly

3. **State file**:
   - Keep backups
   - Use remote state (S3) with encryption
   - Enable state locking (DynamoDB)
   - Never edit manually

## Useful AWS CLI Commands

```bash
# List EC2 instances
aws ec2 describe-instances \
  --region eu-central-1 \
  --profile snowit \
  --query 'Reservations[*].Instances[*].[InstanceId,PublicIpAddress,State.Name,Tags[?Key==`Name`].Value|[0]]' \
  --output table

# Check S3 bucket
aws s3 ls s3://snowit-archive-324480209768/ --profile snowit

# Check Route53 records
aws route53 list-resource-record-sets \
  --hosted-zone-id $(terraform output -raw route53_zone_id) \
  --profile snowit

# Check CloudFront distribution
aws cloudfront list-distributions --profile snowit

# Check SES sending statistics
aws ses get-send-statistics --region eu-central-1 --profile snowit
```

## Getting Help

```bash
# Terraform help
terraform -help
terraform [command] -help

# AWS CLI help
aws help
aws [service] help
aws [service] [command] help

# Show Terraform version
terraform version

# Show AWS CLI version
aws --version
```

## Documentation Links

- Terraform AWS Provider: https://registry.terraform.io/providers/hashicorp/aws/latest/docs
- AWS CLI Reference: https://docs.aws.amazon.com/cli/
- AWS EC2: https://docs.aws.amazon.com/ec2/
- AWS S3: https://docs.aws.amazon.com/s3/
- AWS Route53: https://docs.aws.amazon.com/route53/
- AWS SES: https://docs.aws.amazon.com/ses/

---

**Last Updated**: 2026-04-14
**Terraform Version**: 1.0+
**AWS Provider Version**: 5.100.0
