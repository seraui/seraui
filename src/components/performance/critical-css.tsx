import Head from "next/head";

export function CriticalCSS() {
  return (
    <Head>
      <style jsx>{`
        /* Critical CSS for above-the-fold content */
        .hero-section {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Prevent layout shift for loading states */
        .loading-skeleton {
          background: linear-gradient(
            90deg,
            #f0f0f0 25%,
            #e0e0e0 50%,
            #f0f0f0 75%
          );
          background-size: 200% 100%;
          animation: loading 1.5s infinite;
        }

        @keyframes loading {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }

        /* Dark mode loading skeleton */
        .dark .loading-skeleton {
          background: linear-gradient(
            90deg,
            #374151 25%,
            #4b5563 50%,
            #374151 75%
          );
          background-size: 200% 100%;
        }
      `}</style>
    </Head>
  );
}
