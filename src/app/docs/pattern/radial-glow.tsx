'use client'
export default function RadialGlow() {
  return (
    <div className="min-h-screen w-full relative flex items-center justify-center">
      {/* Light mode Radial Glow */}
      <div
        className="absolute inset-0 z-0 dark:hidden"
        style={{
          background: "#ffffff",
          backgroundImage: `
            radial-gradient(circle at top right, rgba(173, 109, 244, 0.5), transparent 70%)
          `,
          filter: "blur(80px)",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Dark mode Radial Glow */}
      <div
        className="absolute inset-0 z-0 hidden dark:block"
        style={{
          background: "#020617",
          backgroundImage: "radial-gradient(circle 500px at 50% 200px, #3e3e3e, transparent)",
        }}
      />

      {/* Centered Text */}
      <h1 className="relative z-10 text-slate-800 dark:text-white text-4xl font-bold text-center">
        Radial Glow Background
      </h1>
    </div>
  );
}
