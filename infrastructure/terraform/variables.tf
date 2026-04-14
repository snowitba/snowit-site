variable "aws_region" {
  description = "AWS region for deployment"
  type        = string
  default     = "eu-central-1"
}

variable "environment" {
  description = "Environment name"
  type        = string
  default     = "production"
}

variable "domain_name" {
  description = "Base domain name"
  type        = string
  default     = "snowit.ba"
}

variable "vpc_cidr" {
  description = "CIDR block for VPC"
  type        = string
  default     = "10.0.0.0/16"
}

variable "public_subnet_cidrs" {
  description = "CIDR blocks for public subnets"
  type        = list(string)
  default     = ["10.0.1.0/24", "10.0.2.0/24"]
}

variable "private_subnet_cidrs" {
  description = "CIDR blocks for private subnets"
  type        = list(string)
  default     = ["10.0.11.0/24", "10.0.12.0/24"]
}

variable "allowed_ssh_ips" {
  description = "IP addresses allowed to SSH to instances"
  type        = list(string)
  default     = ["0.0.0.0/0"] # TODO: Restrict to specific IPs
}

variable "instance_type_micro" {
  description = "EC2 instance type for micro workloads"
  type        = string
  default     = "t3.micro"
}

variable "instance_type_small" {
  description = "EC2 instance type for small workloads"
  type        = string
  default     = "t3.small"
}

variable "key_pair_name" {
  description = "EC2 key pair name for SSH access"
  type        = string
  default     = "snowit-deploy-key"
}

variable "ses_emails" {
  description = "Email addresses to verify for SES"
  type        = list(string)
  default     = ["info@snowit.ba", "enis@snowit.ba"]
}

variable "s3_archive_lifecycle_glacier_days" {
  description = "Days after which to move S3 objects to Glacier"
  type        = number
  default     = 90
}

variable "bookstack_db_password" {
  description = "Database password for BookStack"
  type        = string
  sensitive   = true
}

variable "planka_db_password" {
  description = "Database password for Planka"
  type        = string
  sensitive   = true
}

variable "documenso_db_password" {
  description = "Database password for Documenso"
  type        = string
  sensitive   = true
}

variable "documenso_encryption_key" {
  description = "Encryption key for Documenso"
  type        = string
  sensitive   = true
}

variable "documenso_secondary_key" {
  description = "Secondary encryption key for Documenso"
  type        = string
  sensitive   = true
}
