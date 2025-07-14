'use client'
export default function DualGradientOverlayStrong() {
  return (
    <div className="min-h-screen w-full relative flex items-center justify-center">
      {/* Light mode */}
      <div
        className="absolute inset-0 z-0 dark:hidden"
        style={{
          background: "#ffffff",
          backgroundImage: `
            linear-gradient(to right, rgba(229,231,235,0.8) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(229,231,235,0.8) 1px, transparent 1px),
            radial-gradient(circle 500px at 20% 80%, rgba(139,92,246,0.3), transparent),
            radial-gradient(circle 500px at 80% 20%, rgba(59,130,246,0.3), transparent)
          `,
          backgroundSize: "48px 48px, 48px 48px, 100% 100%, 100% 100%",
        }}
      />

      {/* Dark mode */}
      <div
        className="absolute inset-0 z-0 hidden dark:block"
        style={{
          background: "#000000",
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px),
            radial-gradient(circle 500px at 20% 80%, rgba(139,92,246,0.4), transparent),
            radial-gradient(circle 500px at 80% 20%, rgba(59,130,246,0.4), transparent)
          `,
          backgroundSize: "48px 48px, 48px 48px, 100% 100%, 100% 100%",
        }}
      />

      {/* Centered Text */}
      <h1 className="relative z-10 text-slate-800 dark:text-white text-4xl font-bold text-center">
        Dual Gradient Overlay Strong
      </h1>
    </div>
  );
}
