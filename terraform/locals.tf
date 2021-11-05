locals {
  config = jsondecode(data.aws_secretsmanager_secret_version.config.secret_string)
}
