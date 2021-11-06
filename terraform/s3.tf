resource "aws_s3_bucket" "terraform" {
  bucket = "terraform-botletics"
  versioning {
    enabled = true
  }
}

resource "aws_s3_bucket" "spa" {
  bucket = var.spa_s3_bucket_name
  acl    = "public-read"
  policy = data.aws_iam_policy_document.spa_bucket_policy.json
  website {
    index_document = "index.html"
  }
}
