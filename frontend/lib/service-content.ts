import { projects } from "@/lib/data";

export type ServicePage = {
  slug: string;
  title: string;
  metaDescription: string;
  h1: string;
  focus: string;
  intro: string;
  details: string[];
  process: string[];
  technologies: string[];
  benefits: string[];
  relatedProjectSlugs: string[];
  relatedServiceSlugs: string[];
  faqs: { question: string; answer: string }[];
};

export const servicePages: ServicePage[] = [
  {
    slug: "laravel-developer-morocco",
    title: "Laravel Developer in Morocco | Youssef Youyou",
    metaDescription: "Laravel developer in Morocco building APIs, admin dashboards, authentication, backend systems and business platforms with production-ready structure.",
    h1: "Laravel Developer in Morocco",
    focus: "Laravel APIs, dashboards, backend systems, authentication, admin panels and business platforms.",
    intro: "I build Laravel backends for business platforms that need clean APIs, reliable data models, secure authentication and admin workflows. The goal is not only to make features work, but to make the system maintainable when the business grows.",
    details: [
      "Laravel REST API architecture for React, Next.js and dashboard frontends.",
      "Authentication, authorization, roles, permissions and protected admin modules.",
      "Database structure for HR, inventory, content, order, document and SaaS-style workflows.",
      "Production-minded backend setup with validation, resources, policies, cache handling and deployment support.",
    ],
    process: ["Understand the business workflow and users.", "Design the entities, permissions and API contracts.", "Build Laravel modules with validation and predictable responses.", "Connect the frontend, test core flows and prepare deployment notes."],
    technologies: ["Laravel", "PHP", "MySQL", "REST APIs", "Sanctum", "Policies", "Form Requests", "API Resources", "Nginx"],
    benefits: ["Maintainable backend structure", "Cleaner admin workflows", "Secure user access", "Better API contracts", "Deployment-ready foundation"],
    relatedProjectSlugs: ["erplus", "rifitv", "portfolio-admin-system"],
    relatedServiceSlugs: ["admin-dashboard-development", "saas-development-morocco", "business-automation-morocco"],
    faqs: [
      { question: "Can you build only the Laravel backend?", answer: "Yes. I can build a Laravel API that another frontend team consumes, or I can also handle the React/Next.js interface when full-stack delivery is better." },
      { question: "Do you work with existing Laravel projects?", answer: "Yes. I can review an existing structure, improve routes/controllers/resources, fix production issues and add new dashboard or API features." },
      { question: "Can you add roles and permissions?", answer: "Yes. I structure access around real business roles so admins, managers and team members only see the actions they should use." },
      { question: "Do you deploy Laravel on Ubuntu?", answer: "Yes. I work with Ubuntu, Nginx, PHP-FPM, environment files, cache commands, permissions and Cloudflare-facing deployment details." },
    ],
  },
  {
    slug: "react-nextjs-developer-morocco",
    title: "React & Next.js Developer in Morocco | Youssef Youyou",
    metaDescription: "React and Next.js developer in Morocco building SEO-friendly websites, dashboards, responsive interfaces and frontend apps connected to Laravel APIs.",
    h1: "React & Next.js Developer in Morocco",
    focus: "Modern frontend apps, SEO-friendly Next.js websites, dashboards and responsive interfaces.",
    intro: "I build React and Next.js interfaces for websites, dashboards and business platforms that need speed, clarity and a clean user experience. I focus on frontend structure that supports SEO, accessibility and API-driven workflows.",
    details: [
      "Next.js pages with unique metadata, canonical URLs, Open Graph tags and structured data.",
      "React dashboard components for tables, filters, forms, cards, analytics and admin workflows.",
      "Responsive UI states for mobile, desktop and repeated business use.",
      "Frontend integration with Laravel APIs, validation errors, auth state and loading states.",
    ],
    process: ["Clarify the user journey and conversion goals.", "Map pages, components and data requirements.", "Build responsive UI with reusable patterns.", "Connect APIs, improve metadata and verify mobile behavior."],
    technologies: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "REST APIs", "Vite", "next/image"],
    benefits: ["SEO-friendly pages", "Fast responsive interfaces", "Reusable dashboard components", "Cleaner API integration", "Improved conversion paths"],
    relatedProjectSlugs: ["erplus", "portfolio-admin-system", "social-media-management-saas"],
    relatedServiceSlugs: ["laravel-developer-morocco", "admin-dashboard-development", "freelance-web-developer-morocco"],
    faqs: [
      { question: "Can you build a Next.js website for SEO?", answer: "Yes. I structure titles, meta descriptions, canonical URLs, headings, internal links, sitemap entries and JSON-LD so the site is easier to crawl." },
      { question: "Can React dashboards connect to Laravel?", answer: "Yes. Laravel APIs and React dashboards are one of my main focuses, especially for admin panels and internal business systems." },
      { question: "Do you use TypeScript?", answer: "When the project benefits from stricter contracts, yes. I use TypeScript especially on larger Next.js or dashboard projects." },
      { question: "Can you improve an existing frontend without redesigning it?", answer: "Yes. I can improve content, metadata, accessibility and component structure while respecting the current visual identity." },
    ],
  },
  {
    slug: "admin-dashboard-development",
    title: "Admin Dashboard Development | Laravel & React",
    metaDescription: "Admin dashboard development with Laravel and React for CRUD systems, roles, analytics, HR, inventory and internal business tools.",
    h1: "Admin Dashboard Development",
    focus: "CRUD systems, roles and permissions, analytics, HR, inventory and internal business tools.",
    intro: "I build admin dashboards that help teams manage work instead of fighting spreadsheets, scattered files or unclear processes. A good dashboard should make daily operations easier, safer and more visible.",
    details: [
      "CRUD modules for users, content, products, documents, HR records, inventory and business entities.",
      "Role-based access so each user type sees the right actions and data.",
      "Analytics cards, filters, reports and workflow status views.",
      "Laravel API/backend structure with React, Next.js or Blade interfaces depending on the project.",
    ],
    process: ["Document the current manual workflow.", "Define roles, modules, fields and reporting needs.", "Build core CRUD flows and permission checks.", "Add dashboard summaries, filters and deployment checks."],
    technologies: ["Laravel", "React", "Next.js", "MySQL", "Sanctum", "RBAC", "REST APIs", "Tailwind CSS"],
    benefits: ["Less manual follow-up", "Clearer business data", "Controlled access", "Faster admin operations", "Room for future automation"],
    relatedProjectSlugs: ["erplus", "portfolio-admin-system", "digital-archiving-system"],
    relatedServiceSlugs: ["laravel-developer-morocco", "business-automation-morocco", "saas-development-morocco"],
    faqs: [
      { question: "What kind of dashboard can you build?", answer: "Examples include HR, inventory, client portals, CMS dashboards, document tracking, reporting screens and internal workflow systems." },
      { question: "Can you add export or reporting features?", answer: "Yes. I can prepare filtered views, summary cards and export-ready report structures depending on the business need." },
      { question: "Do dashboards need SEO?", answer: "Private dashboards usually should not be indexed. Public support pages, landing pages and case studies around the product should be SEO-friendly." },
      { question: "Can you replace Excel workflows?", answer: "Often yes, but I start by understanding which spreadsheet parts should become a database, a form, an approval flow or a report." },
    ],
  },
  {
    slug: "saas-development-morocco",
    title: "SaaS Development in Morocco | Laravel, React & Next.js",
    metaDescription: "SaaS development in Morocco with Laravel, React and Next.js for subscriptions, multi-user systems, dashboards, API architecture and business platforms.",
    h1: "SaaS Development in Morocco",
    focus: "Subscriptions, multi-user systems, dashboards, API architecture and business platforms.",
    intro: "I help shape SaaS-style platforms around real business workflows: users, roles, modules, dashboards, API structure and scalable feature growth. The first version should be focused, useful and technically ready to expand.",
    details: [
      "Multi-user architecture with organizations, roles, permissions and protected modules.",
      "Laravel API foundations for accounts, resources, dashboards and business workflows.",
      "React/Next.js interfaces for onboarding, admin areas, settings and reporting.",
      "Subscription-ready structure without making fake claims about billing integrations that are not implemented yet.",
    ],
    process: ["Define the target users and MVP modules.", "Model accounts, roles, entities and permissions.", "Build API-driven workflows and dashboard UI.", "Prepare deployment, SEO pages and future billing/integration roadmap."],
    technologies: ["Laravel", "React", "Next.js", "MySQL", "REST APIs", "Sanctum", "Nginx", "Cloudflare"],
    benefits: ["Cleaner MVP scope", "Multi-user foundation", "Dashboard-driven product UX", "Maintainable API structure", "Future integration readiness"],
    relatedProjectSlugs: ["erplus", "social-media-management-saas", "portfolio-admin-system"],
    relatedServiceSlugs: ["laravel-developer-morocco", "react-nextjs-developer-morocco", "admin-dashboard-development"],
    faqs: [
      { question: "Can you build a SaaS MVP?", answer: "Yes. I can help turn a business workflow into a focused MVP with users, modules, dashboards and API-driven structure." },
      { question: "Do you handle subscriptions?", answer: "I can prepare subscription-ready architecture and integrate billing when the project scope includes a specific provider and payment requirements." },
      { question: "Can the SaaS include admin dashboards?", answer: "Yes. Most SaaS platforms need both customer-facing screens and internal/admin dashboards." },
      { question: "Can you work with Moroccan and international clients?", answer: "Yes. I am based in Morocco and available for remote, freelance and business web projects." },
    ],
  },
  {
    slug: "business-automation-morocco",
    title: "Business Automation Developer in Morocco",
    metaDescription: "Business automation developer in Morocco for internal workflows, Excel/VBA replacement, dashboards, document systems and process digitalization.",
    h1: "Business Automation Developer in Morocco",
    focus: "Automation, internal workflows, Excel/VBA replacement, dashboards and document systems.",
    intro: "I build practical automation for teams that spend too much time on repetitive work, manual reports, document tracking and spreadsheet-heavy workflows. Sometimes the right answer is a web dashboard; sometimes it is a staged move from Excel to a database-backed tool.",
    details: [
      "Workflow analysis for repetitive administrative, HR, inventory, document or reporting tasks.",
      "Excel/VBA automation where a fast internal tool is the most practical first step.",
      "Laravel and React dashboards when collaboration, permissions and central data matter.",
      "Digital archiving and document tracking concepts for administrative teams.",
    ],
    process: ["Observe the current workflow and pain points.", "Identify repeatable inputs, decisions and reports.", "Choose Excel/VBA, Laravel dashboard or hybrid approach.", "Build, test with real scenarios and plan the next improvement."],
    technologies: ["Laravel", "React", "Excel", "VBA", "MySQL", "Dashboards", "Document workflows", "Reporting"],
    benefits: ["Less repetitive work", "Fewer manual errors", "Faster document access", "Clearer reporting", "Better internal visibility"],
    relatedProjectSlugs: ["digital-archiving-system", "excel-vba-automation-tools", "erplus"],
    relatedServiceSlugs: ["admin-dashboard-development", "laravel-developer-morocco", "website-development-nador"],
    faqs: [
      { question: "Can you replace an Excel file with a web app?", answer: "Yes, when collaboration, permissions or central data are needed. I first map the spreadsheet logic to forms, tables and reports." },
      { question: "Do you still build Excel/VBA tools?", answer: "Yes. If a spreadsheet automation solves the business problem quickly and safely, it can be the right first step." },
      { question: "What workflows can be automated?", answer: "Common examples include document tracking, HR records, inventory updates, reports, filters, calculations and recurring admin tasks." },
      { question: "Can automation connect to dashboards?", answer: "Yes. The best internal tools often combine clean data entry, workflow status and dashboard reporting." },
    ],
  },
  {
    slug: "freelance-web-developer-morocco",
    title: "Freelance Web Developer in Morocco | Laravel & React",
    metaDescription: "Freelance web developer in Morocco building custom websites, Laravel and React web apps, small business systems, SEO-ready pages and deployment setups.",
    h1: "Freelance Web Developer in Morocco",
    focus: "Freelance websites, custom web apps, small business systems, SEO and deployment.",
    intro: "I work with businesses that need a serious website, dashboard, portal or custom web application. I focus on clear scope, maintainable implementation and SEO-friendly structure for Moroccan and international projects.",
    details: [
      "Business websites and landing pages with SEO-ready metadata and responsive layouts.",
      "Custom Laravel/React web applications for internal operations and client workflows.",
      "Contact flows, CV/download tracking, admin tools and dashboard modules.",
      "Deployment support with Nginx, SSL, environment configuration and production builds.",
    ],
    process: ["Clarify goals, audience and required pages.", "Plan the content structure, stack and delivery scope.", "Build responsive pages and business workflows.", "Launch with metadata, sitemap, robots and deployment checks."],
    technologies: ["Laravel", "React", "Next.js", "MySQL", "Tailwind CSS", "Nginx", "Cloudflare", "SEO"],
    benefits: ["Business-focused scope", "SEO-friendly pages", "Custom features", "Production deployment support", "Clear communication"],
    relatedProjectSlugs: ["rifitv", "ecommerce-client-portal", "portfolio-admin-system"],
    relatedServiceSlugs: ["website-development-nador", "react-nextjs-developer-morocco", "laravel-developer-morocco"],
    faqs: [
      { question: "Do you build small business websites?", answer: "Yes. I can build SEO-friendly websites, landing pages and custom functionality for service businesses and local brands." },
      { question: "Can you build more than a website?", answer: "Yes. I also build dashboards, APIs, client portals, admin panels and business automation tools." },
      { question: "Are you available remotely?", answer: "Yes. I am based in Morocco and available for remote, freelance and business web projects." },
      { question: "Can you deploy the project?", answer: "Yes. I can prepare production builds, Nginx configuration, SSL, environment setup and Cloudflare-facing details." },
    ],
  },
  {
    slug: "website-development-nador",
    title: "Website Development in Nador | Youssef Youyou",
    metaDescription: "Website development in Nador for local businesses, portfolio sites, landing pages, SEO, admin panels and Laravel or Next.js web platforms.",
    h1: "Website Development in Nador",
    focus: "Local businesses, portfolio sites, landing pages, SEO and admin panels.",
    intro: "I build websites and web platforms for local businesses in Nador and remote clients who need a clear, professional online presence. The focus is practical: content structure, responsive design, technical SEO and business features that help people contact you.",
    details: [
      "Service websites, portfolio sites and landing pages with clear conversion paths.",
      "SEO-friendly structure for local visibility without keyword stuffing.",
      "Admin panels or content workflows when the site needs regular updates.",
      "Laravel, React or Next.js implementation depending on project needs.",
    ],
    process: ["Define the offer, audience and local search intent.", "Write page structure, metadata and CTA flow.", "Build the responsive site and contact path.", "Prepare sitemap, robots, analytics-ready structure and deployment."],
    technologies: ["Next.js", "Laravel", "React", "Tailwind CSS", "SEO", "JSON-LD", "Nginx", "Cloudflare"],
    benefits: ["Professional local presence", "Clear contact flow", "SEO-ready page structure", "Mobile responsiveness", "Maintainable content"],
    relatedProjectSlugs: ["rifitv", "ecommerce-client-portal", "digital-archiving-system"],
    relatedServiceSlugs: ["freelance-web-developer-morocco", "business-automation-morocco", "react-nextjs-developer-morocco"],
    faqs: [
      { question: "Do you build websites for Nador businesses?", answer: "Yes. I can build service websites, landing pages, portfolio sites and custom business tools for local businesses in Nador." },
      { question: "Can the website include an admin panel?", answer: "Yes. If you need to manage content, projects, messages or services, I can add a Laravel-backed admin workflow." },
      { question: "Will the site be mobile-friendly?", answer: "Yes. Responsive layout is part of the build, because most local discovery and contact happens on mobile." },
      { question: "Can you mention Marrakech or Morocco SEO too?", answer: "Yes, where it is relevant and natural. I avoid stuffing city names into pages that do not need them." },
    ],
  },
];

export const servicePageSlugs = servicePages.map((service) => service.slug);

export function getServicePage(slug: string) {
  return servicePages.find((service) => service.slug === slug) ?? null;
}

export function getRelatedProjects(slugs: string[]) {
  return slugs
    .map((slug) => projects.find((project) => project.slug === slug || project.caseStudyUrl === `/projects/${slug}`))
    .filter(Boolean);
}
