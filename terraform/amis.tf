data "aws_ami" "ecs" {
  most_recent = true

  filter {
    name = "name"
    values = [
      "amzn-ami-*-amazon-ecs-optimized"
    ]
  }

  owners = [
    "amazon" # Only official images
  ]
}
