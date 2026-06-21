export const profile = {
  name: "Youssef Youyou",
  title: "Junior Full-Stack Web Developer",
  heroPromise:
    "I turn business workflows into Laravel + React systems: dashboards, APIs, portals, SEO-ready platforms and deployment-ready products.",
  positioning:
    "Laravel Backend Developer | React/Next.js Frontend Developer | API Integration | Admin Dashboards | SaaS | B2B/B2C Web Platforms | Deployment & SEO",
  location: "Nador, Morocco",
  availability:
    "Available for freelance, remote, Marrakech & Morocco opportunities",
  description:
    "I build modern Laravel, React/Next.js, API-driven, SEO-ready and production-deployed web platforms for businesses, startups, and digital projects.",
  email: "contact@youssefyouyou.com",
  website: "https://youssefyouyou.com",
  github: "https://github.com/youssefyouyoudev",
  linkedin: "https://linkedin.com/in/youssefyouyoudev",
};

export const stackBadges = ["Laravel", "React", "Next.js", "MySQL", "APIs", "Nginx", "SEO"];

export const proofPoints = [
  "Freelance web, SaaS and microservices projects from 2019-2023",
  "Remote React.js work with MediaTechly London in 2023",
  "Current administrative digitalization and IT support experience",
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
  { year: "2021", event: "Full-stack digital development studies" },
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
  Backend: ["Laravel", "PHP", "Node.js", "Express.js", "REST APIs"],
  Frontend: ["React.js", "Next.js", "Vue.js", "JavaScript ES6+", "HTML5", "CSS3", "Tailwind CSS"],
  Database: ["MySQL", "PostgreSQL", "Relational database design"],
  DevOps: ["Linux", "Nginx", "Git", "Production deployment"],
  Security: ["2FA", "RBAC", "Secured APIs", "OWASP best practices"],
  Tools: ["GitHub/GitLab", "Jira", "Trello", "Slack", "Postman"],
  "IT/Admin": ["Excel Advanced", "VBA", "Digital archiving", "Automation", "IT support"],
  Design: ["Posters", "Visual supports", "Professional documents", "Simple UI"],
};

export const projects = [
  {
    title: "RiFiTV",
    slug: "rifitv",
    category: "Media platform / football / streaming-style platform / SEO content",
    stack: ["Laravel", "Blade", "Vite", "JavaScript", "Nginx", "Cloudflare"],
    features: ["Channel management", "Live player UI", "Search and categories", "SEO football/news structure", "Ad integration", "Production deployment", "Cloudflare/Nginx experience"],
    businessValue: "A media-style platform designed for users who need simple access, fast navigation and monetization structure.",
    problems: ["UI/UX improvement", "Player experience", "Production cache/build issues", "SEO structure", "Monetization layout", "Mobile/TV usability"],
    businessProblem: "Football/media users need fast access to content on mobile and TV-like screens, while the owner needs SEO structure, ad areas and stable deployment.",
    deliverables: ["Laravel content structure", "Mobile-first player interface", "SEO category layout", "Ad placement structure", "Nginx/Cloudflare deployment support"],
    architecture: "Laravel Blade application with Vite assets, channel/content management, SEO-friendly routes, cache-aware production build and Nginx/Cloudflare delivery.",
    impact: "Improved platform usability, content discoverability, monetization readiness and production reliability without overstating traffic or revenue.",
    recruiterSignal: "Shows practical Laravel production work, deployment troubleshooting, SEO thinking and user-experience decisions for a real content platform.",
  },
  {
    title: "ERPlus",
    slug: "erplus",
    category: "SaaS / business management / HR / inventory",
    stack: ["Laravel backend", "React Vite frontend", "MySQL"],
    features: ["HR module", "Payroll/payslip features", "Inventory module", "Admin dashboard", "Authentication", "API integration", "Landing pages", "Deployment"],
    businessValue: "A business management system focused on internal productivity, HR workflows, admin control and scalable SaaS structure.",
    problems: ["Backend/frontend separation", "API architecture", "Asset/build issues", "HR workflow improvement", "Production deployment", "Nginx configuration"],
    businessProblem: "Internal teams need one structured system for HR, payroll, inventory and admin control instead of disconnected files and manual follow-up.",
    deliverables: ["Laravel API foundation", "React Vite frontend", "Authentication flow", "HR and inventory modules", "Admin dashboard", "Deployment configuration"],
    architecture: "Separated Laravel backend and React frontend, MySQL relational data, protected business modules, reusable dashboard views and Nginx production routing.",
    impact: "Created a clearer SaaS-style foundation for internal workflows, user management and future feature growth.",
    recruiterSignal: "Shows backend/frontend separation, API contracts, authentication, dashboard UX and deployment awareness.",
  },
  {
    title: "Digital Archiving System",
    slug: "digital-archiving-system",
    category: "Internal tool / digitalization / administration",
    stack: ["Vue.js", "JavaScript", "Excel/VBA", "Database logic"],
    features: ["Document organization", "Search", "Tracking", "Digital workflow", "Administrative productivity"],
    businessValue: "Reduced manual work, improved document access and supported administrative digital transformation.",
    problems: ["Manual document lookup", "Unclear tracking", "Repetitive administration", "Data access friction"],
    businessProblem: "Administrative teams lose time when documents are difficult to search, track and organize across manual processes.",
    deliverables: ["Document organization logic", "Search interface concept", "Tracking workflow", "Vue.js access UI", "Excel/VBA automation support"],
    architecture: "Simple web interfaces supported by structured data logic and spreadsheet automation where that remains the fastest practical tool.",
    impact: "Supported faster document access, clearer administrative tracking and less repetitive manual work.",
    recruiterSignal: "Shows business-process empathy, IT support context, Vue.js interface work and pragmatic automation thinking.",
  },
  {
    title: "Social Media Management SaaS",
    slug: "social-media-management-saas",
    category: "SaaS / B2B / marketing",
    stack: ["Laravel", "React.js", "MySQL"],
    features: ["Account management", "Post scheduling", "Analytics dashboard", "Responsive interface", "Multi-user structure"],
    businessValue: "Designed to help businesses manage content planning and social media workflows.",
    problems: ["Scattered planning", "Manual scheduling", "Low visibility into content performance", "Multi-user coordination"],
    businessProblem: "Small teams need a shared place to plan content, schedule posts and review simple performance signals.",
    deliverables: ["Multi-user SaaS structure", "Scheduling module concept", "Analytics dashboard", "Responsive React UI", "Laravel data model"],
    architecture: "Laravel and MySQL backend with account/workspace style entities, React dashboard UI and a structure ready for integrations.",
    impact: "Turned a marketing workflow into a clearer SaaS concept with room for automation, analytics and team roles.",
    recruiterSignal: "Shows SaaS thinking, multi-user modeling, dashboard planning and product workflow design.",
  },
  {
    title: "E-commerce / Client Portal Systems",
    slug: "e-commerce-client-portal-systems",
    category: "B2C / B2B commerce",
    stack: ["Laravel", "PHP", "JavaScript", "MySQL"],
    features: ["Product catalogue", "Cart", "Orders", "Payment structure", "Client area", "Roles and permissions", "Reporting", "Admin dashboard"],
    businessValue: "Helps businesses sell online, manage clients and track operations.",
    problems: ["Manual sales flow", "Unstructured client management", "Order tracking", "Admin visibility"],
    businessProblem: "Businesses need a reliable way to present products, manage orders and give clients a structured self-service area.",
    deliverables: ["Catalogue and cart flow", "Order management", "Client area", "Role and permission structure", "Reporting dashboard"],
    architecture: "Laravel/PHP and MySQL commerce modules with admin controls, customer-facing pages and reporting-friendly data structure.",
    impact: "Reduced manual sales handling and made client/order operations easier to manage from one system.",
    recruiterSignal: "Shows e-commerce basics, RBAC awareness, relational modeling and admin dashboard delivery.",
  },
  {
    title: "Excel/VBA Automation Tools",
    slug: "excel-vba-automation-tools",
    category: "Automation / internal productivity",
    stack: ["Excel Advanced", "VBA", "Business logic"],
    features: ["Forms", "Calculations", "Filters", "Reports", "Tracking tables"],
    businessValue: "Reduced repetitive work and improved administrative productivity.",
    problems: ["Repetitive calculations", "Manual reports", "Data filtering friction", "Inconsistent tracking"],
    businessProblem: "Teams often need immediate automation before a full web app is justified, especially around reports, forms and recurring calculations.",
    deliverables: ["Excel forms", "VBA calculations", "Filtering tools", "Report tables", "Tracking workflows"],
    architecture: "Advanced Excel and VBA business logic organized around repeatable inputs, controlled calculations and report-ready outputs.",
    impact: "Cut repetitive admin effort and created a bridge from spreadsheet work to future web applications.",
    recruiterSignal: "Shows practical automation, user support, workflow analysis and the ability to solve business problems with the right tool.",
  },
];

export const experiences = [
  {
    role: "Agent Administratif & Support Informatique",
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

export const education = [
  ["Technicien Specialise en Developpement Digital - Option Web Full-Stack", "ISTA Nador, OFPPT", "2021 - 2023", "Equivalent BTS / application developer."],
  ["Baccalaureat Sciences et Technologies Electriques - Option Reseaux et Maintenance", "2020 - 2021", "Infrastructure IT, networks and hardware maintenance basics."],
];

export const certifications = ["Sales and Business Development - 2023", "Cybersecurity - 2022", "Artificial Intelligence and Machine Learning - 2021"];
export const languages = ["Arabic: Native", "French: Good level", "English: Good level", "German: B1"];

export const blogPosts = [
  "How I build Laravel and React dashboards",
  "Why businesses need internal digitalization",
  "Building admin panels with Laravel and Filament",
  "API integration best practices",
  "From Excel automation to web applications",
].map((title) => ({
  title,
  slug: title.toLowerCase().replaceAll(" ", "-"),
  excerpt: "Practical notes about production-minded web platforms, dashboards, APIs and business workflows.",
}));
