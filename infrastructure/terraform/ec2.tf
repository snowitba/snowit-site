# Latest Ubuntu 22.04 LTS AMI
data "aws_ami" "ubuntu" {
  most_recent = true
  owners      = ["099720109477"] # Canonical

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-jammy-22.04-amd64-server-*"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }
}

# User data script for Docker installation
locals {
  docker_install_script = <<-EOF
    #!/bin/bash
    set -e

    # Update system
    apt-get update
    apt-get upgrade -y

    # Install Docker
    apt-get install -y ca-certificates curl gnupg lsb-release
    mkdir -p /etc/apt/keyrings
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
    echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null
    apt-get update
    apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

    # Add ubuntu user to docker group
    usermod -aG docker ubuntu

    # Install Docker Compose standalone
    curl -L "https://github.com/docker/compose/releases/download/v2.24.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    chmod +x /usr/local/bin/docker-compose

    # Install Nginx
    apt-get install -y nginx certbot python3-certbot-nginx

    # Enable services
    systemctl enable docker
    systemctl enable nginx
    systemctl start docker
    systemctl start nginx

    # Create app directory
    mkdir -p /opt/app
    chown ubuntu:ubuntu /opt/app
  EOF
}

# BookStack EC2 Instance
resource "aws_instance" "bookstack" {
  ami                    = data.aws_ami.ubuntu.id
  instance_type          = var.instance_type_micro
  key_name              = var.key_pair_name
  subnet_id             = aws_subnet.public[0].id
  vpc_security_group_ids = [aws_security_group.web.id]

  user_data = local.docker_install_script

  root_block_device {
    volume_size = 20
    volume_type = "gp3"
    encrypted   = true
  }

  tags = {
    Name        = "snowit-bookstack"
    Application = "BookStack"
  }
}

# Planka EC2 Instance
resource "aws_instance" "planka" {
  ami                    = data.aws_ami.ubuntu.id
  instance_type          = var.instance_type_micro
  key_name              = var.key_pair_name
  subnet_id             = aws_subnet.public[0].id
  vpc_security_group_ids = [aws_security_group.web.id]

  user_data = local.docker_install_script

  root_block_device {
    volume_size = 20
    volume_type = "gp3"
    encrypted   = true
  }

  tags = {
    Name        = "snowit-planka"
    Application = "Planka"
  }
}

# Documenso EC2 Instance (t3.small - needs more resources)
resource "aws_instance" "documenso" {
  ami                    = data.aws_ami.ubuntu.id
  instance_type          = var.instance_type_small
  key_name              = var.key_pair_name
  subnet_id             = aws_subnet.public[0].id
  vpc_security_group_ids = [aws_security_group.web.id]

  user_data = local.docker_install_script

  root_block_device {
    volume_size = 30
    volume_type = "gp3"
    encrypted   = true
  }

  tags = {
    Name        = "snowit-documenso"
    Application = "Documenso"
  }
}
