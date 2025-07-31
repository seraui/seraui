import Head from "next/head";

interface ResourcePreloaderProps {
  fonts?: string[];
  images?: string[];
  scripts?: string[];
}

export function ResourcePreloader({
  fonts = [],
  images = [],
  scripts = [],
}: ResourcePreloaderProps) {
  return (
    <Head>
      {/* Preload critical fonts */}
      {fonts.map((font) => (
        <link
          key={font}
          rel="preload"
          href={font}
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      ))}

      {/* Preload critical images */}
      {images.map((image) => (
        <link key={image} rel="preload" href={image} as="image" />
      ))}

      {/* Preload critical scripts */}
      {scripts.map((script) => (
        <link key={script} rel="preload" href={script} as="script" />
      ))}

      {/* DNS prefetch for external domains */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//i.postimg.cc" />
      <link rel="dns-prefetch" href="//i.pinimg.com" />
      <link rel="dns-prefetch" href="//avatars.githubusercontent.com" />

      {/* Preconnect to critical origins */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
    </Head>
  );
}
