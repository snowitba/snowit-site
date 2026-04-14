#!/bin/bash

echo "Generating secure secrets for SnowIT infrastructure..."
echo ""

echo "BOOKSTACK_DB_PASSWORD=$(openssl rand -base64 32)"
echo ""

echo "PLANKA_DB_PASSWORD=$(openssl rand -base64 32)"
echo "PLANKA_SECRET_KEY=$(openssl rand -base64 32)"
echo ""

echo "DOCUMENSO_DB_PASSWORD=$(openssl rand -base64 32)"
echo "DOCUMENSO_ENCRYPTION_KEY=$(openssl rand -base64 32)"
echo "DOCUMENSO_SECONDARY_KEY=$(openssl rand -base64 32)"
echo ""

echo "Save these values securely!"
echo "You'll need them when creating terraform.tfvars and .env files"
