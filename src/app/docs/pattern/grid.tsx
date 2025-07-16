'use client'
export default function Pattern() {
  return (
    <div className="min-h-screen w-full bg-slate-50 dark:bg-[#020617] relative flex items-center justify-center">
      {/* Light mode grid */}
      <div
        className="absolute inset-0 z-0 dark:hidden"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(148,163,184,0.4) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(148,163,184,0.4) 1px, transparent 1px),
            radial-gradient(circle at 50% 50%, rgba(139,92,246,0.1) 0%, transparent 70%)
          `,
          backgroundSize: "32px 32px, 32px 32px, 100% 100%",
        }}
      ></div>

      {/* Dark mode grid */}
      <div
        className="absolute inset-0 z-0 hidden dark:block"
        style={{
          background: "#020617",
          backgroundImage: `
            linear-gradient(to right, rgba(71,85,105,0.3) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(71,85,105,0.3) 1px, transparent 1px),
            radial-gradient(circle at 50% 50%, rgba(139,92,246,0.15) 0%, transparent 70%)
          `,
          backgroundSize: "32px 32px, 32px 32px, 100% 100%",
        }}
      ></div>

      {/* Centered Text */}
      <h1 className="relative z-10 text-slate-800 dark:text-white text-4xl font-bold text-center">
        Beautiful Grid Background
      </h1>
    </div>
  );
}