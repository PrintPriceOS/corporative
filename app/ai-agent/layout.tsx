import { constructMetadata } from "@/lib/seo";
import { Metadata } from 'next';

export const metadata: Metadata = constructMetadata({
  title: "Print API for AI Agents",
  description: "Let AI agents price, validate, and run print production through PrintPrice OS. Automated manufacturing via API.",
  image: "/og/ai-agent.png",
  canonical: "/ai-agent"
});

export default function AIAgentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
