# CloudFront Distribution for Archive
resource "aws_cloudfront_distribution" "archive" {
  enabled             = true
  is_ipv6_enabled     = true
  comment             = "SnowIT Archive CDN"
  default_root_object = "index.html"
  price_class         = "PriceClass_100" # Only US, Canada, Europe

  aliases = ["arkiva.${var.domain_name}"]

  origin {
    domain_name              = aws_s3_bucket.archive.bucket_regional_domain_name
    origin_id                = "S3-snowit-archive"
    origin_access_control_id = aws_cloudfront_origin_access_control.archive.id
  }

  default_cache_behavior {
    allowed_methods        = ["GET", "HEAD", "OPTIONS"]
    cached_methods         = ["GET", "HEAD"]
    target_origin_id       = "S3-snowit-archive"
    viewer_protocol_policy = "redirect-to-https"
    compress               = true

    forwarded_values {
      query_string = false
      headers      = ["Origin", "Access-Control-Request-Headers", "Access-Control-Request-Method"]

      cookies {
        forward = "none"
      }
    }

    min_ttl     = 0
    default_ttl = 3600
    max_ttl     = 86400
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn      = aws_acm_certificate.wildcard.arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2021"
  }

  tags = {
    Name        = "snowit-archive-cdn"
    Application = "Archive"
  }

  depends_on = [aws_acm_certificate_validation.wildcard]
}
