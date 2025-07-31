import "./globals.css";
import { ThemeProvider } from "next-themes";
import { geistMono } from "@/assets/fonts";
import { PackageManagerProvider } from "@/contexts/package-manager-context";
import { Inter } from "next/font/google";
import { PerformanceMonitor } from "@/components/performance/PerformanceMonitor";
import { WebVitals } from "@/components/performance/web-vitals";
import { ResourcePreloader } from "@/components/performance/resource-preloader";
import { CriticalCSS } from "@/components/performance/critical-css";
import { MetaTags } from "@/components/seo/MetaTags";
import { StructuredData } from "@/components/seo/StructuredData";
import { LazyOpenGraph } from "@/components/seo/LazyOpenGraph";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { metadata } from "@/lib/metadata";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export { metadata };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <MetaTags />
        <CriticalCSS />
        <ResourcePreloader
          fonts={["/fonts/geist.woff2"]}
          images={["/hero-image.jpg"]}
        />
      </head>
      <body
        className={`${inter.className} ${geistMono.variable} antialiased min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark">
          <PackageManagerProvider>
            {children}
            <PerformanceMonitor />
            <WebVitals />
          </PackageManagerProvider>
        </ThemeProvider>

        {/* Load analytics and structured data after initial render */}
        <GoogleAnalytics />
        <StructuredData />
        <LazyOpenGraph />
      </body>
    </html>
  );
}
