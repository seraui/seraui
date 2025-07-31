import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export", // Force static export - no server functions
  trailingSlash: true,
  reactStrictMode: true,
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],

  // SEO and Performance Optimizations
  compress: true,
  poweredByHeader: false,

  // Image optimization disabled for static export
  images: {
    unoptimized: true, // Required for static export
    domains: ["i.postimg.cc", "i.pinimg.com", "avatars.githubusercontent.com"],
  },

  // Static export doesn't support headers() or redirects()
  // These will be handled by your hosting provider (Vercel)

  // Experimental features for better performance
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
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
};

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);
