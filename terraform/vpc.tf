resource "aws_vpc" "botletics" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true
  tags = {
    Name = "botletics"
  }
}

resource "aws_subnet" "public_1" {
  vpc_id            = aws_vpc.botletics.id
  cidr_block        = "10.0.1.0/24"
  availability_zone = "ap-southeast-1a"

  tags = {
    Type = "public"
  }
}

resource "aws_subnet" "public_2" {
  vpc_id            = aws_vpc.botletics.id
  cidr_block        = "10.0.2.0/24"
  availability_zone = "ap-southeast-1b"

  tags = {
    Type = "public"
  }
}

resource "aws_subnet" "public_3" {
  vpc_id            = aws_vpc.botletics.id
  cidr_block        = "10.0.3.0/24"
  availability_zone = "ap-southeast-1c"

  tags = {
    Type = "public"
  }
}

resource "aws_subnet" "private_1" {
  vpc_id            = aws_vpc.botletics.id
  cidr_block        = "10.0.4.0/24"
  availability_zone = "ap-southeast-1a"

  tags = {
    Type = "private"
  }
}

resource "aws_subnet" "private_2" {
  vpc_id            = aws_vpc.botletics.id
  cidr_block        = "10.0.5.0/24"
  availability_zone = "ap-southeast-1b"

  tags = {
    Type = "private"
  }
}

resource "aws_subnet" "private_3" {
  vpc_id            = aws_vpc.botletics.id
  cidr_block        = "10.0.6.0/24"
  availability_zone = "ap-southeast-1c"

  tags = {
    Type = "private"
  }
}

resource "aws_internet_gateway" "internet_gateway" {
  vpc_id = aws_vpc.botletics.id
}

resource "aws_route_table" "botletics" {
  vpc_id = aws_vpc.botletics.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.internet_gateway.id
  }
}

resource "aws_route_table_association" "public_1" {
  subnet_id      = aws_subnet.public_1.id
  route_table_id = aws_route_table.botletics.id
}

resource "aws_route_table_association" "public_2" {
  subnet_id      = aws_subnet.public_2.id
  route_table_id = aws_route_table.botletics.id
}

resource "aws_route_table_association" "public_3" {
  subnet_id      = aws_subnet.public_3.id
  route_table_id = aws_route_table.botletics.id
}
