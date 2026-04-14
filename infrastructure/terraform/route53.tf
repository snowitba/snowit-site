# Route53 Hosted Zone
resource "aws_route53_zone" "main" {
  name = var.domain_name

  tags = {
    Name = "snowit-zone"
  }
}

# A records for EC2 instances
resource "aws_route53_record" "bookstack" {
  zone_id = aws_route53_zone.main.zone_id
  name    = "docs.${var.domain_name}"
  type    = "A"
  ttl     = 300
  records = [aws_instance.bookstack.public_ip]
}

resource "aws_route53_record" "planka" {
  zone_id = aws_route53_zone.main.zone_id
  name    = "planka.${var.domain_name}"
  type    = "A"
  ttl     = 300
  records = [aws_instance.planka.public_ip]
}

resource "aws_route53_record" "documenso" {
  zone_id = aws_route53_zone.main.zone_id
  name    = "sign.${var.domain_name}"
  type    = "A"
  ttl     = 300
  records = [aws_instance.documenso.public_ip]
}

# A record (alias) for CloudFront distribution
resource "aws_route53_record" "archive" {
  zone_id = aws_route53_zone.main.zone_id
  name    = "arkiva.${var.domain_name}"
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.archive.domain_name
    zone_id                = aws_cloudfront_distribution.archive.hosted_zone_id
    evaluate_target_health = false
  }
}

# MX records for email (if needed in the future)
# resource "aws_route53_record" "mx" {
#   zone_id = aws_route53_zone.main.zone_id
#   name    = var.domain_name
#   type    = "MX"
#   ttl     = 300
#   records = ["10 inbound-smtp.${var.aws_region}.amazonaws.com"]
# }

# SPF record for SES
resource "aws_route53_record" "spf" {
  zone_id = aws_route53_zone.main.zone_id
  name    = var.domain_name
  type    = "TXT"
  ttl     = 300
  records = ["v=spf1 include:amazonses.com ~all"]
}
