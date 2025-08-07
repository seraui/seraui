"use client"
import HtmlCodeTabs from './html-code';

// Basic Button Example
export function BasicButtonExample() {
  const htmlCode = `<body class="h-full antialiased font-sans bg-transparent flex items-center justify-center">
  <button class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors">
    Click me
  </button>
</body>`;

  return (
    <HtmlCodeTabs 
      htmlContent={htmlCode}
      title="Basic Button"
      fileName="button.html"
      className="min-h-[400px]"
    />
  );
}