resource "aws_lb" "botletics" {
  name               = "botletics"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.load_balancer.id]
  subnets            = [aws_subnet.public_1.id, aws_subnet.public_2.id, aws_subnet.public_3.id]
}

resource "aws_lb_target_group" "botletics" {
  name        = "botletics"
  protocol    = "HTTP"
  target_type = "ip"
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

resource "aws_lb_listener" "botletics" {
  load_balancer_arn = aws_lb.botletics.arn
  protocol          = "HTTP"
  port              = 80

  default_action {
    target_group_arn = aws_lb_target_group.botletics.arn
    type             = "forward"
  }
}
