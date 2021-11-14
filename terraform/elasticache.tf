resource "aws_elasticache_cluster" "redis" {
  cluster_id           = "botletics"
  engine               = "redis"
  engine_version       = "6.x"
  parameter_group_name = "default.redis6.x"
  node_type            = "cache.t2.micro"
  num_cache_nodes      = 1
}
