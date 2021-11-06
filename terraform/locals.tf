locals {
  config                   = jsondecode(data.aws_secretsmanager_secret_version.config.secret_string)
  database_url             = "postgresql://${local.config.postgres_user}:${local.config.postgres_password}@${aws_db_instance.botletics_db.endpoint}/${local.config.postgres_db}"
  migrator_image_uri       = "${aws_ecr_repository.botletics_migrator.repository_url}@${data.aws_ecr_image.botletics_migrator.image_digest}"
  domain_validation_option = tolist(aws_acm_certificate.botletics.domain_validation_options)[0]
}
