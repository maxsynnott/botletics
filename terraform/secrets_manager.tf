resource "aws_secretsmanager_secret" "config" {
  name = "config-prod"
}

data "aws_secretsmanager_secret_version" "config" {
  secret_id = aws_secretsmanager_secret.config.id
}
