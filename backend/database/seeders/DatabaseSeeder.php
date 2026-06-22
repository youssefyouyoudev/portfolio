<?php

namespace Database\Seeders;

use App\Models\BlogPost;
use App\Models\AboutSection;
use App\Models\BlogCategory;
use App\Models\BlogTag;
use App\Models\Certification;
use App\Models\Education;
use App\Models\Experience;
use App\Models\FooterSetting;
use App\Models\HeroSection;
use App\Models\Language;
use App\Models\MenuItem;
use App\Models\Project;
use App\Models\ProjectImage;
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
            'is_admin' => true,
        ]);

        Setting::query()->upsert([
            ['key' => 'seo', 'group' => 'seo', 'is_public' => true, 'value' => json_encode([
                'title' => 'Youssef Youyou | Laravel & React/Next.js Full-Stack Web Developer',
                'description' => 'Portfolio of Youssef Youyou, Junior Full-Stack Web Developer from Morocco specializing in Laravel, React, Next.js, REST APIs, dashboards, SaaS platforms, e-commerce, deployment and SEO.',
                'keywords' => ['Youssef Youyou', 'Laravel developer Morocco', 'React developer Morocco', 'Next.js developer Morocco', 'Full-stack developer Morocco', 'Junior web developer Marrakech', 'Laravel React portfolio', 'SaaS developer Morocco', 'B2B web developer', 'B2C web developer', 'admin dashboard developer', 'API integration developer', 'Nador developer', 'Marrakech developer'],
            ])],
            ['key' => 'cv_file', 'group' => 'files', 'is_public' => true, 'value' => json_encode(['url' => '/cv/youssef-youyou-cv.pdf'])],
            ['key' => 'site', 'group' => 'general', 'is_public' => true, 'value' => json_encode([
                'site_name' => 'Youssef Youyou',
                'logo' => '/images/logo.png',
                'favicon' => '/favicon.ico',
                'maintenance_mode' => false,
                'default_theme' => 'dark',
                'theme_colors' => ['primary' => '#0ea5e9', 'cyan' => '#22d3ee', 'background' => '#020617'],
            ])],
            ['key' => 'contact', 'group' => 'profile', 'is_public' => true, 'value' => json_encode([
                'email' => 'contact@youssefyouyou.com',
                'website' => 'https://youssefyouyou.com',
                'github' => 'https://github.com/youssefyouyoudev',
                'linkedin' => 'https://linkedin.com/in/youssefyouyoudev',
                'whatsapp' => null,
                'location' => 'Nador, Morocco',
            ])],
        ], ['key'], ['group', 'is_public', 'value']);

        HeroSection::query()->updateOrCreate(['headline' => 'Youssef Youyou'], [
            'subtitle' => 'Junior Full-Stack Web Developer',
            'description' => 'I build modern Laravel, React/Next.js, API-driven, SEO-ready and production-deployed web platforms for businesses, startups and digital projects.',
            'badges' => ['Laravel', 'React', 'Next.js', 'MySQL', 'APIs', 'Nginx', 'SEO'],
            'cta_buttons' => [
                ['label' => 'View My Work', 'href' => '#projects', 'variant' => 'primary'],
                ['label' => 'Contact Me', 'href' => '#contact', 'variant' => 'secondary'],
                ['label' => 'Download CV', 'href' => '/cv-download', 'variant' => 'link'],
            ],
            'image_path' => '/images/hero-portfolio.png',
            'show_image' => true,
            'is_published' => true,
            'sort_order' => 1,
        ]);

        AboutSection::query()->updateOrCreate(['title' => 'Practical developer with business-process context'], [
            'short_bio' => 'Full-stack web developer from Nador, Morocco focused on Laravel, React/Next.js, APIs, dashboards, deployment and digitalization.',
            'body' => 'I combine freelance web work, remote React.js experience and administrative digitalization context to build practical systems that are useful, maintainable and realistic for teams.',
            'highlights' => ['Practical problem solving', 'Clean development', 'Business-focused solutions', 'Deployment mindset'],
            'cards' => [
                ['title' => 'Practical problem solving', 'text' => 'I start from the workflow and user need, then choose the simplest reliable technical path.'],
                ['title' => 'Clean development', 'text' => 'Readable structure, reusable components, clear API contracts and maintainable database logic.'],
                ['title' => 'Business-focused solutions', 'text' => 'Dashboards, portals, SaaS tools and automation that support real operations.'],
                ['title' => 'Deployment mindset', 'text' => 'Nginx, Linux, production builds, SEO basics and environment separation.'],
            ],
            'is_published' => true,
        ]);

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
                'slug' => 'ecommerce-client-portal-systems',
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

        $projectCms = [
            'rifitv' => [
                'subtitle' => 'Media Platform - Laravel - Blade - Vite - Nginx',
                'project_type' => 'Real Project',
                'cover_image' => '/images/projects/rifitv-showcase.png',
                'status' => 'Live',
                'show_on_homepage' => true,
                'seo_title' => 'RiFiTV Case Study | Youssef Youyou Portfolio',
                'seo_description' => 'Case study for RiFiTV, a Laravel media-style platform focused on content organization, responsive UI, SEO structure and production deployment.',
                'case_study' => [
                    'business_problem' => 'Users need a simple, fast and organized way to browse channels, matches and media content without a confusing interface.',
                    'solution' => 'A Laravel-based platform with a responsive UI, categorized content, search, channel/match presentation, SEO-friendly structure and production deployment.',
                    'role' => 'Full-stack development, UI/UX improvement, Laravel/Blade/Vite implementation, deployment support and production troubleshooting.',
                    'target_users' => 'Football/media visitors, content platform owners and users browsing across desktop, mobile and TV-style screens.',
                    'impact' => 'Improves user access to media content, creates a more organized viewing experience and supports monetization/SEO structure.',
                    'learned' => 'Better understanding of media UI, deployment workflow, production caching, Cloudflare/Nginx behavior and user-first navigation.',
                ],
            ],
            'erplus' => [
                'subtitle' => 'Business Management Platform - Laravel - React - MySQL',
                'project_type' => 'SaaS',
                'cover_image' => '/images/projects/erplus-showcase.png',
                'status' => 'Concept',
                'show_on_homepage' => true,
                'seo_title' => 'ERPlus Case Study | Youssef Youyou Portfolio',
                'seo_description' => 'Case study for ERPlus, a Laravel and React business management platform concept for HR workflows, inventory modules, admin dashboards and API-driven structure.',
                'case_study' => [
                    'business_problem' => 'Businesses need one organized system to manage people, processes, HR data, inventory information and operational dashboards.',
                    'solution' => 'A Laravel backend and React frontend structure with API-driven modules, admin dashboards, authentication, HR workflows and inventory management.',
                    'role' => 'Backend/frontend structure, API integration, UI improvements, deployment support, dashboard logic and production issue fixing.',
                    'target_users' => 'Small business teams, HR/admin users and managers who need clearer operational dashboards.',
                    'impact' => 'Helps businesses organize internal operations through dashboards, structured workflows and centralized admin control.',
                    'learned' => 'Improved experience with Laravel APIs, React dashboards, SaaS structure, deployment issues and business workflow design.',
                ],
            ],
            'digital-archiving-system' => [
                'subtitle' => 'Internal Tool - Vue.js - Document Tracking - Automation',
                'project_type' => 'Dashboard',
                'cover_image' => '/images/projects/digital-archiving-showcase.png',
                'status' => 'Concept',
                'show_on_homepage' => true,
                'seo_title' => 'Digital Archiving System Case Study | Youssef Youyou Portfolio',
                'seo_description' => 'Case study for a digital archiving system focused on document organization, search, tracking and internal administrative workflow improvement.',
                'case_study' => [
                    'business_problem' => 'Manual document handling creates slow search, poor tracking, duplicate work and difficulty following administrative records.',
                    'solution' => 'A structured digital archiving interface with document categories, metadata, search, tracking status, workflow support and activity overview.',
                    'role' => 'Process analysis, UI concept, simple interface development, digitalization support and workflow improvement.',
                    'target_users' => 'Administrative teams, document managers and internal staff handling recurring files and records.',
                    'impact' => 'Helps teams find documents faster, reduce repetitive administrative work and improve organization.',
                    'learned' => 'How to translate real administrative workflow problems into digital tools and simple interfaces.',
                ],
            ],
            'social-media-management-saas' => [
                'subtitle' => 'SaaS Platform - Laravel - React - Analytics',
                'project_type' => 'SaaS',
                'cover_image' => '/images/projects/social-media-saas-showcase.png',
                'status' => 'Concept',
                'show_on_homepage' => true,
                'seo_title' => 'Social Media Management SaaS Case Study | Youssef Youyou Portfolio',
                'seo_description' => 'Case study for a Laravel and React social media management SaaS concept with scheduling, analytics widgets, account management and team workflow.',
                'case_study' => [
                    'business_problem' => 'Small teams need one place to schedule content, follow campaign activity and analyze social media performance.',
                    'solution' => 'A Laravel and React-based SaaS dashboard concept with calendar planning, scheduled posts, analytics widgets, account management and team workflow.',
                    'role' => 'Full-stack concept, dashboard design, Laravel/React structure, responsive UI and SaaS workflow planning.',
                    'target_users' => 'Marketing teams, agencies, content managers and small businesses managing recurring campaigns.',
                    'impact' => 'Supports content planning, campaign visibility and better marketing workflow organization.',
                    'learned' => 'Improved dashboard design, SaaS module planning and analytics UI structure.',
                ],
            ],
            'ecommerce-client-portal-systems' => [
                'subtitle' => 'Web Applications - Laravel - MySQL - Payments',
                'project_type' => 'E-commerce',
                'cover_image' => '/images/projects/ecommerce-client-portal-showcase.png',
                'status' => 'Concept',
                'show_on_homepage' => true,
                'seo_title' => 'E-commerce Client Portal Systems Case Study | Youssef Youyou Portfolio',
                'seo_description' => 'Case study for e-commerce and client portal systems focused on product catalogs, order flows, client dashboards, admin reporting and Laravel logic.',
                'case_study' => [
                    'business_problem' => 'Businesses need online sales systems that are easy for customers to use and easy for admins to manage.',
                    'solution' => 'A Laravel-based e-commerce/client portal structure with product listings, cart/order flow, client area, admin dashboard and reporting widgets.',
                    'role' => 'Full-stack development concept, database structure, Laravel logic, UI planning, admin/client workflow design.',
                    'target_users' => 'Business owners, online customers, admin teams and clients who need a self-service portal.',
                    'impact' => 'Helps businesses sell online, manage customer orders and provide clients with a clear portal experience.',
                    'learned' => 'Better understanding of commerce flows, admin tools, customer portals and conversion-focused UI.',
                ],
            ],
            'excel-vba-automation-tools' => [
                'subtitle' => 'Automation - Reporting - Productivity - VBA',
                'project_type' => 'Other',
                'cover_image' => '/images/projects/excel-vba-automation-showcase.png',
                'status' => 'Concept',
                'show_on_homepage' => true,
                'seo_title' => 'Excel/VBA Automation Tools Case Study | Youssef Youyou Portfolio',
                'seo_description' => 'Case study for Excel and VBA automation tools focused on reports, forms, filters, calculations and administrative productivity workflows.',
                'case_study' => [
                    'business_problem' => 'Administrative teams often lose time on repetitive Excel tasks, manual reports, repeated calculations and file tracking.',
                    'solution' => 'Excel/VBA automation tools with forms, dynamic reports, dashboards, filters, tracked tables and workflow automation.',
                    'role' => 'Excel/VBA automation, workflow analysis, reporting logic, form creation and administrative productivity improvement.',
                    'target_users' => 'Administrative teams, operations users and staff working with recurring reports or spreadsheet-heavy workflows.',
                    'impact' => 'Saves time, reduces manual errors and improves productivity for administrative workflows.',
                    'learned' => 'How automation can create quick business value even without a full web app.',
                ],
            ],
        ];

        $legacyCommerceProject = Project::query()->where('slug', 'e-commerce-client-portal-systems')->first();
        if ($legacyCommerceProject) {
            if (Project::query()->where('slug', 'ecommerce-client-portal-systems')->exists()) {
                $legacyCommerceProject->delete();
            } else {
                $legacyCommerceProject->update(['slug' => 'ecommerce-client-portal-systems']);
            }
        }

        foreach ($projectCms as $slug => $meta) {
            $project = Project::query()->where('slug', $slug)->first();
            if (! $project) {
                continue;
            }
            $project->update($meta + [
                'is_published' => true,
                'is_featured' => true,
                'og_image' => $meta['cover_image'],
                'my_role' => $meta['case_study']['role'],
            ]);
            ProjectImage::query()->updateOrCreate([
                'project_id' => $project->id,
                'image_path' => $meta['cover_image'],
            ], [
                'title' => $project->title.' showcase',
                'alt_text' => $project->title.' project preview',
                'is_cover' => true,
                'sort_order' => 1,
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

        $categories = ['Dashboards', 'Automation', 'APIs', 'Business systems', 'Deployment'];
        foreach ($categories as $index => $category) {
            BlogCategory::query()->updateOrCreate(['slug' => str($category)->slug()->toString()], [
                'name' => $category,
                'description' => 'Technical notes about '.$category.'.',
                'sort_order' => $index + 1,
            ]);
        }

        foreach (['Laravel', 'React', 'Dashboards', 'Automation', 'Deployment', 'APIs'] as $tag) {
            BlogTag::query()->updateOrCreate(['slug' => str($tag)->slug()->toString()], ['name' => $tag]);
        }

        $posts = [
            ['How I build Laravel and React dashboards', 'Dashboards', 'A practical look at how I structure dashboards with Laravel APIs, React components, filters, validation and reusable UI patterns.'],
            ['From Excel automation to web applications', 'Automation', 'How repetitive spreadsheet workflows can become cleaner tools, dashboards or internal web applications.'],
            ['Practical API structure for admin dashboards', 'APIs', 'Notes on organizing REST endpoints, resources, validation and frontend consumption for dashboard-style applications.'],
            ['Why small businesses need internal dashboards', 'Business systems', 'A simple explanation of how dashboards help teams track work, reduce manual tasks and make better decisions.'],
            ['Deploying Laravel and Next.js on Ubuntu', 'Deployment', 'A practical deployment checklist covering Nginx, PM2, Laravel cache, environment files and production builds.'],
        ];

        foreach ($posts as $index => [$title, $category, $excerpt]) {
            $slug = str($title)->slug()->toString();
            $post = BlogPost::query()->updateOrCreate(['slug' => $slug], [
                'title' => $title,
                'excerpt' => $excerpt,
                'content' => implode("\n\n", [
                    $excerpt,
                    'Key point: define the business workflow before choosing the technical structure.',
                    'Key point: keep the implementation maintainable, secure and production-minded.',
                    'Key point: document what should be improved next instead of pretending the first version is perfect.',
                ]),
                'blog_category_id' => BlogCategory::query()->where('name', $category)->value('id'),
                'tags' => ['Laravel', 'React', 'Dashboards'],
                'author' => 'Youssef Youyou',
                'reading_time' => 2,
                'is_featured' => $index < 2,
                'is_published' => true,
                'meta_title' => $title.' | Youssef Youyou',
                'meta_description' => $excerpt,
                'seo_title' => $title.' | Youssef Youyou',
                'seo_description' => $excerpt,
                'published_at' => now()->subDays(10 - $index),
                'sort_order' => $index + 1,
            ]);

            $post->tagModels()->sync(BlogTag::query()->whereIn('name', ['Laravel', 'React', 'Dashboards'])->pluck('id'));
        }

        foreach ([
            ['Services', '#services', 1],
            ['Work', '#stats', 2],
            ['Projects', '#projects', 3],
            ['Experience', '#experience', 4],
            ['Technical Notes', '#blog', 5],
            ['Contact', '#contact', 6],
        ] as [$label, $url, $sortOrder]) {
            MenuItem::query()->updateOrCreate(['label' => $label], [
                'url' => $url,
                'is_external' => false,
                'open_in_new_tab' => false,
                'is_visible' => true,
                'sort_order' => $sortOrder,
            ]);
        }

        FooterSetting::query()->updateOrCreate(['key' => 'footer'], [
            'value' => [
                'positioning' => 'Full-stack web developer building Laravel, React/Next.js, API and dashboard solutions.',
                'availability' => 'Available for freelance & remote work.',
                'copyright' => 'Copyright 2026 Youssef Youyou. All rights reserved.',
                'quick_links' => ['Services', 'Projects', 'Experience', 'Technical Notes', 'Contact'],
                'service_links' => ['Laravel APIs', 'React/Next.js', 'Dashboards', 'Deployment'],
            ],
            'is_visible' => true,
        ]);
    }
}
