resource "aws_security_group" "ec2" {
  name   = "botletics-ec2"
  vpc_id = aws_vpc.botletics.id
}

resource "aws_security_group_rule" "ec2_allow_ssh_in" {
  security_group_id = aws_security_group.ec2.id
  type              = "ingress"
  protocol          = "tcp"
  from_port         = 22
  to_port           = 22
  cidr_blocks = [
    "0.0.0.0/0"
  ]
}

# ? Is this needed?
resource "aws_security_group_rule" "ec2_allow_http_in" {
  security_group_id = aws_security_group.ec2.id
  type              = "ingress"
  protocol          = "tcp"
  from_port         = 80
  to_port           = 80
  cidr_blocks = [
    "0.0.0.0/0"
  ]
}

# ? Is this needed?
resource "aws_security_group_rule" "ec2_allow_https_in" {
  security_group_id = aws_security_group.ec2.id
  type              = "ingress"
  protocol          = "tcp"
  from_port         = 443
  to_port           = 443
  cidr_blocks = [
    "0.0.0.0/0"
  ]
}

resource "aws_security_group_rule" "ec2_allow_8080_in" {
  security_group_id = aws_security_group.ec2.id
  type              = "ingress"
  protocol          = "tcp"
  from_port         = 8080
  to_port           = 8080
  cidr_blocks = [
    "0.0.0.0/0"
  ]
}

resource "aws_security_group_rule" "ec2_allow_all_out" {
  security_group_id = aws_security_group.ec2.id
  type              = "egress"
  protocol          = "-1"
  from_port         = 0
  to_port           = 0
  cidr_blocks = [
    "0.0.0.0/0"
  ]
}

resource "aws_security_group" "rds" {
  name   = "botletics-rds"
  vpc_id = aws_vpc.botletics.id
}

resource "aws_security_group_rule" "rds_allow_postgres_in" {
  security_group_id = aws_security_group.rds.id
  type              = "ingress"
  protocol          = "tcp"
  from_port         = 5432
  to_port           = 5432
  cidr_blocks = [
    "0.0.0.0/0"
  ]
}

resource "aws_security_group" "migrator" {
  name   = "botletics-migrator"
  vpc_id = aws_vpc.botletics.id
}

resource "aws_security_group_rule" "migrator_allow_postgres_out" {
  security_group_id = aws_security_group.migrator.id
  type              = "egress"
  protocol          = "tcp"
  from_port         = 5432
  to_port           = 5432
  cidr_blocks = [
    "0.0.0.0/0"
  ]
}

resource "aws_security_group" "query" {
  name   = "botletics-query"
  vpc_id = aws_vpc.botletics.id
}

resource "aws_security_group_rule" "query_allow_postgres_out" {
  security_group_id = aws_security_group.query.id
  type              = "egress"
  protocol          = "tcp"
  from_port         = 5432
  to_port           = 5432
  cidr_blocks = [
    "0.0.0.0/0"
  ]
}

resource "aws_security_group" "load_balancer" {
  name   = "load-balancer"
  vpc_id = aws_vpc.botletics.id
}

resource "aws_security_group_rule" "load_balancer_allow_all_in" {
  security_group_id = aws_security_group.load_balancer.id
  type              = "ingress"
  protocol          = "-1"
  from_port         = 0
  to_port           = 0
  cidr_blocks = [
    "0.0.0.0/0"
  ]
}

// TODO: Make stricter
resource "aws_security_group_rule" "load_balancer_allow_all_out" {
  security_group_id = aws_security_group.load_balancer.id
  type              = "egress"
  protocol          = "-1"
  from_port         = 0
  to_port           = 0
  cidr_blocks = [
    "0.0.0.0/0"
  ]
}

resource "aws_security_group" "redis" {
  name   = "redis"
  vpc_id = aws_vpc.botletics.id
}

resource "aws_security_group_rule" "rds_allow_redis_in" {
  security_group_id = aws_security_group.redis.id
  type              = "ingress"
  protocol          = "tcp"
  from_port         = 6379
  to_port           = 6379
  cidr_blocks = [
    "0.0.0.0/0"
  ]
}
