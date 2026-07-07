export type LocationPage = {
  slug: string;
  city: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  useCases: string[];
  businessTypes: string[];
};

const cityExamples: Record<string, { businessTypes: string[]; useCases: string[] }> = {
  nador: {
    businessTypes: ["stores", "agencies", "schools", "transport businesses", "local administrations", "service providers", "cafes", "small companies"],
    useCases: ["business websites", "booking systems", "inventory dashboards", "document tracking", "admin panels", "SEO landing pages"],
  },
  marrakech: {
    businessTypes: ["tourism services", "agencies", "restaurants", "service businesses", "boutique shops", "remote-first teams"],
    useCases: ["booking platforms", "landing pages", "client portals", "React dashboards", "Laravel APIs", "SEO service pages"],
  },
  casablanca: {
    businessTypes: ["B2B companies", "agencies", "startups", "internal business teams", "commerce teams", "service providers"],
    useCases: ["SaaS MVPs", "admin dashboards", "Laravel APIs", "business automation", "client portals", "reporting tools"],
  },
  rabat: {
    businessTypes: ["service providers", "consultants", "education teams", "administrative teams", "agencies", "professional offices"],
    useCases: ["document workflows", "professional websites", "dashboards", "booking flows", "content management", "SEO pages"],
  },
  tangier: {
    businessTypes: ["logistics teams", "stores", "agencies", "service companies", "manufacturing support teams", "local brands"],
    useCases: ["inventory systems", "client portals", "Laravel APIs", "admin dashboards", "landing pages", "automation tools"],
  },
  oujda: {
    businessTypes: ["local businesses", "schools", "service providers", "stores", "transport teams", "administrative teams"],
    useCases: ["business websites", "digital archiving", "booking tools", "inventory dashboards", "contact flows", "automation systems"],
  },
  fez: {
    businessTypes: ["education services", "tourism-related businesses", "stores", "agencies", "service providers", "small companies"],
    useCases: ["SEO websites", "booking systems", "client portals", "admin dashboards", "Laravel APIs", "workflow automation"],
  },
  agadir: {
    businessTypes: ["tourism businesses", "service providers", "local shops", "agencies", "booking-based businesses", "small teams"],
    useCases: ["booking websites", "SEO landing pages", "admin panels", "client portals", "React dashboards", "business automation"],
  },
};

export const locationPages: LocationPage[] = Object.entries(cityExamples).map(([slug, details]) => {
  const city = slug.charAt(0).toUpperCase() + slug.slice(1);
  const isNador = slug === "nador";
  return {
    slug: `web-developer-${slug}`,
    city,
    title: `Web Developer in ${city} | Laravel, React & Business Websites`,
    description: `${isNador ? "Nador-based" : `Available remotely for ${city}`} web developer building websites, dashboards, Laravel APIs and automation systems for businesses.`,
    h1: `Web Developer in ${city}`,
    intro: isNador
      ? "I am based in Nador and build practical websites, dashboards, Laravel APIs, React/Next.js interfaces and automation tools for local businesses and remote clients."
      : `I am available remotely for businesses in ${city}. I do not claim a physical office there; I collaborate through clear scope, Git, calls/messages, deployment notes and practical delivery.`,
    businessTypes: details.businessTypes,
    useCases: details.useCases,
  };
});

export const locationPageSlugs = locationPages.map((page) => page.slug);

export function getLocationPage(slug: string) {
  return locationPages.find((page) => page.slug === slug) ?? null;
}
