resource "aws_acm_certificate" "botletics" {
  provider = aws.acm

  domain_name       = "*.botletics.live"
  validation_method = "DNS"

  subject_alternative_names = ["botletics.live"]
}

resource "aws_acm_certificate_validation" "botletics" {
  provider = aws.acm

  certificate_arn         = aws_acm_certificate.botletics.arn
  validation_record_fqdns = [aws_route53_record.botletics_validation_record.fqdn]
}

resource "aws_acm_certificate" "api_botletics" {
  domain_name       = "api.botletics.live"
  validation_method = "DNS"
}

resource "aws_acm_certificate_validation" "api_botletics" {
  certificate_arn         = aws_acm_certificate.api_botletics.arn
  validation_record_fqdns = [aws_route53_record.api_botletics_validation_record.fqdn]
}
