resource "aws_route53_zone" "botletics" {
  name = "botletics.live"
}

resource "aws_route53_record" "botletics_validation_record" {
  zone_id = aws_route53_zone.botletics.id
  ttl     = "300"
  type    = local.botletics_domain_validation_option.resource_record_type
  name    = local.botletics_domain_validation_option.resource_record_name
  records = [local.botletics_domain_validation_option.resource_record_value]
}

resource "aws_route53_record" "www" {
  zone_id = aws_route53_zone.botletics.id
  name    = "www.botletics.live"
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.www_distribution.domain_name
    zone_id                = aws_cloudfront_distribution.www_distribution.hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "root" {
  zone_id = aws_route53_zone.botletics.id
  name    = ""
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.www_distribution.domain_name
    zone_id                = aws_cloudfront_distribution.www_distribution.hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "api_botletics_validation_record" {
  zone_id = aws_route53_zone.botletics.id
  ttl     = "300"
  type    = local.api_botletics_domain_validation_option.resource_record_type
  name    = local.api_botletics_domain_validation_option.resource_record_name
  records = [local.api_botletics_domain_validation_option.resource_record_value]
}

resource "aws_route53_record" "api" {
  zone_id = aws_route53_zone.botletics.id
  name    = "api.botletics.live"
  type    = "A"

  alias {
    name                   = aws_lb.botletics.dns_name
    zone_id                = aws_lb.botletics.zone_id
    evaluate_target_health = false
  }
}
