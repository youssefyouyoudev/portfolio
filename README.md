# Youssef Youyou Portfolio

Production-minded full-stack portfolio for `youssefyouyou.com`.

- `backend`: Laravel API, MySQL schema, Sanctum, Resources, Form Requests, Policies, seed data, contact messages and CV download tracking.
- `frontend`: Next.js 16, TypeScript, Tailwind CSS 4, Framer Motion, React Three Fiber, Drei, Recharts, Lucide icons, SEO routes and responsive portfolio UI.
- `deploy`: Nginx production configs for `youssefyouyou.com`, `www.youssefyouyou.com` and `api.youssefyouyou.com`.

Filament note: local installation is blocked until PHP `ext-intl` is enabled. See `backend/FILAMENT_RESOURCE_BLUEPRINT.md`.

Run backend:

```bash
cd backend
composer install
php artisan migrate --seed
php artisan serve
```

Run frontend:

```bash
cd frontend
npm install
npm run dev
```

Main docs: `DEPLOYMENT.md`.
"# portfolio" 
