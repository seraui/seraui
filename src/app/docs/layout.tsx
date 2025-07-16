import { ReactNode } from "react";
import { TOCProvider } from "@/contexts/toc-context";
import { DocsLayoutContent } from "@/components/site/docs-layout-content";

export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <TOCProvider>
      <DocsLayoutContent>{children}</DocsLayoutContent>
    </TOCProvider>
  );
}
