resource "aws_lambda_function" "botletics_migrator" {
  function_name = "botletics-migrator"
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
