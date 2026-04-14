output "vpc_id" {
  description = "VPC ID"
  value       = aws_vpc.main.id
}

output "public_subnet_ids" {
  description = "Public subnet IDs"
  value       = aws_subnet.public[*].id
}

output "private_subnet_ids" {
  description = "Private subnet IDs"
  value       = aws_subnet.private[*].id
}

output "bookstack_instance_ip" {
  description = "BookStack EC2 instance public IP"
  value       = aws_instance.bookstack.public_ip
}

output "planka_instance_ip" {
  description = "Planka EC2 instance public IP"
  value       = aws_instance.planka.public_ip
}

output "documenso_instance_ip" {
  description = "Documenso EC2 instance public IP"
  value       = aws_instance.documenso.public_ip
}

output "archive_s3_bucket" {
  description = "S3 bucket name for archive"
  value       = aws_s3_bucket.archive.bucket
}

output "archive_cloudfront_domain" {
  description = "CloudFront distribution domain for archive"
  value       = aws_cloudfront_distribution.archive.domain_name
}

output "route53_zone_id" {
  description = "Route53 hosted zone ID"
  value       = aws_route53_zone.main.zone_id
}

output "route53_nameservers" {
  description = "Route53 nameservers (configure these at domain registrar)"
  value       = aws_route53_zone.main.name_servers
}

output "ses_smtp_endpoint" {
  description = "SES SMTP endpoint"
  value       = "email-smtp.${var.aws_region}.amazonaws.com"
}

output "acm_certificate_arn" {
  description = "ACM certificate ARN for *.snowit.ba"
  value       = aws_acm_certificate.wildcard.arn
}

output "ssh_connection_bookstack" {
  description = "SSH connection string for BookStack"
  value       = "ssh -i ~/.ssh/${var.key_pair_name}.pem ubuntu@${aws_instance.bookstack.public_ip}"
}

output "ssh_connection_planka" {
  description = "SSH connection string for Planka"
  value       = "ssh -i ~/.ssh/${var.key_pair_name}.pem ubuntu@${aws_instance.planka.public_ip}"
}

output "ssh_connection_documenso" {
  description = "SSH connection string for Documenso"
  value       = "ssh -i ~/.ssh/${var.key_pair_name}.pem ubuntu@${aws_instance.documenso.public_ip}"
}
