import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { geistMono, geistSans } from "@/assets/fonts";
import { Analytics } from "@vercel/analytics/next";
import { LoadingProvider } from "@/components/ui";

export const metadata: Metadata = {
  title: "Berlix UI – Animated React Components Library",
  description:
    "Berlix UI is an open-source, animation-first component library for React and Next.js. Built with Tailwind CSS and Framer Motion.",
  openGraph: {
    title: "Berlix UI – Animated React Components Library",
    description:
      "An open-source UI library crafted for sleek, animated interfaces. Berlix UI offers ready-to-use components built with Tailwind CSS and Framer Motion.",
    url: "https://berlix.vercel.app",
    siteName: "Berlix UI",
    images: [
      {
        url: "https://berlix.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Berlix UI Components Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Berlix UI – Animated React Components Library",
    description:
      "Create stunning UIs effortlessly with Berlix UI – animated, composable components built with React, Tailwind CSS, and Framer Motion.",
    images: ["https://berlix.vercel.app/og-image.png"],
    creator: "@rechesoares13",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <meta
        name="google-site-verification"
        content={process.env.GOOGLE_SITE_VERIFICATION}
      />
      <body
        className={`${geistSans.className} ${geistMono.variable} antialiased min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100`}
      >
        <Analytics />
        <ThemeProvider attribute="class" defaultTheme="dark">
          <LoadingProvider>
            {children}
          </LoadingProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
