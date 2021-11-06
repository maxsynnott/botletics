resource "aws_cloudfront_distribution" "www_distribution" {
  enabled = true

  origin {
    custom_origin_config {
      http_port              = "80"
      https_port             = "443"
      origin_protocol_policy = "http-only"
      origin_ssl_protocols   = ["TLSv1", "TLSv1.1", "TLSv1.2"]
    }

    domain_name = aws_s3_bucket.spa.website_endpoint
    origin_id   = "www.botletics.live"
  }

  default_cache_behavior {
    viewer_protocol_policy = "redirect-to-https"
    compress               = true
    allowed_methods        = ["GET", "HEAD"]
    cached_methods         = ["GET", "HEAD"]
    target_origin_id       = "www.botletics.live"
    min_ttl                = 0
    default_ttl            = 86400
    max_ttl                = 31536000

    # * Reconsider this
    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }
  }

  aliases = ["www.botletics.live", "botletics.live"]

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn = aws_acm_certificate_validation.botletics.certificate_arn
    ssl_support_method  = "sni-only"
  }
}
