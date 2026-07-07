export const profile = {
  name: "Youssef Youyou",
  title: "Senior Full-Stack Web Developer",
  heroPromise:
    "I build production-ready Laravel APIs, React/Next.js interfaces, admin dashboards, SaaS platforms, business automation tools, and SEO-friendly websites for businesses.",
  positioning:
    "Senior Laravel & React Developer | Full-Stack Laravel, React & Next.js Developer | API Integration | Admin Dashboards | SaaS | Deployment & SEO",
  location: "Nador, Morocco",
  availability:
    "Available for freelance, remote and business web projects in Morocco and internationally",
  description:
    "I build production-ready Laravel APIs, React/Next.js interfaces, SaaS platforms, dashboards, business automation tools, and SEO-friendly websites for businesses.",
  email: "contact@youssefyouyou.com",
  website: "https://youssefyouyou.com",
  github: "https://github.com/youssefyouyoudev",
  linkedin: "https://linkedin.com/in/youssefyouyoudev",
};

export const stackBadges = ["Laravel", "React", "Next.js", "MySQL", "APIs", "Nginx", "SEO"];

export const proofPoints = [
  "Freelance web, SaaS and microservices projects from 2019-2023",
  "Remote React.js work with MediaTechly London in 2023",
  "Current administrative role at Vectalia Nador with digitalization and IT support experience",
  "Strong fit for dashboards, APIs, portals, internal tools and deployment support",
];

export const stats = [
  { value: "4+", label: "Years project experience", detail: "Freelance web, SaaS and microservices from 2019-2023.", tone: "Production practice" },
  { value: "10+", label: "Practical project types", detail: "Websites, dashboards, SaaS, e-commerce, portals, admin tools, archiving, automation, APIs and support.", tone: "Broad delivery" },
  { value: "6", label: "Technical areas", detail: "Backend, Frontend, Database, DevOps, Security, IT/Admin.", tone: "Full-stack coverage" },
  { value: "4", label: "Languages", detail: "Arabic, French, English and German B1.", tone: "Client communication" },
];

export const skillDistribution = [
  { name: "Backend", value: 90 },
  { name: "Frontend", value: 88 },
  { name: "Database", value: 82 },
  { name: "DevOps", value: 75 },
  { name: "Security", value: 70 },
  { name: "IT/Digitalization", value: 85 },
  { name: "UI/Design", value: 72 },
];

export const timeline = [
  { year: "2019", event: "Freelance web development started" },
  { year: "2021", event: "Full-stack web development foundations" },
  { year: "2023", event: "MediaTechly React remote experience" },
  { year: "2023", event: "Administrative digitalization and IT support" },
  { year: "2026", event: "Full-stack portfolio and production systems focus" },
];

export const services = [
  ["Business websites", "Premium SEO-ready websites for service businesses, agencies and local brands.", "B2B/B2C"],
  ["SaaS platforms", "Multi-user product foundations with dashboards, role structure and analytics-ready modules.", "B2B"],
  ["Admin dashboards", "Operational dashboards for content, users, reports, workflows and internal data.", "B2B"],
  ["E-commerce websites", "Catalogues, carts, orders, client areas, payment structure and reporting.", "B2C/B2B"],
  ["Client portals", "Secure spaces for customers, documents, project statuses and communication.", "B2B/B2C"],
  ["Internal management systems", "Practical tools that reduce manual work and help teams operate faster.", "B2B"],
  ["API integrations", "REST integrations connecting Laravel, React, third-party services and automation flows.", "B2B/B2C"],
  ["Laravel backend development", "Validation, Resources, Policies, Sanctum auth, migrations and clean API contracts.", "B2B/B2C"],
  ["React/Next.js frontend development", "Fast responsive interfaces with accessible components and polished UI states.", "B2B/B2C"],
  ["Database design", "Relational schemas for dashboards, SaaS modules, portals and content systems.", "B2B"],
  ["SEO technical optimization", "Metadata, JSON-LD, sitemaps, semantic HTML, performance and clean slugs.", "B2B/B2C"],
  ["Deployment on Ubuntu/Nginx", "Nginx, PHP-FPM, MySQL, SSL, PM2, env setup and cache optimization.", "B2B"],
  ["IT support and process digitalization", "Helping teams replace repetitive manual work with practical digital workflows.", "B2B"],
  ["Excel/VBA automation", "Forms, calculations, filters, reports and tracking tables for productivity.", "B2B"],
  ["Digital archiving systems", "Searchable document organization, tracking and simple admin-facing interfaces.", "B2B"],
].map(([title, description, tag]) => ({ title, description, tag, slug: title.toLowerCase().replaceAll("/", "").replaceAll(" ", "-") }));

export const skills = {
  "Main stack": ["Laravel", "PHP", "React.js", "Next.js", "Vue.js", "MySQL", "REST APIs", "Tailwind CSS"],
  "Production tools": ["Linux", "Nginx", "Git", "Cloudflare", "Postman", "Production deployment"],
  "Business systems": ["Admin dashboards", "Client portals", "Roles and permissions", "Reporting interfaces", "Relational database design"],
  "Automation support": ["Excel Advanced", "VBA", "Digital archiving", "Workflow automation", "Technical SEO", "OWASP awareness"],
};

export const projects = [
  {
    title: "RiFiTV",
    slug: "rifitv",
    category: "Media platform / football content / streaming-style interface",
    subtitle: "Media Platform - Laravel - Blade - Vite - Nginx",
    shortDescription: "A media-style web platform focused on live TV-style navigation, football content, channel organization and user-friendly access across devices.",
    caseStudyUrl: "/projects/rifitv",
    image: "/images/projects/rifitv-showcase.png",
    imageAlt: "RiFiTV Laravel football media platform dashboard",
    seoTitle: "RiFiTV Case Study | Youssef Youyou Portfolio",
    seoDescription: "Case study for RiFiTV, a Laravel media-style platform focused on content organization, responsive UI, SEO structure and production deployment.",
    stack: ["Laravel", "Blade", "Vite", "JavaScript", "MySQL", "Nginx", "Cloudflare"],
    features: ["Channel and category organization", "Live TV-style interface", "Football/match content structure", "Search and navigation", "Responsive design", "SEO-oriented content sections", "Production deployment experience"],
    businessValue: "Improves user access to media content, creates a more organized viewing experience and supports monetization/SEO structure.",
    problems: ["Improving user navigation", "Organizing media/channel content", "Handling production cache/build issues", "Improving mobile and TV usability", "Optimizing SEO structure without overpromising"],
    businessProblem: "Users need a simple, fast and organized way to browse channels, matches and media content without a confusing interface.",
    solution: "A Laravel-based platform with a responsive UI, categorized content, search, channel/match presentation, SEO-friendly structure and production deployment.",
    myRole: "Full-stack development, UI/UX improvement, Laravel/Blade/Vite implementation, deployment support and production troubleshooting.",
    targetUsers: "Football/media visitors, content platform owners and users browsing across desktop, mobile and TV-style screens.",
    deliverables: ["Laravel content structure", "Mobile-first player interface", "SEO category layout", "Ad placement structure", "Nginx/Cloudflare deployment support"],
    architecture: "Laravel Blade application with Vite assets, channel/content management, SEO-friendly routes, cache-aware production build and Nginx/Cloudflare delivery.",
    impact: "Improved platform usability, content discoverability, monetization readiness and production reliability without overstating traffic or revenue.",
    recruiterSignal: "Shows practical Laravel production work, deployment troubleshooting, SEO thinking and user-experience decisions for a real content platform.",
    learned: "Better understanding of media UI, deployment workflow, production caching, Cloudflare/Nginx behavior and user-first navigation.",
  },
  {
    title: "ERPlus",
    slug: "erplus",
    category: "Business management platform / SaaS / HR / inventory",
    subtitle: "Business Management Platform - Laravel - React - MySQL",
    shortDescription: "A business management platform concept focused on HR workflows, payroll-style features, inventory modules, dashboards and admin control.",
    caseStudyUrl: "/projects/erplus",
    image: "/images/projects/erplus-showcase.png",
    imageAlt: "ERPlus HR and inventory management dashboard",
    seoTitle: "ERPlus Case Study | Youssef Youyou Portfolio",
    seoDescription: "Case study for ERPlus, a Laravel and React business management platform concept for HR workflows, inventory modules, admin dashboards and API-driven structure.",
    stack: ["Laravel", "React", "Vite", "MySQL", "Tailwind CSS", "REST API", "Nginx"],
    features: ["HR module", "Payroll/payslip workflows", "Inventory module", "Admin dashboard", "Authentication", "API-driven frontend", "Reporting interface", "Landing pages"],
    businessValue: "Helps businesses organize internal operations through dashboards, structured workflows and centralized admin control.",
    problems: ["Backend/frontend separation", "API structure", "Asset and build path issues", "HR workflow organization", "Nginx and deployment configuration"],
    businessProblem: "Businesses need one organized system to manage people, processes, HR data, inventory information and operational dashboards.",
    solution: "A Laravel backend and React frontend structure with API-driven modules, admin dashboards, authentication, HR workflows and inventory management.",
    myRole: "Backend/frontend structure, API integration, UI improvements, deployment support, dashboard logic and production issue fixing.",
    targetUsers: "Small business teams, HR/admin users and managers who need clearer operational dashboards.",
    deliverables: ["Laravel API foundation", "React Vite frontend", "Authentication flow", "HR and inventory modules", "Admin dashboard", "Deployment configuration"],
    architecture: "Separated Laravel backend and React frontend, MySQL relational data, protected business modules, reusable dashboard views and Nginx production routing.",
    impact: "Created a clearer SaaS-style foundation for internal workflows, user management and future feature growth.",
    recruiterSignal: "Shows backend/frontend separation, API contracts, authentication, dashboard UX and deployment awareness.",
    learned: "Improved experience with Laravel APIs, React dashboards, SaaS structure, deployment issues and business workflow design.",
  },
  {
    title: "Digital Archiving System",
    slug: "digital-archiving-system",
    category: "Internal tool / document management / digitalization",
    subtitle: "Internal Tool - Vue.js - Document Tracking - Automation",
    shortDescription: "An internal digital archiving concept for organizing, searching, tracking and managing administrative documents more efficiently.",
    caseStudyUrl: "/projects/digital-archiving-system",
    image: "/images/projects/digital-archiving-showcase.png",
    imageAlt: "Digital Archiving System document management dashboard",
    seoTitle: "Digital Archiving System Case Study | Youssef Youyou Portfolio",
    seoDescription: "Case study for a digital archiving system focused on document organization, search, tracking and internal administrative workflow improvement.",
    stack: ["Vue.js", "JavaScript", "Excel/VBA logic", "MySQL concept", "Digital workflow"],
    features: ["Document organization", "Search and filtering", "Status tracking", "Folder/category structure", "Upload/scan concept", "Activity tracking", "Workflow support"],
    businessValue: "Helps teams find documents faster, reduce repetitive administrative work and improve organization.",
    problems: ["Reducing manual search time", "Making document tracking clearer", "Improving administrative workflow", "Structuring files and metadata", "Supporting internal digital transformation"],
    businessProblem: "Manual document handling creates slow search, poor tracking, duplicate work and difficulty following administrative records.",
    solution: "A structured digital archiving interface with document categories, metadata, search, tracking status, workflow support and activity overview.",
    myRole: "Process analysis, UI concept, simple interface development, digitalization support and workflow improvement.",
    targetUsers: "Administrative teams, document managers and internal staff handling recurring files and records.",
    deliverables: ["Document organization logic", "Search interface concept", "Tracking workflow", "Vue.js access UI", "Excel/VBA automation support"],
    architecture: "Simple web interfaces supported by structured data logic and spreadsheet automation where that remains the fastest practical tool.",
    impact: "Supported faster document access, clearer administrative tracking and less repetitive manual work.",
    recruiterSignal: "Shows business-process empathy, IT support context, Vue.js interface work and pragmatic automation thinking.",
    learned: "How to translate real administrative workflow problems into digital tools and simple interfaces.",
  },
  {
    title: "Social Media Management SaaS",
    slug: "social-media-management-saas",
    category: "SaaS / marketing platform / dashboard",
    subtitle: "SaaS Platform - Laravel - React - Analytics",
    shortDescription: "A SaaS platform concept for planning posts, managing multiple accounts, tracking engagement and organizing marketing workflows.",
    caseStudyUrl: "/projects/social-media-management-saas",
    image: "/images/projects/social-media-saas-showcase.png",
    imageAlt: "Social Media Management SaaS Laravel React dashboard",
    seoTitle: "Social Media Management SaaS Case Study | Youssef Youyou Portfolio",
    seoDescription: "Case study for a Laravel and React social media management SaaS concept with scheduling, analytics widgets, account management and team workflow.",
    stack: ["Laravel", "React", "MySQL", "Tailwind CSS", "Redis concept", "API"],
    features: ["Content calendar", "Scheduled posts", "Account management", "Campaign cards", "Analytics dashboard", "Team workflow", "Responsive interface"],
    businessValue: "Supports content planning, campaign visibility and better marketing workflow organization.",
    problems: ["Designing clean dashboard structure", "Organizing multi-account workflow", "Presenting analytics clearly", "Planning SaaS-style modules", "Creating reusable UI patterns"],
    businessProblem: "Small teams need a shared place to plan content, schedule posts and review simple performance signals.",
    solution: "A Laravel and React-based SaaS dashboard concept with calendar planning, scheduled posts, analytics widgets, account management and team workflow.",
    myRole: "Full-stack concept, dashboard design, Laravel/React structure, responsive UI and SaaS workflow planning.",
    targetUsers: "Marketing teams, agencies, content managers and small businesses managing recurring campaigns.",
    deliverables: ["Multi-user SaaS structure", "Scheduling module concept", "Analytics dashboard", "Responsive React UI", "Laravel data model"],
    architecture: "Laravel and MySQL backend with account/workspace style entities, React dashboard UI and a structure ready for integrations.",
    impact: "Turned a marketing workflow into a clearer SaaS concept with room for automation, analytics and team roles.",
    recruiterSignal: "Shows SaaS thinking, multi-user modeling, dashboard planning and product workflow design.",
    learned: "Improved dashboard design, SaaS module planning and analytics UI structure.",
  },
  {
    title: "E-commerce / Client Portal Systems",
    slug: "ecommerce-client-portal",
    category: "E-commerce / client portals / business web apps",
    subtitle: "Web Applications - Laravel - MySQL - Payments",
    shortDescription: "A web application concept for product catalogs, carts, orders, client dashboards, payment workflows and admin reporting.",
    caseStudyUrl: "/projects/ecommerce-client-portal",
    image: "/images/projects/ecommerce-client-portal-showcase.png",
    imageAlt: "E-commerce client portal Laravel project dashboard",
    seoTitle: "E-commerce Client Portal Systems Case Study | Youssef Youyou Portfolio",
    seoDescription: "Case study for e-commerce and client portal systems focused on product catalogs, order flows, client dashboards, admin reporting and Laravel logic.",
    stack: ["Laravel", "Blade", "Vite", "MySQL", "Tailwind CSS", "Payment workflow concept"],
    features: ["Product catalog", "Cart and order management", "Client dashboard", "Order tracking", "Payment method structure", "Admin overview", "Reporting and analytics"],
    businessValue: "Helps businesses sell online, manage customer orders and provide clients with a clear portal experience.",
    problems: ["Organizing client/admin flows", "Structuring orders and products", "Designing clean checkout logic", "Creating dashboard/reporting views", "Improving user-friendly navigation"],
    businessProblem: "Businesses need online sales systems that are easy for customers to use and easy for admins to manage.",
    solution: "A Laravel-based e-commerce/client portal structure with product listings, cart/order flow, client area, admin dashboard and reporting widgets.",
    myRole: "Full-stack development concept, database structure, Laravel logic, UI planning, admin/client workflow design.",
    targetUsers: "Business owners, online customers, admin teams and clients who need a self-service portal.",
    deliverables: ["Catalogue and cart flow", "Order management", "Client area", "Role and permission structure", "Reporting dashboard"],
    architecture: "Laravel/PHP and MySQL commerce modules with admin controls, customer-facing pages and reporting-friendly data structure.",
    impact: "Reduced manual sales handling and made client/order operations easier to manage from one system.",
    recruiterSignal: "Shows e-commerce workflow knowledge, RBAC awareness, relational modeling and admin dashboard delivery.",
    learned: "Better understanding of commerce flows, admin tools, customer portals and conversion-focused UI.",
  },
  {
    title: "Excel/VBA Automation Tools",
    slug: "excel-vba-automation-tools",
    category: "Automation / reporting / productivity",
    subtitle: "Automation - Reporting - Productivity - VBA",
    shortDescription: "A set of Excel/VBA automation concepts for reports, dashboards, forms, filters, calculations and repetitive workflow reduction.",
    caseStudyUrl: "/projects/excel-vba-automation-tools",
    image: "/images/projects/excel-vba-automation-showcase.png",
    imageAlt: "Excel VBA automation reporting dashboard",
    seoTitle: "Excel/VBA Automation Tools Case Study | Youssef Youyou Portfolio",
    seoDescription: "Case study for Excel and VBA automation tools focused on reports, forms, filters, calculations and administrative productivity workflows.",
    stack: ["Excel", "VBA", "Power Query", "Power Pivot", "Charts", "Automation logic"],
    features: ["Smart forms", "Automated calculations", "Dynamic reports", "Filters", "Tracking tables", "Dashboard charts", "Workflow automation", "Export/report tools"],
    businessValue: "Saves time, reduces manual errors and improves productivity for administrative workflows.",
    problems: ["Reducing repetitive tasks", "Improving report consistency", "Making data easier to filter", "Simplifying administrative tracking", "Improving accuracy and time management"],
    businessProblem: "Teams often need immediate automation before a full web app is justified, especially around reports, forms and recurring calculations.",
    solution: "Excel/VBA automation tools with forms, dynamic reports, dashboards, filters, tracked tables and workflow automation.",
    myRole: "Excel/VBA automation, workflow analysis, reporting logic, form creation and administrative productivity improvement.",
    targetUsers: "Administrative teams, operations users and staff working with recurring reports or spreadsheet-heavy workflows.",
    deliverables: ["Excel forms", "VBA calculations", "Filtering tools", "Report tables", "Tracking workflows"],
    architecture: "Advanced Excel and VBA business logic organized around repeatable inputs, controlled calculations and report-ready outputs.",
    impact: "Cut repetitive admin effort and created a bridge from spreadsheet work to future web applications.",
    recruiterSignal: "Shows practical automation, user support, workflow analysis and the ability to solve business problems with the right tool.",
    learned: "How automation can create quick business value even without a full web app.",
  },
];

export const experiences = [
  {
    role: "Agent Administrative",
    company: "Vectalia Nador",
    date: "September 2023 - Present",
    location: "Nador, Morocco",
    points: [
      "Participated in administrative digitalization through internal IT tools.",
      "Improved digital archiving systems for organizing, searching and tracking documents.",
      "Created simple Vue.js interfaces to improve data access.",
      "Automated repetitive tasks with Excel Advanced and VBA.",
      "Provided first-level IT support and helped interns with tools, workflows and good practices.",
    ],
  },
  {
    role: "Web Developer",
    company: "MediaTechly - London, UK",
    date: "July 2023 - September 2023",
    location: "100% remote",
    points: [
      "Developed modern React.js interfaces.",
      "Improved frontend maintainability with component-based architecture.",
      "Optimized performance with lazy loading and code splitting.",
      "Improved responsive design and accessibility.",
    ],
  },
  {
    role: "Freelance Web Developer - Web, SaaS & Microservices",
    date: "June 2019 - June 2023",
    location: "Nador, Morocco / Remote",
    points: [
      "Built websites, management applications, admin dashboards and client portals.",
      "Created Laravel, PHP, React.js, JavaScript, MySQL and REST API solutions.",
      "Built authentication, notifications, user management, roles and permissions.",
      "Created e-commerce and early SaaS features with multi-user management and dashboards.",
    ],
  },
];

export const blogPosts = [
  {
    title: "How I Deploy Laravel and Next.js on Ubuntu with Nginx, PM2 and SSL",
    slug: "deploy-laravel-nextjs-ubuntu-nginx-pm2-ssl",
    category: "Deployment",
    excerpt: "A practical production checklist for deploying a Laravel API and Next.js frontend on Ubuntu with Nginx, PM2, SSL, env files and cache commands.",
    seoTitle: "Deploy Laravel and Next.js on Ubuntu with Nginx, PM2 and SSL",
    seoDescription: "Practical guide to deploying Laravel and Next.js on Ubuntu using Nginx, PM2, SSL, production builds, Laravel cache commands and rollback checks.",
    points: [
      "Keep Laravel API and Next.js frontend in separate production directories.",
      "Use Nginx server blocks for the frontend and API hostnames.",
      "Run Laravel cache and permission commands after every deployment.",
      "Use PM2 for the Next.js process and Certbot or Cloudflare SSL for HTTPS.",
    ],
    sections: [
      {
        heading: "Production structure",
        body: [
          "I prefer a clear split between the Laravel backend and the Next.js frontend. The Laravel app owns API routes, database access, queues and admin logic. The Next.js app owns public SEO pages, metadata, Open Graph previews and user-facing React interfaces. That separation makes debugging easier when an asset, route or cache issue appears after deployment.",
          "A typical Ubuntu layout uses one directory for the API and one for the frontend. Environment files stay out of Git. Public uploads and Laravel storage permissions are handled deliberately, not fixed by giving everything unsafe permissions.",
        ],
        code: "cd /var/www/api.youssefyouyou.com\ncomposer install --no-dev --optimize-autoloader\nphp artisan migrate --force\nphp artisan storage:link\nphp artisan optimize:clear\nphp artisan config:cache\nphp artisan route:cache\nphp artisan view:cache",
      },
      {
        heading: "Next.js build and PM2",
        body: [
          "For the frontend, I build with production environment variables already set. If the frontend consumes a Laravel API, `NEXT_PUBLIC_API_URL` must point to the real API domain before `npm run build`. After the build passes, PM2 keeps the Next.js process alive and can restart it during future deploys.",
        ],
        code: "cd /var/www/youssefyouyou.com\nnpm ci\nNEXT_PUBLIC_API_URL=https://api.youssefyouyou.com npm run build\npm2 start npm --name portfolio-frontend -- start\npm2 save",
      },
      {
        heading: "Nginx and SSL checks",
        body: [
          "Nginx should proxy the frontend to the Next.js port and send the API host to PHP-FPM through Laravel's public directory. I check `nginx -t` before every reload, then verify the site in the browser, including API calls, images, sitemap and robots output.",
          "Common errors include 502 from a stopped PM2 process, 404 assets from a wrong build path, Laravel 500 errors from missing `.env` values, and mixed content when HTTPS is active but an API URL still uses HTTP.",
        ],
        code: "sudo nginx -t\nsudo systemctl reload nginx\npm2 status\ncurl -I https://youssefyouyou.com\ncurl -I https://youssefyouyou.com/sitemap.xml",
      },
      {
        heading: "Final deployment checklist",
        body: [
          "Before calling a deployment complete, I confirm that the homepage loads, contact form requests reach Laravel, `/sitemap.xml` and `/robots.txt` are public, admin/API/private routes are not indexed, Laravel logs are clean, and mobile layout still works after the production build.",
        ],
      },
    ],
    checklist: ["Build passes on the server", "PM2 process is online", "Nginx config test passes", "SSL works on frontend and API", "Laravel cache is rebuilt", "Sitemap and robots are reachable"],
    relatedProjects: ["rifitv", "erplus"],
    relatedServices: ["laravel-developer-morocco", "react-nextjs-developer-morocco"],
  },
  {
    title: "Laravel API + React Dashboard Architecture for Business Platforms",
    slug: "laravel-api-react-dashboard-architecture-business-platforms",
    category: "Dashboards",
    excerpt: "How I structure Laravel APIs and React dashboards for business platforms that need roles, modules, filters, reports and maintainable growth.",
    seoTitle: "Laravel API + React Dashboard Architecture for Business Platforms",
    seoDescription: "Practical architecture notes for Laravel API and React dashboard business platforms with modules, roles, validation, resources, filters and reporting.",
    points: [
      "Start with business entities before designing screens.",
      "Use Laravel Form Requests and API Resources for predictable contracts.",
      "Build React dashboard components around repeated workflows.",
      "Keep permissions, filters and reports part of the architecture from the start.",
    ],
    sections: [
      {
        heading: "Start from the workflow",
        body: [
          "A dashboard should not begin as a collection of pretty cards. It should begin with the real work: who logs in, what they manage, what they need to approve, what data they search, and what reports help them make decisions. For a business platform like ERPlus, that means thinking about HR, inventory, payroll-style flows, roles and dashboard summaries before building the UI.",
          "I map entities first: users, roles, employees, stock items, documents, settings, reports and audit-worthy actions. Once those entities are clear, routes and screens become more stable.",
        ],
      },
      {
        heading: "Laravel API layer",
        body: [
          "Laravel works well as the backend for business dashboards because validation, policies, resources and migrations give the project a clean structure. I keep public endpoints separate from authenticated admin endpoints and make API responses predictable so React components do not depend on accidental database shape.",
        ],
        code: "Route::middleware('auth:sanctum')->prefix('admin')->group(function () {\n    Route::apiResource('employees', EmployeeController::class);\n    Route::apiResource('inventory-items', InventoryItemController::class);\n    Route::get('dashboard/summary', DashboardSummaryController::class);\n});",
      },
      {
        heading: "React dashboard layer",
        body: [
          "On the frontend, repeated patterns matter: data tables, filters, forms, status badges, empty states, loading states and error messages. Reusable components make the platform easier to extend when a new module appears.",
          "The dashboard should handle API errors clearly. A validation error should attach to a field, a permission error should explain access limits, and a loading state should not shift the whole layout.",
        ],
      },
      {
        heading: "Common architecture mistakes",
        body: [
          "The biggest mistakes are mixing admin and public routes, returning raw models without resources, skipping permission rules, and building one-off React screens that cannot be reused. Another common issue is treating reports as an afterthought even though business users often judge the platform by how quickly they can understand the data.",
        ],
      },
    ],
    checklist: ["Entities are mapped", "API routes are protected", "Responses use resources", "Forms handle validation", "Permissions are tested", "Dashboard states are reusable"],
    relatedProjects: ["erplus", "portfolio-admin-system"],
    relatedServices: ["admin-dashboard-development", "laravel-developer-morocco"],
  },
  {
    title: "How to Fix Vite Build Assets Not Loading in Production",
    slug: "fix-vite-build-assets-not-loading-production",
    category: "Deployment",
    excerpt: "A practical guide to diagnosing Vite production asset issues in Laravel, React and Blade projects, including manifest paths, base URLs, caches and Nginx config.",
    seoTitle: "How to Fix Vite Build Assets Not Loading in Production",
    seoDescription: "Fix Vite production assets not loading in Laravel or React projects with manifest checks, build paths, base URLs, cache clearing and Nginx/static file debugging.",
    points: [
      "Check whether assets were built and uploaded to the expected directory.",
      "Verify Laravel's Vite manifest and Nginx public root.",
      "Clear Laravel and browser/CDN caches after deployment.",
      "Inspect the network tab for 404, MIME type or mixed-content errors.",
    ],
    sections: [
      {
        heading: "Start with the network error",
        body: [
          "When Vite assets fail in production, the browser usually tells you the real category of the issue. A 404 means the file path is wrong or the build files are missing. A MIME type error often means Nginx is returning an HTML 404 page where JavaScript was expected. A mixed-content error means the page is HTTPS but an asset or API URL is HTTP.",
        ],
      },
      {
        heading: "Laravel Vite checks",
        body: [
          "For Laravel Blade projects, `@vite()` reads the production manifest from the build output. If the manifest is missing, stale or deployed to the wrong folder, Laravel cannot generate the correct asset URLs. I check the build folder, manifest file and public root before changing code.",
        ],
        code: "npm run build\nls -la public/build\nphp artisan optimize:clear\nphp artisan view:clear",
      },
      {
        heading: "React/Vite base path checks",
        body: [
          "For React/Vite apps, `base` in `vite.config.js` matters when the app is served from a subdirectory. If the app is served from the domain root, the default is usually fine. If assets appear as `/assets/...` but the app lives under another path, the base needs to match the deployment path.",
        ],
        code: "export default defineConfig({\n  plugins: [react()],\n  base: '/',\n});",
      },
      {
        heading: "Nginx and cache issues",
        body: [
          "Nginx must serve static files from the correct public directory. Cloudflare can also keep old files briefly, so after a build-path fix I purge or bypass cache for testing. I also verify that old HTML is not pointing to asset hashes that no longer exist.",
        ],
      },
    ],
    checklist: ["Build folder exists", "Manifest exists", "Nginx root is correct", "Laravel caches cleared", "Cloudflare cache checked", "Browser network errors reviewed"],
    relatedProjects: ["rifitv", "erplus"],
    relatedServices: ["laravel-developer-morocco", "freelance-web-developer-morocco"],
  },
  {
    title: "SEO Checklist for Laravel and Next.js Websites",
    slug: "seo-checklist-laravel-nextjs-websites",
    category: "SEO",
    excerpt: "A practical SEO checklist for Laravel and Next.js websites covering metadata, headings, JSON-LD, sitemap, robots, image alt text, internal links and performance.",
    seoTitle: "SEO Checklist for Laravel and Next.js Websites",
    seoDescription: "Technical SEO checklist for Laravel and Next.js websites: metadata, canonical URLs, headings, JSON-LD, sitemap, robots, image SEO, internal links and performance.",
    points: [
      "Every indexable page needs a unique title, description, H1 and canonical URL.",
      "Use JSON-LD for Person, WebSite, ProfilePage, BlogPosting and project schemas.",
      "Generate sitemap and robots files that include public pages and exclude admin routes.",
      "Add descriptive alt text and use optimized images for important visuals.",
    ],
    sections: [
      {
        heading: "Metadata and headings",
        body: [
          "The first SEO pass is simple but important: one clear H1 per page, unique title, unique meta description and a canonical URL. Service pages should target one search intent each. Project pages should explain the problem, stack, role and business value. Blog posts should answer practical developer questions with enough detail to be useful.",
        ],
      },
      {
        heading: "Structured data",
        body: [
          "JSON-LD helps search engines understand who the site represents and what each page is about. A portfolio homepage can use Person, WebSite and ProfilePage. Project pages can use CreativeWork or SoftwareApplication. Technical articles can use BlogPosting. FAQ sections on service pages can use FAQPage schema.",
        ],
        code: "{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"Person\",\n  \"name\": \"Youssef Youyou\",\n  \"jobTitle\": \"Senior Full-Stack Web Developer\",\n  \"url\": \"https://youssefyouyou.com\"\n}",
      },
      {
        heading: "Sitemap, robots and private routes",
        body: [
          "The sitemap should include the homepage, projects, blog posts, service pages and contact page. Robots should allow normal crawling but disallow admin, API and private routes that are not meant to appear in search results.",
        ],
      },
      {
        heading: "Image and internal-link SEO",
        body: [
          "Important images need descriptive alt text that explains the real subject, not generic words like screenshot. Internal links should connect services, projects and articles so visitors and crawlers can move through the site naturally.",
        ],
      },
    ],
    checklist: ["Unique title", "Unique meta description", "One H1", "Canonical URL", "JSON-LD", "Sitemap entry", "Robots rules", "Image alt text"],
    relatedProjects: ["portfolio-admin-system", "rifitv"],
    relatedServices: ["freelance-web-developer-morocco", "react-nextjs-developer-morocco"],
  },
  {
    title: "Building Admin Dashboards with Laravel, React and Role Permissions",
    slug: "building-admin-dashboards-laravel-react-role-permissions",
    category: "Dashboards",
    excerpt: "How I approach admin dashboards with Laravel, React, role permissions, CRUD modules, validation, audit-friendly actions and business reporting.",
    seoTitle: "Building Admin Dashboards with Laravel, React and Role Permissions",
    seoDescription: "Guide to admin dashboard development with Laravel, React, roles, permissions, CRUD modules, validation, protected routes and business reporting.",
    points: [
      "Define roles around real team responsibilities.",
      "Protect routes in Laravel and hide unavailable actions in React.",
      "Design CRUD flows with validation, empty states and useful filters.",
      "Add reporting and audit-friendly details where business risk exists.",
    ],
    sections: [
      {
        heading: "Roles before screens",
        body: [
          "Role permissions should come before interface polish. An HR user, inventory manager and owner do not need the same actions. When roles are clear, the dashboard can show fewer decisions to each person and reduce mistakes.",
        ],
      },
      {
        heading: "Laravel permission layer",
        body: [
          "In Laravel, policies and middleware keep rules close to the backend. React can hide unavailable buttons, but Laravel still needs to enforce permission checks because frontend checks alone are not security.",
        ],
        code: "public function update(User $user, Employee $employee): bool\n{\n    return $user->hasRole('admin') || $user->can('employees.update');\n}",
      },
      {
        heading: "React UX for admin work",
        body: [
          "Admin users repeat the same actions many times. Forms should preserve context after errors, tables should offer useful filters, and destructive actions should be confirmed. Loading states should keep dimensions stable so dashboards feel reliable.",
        ],
      },
      {
        heading: "Business reporting",
        body: [
          "A dashboard becomes more valuable when it summarizes work: totals, pending items, recent changes, inventory warnings, HR status or document queues. The reporting does not need to be complex at first; it needs to answer the team's daily questions.",
        ],
      },
    ],
    checklist: ["Roles defined", "Policies added", "Routes protected", "React actions conditionally shown", "CRUD validation handled", "Reports answer real questions"],
    relatedProjects: ["erplus", "digital-archiving-system"],
    relatedServices: ["admin-dashboard-development", "business-automation-morocco"],
  },
  {
    title: "How I Structure SaaS Projects with Laravel API and React Frontend",
    slug: "structure-saas-projects-laravel-api-react-frontend",
    category: "SaaS",
    excerpt: "A practical SaaS structure for Laravel API and React frontend projects, covering users, organizations, modules, dashboards, subscriptions-ready design and deployment.",
    seoTitle: "How I Structure SaaS Projects with Laravel API and React Frontend",
    seoDescription: "Practical SaaS architecture with Laravel API and React frontend: organizations, users, roles, modules, dashboards, subscription-ready design and deployment.",
    points: [
      "Model users, organizations and roles early.",
      "Keep SaaS modules focused around the MVP workflow.",
      "Separate public marketing pages from authenticated product screens.",
      "Plan billing and integrations without pretending they are finished before they exist.",
    ],
    sections: [
      {
        heading: "The SaaS foundation",
        body: [
          "A SaaS project needs more than a login and dashboard. It needs an account model, user roles, ownership rules, settings, onboarding, module boundaries and a path for future billing or integrations. I prefer to build the first version around one strong workflow instead of spreading the MVP across too many unfinished features.",
        ],
      },
      {
        heading: "Laravel API modules",
        body: [
          "The Laravel API should separate organization-aware resources from global admin resources. For example, a workspace user can manage their records, while a platform admin can see broader system settings. This prevents future permission problems when the product grows.",
        ],
        code: "organizations/{organization}/members\norganizations/{organization}/dashboard\norganizations/{organization}/settings\nadmin/platform/users",
      },
      {
        heading: "React frontend structure",
        body: [
          "The React frontend usually has public pages, auth pages, onboarding, dashboard modules and settings. Each product module should own its table, form and detail views, while shared components handle buttons, fields, badges, modals and empty states.",
        ],
      },
      {
        heading: "Future improvements",
        body: [
          "After the MVP works, the next improvements are usually billing integration, email notifications, audit logs, exportable reports, analytics and admin support tools. Planning for those features early is useful, but shipping a focused production-ready core matters more.",
        ],
      },
    ],
    checklist: ["Account model exists", "Roles and ownership rules are clear", "Public and app routes are separated", "Modules match MVP scope", "Deployment plan exists", "Future billing path is documented"],
    relatedProjects: ["erplus", "social-media-management-saas"],
    relatedServices: ["saas-development-morocco", "laravel-developer-morocco"],
  },
];
