export type AuthorityPageContent = {
  slug: string;
  title: string;
  description: string;
  h1: string;
  eyebrow: string;
  intro: string;
  sections: { title: string; body: string[]; items?: string[] }[];
  faqs: { question: string; answer: string }[];
  cta: string;
  locale?: string;
  alternates?: Record<string, string>;
};

export const authorityPages: Record<string, AuthorityPageContent> = {
  "nador-full-stack-developer": {
    slug: "nador-full-stack-developer",
    title: "Full-Stack Developer in Nador | Laravel, React & Business Software",
    description: "Full-Stack Developer in Nador building Laravel APIs, React/Next.js interfaces, dashboards, business automation and business software.",
    h1: "Full-Stack Developer in Nador Building Real Business Software",
    eyebrow: "Nador Authority",
    intro: "Positioned to become one of the strongest full-stack developer profiles in Nador through real projects, technical content and business-focused delivery. I build Laravel, React and Next.js systems for companies that need more than a basic website: APIs, admin dashboards, SaaS-style platforms, SEO-friendly pages and automation tools that support real operations.",
    sections: [
      {
        title: "Why work with a local Nador developer",
        body: ["A local developer understands the practical rhythm of businesses in Nador: limited time, direct communication, mixed French/Arabic/English context, mobile-first visitors and the need for systems that solve daily work. Local SEO also benefits from clear Nador-focused service pages, contact paths and business use cases."],
        items: ["Local Nador positioning", "Remote-friendly collaboration", "Business-focused scope", "Clear technical communication"],
      },
      {
        title: "What I build for businesses",
        body: ["I build websites, landing pages, admin dashboards, Laravel APIs, React/Next.js interfaces, document systems, internal tools and SaaS foundations. The best project starts from the workflow: what users need to do, what data must be stored, what reports matter and what should be automated."],
        items: ["Business websites", "Admin dashboards", "Client portals", "Internal tools", "SaaS platforms"],
      },
      {
        title: "Laravel, React and Next.js stack",
        body: ["Laravel handles backend logic, validation, authentication, policies, API resources and database work. React and Next.js handle the user interface, SEO pages, dashboards, loading states, forms and responsive layouts. MySQL supports the structured business data behind the platform."],
      },
      {
        title: "Business automation and digitalization experience",
        body: ["My administrative digitalization background helps me see where manual work can be improved. That includes Excel/VBA replacement, document tracking, reporting, digital archiving and dashboard workflows that make operations easier to follow."],
      },
      {
        title: "Projects and case studies",
        body: ["The portfolio includes RiFiTV, ERPlus, a Digital Archiving System, Social Media Management SaaS, E-commerce/Client Portal Systems, Excel/VBA Automation Tools and the Portfolio Admin System. Each case study explains the business problem, stack, architecture, challenges and next improvements."],
      },
      {
        title: "How I work",
        body: ["I start with scope and business goals, then define the pages, entities, roles, API contracts, deployment needs and success signals. I avoid fake claims and prefer practical proof: working routes, clear content, useful screenshots, technical writing and honest future improvements."],
      },
    ],
    faqs: [
      { question: "Can you work with businesses in Nador?", answer: "Yes. I am based in Nador and can support local businesses with websites, dashboards, Laravel APIs, automation and SEO-ready content structure." },
      { question: "Do you only build websites?", answer: "No. I also build admin dashboards, SaaS foundations, client portals, internal tools, APIs and business automation systems." },
      { question: "Can you work remotely?", answer: "Yes. I work with Git, project notes, structured communication and clear deployment steps for remote projects in Morocco and internationally." },
      { question: "Do you make ranking guarantees?", answer: "No. I build technically clean SEO foundations, but rankings depend on competition, content quality, authority, links and time." },
    ],
    cta: "Send me your project goal and I will help turn it into a clear technical scope.",
  },
  "morocco-full-stack-developer": {
    slug: "morocco-full-stack-developer",
    title: "Full-Stack Developer in Morocco | Laravel, React, SaaS & Dashboards",
    description: "Full-Stack Developer in Morocco for Laravel APIs, React/Next.js interfaces, SaaS platforms, admin dashboards and business automation.",
    h1: "Full-Stack Developer in Morocco for SaaS, Dashboards and Business Platforms",
    eyebrow: "Morocco Authority",
    intro: "I build business-focused Laravel, React and Next.js platforms for Moroccan companies and remote teams. The positioning starts in Nador and expands naturally to Marrakech, Casablanca, Rabat, Tangier, Agadir, Oujda and Fez through real case studies, technical writing and production-ready project structure.",
    sections: [
      { title: "Morocco business software needs", body: ["Many Moroccan businesses need better digital systems: websites that convert, dashboards that organize work, APIs that connect data, document systems that reduce manual effort and SaaS-style platforms that support growth. The best solution is not always the biggest one; it is the one that makes a real workflow easier."], items: ["Nador", "Marrakech", "Casablanca", "Rabat", "Tangier", "Agadir", "Oujda", "Fez"] },
      { title: "Services", body: ["Core services include Laravel API development, React/Next.js frontend development, admin dashboard development, SaaS MVP structure, business automation, SEO-friendly website development and deployment support. Each service page links to related projects and FAQs."] },
      { title: "Tech stack", body: ["The stack is Laravel, PHP, React, Next.js, JavaScript, TypeScript where useful, MySQL, REST APIs, Tailwind CSS, Nginx, Cloudflare and production deployment workflows."] },
      { title: "Project proof", body: ["Project proof includes RiFiTV for Laravel/Vite media platform work, ERPlus for Laravel API and React/Vite business management direction, Portfolio Admin System for CMS/admin APIs, and automation projects for internal workflow improvement."] },
      { title: "Remote and freelance collaboration", body: ["I can collaborate remotely using structured project notes, Git, clear scope, staged delivery, production checklists and practical documentation. This works for Morocco-wide projects and international clients."] },
    ],
    faqs: [
      { question: "Do you work with clients outside Nador?", answer: "Yes. I am based in Nador and available for projects across Morocco and remote international work." },
      { question: "Can you build SaaS platforms?", answer: "Yes. I build SaaS foundations with users, roles, dashboards, API architecture and future subscription-ready structure." },
      { question: "Can you handle deployment?", answer: "Yes. I work with Ubuntu, Nginx, PM2, Laravel cache commands, SSL and Cloudflare-facing deployment checks." },
      { question: "Can you build dashboards for Moroccan businesses?", answer: "Yes. HR, inventory, reporting, document tracking, admin panels and internal workflow dashboards are a strong fit." },
    ],
    cta: "Share the business platform you want to build in Morocco and I will help scope the Laravel/React architecture.",
  },
  "remote-full-stack-developer": {
    slug: "remote-full-stack-developer",
    title: "Remote Full-Stack Developer | Laravel, React, Next.js & SaaS Platforms",
    description: "Remote Full-Stack Developer for Laravel APIs, React/Next.js frontends, SaaS platforms, dashboards, deployment and maintainable business systems.",
    h1: "Remote Full-Stack Developer for SaaS, Dashboards and Business Web Platforms",
    eyebrow: "Remote Authority",
    intro: "I work remotely on Laravel, React and Next.js projects that need clear planning, maintainable code, API-driven architecture, production deployment and practical documentation. The best remote collaboration is built on clarity: business goal, scope, milestones, Git workflow, deployment process and honest communication.",
    sections: [
      { title: "Remote workflow", body: ["I prefer structured communication, written scope, task breakdowns, Git commits, clear acceptance notes and deployment checklists. This keeps remote projects realistic and reduces ambiguity."] },
      { title: "Laravel APIs", body: ["Laravel is used for backend modules, validation, resources, policies, authentication, admin logic and MySQL data structure. APIs are designed around frontend and business workflow needs."] },
      { title: "React and Next.js frontend", body: ["React and Next.js support dashboards, SEO pages, form-heavy workflows, loading states, responsive layouts and accessible interfaces for repeated business use."] },
      { title: "Deployment and maintainability", body: ["I consider environment variables, production builds, Nginx, PM2, SSL, Cloudflare, cache commands, logs and rollback thinking part of professional delivery."] },
      { title: "English communication", body: ["I can communicate in English for remote work, document practical decisions and keep project communication focused on the business outcome and technical tradeoffs."] },
    ],
    faqs: [
      { question: "Can you work with international clients?", answer: "Yes. I am available for remote Laravel, React, Next.js, dashboard and SaaS projects." },
      { question: "Do you use Git?", answer: "Yes. Git-based workflow, code review readiness and clear deployment steps are part of remote collaboration." },
      { question: "Can you document the project?", answer: "Yes. I can document setup, environment variables, deployment commands, API behavior and next improvement notes." },
      { question: "What type of remote project fits best?", answer: "Laravel APIs, React dashboards, Next.js SEO websites, SaaS foundations, internal tools and business automation platforms are the best fit." },
    ],
    cta: "Send me the product goal, current workflow and timeline so we can shape a remote delivery plan.",
  },
  "work-with-me": {
    slug: "work-with-me",
    title: "Work With Youssef Youyou | Laravel, React & SaaS Developer",
    description: "Work with Youssef Youyou on Laravel, React, Next.js, SaaS, dashboards, business automation, SEO websites and production-ready platforms.",
    h1: "Work With Youssef Youyou",
    eyebrow: "Project Fit",
    intro: "Send me your project goal and I will help turn it into a clear technical scope. I work best with businesses that need practical software: a website that converts, a dashboard that organizes work, a Laravel API, a React/Next.js frontend, a SaaS MVP or an automation tool that replaces repeated manual effort.",
    sections: [
      { title: "Who I help", body: ["Local businesses in Nador, Moroccan companies, agencies, founders and remote teams that need business-focused full-stack development without inflated promises."], items: ["Nador businesses", "Morocco-wide companies", "Remote teams", "SaaS MVP founders", "Operations teams"] },
      { title: "What I build", body: ["Laravel APIs, React/Next.js interfaces, admin dashboards, SaaS foundations, contact and lead flows, client portals, business websites, SEO pages, automation tools and deployment-ready platforms."] },
      { title: "Process", body: ["The process starts with business goal, users, current problem, project type, budget range and timeline. Then I define scope, technical structure, delivery stages and deployment needs."] },
      { title: "Budget and timeline expectations", body: ["Budget ranges depend on scope. A landing page is different from a dashboard, and a dashboard is different from a SaaS platform. The contact form asks for budget range and timeline so I can reply with realistic direction instead of generic promises."] },
      { title: "What to prepare", body: ["Prepare your business goal, current problem, examples, must-have features, users, content, deadline, budget range and any existing hosting or code access."] },
    ],
    faqs: [
      { question: "Can you help define the scope?", answer: "Yes. If the idea is still rough, I can help turn it into pages, modules, users, data models and a delivery plan." },
      { question: "Do you accept small projects?", answer: "Yes, if the scope is clear and the project fits Laravel, React/Next.js, SEO websites, dashboards or automation." },
      { question: "Do you offer fixed prices?", answer: "Only after the scope is clear. The contact form includes budget range and timeline so the conversation starts realistically." },
      { question: "Can you work with existing code?", answer: "Yes. I can review an existing Laravel, React, Next.js or deployment setup and propose practical improvements." },
    ],
    cta: "Send me your project goal and I will help turn it into a clear technical scope.",
  },
  "fr/developpeur-web-nador": {
    slug: "fr/developpeur-web-nador",
    title: "Développeur Web à Nador | Laravel, React & Sites Professionnels",
    description: "Développeur Full-Stack Laravel & React à Nador, Maroc pour sites web, dashboards, APIs, automatisation et plateformes métier.",
    h1: "Développeur Full-Stack Laravel & React à Nador, Maroc",
    eyebrow: "SEO Local FR",
    intro: "Je crée des sites web professionnels, interfaces React/Next.js, APIs Laravel, tableaux de bord et outils d'automatisation pour les entreprises à Nador et au Maroc. Le contenu reste simple, naturel et orienté résultats métier.",
    sections: [
      { title: "Pour les entreprises à Nador", body: ["Un site professionnel doit expliquer l'offre, inspirer confiance, charger rapidement sur mobile et faciliter le contact. Pour les besoins internes, un dashboard ou une API Laravel peut remplacer les tâches manuelles."] },
      { title: "Stack technique", body: ["Laravel, PHP, React, Next.js, MySQL, Tailwind CSS, APIs REST, SEO technique, Nginx, Cloudflare et déploiement production."] },
      { title: "Types de projets", body: ["Sites vitrines, landing pages, portfolios, plateformes SaaS, dashboards administratifs, automatisation métier, gestion documentaire et portails clients."] },
    ],
    faqs: [
      { question: "Travaillez-vous avec des entreprises à Nador ?", answer: "Oui. Je suis basé à Nador et disponible pour des projets locaux, au Maroc et à distance." },
      { question: "Pouvez-vous créer un site avec SEO local ?", answer: "Oui. Je prépare la structure SEO, les métadonnées, les liens internes, le sitemap et le contenu local naturel." },
      { question: "Pouvez-vous créer un dashboard ?", answer: "Oui. Je crée des dashboards Laravel/React pour la gestion, les rapports, les rôles et les workflows internes." },
      { question: "Travaillez-vous à distance ?", answer: "Oui. Je peux collaborer avec des clients au Maroc et à l'international." },
    ],
    cta: "Envoyez votre objectif métier et je vous aide à le transformer en périmètre technique clair.",
    locale: "fr",
    alternates: { en: "/services/web-developer-nador", fr: "/fr/developpeur-web-nador" },
  },
  "fr/developpeur-laravel-maroc": {
    slug: "fr/developpeur-laravel-maroc",
    title: "Développeur Laravel au Maroc | APIs, Dashboards & SaaS",
    description: "Développeur Laravel au Maroc pour APIs, dashboards, authentification, rôles, plateformes SaaS et systèmes métier.",
    h1: "Développeur Laravel au Maroc",
    eyebrow: "SEO Maroc FR",
    intro: "Je développe des backends Laravel propres pour les entreprises qui ont besoin d'APIs, d'authentification, de rôles, de dashboards, de logique métier et de systèmes maintenables.",
    sections: [
      { title: "Laravel pour systèmes métier", body: ["Laravel permet de structurer les routes, contrôleurs, validations, ressources API, politiques d'accès et modèles MySQL de manière claire."] },
      { title: "Cas d'usage", body: ["Dashboards RH, inventaire, portails clients, SaaS MVP, gestion documentaire, APIs pour frontends React/Next.js et outils d'automatisation."] },
      { title: "Déploiement", body: ["Je prends aussi en compte Nginx, PHP-FPM, variables d'environnement, cache Laravel, SSL, Cloudflare et vérifications production."] },
    ],
    faqs: [
      { question: "Pouvez-vous créer une API Laravel ?", answer: "Oui. Je crée des APIs Laravel pour dashboards, SaaS, portails clients et frontends React/Next.js." },
      { question: "Pouvez-vous gérer les rôles ?", answer: "Oui. Les rôles et permissions sont structurés selon les besoins métier." },
      { question: "Travaillez-vous avec React ?", answer: "Oui. Laravel API + React/Next.js est un axe principal de mon travail." },
      { question: "Pouvez-vous déployer le projet ?", answer: "Oui. Je peux préparer les étapes de déploiement production." },
    ],
    cta: "Décrivez votre workflow métier et je propose une architecture Laravel claire.",
    locale: "fr",
  },
  "fr/developpeur-react-nextjs-maroc": {
    slug: "fr/developpeur-react-nextjs-maroc",
    title: "Développeur React & Next.js au Maroc | Interfaces SEO & Dashboards",
    description: "Développeur React et Next.js au Maroc pour interfaces modernes, sites SEO, dashboards, composants React et plateformes web.",
    h1: "Développeur React & Next.js au Maroc",
    eyebrow: "Frontend FR",
    intro: "Je crée des interfaces React et Next.js rapides, responsive et SEO-friendly pour sites professionnels, dashboards, plateformes SaaS et frontends connectés à des APIs Laravel.",
    sections: [
      { title: "Interfaces modernes", body: ["Les interfaces doivent être claires, rapides, accessibles et adaptées aux usages répétés: formulaires, tableaux, filtres, états de chargement et messages d'erreur."] },
      { title: "Next.js et SEO", body: ["Next.js permet de préparer des pages avec titres uniques, métadescriptions, canonicals, Open Graph, sitemap, robots et JSON-LD."] },
      { title: "Dashboards React", body: ["React convient très bien aux dashboards avec composants réutilisables, tables, graphiques, badges, filtres et formulaires."] },
    ],
    faqs: [
      { question: "Pouvez-vous créer un site Next.js SEO ?", answer: "Oui. Je prépare la structure technique SEO et le contenu utile." },
      { question: "React peut-il se connecter à Laravel ?", answer: "Oui. Les frontends React/Next.js peuvent consommer une API Laravel propre." },
      { question: "Créez-vous des dashboards ?", answer: "Oui. Dashboards administratifs, SaaS, reporting, HR et inventaire." },
      { question: "Pouvez-vous améliorer une interface existante ?", answer: "Oui, sans casser l'identité visuelle existante." },
    ],
    cta: "Envoyez votre objectif frontend et je propose une structure React/Next.js claire.",
    locale: "fr",
  },
  "ar/web-developer-nador": {
    slug: "ar/web-developer-nador",
    title: "مطور ويب Full-Stack في الناظور والمغرب",
    description: "مطور ويب Full-Stack في الناظور والمغرب متخصص في Laravel و React و Next.js ولوحات التحكم والأتمتة.",
    h1: "مطور ويب Full-Stack في الناظور والمغرب",
    eyebrow: "Arabic SEO",
    intro: "أبني مواقع ومنصات ويب عملية للشركات في الناظور والمغرب باستعمال Laravel و React و Next.js. التركيز يكون على مواقع احترافية، APIs، لوحات تحكم، أدوات أتمتة، وتحسين SEO بدون مبالغة أو وعود غير واقعية.",
    sections: [
      { title: "خدمات للشركات في الناظور", body: ["يمكنني بناء موقع تعريفي، صفحة هبوط، لوحة تحكم، نظام داخلي، API باستعمال Laravel أو واجهة React/Next.js حسب حاجة المشروع."] },
      { title: "التقنيات", body: ["Laravel، PHP، React، Next.js، MySQL، REST APIs، Tailwind CSS، SEO، Nginx، Cloudflare وتجهيزات الإنتاج."] },
      { title: "طريقة العمل", body: ["أبدأ بفهم المشكلة التجارية، المستخدمين، البيانات، الصفحات المطلوبة، لوحة التحكم، ثم أحولها إلى نطاق تقني واضح."] },
    ],
    faqs: [
      { question: "هل تعمل مع شركات في الناظور؟", answer: "نعم. أنا موجود في الناظور ومتاح لمشاريع محلية، داخل المغرب وعن بعد." },
      { question: "هل تبني لوحات تحكم؟", answer: "نعم. يمكن بناء لوحات تحكم لإدارة المحتوى، المستخدمين، الوثائق، التقارير والعمليات الداخلية." },
      { question: "هل يمكن تحسين SEO للموقع؟", answer: "نعم. أجهز العناوين، الوصف، الروابط الداخلية، sitemap، robots و JSON-LD بشكل طبيعي." },
      { question: "هل تعمل عن بعد؟", answer: "نعم. أستطيع التعاون مع عملاء في المغرب وخارجه عن بعد." },
    ],
    cta: "أرسل هدف المشروع وسأساعدك على تحويله إلى نطاق تقني واضح.",
    locale: "ar",
  },
};

export const authorityPageSlugs = Object.keys(authorityPages);
