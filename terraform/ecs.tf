resource "aws_ecs_cluster" "botletics" {
  name               = var.ecs_cluster_name
  capacity_providers = [aws_ecs_capacity_provider.botletics.name]
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
  name                       = "botletics-server"
  cluster                    = aws_ecs_cluster.botletics.id
  task_definition            = aws_ecs_task_definition.botletics_server.arn
  desired_count              = 1
  deployment_maximum_percent = 300

  network_configuration {
    subnets         = [aws_subnet.public_1.id, aws_subnet.public_2.id, aws_subnet.public_3.id]
    security_groups = [aws_security_group.ec2.id]
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.botletics.arn
    container_name   = "botletics-server"
    container_port   = 8080
  }

  capacity_provider_strategy {
    capacity_provider = aws_ecs_capacity_provider.botletics.name
    weight            = 100
  }
}

resource "aws_ecs_capacity_provider" "botletics" {
  name = var.ecs_capacity_provider_name

  auto_scaling_group_provider {
    auto_scaling_group_arn = aws_autoscaling_group.botletics.arn

    managed_scaling {
      status = "ENABLED"

      minimum_scaling_step_size = 1
      maximum_scaling_step_size = 10000
      target_capacity           = 100
    }
  }
}
