# Deployment Guide

Target structure:

```text
/var/www/youssefyouyou.com/backend
/var/www/youssefyouyou.com/frontend
```

## Ubuntu Setup

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y nginx mysql-server unzip git curl software-properties-common
sudo add-apt-repository ppa:ondrej/php -y
sudo apt update
sudo apt install -y php8.3-fpm php8.3-cli php8.3-mysql php8.3-mbstring php8.3-xml php8.3-curl php8.3-zip php8.3-bcmath php8.3-intl php8.3-gd
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm install -g pm2
```

Install Composer:

```bash
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
php composer-setup.php
sudo mv composer.phar /usr/local/bin/composer
```

## Backend

```bash
cd /var/www/youssefyouyou.com/backend
composer install --no-dev --optimize-autoloader
cp .env.example .env
php artisan key:generate
php artisan migrate --force
php artisan db:seed --force
php artisan storage:link
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

Set `.env`:

```env
APP_ENV=production
APP_DEBUG=false
APP_URL=https://api.youssefyouyou.com
FRONTEND_URL=https://youssefyouyou.com
DB_DATABASE=youssefyouyou
DB_USERNAME=youssefyouyou
DB_PASSWORD=strong_password
QUEUE_CONNECTION=database
CACHE_STORE=database
SESSION_DRIVER=database
SANCTUM_STATEFUL_DOMAINS=youssefyouyou.com,www.youssefyouyou.com
```

## Frontend

```bash
cd /var/www/youssefyouyou.com/frontend
npm ci
cp .env.example .env.production
npm run build
pm2 start npm --name youssefyouyou-frontend -- start
pm2 save
pm2 startup
```

## Nginx and SSL

```bash
sudo cp /var/www/youssefyouyou.com/deploy/nginx-frontend.conf /etc/nginx/sites-available/youssefyouyou.com
sudo cp /var/www/youssefyouyou.com/deploy/nginx-api.conf /etc/nginx/sites-available/api.youssefyouyou.com
sudo ln -s /etc/nginx/sites-available/youssefyouyou.com /etc/nginx/sites-enabled/
sudo ln -s /etc/nginx/sites-available/api.youssefyouyou.com /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d youssefyouyou.com -d www.youssefyouyou.com
sudo certbot --nginx -d api.youssefyouyou.com
```

## Production Checklist

- Enable PHP `intl`, `mbstring`, `xml`, `curl`, `zip`, `mysql`, `bcmath`, `gd`.
- Set `APP_DEBUG=false`.
- Use HTTPS-only domains.
- Set strong MySQL and admin passwords.
- Run migrations and seeders.
- Install Filament after `php-intl` is enabled.
- Confirm `/api/profile`, `/api/projects`, `/sitemap.xml`, `/robots.txt`.
- Confirm contact form rate limiting and CV download tracking.
- Run `npm run build` and `php artisan test`.
- Configure server backups and log rotation.
