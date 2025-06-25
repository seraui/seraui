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
    themes: {
      light: "github-light",
      dark: "github-dark-default",
    },
    defaultColor: false,
    transformers: [
      {
        name: 'remove-pre-bg',
        pre(node) {
          // Remove background from pre to let our CSS handle it
          delete node.properties.style;
        }
      }
    ]
  });

  return (
    <div className="font-normal text-sm">
      <div
        style={{ padding: "16px", paddingRight: "20px" }}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
};
