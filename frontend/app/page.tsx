import PortfolioShell from "@/components/portfolio-shell";
import { getHomeContent } from "@/lib/api";

export default async function Home() {
  const content = await getHomeContent();

  return <PortfolioShell content={content} />;
}
