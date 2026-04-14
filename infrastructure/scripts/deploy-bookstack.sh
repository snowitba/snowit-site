#!/bin/bash
set -e

echo "Deploying BookStack..."

# Create app directory
sudo mkdir -p /opt/app/bookstack
cd /opt/app/bookstack

# Copy docker-compose file
sudo cp ~/infrastructure/docker/bookstack/docker-compose.yml .
sudo cp ~/infrastructure/docker/bookstack/.env.example .env

echo "Edit .env file with your database password:"
sudo nano .env

# Start services
sudo docker-compose up -d

# Wait for services to be healthy
echo "Waiting for services to start..."
sleep 10

# Show logs
sudo docker-compose logs -f bookstack

echo ""
echo "BookStack deployed!"
echo "Access it at: http://localhost:8080"
echo "Default credentials: admin@admin.com / password"
echo "IMPORTANT: Change these credentials immediately!"
