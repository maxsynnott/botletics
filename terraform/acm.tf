resource "aws_acm_certificate" "botletics" {
  provider = aws.acm

  domain_name       = "*.botletics.live"
  validation_method = "DNS"

  subject_alternative_names = ["botletics.live"]
}

resource "aws_acm_certificate_validation" "botletics" {
  provider = aws.acm

  certificate_arn         = aws_acm_certificate.botletics.arn
  validation_record_fqdns = [aws_route53_record.validation_record.fqdn]
}
