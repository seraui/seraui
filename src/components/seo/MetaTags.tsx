export function MetaTags() {
  return (
    <>
      {/* Essential Meta Tags */}
      <meta
        name="google-site-verification"
        content="y3qEBdgYG32ZoXRsNqWxh6QgyxhQ337zoKpLwmb_dic"
      />
      <meta name="yandex-verification" content="1b0095f6bfc08171" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#000000" />

      {/* PWA Meta Tags */}
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Sera UI" />
      <meta name="application-name" content="Sera UI" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="msapplication-config" content="/browserconfig.xml" />

      {/* Icons and Manifest */}
      <link rel="manifest" href="/manifest.json" />
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/logo.svg" />

      {/* Preconnect for Performance - Deduplicated */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//fonts.gstatic.com" />
    </>
  );
}
