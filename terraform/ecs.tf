resource "aws_ecs_cluster" "botletics" {
  name = "botletics"
}

resource "aws_ecs_task_definition" "botletics_server" {
  family                   = "botletics-server"
  network_mode             = "awsvpc"
  requires_compatibilities = ["EC2"]
  container_definitions = jsonencode([
    {
      name      = "botletics-server"
      image     = local.server_image_uri
      essential = true
      portMappings = [
        {
          containerPort = 8080
          hostPort      = 8080
        }
      ]
      memory = 900
      environment = [
        {
          name  = "SESSION_SECRET"
          value = local.config.session_secret
        },
        {
          name  = "DATABASE_URL"
          value = local.database_url
        },
        {
          name  = "ENVIRONMENT"
          value = "production"
        }
      ]
    }
  ])

  memory = 900
}

resource "aws_ecs_service" "botletics" {
  name            = "botletics-server"
  cluster         = aws_ecs_cluster.botletics.id
  task_definition = aws_ecs_task_definition.botletics_server.arn
  desired_count   = 1

  network_configuration {
    subnets         = [aws_subnet.public_1.id, aws_subnet.public_2.id, aws_subnet.public_3.id]
    security_groups = [aws_security_group.ec2.id]
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.botletics.arn
    container_name   = "botletics-server"
    container_port   = 8080
  }
}
