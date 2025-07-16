'use client'
export default function EmeraldGlow() {
  return (
    <div className="min-h-screen w-full relative flex items-center justify-center">
      {/* Light mode */}
      <div
        className="absolute inset-0 z-0 dark:hidden"
        style={{
          background: "#ffffff",
          backgroundImage: "radial-gradient(125% 125% at 50% 90%, #ffffff 40%, #10b981 100%)",
          backgroundSize: "100% 100%",
        }}
      />

      {/* Dark mode */}
      <div
        className="absolute inset-0 z-0 hidden dark:block"
        style={{
          background: "#000000",
          backgroundImage: "radial-gradient(125% 125% at 50% 90%, #000000 40%, #10b981 100%)",
          backgroundSize: "100% 100%",
        }}
      />

      {/* Centered Text */}
      <h1 className="relative z-10 text-slate-800 dark:text-white text-4xl font-bold text-center">
        Emerald Glow
      </h1>
    </div>
  );
}
