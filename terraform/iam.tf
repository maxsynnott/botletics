resource "aws_iam_role" "ecs_task_executiion" {
  name               = "ecs-task-execution-role"
  assume_role_policy = data.aws_iam_policy_document.assume_role_policy.json
}

data "aws_iam_policy_document" "assume_role_policy" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["ecs-tasks.amazonaws.com"]
    }
  }
}

resource "aws_iam_role_policy_attachment" "ecsTaskExecutionRole_policy" {
  role       = aws_iam_role.ecs_task_executiion.name
  policy_arn = data.aws_iam_policy.ecs_task_execution.arn
}

data "aws_iam_policy" "ecs_task_execution" {
  name = "AmazonECSTaskExecutionRolePolicy"
}
