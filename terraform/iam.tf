resource "aws_iam_instance_profile" "ecs-ec2" {
  name = "ecs-ec2"
  role = data.aws_iam_role.ecs_instance_role.name
}

data "aws_iam_role" "ecs_instance_role" {
  name = "ecsInstanceRole"
}
