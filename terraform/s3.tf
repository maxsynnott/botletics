resource "aws_s3_bucket" "terraform" {
  bucket = "terraform-botletics"
  versioning {
    enabled = true
  }
}
