<?php

namespace Database\Seeders;

use App\Models\BlogPost;
use App\Models\Certification;
use App\Models\Education;
use App\Models\Experience;
use App\Models\Language;
use App\Models\Project;
use App\Models\Service;
use App\Models\Setting;
use App\Models\Skill;
use App\Models\Stat;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::query()->updateOrCreate([
            'email' => 'contact@youssefyouyou.com',
        ], [
            'name' => 'Youssef Youyou',
            'password' => Hash::make('ChangeThisStrongPassword!2026'),
        ]);

        Setting::query()->upsert([
            ['key' => 'seo', 'group' => 'seo', 'is_public' => true, 'value' => json_encode([
                'title' => 'Youssef Youyou | Laravel & React/Next.js Full-Stack Web Developer',
                'description' => 'Portfolio of Youssef Youyou, Junior Full-Stack Web Developer from Morocco specializing in Laravel, React, Next.js, REST APIs, dashboards, SaaS platforms, e-commerce, deployment and SEO.',
                'keywords' => ['Youssef Youyou', 'Laravel developer Morocco', 'React developer Morocco', 'Next.js developer Morocco', 'Full-stack developer Morocco', 'Junior web developer Marrakech', 'Laravel React portfolio', 'SaaS developer Morocco', 'B2B web developer', 'B2C web developer', 'admin dashboard developer', 'API integration developer', 'Nador developer', 'Marrakech developer'],
            ])],
            ['key' => 'cv_file', 'group' => 'files', 'is_public' => true, 'value' => json_encode(['url' => '/cv/youssef-youyou-cv.pdf'])],
            ['key' => 'contact', 'group' => 'profile', 'is_public' => true, 'value' => json_encode([
                'email' => 'contact@youssefyouyou.com',
                'website' => 'https://youssefyouyou.com',
                'github' => 'https://github.com/youssefyouyoudev',
                'linkedin' => 'https://linkedin.com/in/youssefyouyoudev',
            ])],
        ], ['key'], ['group', 'is_public', 'value']);

        $services = [
            ['Business websites', 'business-websites', 'Premium SEO-ready websites for service businesses, agencies, and local brands.', 'B2B/B2C', 'Globe'],
            ['SaaS platforms', 'saas-platforms', 'Multi-user product foundations with dashboards, billing-ready structure, roles, and analytics.', 'B2B', 'Boxes'],
            ['Admin dashboards', 'admin-dashboards', 'Operational dashboards for managing content, users, reports, workflows, and internal data.', 'B2B', 'LayoutDashboard'],
            ['E-commerce websites', 'e-commerce-websites', 'Catalogues, carts, orders, client areas, payment structure, and reporting.', 'B2C/B2B', 'ShoppingCart'],
            ['Client portals', 'client-portals', 'Secure spaces for customers, documents, status tracking, and business communication.', 'B2B/B2C', 'Users'],
            ['Internal management systems', 'internal-management-systems', 'Practical tools that reduce manual work and make teams faster.', 'B2B', 'Workflow'],
            ['API integrations', 'api-integrations', 'REST integrations connecting Laravel, React, third-party services, and automation flows.', 'B2B/B2C', 'Cable'],
            ['Laravel backend development', 'laravel-backend-development', 'Clean Laravel APIs with validation, resources, policies, auth, and database design.', 'B2B/B2C', 'Server'],
            ['React/Next.js frontend development', 'react-nextjs-frontend-development', 'Fast responsive interfaces with accessible components and modern UI patterns.', 'B2B/B2C', 'Component'],
            ['Database design', 'database-design', 'Relational schemas for dashboards, SaaS modules, portals, and content systems.', 'B2B', 'Database'],
            ['SEO technical optimization', 'seo-technical-optimization', 'Metadata, JSON-LD, sitemaps, semantic HTML, performance and clean slugs.', 'B2B/B2C', 'Search'],
            ['Deployment on Ubuntu/Nginx', 'deployment-on-ubuntu-nginx', 'Production deployment with Nginx, PHP-FPM, MySQL, SSL, PM2, and cache setup.', 'B2B', 'Cloud'],
            ['IT support and process digitalization', 'it-support-process-digitalization', 'Support for teams moving from manual work to reliable digital workflows.', 'B2B', 'LifeBuoy'],
            ['Excel/VBA automation', 'excel-vba-automation', 'Forms, calculations, filters, reports, and tracking tables for productivity.', 'B2B', 'FileSpreadsheet'],
            ['Digital archiving systems', 'digital-archiving-systems', 'Searchable document organization, tracking, and simple interfaces for administration.', 'B2B', 'Archive'],
        ];
        foreach ($services as $index => [$title, $slug, $description, $audience, $icon]) {
            Service::query()->updateOrCreate(['slug' => $slug], compact('title', 'slug') + [
                'description' => $description,
                'audience_tag' => $audience,
                'icon' => $icon,
                'sort_order' => $index + 1,
            ]);
        }

        $skillGroups = [
            'Backend' => ['Laravel' => 90, 'PHP' => 86, 'Node.js' => 72, 'Express.js' => 70, 'REST APIs' => 88],
            'Frontend' => ['React.js' => 88, 'Next.js' => 84, 'Vue.js' => 78, 'JavaScript ES6+' => 86, 'HTML5' => 92, 'CSS3' => 86, 'Tailwind CSS' => 84],
            'Database' => ['MySQL' => 84, 'PostgreSQL' => 74, 'Relational database design' => 82],
            'DevOps' => ['Linux' => 76, 'Nginx' => 75, 'Git' => 82, 'Production deployment' => 75],
            'Security' => ['2FA' => 70, 'RBAC' => 74, 'Secured APIs' => 76, 'OWASP best practices' => 70],
            'Tools' => ['GitHub/GitLab' => 82, 'Jira' => 70, 'Trello' => 74, 'Slack' => 74, 'Postman' => 84],
            'IT/Admin' => ['Excel Advanced' => 86, 'VBA' => 78, 'Digital archiving' => 88, 'Automation' => 82, 'IT support' => 84],
            'Design' => ['Posters' => 72, 'Visual supports' => 74, 'Professional documents' => 78, 'Simple UI' => 76],
        ];
        $order = 1;
        foreach ($skillGroups as $category => $skills) {
            foreach ($skills as $name => $level) {
                Skill::query()->updateOrCreate(['name' => $name, 'category' => $category], [
                    'level' => $level,
                    'sort_order' => $order++,
                ]);
            }
        }

        $projects = [
            [
                'title' => 'RiFiTV',
                'slug' => 'rifitv',
                'category' => 'Media platform / football / streaming-style platform / SEO content',
                'summary' => 'A media-style football platform focused on fast navigation, live player UI, categories, and monetization structure.',
                'business_value' => 'Designed for users who need simple access, fast navigation, and a content structure that can support advertising and SEO growth.',
                'stack' => ['Laravel', 'Blade', 'Vite', 'JavaScript', 'Nginx', 'Cloudflare'],
                'features' => ['Channel management', 'Live player UI', 'Search and categories', 'SEO football/news structure', 'Ad integration', 'Production deployment', 'Cloudflare/Nginx experience'],
                'problems_solved' => ['UI/UX improvement', 'Player experience', 'Production cache/build issues', 'SEO structure', 'Monetization layout', 'Mobile/TV usability'],
            ],
            [
                'title' => 'ERPlus',
                'slug' => 'erplus',
                'category' => 'SaaS / business management / HR / inventory',
                'summary' => 'A separated Laravel API and React Vite frontend for business management workflows.',
                'business_value' => 'Focused on internal productivity, HR workflows, admin control, and scalable SaaS structure.',
                'stack' => ['Laravel backend', 'React Vite frontend', 'MySQL'],
                'features' => ['HR module', 'Payroll/payslip features', 'Inventory module', 'Admin dashboard', 'Authentication', 'API integration', 'Landing pages', 'Deployment'],
                'problems_solved' => ['Backend/frontend separation', 'API architecture', 'Asset/build issues', 'HR workflow improvement', 'Production deployment', 'Nginx configuration'],
            ],
            [
                'title' => 'Digital Archiving System',
                'slug' => 'digital-archiving-system',
                'category' => 'Internal tool / digitalization / administration',
                'summary' => 'An internal digital workflow concept for document organization, search, and tracking.',
                'business_value' => 'Reduced manual work, improved document access, and supported administrative digital transformation.',
                'stack' => ['Vue.js', 'JavaScript', 'Excel/VBA', 'Database logic'],
                'features' => ['Document organization', 'Search', 'Tracking', 'Digital workflow', 'Administrative productivity'],
                'problems_solved' => ['Manual document lookup', 'Unclear tracking', 'Repetitive administration', 'Data access friction'],
            ],
            [
                'title' => 'Social Media Management SaaS',
                'slug' => 'social-media-management-saas',
                'category' => 'SaaS / B2B / marketing',
                'summary' => 'A SaaS concept for business content planning and social media workflow management.',
                'business_value' => 'Designed to help businesses manage content planning and social media workflows.',
                'stack' => ['Laravel', 'React.js', 'MySQL'],
                'features' => ['Account management', 'Post scheduling', 'Analytics dashboard', 'Responsive interface', 'Multi-user structure'],
                'problems_solved' => ['Scattered planning', 'Manual scheduling', 'Low visibility into content performance', 'Multi-user coordination'],
            ],
            [
                'title' => 'E-commerce / Client Portal Systems',
                'slug' => 'e-commerce-client-portal-systems',
                'category' => 'B2C / B2B commerce',
                'summary' => 'Commerce and portal foundations with client areas, roles, reporting, orders, and admin control.',
                'business_value' => 'Helps businesses sell online, manage clients, and track operations.',
                'stack' => ['Laravel', 'PHP', 'JavaScript', 'MySQL'],
                'features' => ['Product catalogue', 'Cart', 'Orders', 'Payment structure', 'Client area', 'Roles and permissions', 'Reporting', 'Admin dashboard'],
                'problems_solved' => ['Manual sales flow', 'Unstructured client management', 'Order tracking', 'Admin visibility'],
            ],
            [
                'title' => 'Excel/VBA Automation Tools',
                'slug' => 'excel-vba-automation-tools',
                'category' => 'Automation / internal productivity',
                'summary' => 'Spreadsheet-driven automation tools for business calculations, filters, reports, and tracking.',
                'business_value' => 'Reduced repetitive work and improved administrative productivity.',
                'stack' => ['Excel Advanced', 'VBA', 'Business logic'],
                'features' => ['Forms', 'Calculations', 'Filters', 'Reports', 'Tracking tables'],
                'problems_solved' => ['Repetitive calculations', 'Manual reports', 'Data filtering friction', 'Inconsistent tracking'],
            ],
        ];
        foreach ($projects as $index => $project) {
            Project::query()->updateOrCreate(['slug' => $project['slug']], $project + [
                'case_study' => [
                    'role' => 'Full-stack development, UI planning, backend/API structure, deployment thinking, and practical workflow design.',
                    'architecture' => 'Admin-editable content, relational database structure, API-driven frontend, reusable UI sections, SEO metadata, and deployment-ready environment separation.',
                    'backend_api_logic' => 'Validation through Form Requests, JSON Resources for response contracts, rate limits for public actions, and tracked business events.',
                    'database_structure' => 'Normalized core entities with JSON fields only where content flexibility is useful, such as features, stack, charts, and case study blocks.',
                    'impact' => $project['business_value'],
                    'learned' => 'Production projects need clean structure, simple maintenance, responsive UX, and reliable deployment details as much as visual polish.',
                ],
                'is_featured' => $index < 3,
                'cover_image' => '/images/projects/'.$project['slug'].'.jpg',
                'sort_order' => $index + 1,
            ]);
        }

        $experiences = [
            ['Agent Administrative', 'Vectalia Nador', 'Nador, Morocco', null, 'September 2023 - Present', [
                'Participated in administrative digitalization through internal IT tools.',
                'Improved digital archiving systems for organizing, searching and tracking documents.',
                'Created simple Vue.js interfaces to improve data access.',
                'Automated repetitive tasks with Excel Advanced and VBA.',
                'Created professional visual supports and internal documents.',
                'Provided first-level IT support.',
                'Helped interns with tools, workflows and good practices.',
                'Worked with administrative teams to analyze needs and deliver practical solutions.',
            ]],
            ['Web Developer', 'MediaTechly - London, UK', 'Remote', '100% remote', 'July 2023 - September 2023', [
                'Developed modern React.js interfaces.',
                'Improved frontend maintainability with component-based architecture.',
                'Optimized performance with lazy loading and code splitting.',
                'Improved responsive design and accessibility.',
                'Worked remotely with autonomy and respected deadlines.',
            ]],
            ['Freelance Web Developer - Web, SaaS & Microservices', null, 'Nador, Morocco / Remote', 'Freelance', 'June 2019 - June 2023', [
                'Built websites, management applications, admin dashboards and client portals.',
                'Created Laravel, PHP, React.js, JavaScript, MySQL and REST API solutions.',
                'Built authentication, notifications, user management, roles and permissions.',
                'Created e-commerce features: catalogue, cart, orders, payment and admin dashboard.',
                'Built early SaaS versions with multi-user management, subscriptions and analytics dashboards.',
                'Managed project cycle: needs analysis, estimation, development, testing, delivery and support.',
            ]],
        ];
        foreach ($experiences as $index => [$role, $company, $location, $type, $dateRange, $description]) {
            Experience::query()->updateOrCreate(['role' => $role, 'date_range' => $dateRange], [
                'company' => $company,
                'location' => $location,
                'type' => $type,
                'description' => $description,
                'sort_order' => $index + 1,
            ]);
        }

        foreach ([
            ['Technicien Specialise en Developpement Digital - Option Web Full-Stack', 'ISTA Nador, OFPPT', '2021 - 2023', 'Equivalent BTS / application developer.'],
            ['Baccalaureat Sciences et Technologies Electriques - Option Reseaux et Maintenance', 'Nador, Morocco', '2020 - 2021', 'Strong basics in networks, infrastructure IT and hardware maintenance.'],
        ] as $index => [$title, $institution, $dateRange, $description]) {
            Education::query()->updateOrCreate(['title' => $title], compact('institution', 'description') + ['date_range' => $dateRange, 'sort_order' => $index + 1]);
        }

        foreach ([['Sales and Business Development', 2023], ['Cybersecurity', 2022], ['Artificial Intelligence and Machine Learning', 2021]] as $index => [$title, $year]) {
            Certification::query()->updateOrCreate(['title' => $title], ['year' => $year, 'sort_order' => $index + 1]);
        }

        foreach ([['Arabic', 'Native'], ['French', 'Good level'], ['English', 'Good level'], ['German', 'B1']] as $index => [$name, $level]) {
            Language::query()->updateOrCreate(['name' => $name], ['level' => $level, 'sort_order' => $index + 1]);
        }

        $stats = [
            ['4+ years', 'Freelance/project experience', '2019-2023 freelance web, SaaS and microservices experience.'],
            ['2023', 'Remote React.js experience', 'Frontend work with MediaTechly London.'],
            ['2023-present', 'Administrative digitalization', 'Internal IT support, digital archiving, Excel/VBA automation, and practical workflows.'],
            ['10+', 'Practical project types', 'Websites, dashboards, SaaS, e-commerce, portals, admin tools, archiving, automation, APIs, support.'],
            ['6', 'Main technical areas', 'Backend, Frontend, Database, DevOps, Security, IT/Admin.'],
            ['4', 'Languages', 'Arabic, French, English, German B1.'],
            ['3', 'Business targets', 'B2B, B2C, and internal business tools.'],
            ['skill_distribution', 'Skill distribution', 'Realistic skill focus chart.', 'chart', [
                ['name' => 'Backend', 'value' => 90],
                ['name' => 'Frontend', 'value' => 88],
                ['name' => 'Database', 'value' => 82],
                ['name' => 'DevOps', 'value' => 75],
                ['name' => 'Security', 'value' => 70],
                ['name' => 'IT/Digitalization', 'value' => 85],
                ['name' => 'UI/Design', 'value' => 72],
            ]],
            ['timeline', 'Timeline', 'Career and production focus timeline.', 'timeline', [
                ['year' => '2019', 'event' => 'Freelance web development started'],
                ['year' => '2021', 'event' => 'Full-stack digital development studies'],
                ['year' => '2023', 'event' => 'MediaTechly React remote experience'],
                ['year' => '2023', 'event' => 'Administrative digitalization and IT support'],
                ['year' => '2026', 'event' => 'Full-stack portfolio and production systems focus'],
            ]],
        ];
        foreach ($stats as $index => $stat) {
            [$value, $label, $description] = $stat;
            Stat::query()->updateOrCreate(['label' => $label], [
                'value' => $value,
                'description' => $description,
                'type' => $stat[3] ?? 'counter',
                'payload' => $stat[4] ?? null,
                'sort_order' => $index + 1,
            ]);
        }

        foreach ([
            'How I build Laravel and React dashboards',
            'Why businesses need internal digitalization',
            'Building admin panels with Laravel and Filament',
            'API integration best practices',
            'From Excel automation to web applications',
        ] as $index => $title) {
            $slug = str($title)->slug()->toString();
            BlogPost::query()->updateOrCreate(['slug' => $slug], [
                'title' => $title,
                'excerpt' => 'A practical article idea for sharing real production lessons from Laravel, React, APIs, dashboards, and process digitalization.',
                'content' => 'Draft this article from real project notes, including the business problem, technical decisions, implementation details, and lessons learned.',
                'tags' => ['Laravel', 'React', 'Dashboards', 'Digitalization'],
                'meta_title' => $title.' | Youssef Youyou',
                'meta_description' => 'Practical notes from Youssef Youyou about full-stack web development, APIs, dashboards, and business digitalization.',
                'published_at' => now()->subDays(10 - $index),
            ]);
        }
    }
}
