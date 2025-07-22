import { ReactNode } from "react";
import { TOCProvider } from "@/contexts/toc-context";
import { DocsLayoutContent } from "@/components/site/docs-layout-content";

// Force static generation for all docs pages
export const dynamic = "force-static";
export const revalidate = 3600; // Revalidate every hour

export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <TOCProvider>
      <DocsLayoutContent>{children}</DocsLayoutContent>
    </TOCProvider>
  );
}
