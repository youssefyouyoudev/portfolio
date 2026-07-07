export type GrowthTask = {
  title: string;
  priority: "High" | "Medium" | "Low";
  pageAffected: string;
  status: "Done" | "In progress" | "Planned";
  dueWeek: number;
  expectedResult: string;
};

export const growthWeeks = [
  "Technical SEO",
  "Local Nador pages",
  "Morocco service pages",
  "Case study depth",
  "Blog authority",
  "Backlinks and LinkedIn",
  "Conversion optimization",
  "Review, indexing and improvements",
];

export const growthTasks: GrowthTask[] = [
  { title: "Verify canonical domain, sitemap and robots", priority: "High", pageAffected: "Global", status: "In progress", dueWeek: 1, expectedResult: "Cleaner crawling and consistent indexing signals." },
  { title: "Submit sitemap and inspect money pages in Search Console", priority: "High", pageAffected: "/sitemap.xml", status: "Planned", dueWeek: 1, expectedResult: "Faster discovery of service and project pages." },
  { title: "Publish Nador service pages and location page", priority: "High", pageAffected: "/services/web-developer-nador", status: "In progress", dueWeek: 2, expectedResult: "Better relevance for local Nador developer searches." },
  { title: "Add local business use cases to Nador pages", priority: "Medium", pageAffected: "Nador services", status: "In progress", dueWeek: 2, expectedResult: "More useful local content for human visitors." },
  { title: "Publish Morocco service pages", priority: "High", pageAffected: "/services/laravel-developer-morocco", status: "In progress", dueWeek: 3, expectedResult: "National service coverage for Laravel, React, SaaS and automation terms." },
  { title: "Add city landing pages with unique collaboration notes", priority: "Medium", pageAffected: "/locations", status: "In progress", dueWeek: 3, expectedResult: "Careful city coverage without fake offices or duplicate pages." },
  { title: "Deepen RiFiTV and ERPlus flagship case studies", priority: "High", pageAffected: "/projects/rifitv and /projects/erplus", status: "In progress", dueWeek: 4, expectedResult: "Stronger proof for Laravel, React, Nginx, Vite and dashboard expertise." },
  { title: "Add screenshot-ready galleries", priority: "Medium", pageAffected: "Project pages", status: "In progress", dueWeek: 4, expectedResult: "Prepared structure for real screenshots after visual review." },
  { title: "Publish deployment and Vite production articles", priority: "High", pageAffected: "/blog", status: "In progress", dueWeek: 5, expectedResult: "Technical authority for real production problems." },
  { title: "Publish dashboard, SaaS and API architecture articles", priority: "High", pageAffected: "/blog", status: "In progress", dueWeek: 6, expectedResult: "Better topical authority for Laravel/React business platforms." },
  { title: "Add GitHub, LinkedIn and directory backlink actions", priority: "Medium", pageAffected: "Off-site", status: "Planned", dueWeek: 6, expectedResult: "More trust signals and referral traffic." },
  { title: "Improve CTA tracking and hiring funnel", priority: "High", pageAffected: "/work-with-me and /hire-laravel-react-developer", status: "In progress", dueWeek: 7, expectedResult: "More qualified inquiries from clients, recruiters and agencies." },
  { title: "Review Search Console queries and refresh pages", priority: "High", pageAffected: "Top indexed pages", status: "Planned", dueWeek: 8, expectedResult: "Page improvements based on real impressions and queries." },
];
