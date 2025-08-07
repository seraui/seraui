"use client"
import HtmlCodeTabs from './html-code';

export default function HtmlCodeDemo() {
  const htmlCode = `<body class="h-full antialiased font-sans bg-transparent flex items-center justify-center">
  <!-- Content -->
  <button class="relative z-10 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/50">
    Click me
  </button>
</body>`;

  return (
    <HtmlCodeTabs 
      htmlContent={htmlCode}
      title="Demo"
      fileName="index.html"
      className="min-h-[600px]"
    />
  );
}