data "aws_secretsmanager_secret_version" "config" {
  secret_id = aws_secretsmanager_secret.config.id
}

data "aws_ecr_image" "botletics_migrator" {
  repository_name = aws_ecr_repository.botletics_migrator.name
  image_tag       = "latest"
}
