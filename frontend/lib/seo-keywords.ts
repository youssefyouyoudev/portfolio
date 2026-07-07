export type SeoKeywordEntry = {
  keyword: string;
  cluster: "Local Nador" | "Morocco" | "City" | "Remote";
  intent: string;
  targetPage: string;
  pageTitle: string;
  metaDescription: string;
  internalLinks: string[];
  relatedProjects: string[];
  relatedBlogPosts: string[];
};

const pageMeta: Record<string, { title: string; description: string }> = {
  "/services/web-developer-nador": {
    title: "Web Developer in Nador | Youssef Youyou",
    description: "Full-stack web developer in Nador building Laravel, React and Next.js websites, dashboards, booking systems, admin panels and business automation tools.",
  },
  "/services/laravel-developer-nador": {
    title: "Laravel Developer in Nador | APIs, Dashboards & Business Platforms",
    description: "Laravel developer in Nador building APIs, admin dashboards, backend systems, authentication, roles, database logic and business platforms.",
  },
  "/services/website-development-nador": {
    title: "Website Development in Nador | Youssef Youyou",
    description: "Website development in Nador for local businesses, portfolio sites, landing pages, SEO, contact forms, admin panels and responsive websites.",
  },
  "/services/business-automation-nador": {
    title: "Business Automation Developer in Nador | Dashboards & Internal Tools",
    description: "Business automation developer in Nador helping teams replace manual workflows with dashboards, document systems and internal tools.",
  },
  "/services/admin-dashboard-developer-nador": {
    title: "Admin Dashboard Developer in Nador | Laravel & React",
    description: "Admin dashboard developer in Nador for CRUD systems, HR, inventory, reporting, document workflows and business management tools.",
  },
  "/services/laravel-developer-morocco": {
    title: "Laravel Developer in Morocco | Youssef Youyou",
    description: "Laravel developer in Morocco building APIs, admin dashboards, authentication, backend systems and business platforms.",
  },
  "/services/react-nextjs-developer-morocco": {
    title: "React & Next.js Developer in Morocco | Youssef Youyou",
    description: "React and Next.js developer in Morocco building SEO websites, dashboards, responsive interfaces and Laravel API frontends.",
  },
  "/services/freelance-web-developer-morocco": {
    title: "Freelance Web Developer in Morocco | Laravel & React",
    description: "Freelance web developer in Morocco building custom websites, dashboards, SaaS MVPs, business systems and SEO-ready pages.",
  },
  "/services/full-stack-developer-morocco": {
    title: "Full-Stack Developer in Morocco | Laravel, React & Next.js",
    description: "Full-stack developer in Morocco for Laravel APIs, React/Next.js frontends, dashboards, SaaS MVPs and production deployment.",
  },
  "/services/admin-dashboard-development": {
    title: "Admin Dashboard Development | Laravel & React",
    description: "Admin dashboard development with Laravel and React for CRUD systems, roles, analytics, HR, inventory and internal tools.",
  },
  "/services/saas-development-morocco": {
    title: "SaaS Development in Morocco | Laravel, React & Next.js",
    description: "SaaS development in Morocco with Laravel, React and Next.js for multi-user systems, dashboards and API architecture.",
  },
  "/services/business-automation-morocco": {
    title: "Business Automation Developer in Morocco",
    description: "Business automation developer in Morocco for internal workflows, Excel/VBA replacement, dashboards and document systems.",
  },
  "/services/website-developer-morocco": {
    title: "Website Developer in Morocco | Business Websites & SEO",
    description: "Website developer in Morocco building business websites, landing pages, SEO-ready content and admin-editable structures.",
  },
  "/services/remote-laravel-developer": {
    title: "Remote Laravel Developer | APIs, Dashboards & Business Platforms",
    description: "Remote Laravel developer for APIs, backend modules, roles, MySQL schemas and production deployment support.",
  },
  "/services/remote-react-developer": {
    title: "Remote React Developer | Dashboards & Next.js Interfaces",
    description: "Remote React developer for dashboards, Next.js interfaces, responsive components and API integration.",
  },
  "/services/nextjs-saas-developer": {
    title: "Next.js SaaS Developer | SEO Pages, Dashboards & Product UI",
    description: "Next.js SaaS developer for marketing pages, product interfaces, metadata, dashboards and conversion flows.",
  },
  "/services/laravel-api-developer": {
    title: "Laravel API Developer | REST APIs, Auth & Dashboards",
    description: "Laravel API developer for REST APIs, authentication, validation, resources, policies, MySQL and dashboard contracts.",
  },
  "/services/react-dashboard-developer": {
    title: "React Dashboard Developer | Admin Panels & Business Tools",
    description: "React dashboard developer for admin panels, forms, filters, tables, reporting screens and Laravel API integration.",
  },
};

const cityPages = {
  Marrakech: "/locations/web-developer-marrakech",
  Casablanca: "/locations/web-developer-casablanca",
  Rabat: "/locations/web-developer-rabat",
  Tangier: "/locations/web-developer-tangier",
  Agadir: "/locations/web-developer-agadir",
  Oujda: "/locations/web-developer-oujda",
  Fez: "/locations/web-developer-fez",
};

function entry(keyword: string, cluster: SeoKeywordEntry["cluster"], targetPage: string, intent: string): SeoKeywordEntry {
  const meta = pageMeta[targetPage] ?? {
    title: `${keyword} | Youssef Youyou`,
    description: `Youssef Youyou is available for ${keyword} projects with Laravel, React, Next.js, dashboards, APIs and business automation.`,
  };

  return {
    keyword,
    cluster,
    intent,
    targetPage,
    pageTitle: meta.title,
    metaDescription: meta.description,
    internalLinks: ["/work-with-me", "/hire-laravel-react-developer", "/projects", "/contact"],
    relatedProjects: ["rifitv", "erplus", "portfolio-admin-system"],
    relatedBlogPosts: ["laravel-api-react-dashboard-architecture", "seo-checklist-laravel-nextjs", "deploy-laravel-nextjs-ubuntu-nginx-pm2"],
  };
}

export const seoKeywordMap: SeoKeywordEntry[] = [
  entry("web developer Nador", "Local Nador", "/services/web-developer-nador", "Hire a local developer for a business website or platform."),
  entry("freelance web developer Nador", "Local Nador", "/services/web-developer-nador", "Find a freelance web developer based in Nador."),
  entry("Laravel developer Nador", "Local Nador", "/services/laravel-developer-nador", "Build Laravel APIs, admin panels and backend systems in Nador."),
  entry("website development Nador", "Local Nador", "/services/website-development-nador", "Build a website or landing page for a Nador business."),
  entry("business automation Nador", "Local Nador", "/services/business-automation-nador", "Replace manual workflows with dashboards or automation."),
  entry("admin dashboard developer Nador", "Local Nador", "/services/admin-dashboard-developer-nador", "Build admin dashboards for local business operations."),
  entry("full-stack developer Nador", "Local Nador", "/nador-full-stack-developer", "Understand Youssef's local Nador full-stack positioning."),
  entry("Laravel developer Morocco", "Morocco", "/services/laravel-developer-morocco", "Hire Laravel backend support in Morocco."),
  entry("React developer Morocco", "Morocco", "/services/react-nextjs-developer-morocco", "Hire React frontend support in Morocco."),
  entry("Next.js developer Morocco", "Morocco", "/services/react-nextjs-developer-morocco", "Build SEO-ready Next.js websites and apps."),
  entry("freelance web developer Morocco", "Morocco", "/services/freelance-web-developer-morocco", "Hire a freelance full-stack web developer in Morocco."),
  entry("full-stack developer Morocco", "Morocco", "/services/full-stack-developer-morocco", "Hire a Laravel, React and Next.js full-stack developer."),
  entry("SaaS developer Morocco", "Morocco", "/services/saas-development-morocco", "Build a SaaS MVP or platform foundation."),
  entry("admin dashboard development Morocco", "Morocco", "/services/admin-dashboard-development", "Build a private admin dashboard or internal tool."),
  entry("business automation Morocco", "Morocco", "/services/business-automation-morocco", "Automate internal business workflows."),
  entry("website developer Morocco", "Morocco", "/services/website-developer-morocco", "Build business websites and landing pages in Morocco."),
  ...Object.entries(cityPages).map(([city, targetPage]) => entry(`web developer ${city}`, "City", targetPage, `Available remotely for businesses in ${city}.`)),
  entry("remote Laravel developer", "Remote", "/services/remote-laravel-developer", "Hire remote Laravel backend support."),
  entry("remote React developer", "Remote", "/services/remote-react-developer", "Hire remote React dashboard/frontend support."),
  entry("Next.js developer for SaaS", "Remote", "/services/nextjs-saas-developer", "Build SaaS marketing pages and product UI."),
  entry("Laravel API developer", "Remote", "/services/laravel-api-developer", "Build REST APIs, auth and dashboard contracts."),
  entry("React dashboard developer", "Remote", "/services/react-dashboard-developer", "Build React admin dashboards and internal tools."),
  entry("SaaS MVP developer", "Remote", "/services/nextjs-saas-developer", "Build a focused SaaS MVP."),
  entry("business automation developer", "Remote", "/services/business-automation-morocco", "Automate business workflows and reporting."),
  entry("admin dashboard developer", "Remote", "/services/admin-dashboard-development", "Build private admin dashboards."),
];
