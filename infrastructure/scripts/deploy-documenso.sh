#!/bin/bash
set -e

echo "Deploying Documenso..."

# Create app directory
sudo mkdir -p /opt/app/documenso
cd /opt/app/documenso

# Copy docker-compose file
sudo cp ~/infrastructure/docker/documenso/docker-compose.yml .
sudo cp ~/infrastructure/docker/documenso/.env.example .env

echo "Edit .env file with your credentials:"
echo "- Database password"
echo "- Encryption keys (use: openssl rand -base64 32)"
echo "- SES SMTP credentials"
sudo nano .env

# Start services
sudo docker-compose up -d

# Wait for services to be healthy
echo "Waiting for services to start..."
sleep 15

# Run database migrations
echo "Running database migrations..."
sudo docker-compose exec documenso npx prisma migrate deploy

# Show logs
sudo docker-compose logs -f documenso

echo ""
echo "Documenso deployed!"
echo "Access it at: http://localhost:8082"
echo "Create admin account on first login"
