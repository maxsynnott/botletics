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

resource "aws_ecr_repository" "botletics_migrator" {
  name = "botletics-db-migrator"
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

data "aws_ecr_image" "botletics_migrator" {
  repository_name = aws_ecr_repository.botletics_migrator.name
  image_tag       = "latest"
}
