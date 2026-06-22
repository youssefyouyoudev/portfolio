# Youssef Youyou Portfolio

Production-minded full-stack portfolio for `youssefyouyou.com`.

- `backend`: Laravel API CMS, MySQL schema, Sanctum admin auth, Resources, Form Requests, seed data, media uploads, contact messages and CV download tracking.
- `frontend`: Next.js 16, TypeScript, Tailwind CSS 4, Framer Motion, SEO routes, responsive portfolio UI and a hidden `/admin` CMS dashboard.
- `deploy`: Nginx production configs for `youssefyouyou.com`, `www.youssefyouyou.com` and `api.youssefyouyou.com`.

The public site has no promoted admin links. Admin access is available at `/admin` and authenticates against the Laravel `/api/admin/login` endpoint.

Seeded first admin:

```text
Email: contact@youssefyouyou.com
Password: ChangeThisStrongPassword!2026
```

Change that password immediately after deployment.

Run backend:

```bash
cd backend
composer install
php artisan migrate --seed
php artisan storage:link
php artisan serve
```

Run frontend:

```bash
cd frontend
npm install
npm run dev
```

Production backend:

```bash
cd backend
composer install --optimize-autoloader --no-dev
php artisan migrate --force
php artisan db:seed --force
php artisan storage:link
php artisan config:cache
php artisan route:cache
php artisan optimize
```

Production frontend:

```bash
cd frontend
npm install
npm run build
npm run start
```

Main docs: `DEPLOYMENT.md`.
