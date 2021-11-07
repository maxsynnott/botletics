variable "spa_s3_bucket_name" {
  type    = string
  default = "botletics-spa"
}

variable "ecs_cluster_name" {
  type    = string
  default = "botletics-cluster"
}

variable "ecs_capacity_provider_name" {
  type    = string
  default = "botletics-capacity-provider"
}

variable "launch_configuration_name" {
  type    = string
  default = "botletics-launch-configuration"
}
