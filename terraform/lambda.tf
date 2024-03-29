resource "aws_lambda_function" "botletics_migrator" {
  function_name = "db-migrator"
  role          = aws_iam_role.lambda.arn
  package_type  = "Image"
  image_uri     = local.migrator_image_uri
  timeout       = 60

  environment {
    variables = {
      DATABASE_URL = local.database_url
    }
  }

  vpc_config {
    subnet_ids         = [aws_subnet.public_1.id, aws_subnet.public_2.id, aws_subnet.public_3.id]
    security_group_ids = [aws_security_group.migrator.id]
  }
}

resource "aws_lambda_function" "random_bot" {
  function_name = "random-bot"
  role          = aws_iam_role.lambda.arn
  package_type  = "Image"
  image_uri     = local.random_bot_image_uri
  timeout       = 10

  environment {
    variables = {
      DATABASE_URL = local.database_url
    }
  }

  vpc_config {
    subnet_ids         = [aws_subnet.public_1.id, aws_subnet.public_2.id, aws_subnet.public_3.id]
    security_group_ids = [aws_security_group.migrator.id]
  }
}

resource "aws_lambda_permission" "lb_random_bot" {
  statement_id  = "AllowExecutionFromlb"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.random_bot.arn
  principal     = "elasticloadbalancing.amazonaws.com"
  source_arn    = aws_lb_target_group.random_bot.arn
}

// This is extremely dangerous and should be replaced by an admin dashboard ASAP
resource "aws_lambda_function" "query" {
  function_name = "db-query"
  role          = aws_iam_role.lambda.arn
  package_type  = "Image"
  image_uri     = local.query_image_uri
  timeout       = 10

  environment {
    variables = {
      DATABASE_URL = local.database_url
    }
  }

  // STRICTLY only in private VPC
  vpc_config {
    subnet_ids         = [aws_subnet.private_1.id, aws_subnet.private_2.id, aws_subnet.private_3.id]
    security_group_ids = [aws_security_group.query.id]
  }
}
