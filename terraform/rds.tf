resource "aws_db_instance" "botletics_db" {
  engine            = "postgres"
  engine_version    = "12.8"
  instance_class    = "db.t2.micro"
  allocated_storage = 20

  username = local.config.postgres_user
  password = local.config.postgres_password
  name     = local.config.postgres_db

  db_subnet_group_name   = aws_db_subnet_group.botletics_private.name
  vpc_security_group_ids = [aws_security_group.rds.id]
  skip_final_snapshot    = true
}

resource "aws_db_subnet_group" "botletics_private" {
  name       = "botletics-private"
  subnet_ids = [aws_subnet.private_1.id, aws_subnet.private_2.id, aws_subnet.private_3.id]
}
