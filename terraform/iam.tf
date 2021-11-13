resource "aws_iam_instance_profile" "ecs-ec2" {
  name = "ecs-ec2"
  role = data.aws_iam_role.ecs_instance_role.name
}

data "aws_iam_role" "ecs_instance_role" {
  name = "ecsInstanceRole"
}

resource "aws_iam_role" "lambda" {
  name               = "lambda"
  assume_role_policy = data.aws_iam_policy_document.lambda.json
}

data "aws_iam_policy_document" "lambda" {
  statement {
    actions = ["sts:AssumeRole"]
    effect  = "Allow"
    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }
  }
}

resource "aws_iam_role_policy_attachment" "basic_execution" {
  role       = aws_iam_role.lambda.name
  policy_arn = data.aws_iam_policy.lambda_vpc_access_basic_execution_policy.arn
}

data "aws_iam_policy" "lambda_vpc_access_basic_execution_policy" {
  name = "AWSLambdaVPCAccessExecutionRole"
}

data "aws_iam_policy_document" "spa_bucket_policy" {
  statement {
    actions   = ["s3:GetObject"]
    resources = ["arn:aws:s3:::${var.spa_s3_bucket_name}/*"]
    effect    = "Allow"
    principals {
      type        = "*"
      identifiers = ["*"]
    }
  }
}

// TODO: Tighten this up to be more restrictive
data "aws_iam_policy_document" "lb_logs_bucket_policy" {
  statement {
    actions   = ["s3:GetObject", "s3:PutObject"]
    resources = ["arn:aws:s3:::${var.lb_logs_bucket_name}/*"]
    effect    = "Allow"
    principals {
      type        = "*"
      identifiers = ["*"]
    }
  }

  statement {
    actions   = ["s3:GetBucketAcl"]
    resources = ["arn:aws:s3:::${var.lb_logs_bucket_name}"]
    effect    = "Allow"
    principals {
      type        = "*"
      identifiers = ["*"]
    }
  }
}
