resource "aws_ecs_cluster" "botletics" {
  name = "botletics"
}

resource "aws_ecs_task_definition" "botletics" {
  family = "botletics"
  container_definitions = jsonencode([
    {
      name      = "botletics"
      image     = aws_ecr_repository.botletics_server.repository_url
      essential = true
      portMappings = [
        {
          containerPort = 8080
          hostPort      = 8080
        }
      ]
      cpu    = 2
      memory = 1024
    }
  ])
  requires_compatibilities = ["EC2"]
  memory                   = 1024
  execution_role_arn       = aws_iam_role.ecs_task_executiion.arn
}

resource "aws_ecs_service" "botletics" {
  name            = "botletics-production"
  cluster         = aws_ecs_cluster.botletics.id
  task_definition = aws_ecs_task_definition.botletics.arn
  launch_type     = "EC2"
  desired_count   = 1
}
