import { codeToHtml } from "shiki";
import type { BuiltinLanguage } from "shiki";

interface CodeRendererProps {
  code: string;
  lang: BuiltinLanguage;
}

export const CodeRenderer = async ({
  code,
  lang = "tsx",
}: CodeRendererProps) => {
  const html = await codeToHtml(code, {
    lang,
    theme: "github-dark-default",
    colorReplacements: {
      "#0d1117": "#0a0a0a",
    },
  });

  return (
    <div className="font-normal text-sm bg-zinc-950">
      <div
        style={{ padding: "16px", paddingRight: "20px" }}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
};
