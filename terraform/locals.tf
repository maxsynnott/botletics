locals {
  config                                 = jsondecode(data.aws_secretsmanager_secret_version.config.secret_string)
  database_url                           = "postgresql://${local.config.postgres_user}:${local.config.postgres_password}@${aws_db_instance.botletics_db.endpoint}/${local.config.postgres_db}"
  migrator_image_uri                     = "${aws_ecr_repository.botletics_migrator.repository_url}@${data.aws_ecr_image.botletics_migrator.image_digest}"
  server_image_uri                       = "${aws_ecr_repository.botletics_server.repository_url}@${data.aws_ecr_image.botletics_server.image_digest}"
  random_bot_image_uri                   = "${aws_ecr_repository.random_bot.repository_url}@${data.aws_ecr_image.random_bot.image_digest}"
  query_image_uri                        = "${aws_ecr_repository.query.repository_url}@${data.aws_ecr_image.query.image_digest}"
  botletics_domain_validation_option     = tolist(aws_acm_certificate.botletics.domain_validation_options)[0]
  api_botletics_domain_validation_option = tolist(aws_acm_certificate.api_botletics.domain_validation_options)[0]
  redis_host                             = aws_elasticache_cluster.redis.cache_nodes[0].address
}
