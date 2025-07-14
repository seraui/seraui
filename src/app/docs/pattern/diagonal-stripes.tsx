'use client'
export default function DiagonalStripes() {
  return (
    <div className="min-h-screen w-full relative flex items-center justify-center">
      {/* Light mode */}
      <div
        className="absolute inset-0 z-0 dark:hidden"
        style={{
          backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 2px, #f3f4f6 2px, #f3f4f6 4px)",
        }}
      />

      {/* Dark mode */}
      <div
        className="absolute inset-0 z-0 hidden dark:block"
        style={{
          background: "#000000",
          backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)",
        }}
      />

      {/* Centered Text */}
      <h1 className="relative z-10 text-slate-800 dark:text-white text-4xl font-bold text-center">
        Diagonal Stripes
      </h1>
    </div>
  );
}
