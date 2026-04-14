# SES Domain Identity
resource "aws_ses_domain_identity" "main" {
  domain = var.domain_name
}

# SES Domain DKIM
resource "aws_ses_domain_dkim" "main" {
  domain = aws_ses_domain_identity.main.domain
}

# Route53 records for DKIM verification
resource "aws_route53_record" "dkim" {
  count   = 3
  zone_id = aws_route53_zone.main.zone_id
  name    = "${aws_ses_domain_dkim.main.dkim_tokens[count.index]}._domainkey.${var.domain_name}"
  type    = "CNAME"
  ttl     = 600
  records = ["${aws_ses_domain_dkim.main.dkim_tokens[count.index]}.dkim.amazonses.com"]
}

# SES Domain Mail From
resource "aws_ses_domain_mail_from" "main" {
  domain           = aws_ses_domain_identity.main.domain
  mail_from_domain = "mail.${var.domain_name}"
}

# Route53 MX record for MAIL FROM domain
resource "aws_route53_record" "mail_from_mx" {
  zone_id = aws_route53_zone.main.zone_id
  name    = aws_ses_domain_mail_from.main.mail_from_domain
  type    = "MX"
  ttl     = 600
  records = ["10 feedback-smtp.${var.aws_region}.amazonses.com"]
}

# Route53 TXT record for MAIL FROM SPF
resource "aws_route53_record" "mail_from_spf" {
  zone_id = aws_route53_zone.main.zone_id
  name    = aws_ses_domain_mail_from.main.mail_from_domain
  type    = "TXT"
  ttl     = 600
  records = ["v=spf1 include:amazonses.com ~all"]
}

# SES Email Identities (for individual emails)
resource "aws_ses_email_identity" "emails" {
  count = length(var.ses_emails)
  email = var.ses_emails[count.index]
}

# IAM user for SMTP credentials
resource "aws_iam_user" "ses_smtp" {
  name = "snowit-ses-smtp"
  path = "/system/"

  tags = {
    Name        = "snowit-ses-smtp"
    Application = "SES"
  }
}

# IAM policy for SES sending
resource "aws_iam_user_policy" "ses_smtp" {
  name = "snowit-ses-smtp-policy"
  user = aws_iam_user.ses_smtp.name

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "ses:SendEmail",
          "ses:SendRawEmail"
        ]
        Resource = "*"
      }
    ]
  })
}

# Note: SMTP credentials need to be generated manually after deployment
# using: aws iam create-access-key --user-name snowit-ses-smtp
# Then convert to SMTP credentials using AWS SES SMTP credential conversion
