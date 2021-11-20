resource "aws_ecr_repository" "botletics_server" {
  name = "botletics-server-production"
}

resource "aws_ecr_lifecycle_policy" "server" {
  repository = aws_ecr_repository.botletics_server.name

  policy = <<EOF
{
    "rules": [
        {
            "rulePriority": 1,
            "description": "Only keep one untagged image",
            "selection": {
                "tagStatus": "untagged",
                "countType": "imageCountMoreThan",
                "countNumber": 1
            },
            "action": {
                "type": "expire"
            }
        }
    ]
}
EOF
}

data "aws_ecr_image" "botletics_migrator" {
  repository_name = aws_ecr_repository.botletics_migrator.name
  image_tag       = "latest"
}


resource "aws_ecr_repository" "botletics_migrator" {
  name = "db-migrator"
}

resource "aws_ecr_lifecycle_policy" "migrator" {
  repository = aws_ecr_repository.botletics_migrator.name

  policy = <<EOF
{
    "rules": [
        {
            "rulePriority": 1,
            "description": "Only keep one untagged image",
            "selection": {
                "tagStatus": "untagged",
                "countType": "imageCountMoreThan",
                "countNumber": 1
            },
            "action": {
                "type": "expire"
            }
        }
    ]
}
EOF
}

data "aws_ecr_image" "botletics_server" {
  repository_name = aws_ecr_repository.botletics_server.name
  image_tag       = "latest"
}

resource "aws_ecr_repository" "random_bot" {
  name = "random-bot"
}

resource "aws_ecr_lifecycle_policy" "random_bot" {
  repository = aws_ecr_repository.random_bot.name

  policy = <<EOF
{
    "rules": [
        {
            "rulePriority": 1,
            "description": "Only keep one untagged image",
            "selection": {
                "tagStatus": "untagged",
                "countType": "imageCountMoreThan",
                "countNumber": 1
            },
            "action": {
                "type": "expire"
            }
        }
    ]
}
EOF
}

data "aws_ecr_image" "random_bot" {
  repository_name = aws_ecr_repository.random_bot.name
  image_tag       = "latest"
}

resource "aws_ecr_repository" "query" {
  name = "db-query"
}

resource "aws_ecr_lifecycle_policy" "query" {
  repository = aws_ecr_repository.query.name

  policy = <<EOF
{
    "rules": [
        {
            "rulePriority": 1,
            "description": "Only keep one untagged image",
            "selection": {
                "tagStatus": "untagged",
                "countType": "imageCountMoreThan",
                "countNumber": 1
            },
            "action": {
                "type": "expire"
            }
        }
    ]
}
EOF
}

data "aws_ecr_image" "query" {
  repository_name = aws_ecr_repository.query.name
  image_tag       = "latest"
}
