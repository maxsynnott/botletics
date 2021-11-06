resource "aws_ecs_cluster" "botletics" {
  name = "botletics"
}

resource "aws_ecs_task_definition" "botletics_server" {
  family                   = "botletics-server"
  network_mode             = "awsvpc"
  requires_compatibilities = ["EC2"]
  container_definitions = jsonencode([
    {
      name      = "botletics-server-1"
      image     = "${aws_ecr_repository.botletics_server.repository_url}:latest"
      essential = true
      portMappings = [
        {
          containerPort = 8080
          hostPort      = 8080
        }
      ]
      memory = 512
      environment = [
        {
          name  = "SESSION_SECRET"
          value = local.config.session_secret
        },
        {
          name  = "DATABASE_URL"
          value = local.database_url
        }
      ]
    }
  ])

  memory = 512
}

resource "aws_ecs_service" "botletics" {
  name            = "botletics-server"
  cluster         = aws_ecs_cluster.botletics.id
  task_definition = aws_ecs_task_definition.botletics_server.arn
  desired_count   = 1

  network_configuration {
    subnets         = [aws_subnet.public.id]
    security_groups = [aws_security_group.ec2.id]
  }
}
