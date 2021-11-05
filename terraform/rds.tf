resource "aws_db_instance" "botletics_db" {
  engine            = "postgres"
  engine_version    = "12.8"
  instance_class    = "db.t2.micro"
  allocated_storage = 20

  username = local.config.postgres_user
  password = local.config.postgres_password
  name     = local.config.postgres_db
}
