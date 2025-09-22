import createMDX from "@next/mdx";
import type { NextConfig } from "next";

// Bundle analyzer for performance monitoring
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  /* config options here */
  output: "export", // Force static export - no server functions
  trailingSlash: false,
  reactStrictMode: true,
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],

  // SEO and Performance Optimizations
  compress: true,
  poweredByHeader: false,

  // Image optimization for static export
  images: {
    loader: "custom",
    loaderFile: "./image-loader.js",
    domains: ["i.postimg.cc", "i.pinimg.com", "avatars.githubusercontent.com"],
  },

  // Experimental features for better performance
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "framer-motion",
      "@radix-ui/react-icons",
    ],
    scrollRestoration: true,
  },

  // Bundle analyzer for performance monitoring
  webpack: (config, { dev, isServer }) => {
    // Optimize bundle size
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: "all",
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all",
          },
        },
      };
    }
    return config;
  },

  // // Redirects must be inside the config
  // async redirects() {
  //   return [
  //     {
  //       source: "/:path*",
  //       destination: "https://seraui.com/:path*",
  //       permanent: true,
  //     },
  //   ];
  // },
};

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

export default withBundleAnalyzer(withMDX(nextConfig));
