resource "aws_vpc" "botletics" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true
  tags = {
    Name = "botletics"
  }
}

resource "aws_subnet" "public" {
  vpc_id     = aws_vpc.botletics.id
  cidr_block = cidrsubnet(aws_vpc.botletics.cidr_block, 3, 1)
}

resource "aws_internet_gateway" "internet_gateway" {
  vpc_id = aws_vpc.botletics.id
}

resource "aws_security_group" "ec2" {
  name   = "botletics-ec2"
  vpc_id = aws_vpc.botletics.id
}

resource "aws_security_group_rule" "all_ssh_in" {
  security_group_id = aws_security_group.ec2.id
  type              = "ingress"
  protocol          = "tcp"
  from_port         = 22
  to_port           = 22
  cidr_blocks = [
    "0.0.0.0/0"
  ]
}

resource "aws_security_group_rule" "all_all_out" {
  security_group_id = aws_security_group.ec2.id
  type              = "egress"
  protocol          = "-1"
  from_port         = 0
  to_port           = 0
  cidr_blocks = [
    "0.0.0.0/0"
  ]
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
