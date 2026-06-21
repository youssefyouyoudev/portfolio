# Filament Admin Resource Blueprint

Filament could not be installed in this local XAMPP runtime because PHP `ext-intl` is disabled/missing. Enable `extension=intl` in `C:\xampp\php\php.ini` or deploy on Ubuntu with `php-intl`, then run:

```bash
composer require filament/filament -W
php artisan filament:install --panels
php artisan make:filament-resource Project
php artisan make:filament-resource ProjectImage
php artisan make:filament-resource Skill
php artisan make:filament-resource Service
php artisan make:filament-resource Experience
php artisan make:filament-resource Education
php artisan make:filament-resource Certification
php artisan make:filament-resource Language
php artisan make:filament-resource BlogPost
php artisan make:filament-resource ContactMessage --view
php artisan make:filament-resource CvDownload --view
php artisan make:filament-resource Stat
php artisan make:filament-resource Setting
```

Resources should expose these fields:

- Projects: title, slug, category, summary, business value, stack, features, problems solved, case study, cover image, featured, sort order.
- Project Images: project, title, image path/upload, alt text, sort order.
- Skills: name, category, level, icon, sort order.
- Services: title, slug, description, audience tag, icon, sort order.
- Experiences: role, company, location, type, date range, repeatable description points, sort order.
- Education, Certifications, Languages: title/name, metadata, sort order.
- Blog Posts: title, slug, excerpt, content, tags, metadata, published_at.
- Contact Messages and CV Downloads: view-only tables with project type, budget/source, IP/user agent and timestamps.
- Stats: label, value, description, type, payload JSON, sort order.
- Settings: key, group, public flag and JSON value.

Dashboard widgets:

- Total contact messages
- Total CV downloads
- Total projects
- Messages by project type
- Latest messages
- CV download trend
