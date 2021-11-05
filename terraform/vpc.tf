resource "aws_vpc" "botletics" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true
  tags = {
    Name = "botletics"
  }
}

resource "aws_internet_gateway" "internet_gateway" {
  vpc_id = aws_vpc.botletics.id
}

resource "aws_security_group" "ec2" {
  name   = "botletics-ec2"
  vpc_id = aws_vpc.botletics.id
}

resource "aws_security_group_rule" "allow_ssh_in" {
  security_group_id = aws_security_group.ec2.id
  type              = "ingress"
  protocol          = "tcp"
  from_port         = 22
  to_port           = 22
  cidr_blocks = [
    "0.0.0.0/0"
  ]
}

resource "aws_security_group_rule" "allow_all_out" {
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

resource "aws_security_group_rule" "allow_inbound_connections" {
  security_group_id = aws_security_group.rds.id
  type              = "ingress"
  protocol          = "tcp"
  from_port         = 5432
  to_port           = 5432
  cidr_blocks = [
    "0.0.0.0/0"
  ]
}

resource "aws_subnet" "public" {
  vpc_id     = aws_vpc.botletics.id
  cidr_block = "10.0.1.0/24"

  tags = {
    Name = "public"
  }
}

resource "aws_subnet" "private_1" {
  vpc_id            = aws_vpc.botletics.id
  cidr_block        = "10.0.4.0/24"
  availability_zone = "ap-southeast-1a"

  tags = {
    Name = "private-1"
  }
}

resource "aws_subnet" "private_2" {
  vpc_id            = aws_vpc.botletics.id
  cidr_block        = "10.0.5.0/24"
  availability_zone = "ap-southeast-1b"

  tags = {
    Name = "private-2"
  }
}

resource "aws_subnet" "private_3" {
  vpc_id            = aws_vpc.botletics.id
  cidr_block        = "10.0.6.0/24"
  availability_zone = "ap-southeast-1c"

  tags = {
    Name = "private-3"
  }
}

resource "aws_route_table" "botletics" {
  vpc_id = aws_vpc.botletics.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.internet_gateway.id
  }
}

resource "aws_route_table_association" "botletics" {
  subnet_id      = aws_subnet.public.id
  route_table_id = aws_route_table.botletics.id
}
