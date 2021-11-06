terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.50"
    }
  }

  backend "s3" {
    bucket = "terraform-botletics"
    key    = "tfstate"
    region = "ap-southeast-1"
  }

  required_version = ">= 0.14.9"
}
