locals {
  config                  = jsondecode(data.aws_secretsmanager_secret_version.config.secret_string)
  postgres_connection_url = "postgresql://${local.config.postgres_user}:${local.config.postgres_password}@${aws_db_instance.botletics_db.endpoint}/${local.config.postgres_db}"
}
