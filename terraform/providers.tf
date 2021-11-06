provider "aws" {
  profile = "default"
  region  = "ap-southeast-1"
}

provider "aws" {
  alias  = "acm"
  region = "us-east-1"
}
