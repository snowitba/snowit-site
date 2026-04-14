#!/bin/bash
set -e

echo "Deploying Planka..."

# Create app directory
sudo mkdir -p /opt/app/planka
cd /opt/app/planka

# Copy docker-compose file
sudo cp ~/infrastructure/docker/planka/docker-compose.yml .
sudo cp ~/infrastructure/docker/planka/.env.example .env

echo "Edit .env file with your database password and secret key:"
sudo nano .env

# Start services
sudo docker-compose up -d

# Wait for services to be healthy
echo "Waiting for services to start..."
sleep 10

# Show logs
sudo docker-compose logs -f planka

echo ""
echo "Planka deployed!"
echo "Access it at: http://localhost:8081"
echo "Create admin account on first login"
