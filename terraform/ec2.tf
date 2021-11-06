// TODO: REPLACE WITH AUTOSCALING GROUP

resource "aws_instance" "botletics_1" {
  ami                         = data.aws_ami.ecs.id
  instance_type               = "t3.micro"
  key_name                    = aws_key_pair.dev.key_name
  vpc_security_group_ids      = [aws_security_group.ec2.id]
  subnet_id                   = aws_subnet.public_1.id
  associate_public_ip_address = true
  iam_instance_profile        = aws_iam_instance_profile.ecs-ec2.name

  user_data = <<EOS
#!/bin/bash
echo "ECS_CLUSTER=${aws_ecs_cluster.botletics.name}" >> /etc/ecs/ecs.config
EOS
}


resource "aws_key_pair" "dev" {
  key_name   = "id_rsa"
  public_key = "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQDVKWu7caCMiAuI8Y0e/wOAqCU/f6j8RBB84PI9oQ/Da9dIfojpDtFi7EKjElSE2eqsiwUL3pCpST9JjuHHz+NlzsV/9x/eASOAyxd7xiKOVD6zToowJf+F0SLVaKVn9rp7uBfDPTTXTFwRVWDoUH8V05llIR08sk4jXRQcEki9VdC4cioSmpNRzOdGBmlyfGynrwbgkgF81vjinksYVjdbnw+xHusK35mJAu9NYR8Xl9Ghxd6Jne4+KGCKYCTS6w7WxUzwY37PQN7uhMsL65g2Lb2eolo+7gR1ajyHw8WP0OIQaWpuAFqzRrQMjGp4U3zD6so3GlobX48lxVt+VwOMIDU6wNPq5FAmk1o2NwoLSK1LpjBw4IHx1QhhORjnXAxvcFFODC0eumBmgh84wTrIyCsQXeRPQTn6uQcPsGrfxqKjqoJquyhu/zXgxqRqk0cXZJRjOqJnepe8nykVIlnRr4aSZYbnmuF45Up/UXrYP77FOnf246lrhyg5GL8VpNKYymgbPNj06y2kCXmeBE6EK7fk3nKZGTYDskmJIzO9ywYwzAfo7b/wiNLnTwFYY04UT2vfyMSC15ziS818LcKIPV+kWAx+bGRzigAWSOZWjMxkFhWFHlRoG2TOkvQdrPNfrY3Y4tGZ00DuaPtk/D0eFwfojyG4FoOlSWK1X38F3Q== maxryansynnott@gmail.com"
}
