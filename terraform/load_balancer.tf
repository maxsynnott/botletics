resource "aws_lb" "botletics" {
  name               = "botletics"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.load_balancer.id]
  subnets            = [aws_subnet.public_1.id, aws_subnet.public_2.id, aws_subnet.public_3.id]

  access_logs {
    bucket  = aws_s3_bucket.lb_logs.bucket
    enabled = true
  }
}

resource "aws_lb_target_group" "random_bot" {
  name        = "random-bot"
  target_type = "lambda"
  vpc_id      = aws_vpc.botletics.id
}

resource "aws_lb_target_group_attachment" "random_bot" {
  depends_on       = [aws_lambda_permission.lb_random_bot]
  target_group_arn = aws_lb_target_group.random_bot.arn
  target_id        = aws_lambda_function.random_bot.arn
}

resource "aws_lb_target_group" "botletics" {
  name        = "botletics"
  protocol    = "HTTP"
  target_type = "instance"
  port        = 8080
  vpc_id      = aws_vpc.botletics.id

  health_check {
    path                = "/healthcheck"
    matcher             = "200"
    healthy_threshold   = 3
    unhealthy_threshold = 3
    interval            = 30
    timeout             = 10
  }
}

resource "aws_lb_listener_rule" "lambda" {
  listener_arn = aws_lb_listener.https.arn
  priority     = 1

  action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.random_bot.arn
  }

  condition {
    path_pattern {
      values = ["/bots/chess/random", "/bots/chess/random/healthcheck"]
    }
  }
}

resource "aws_lb_listener" "https" {
  load_balancer_arn = aws_lb.botletics.arn
  protocol          = "HTTPS"
  port              = 443
  certificate_arn   = aws_acm_certificate_validation.api_botletics.certificate_arn
  ssl_policy        = "ELBSecurityPolicy-2016-08"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.botletics.arn
  }
}

resource "aws_lb_listener" "http" {
  load_balancer_arn = aws_lb.botletics.arn
  protocol          = "HTTP"
  port              = 80

  default_action {
    type = "redirect"

    redirect {
      port        = 443
      protocol    = "HTTPS"
      status_code = "HTTP_301"
    }
  }
}
