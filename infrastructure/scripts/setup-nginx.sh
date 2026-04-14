#!/bin/bash
set -e

SERVICE=$1

if [ -z "$SERVICE" ]; then
    echo "Usage: ./setup-nginx.sh [bookstack|planka|documenso]"
    exit 1
fi

echo "Setting up Nginx for $SERVICE..."

# Copy nginx config
sudo cp ~/infrastructure/nginx/$SERVICE.conf /etc/nginx/sites-available/$SERVICE

# Enable site
sudo ln -sf /etc/nginx/sites-available/$SERVICE /etc/nginx/sites-enabled/$SERVICE

# Test nginx config
sudo nginx -t

# Get domain name
case $SERVICE in
    bookstack)
        DOMAIN="docs.snowit.ba"
        ;;
    planka)
        DOMAIN="planka.snowit.ba"
        ;;
    documenso)
        DOMAIN="sign.snowit.ba"
        ;;
esac

echo "Obtaining SSL certificate for $DOMAIN..."
sudo certbot --nginx -d $DOMAIN

# Reload nginx
sudo systemctl reload nginx

echo ""
echo "Nginx configured for $SERVICE!"
echo "Site is now accessible at: https://$DOMAIN"
