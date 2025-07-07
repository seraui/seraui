'use client'
export default function DiagonalGrid() {
  return (
    <div className="min-h-screen w-full bg-[#fafafa] dark:bg-[#0f0f0f] relative flex items-center justify-center">
      {/* Light mode Diagonal Grid */}
      <div
        className="absolute inset-0 z-0 dark:hidden"
        style={{
          background: "#fafafa",
          backgroundImage: `
            repeating-linear-gradient(45deg, rgba(0, 0, 0, 0.1) 0, rgba(0, 0, 0, 0.1) 1px, transparent 1px, transparent 20px),
            repeating-linear-gradient(-45deg, rgba(0, 0, 0, 0.1) 0, rgba(0, 0, 0, 0.1) 1px, transparent 1px, transparent 20px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Dark mode Diagonal Grid */}
      <div
        className="absolute inset-0 z-0 hidden dark:block"
        style={{
          background: "#0f0f0f",
          backgroundImage: `
            repeating-linear-gradient(45deg, rgba(0, 255, 128, 0.1) 0, rgba(0, 255, 128, 0.1) 1px, transparent 1px, transparent 20px),
            repeating-linear-gradient(-45deg, rgba(0, 255, 128, 0.1) 0, rgba(0, 255, 128, 0.1) 1px, transparent 1px, transparent 20px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Centered Text */}
      <h1 className="relative z-10 text-slate-800 dark:text-white text-4xl font-bold text-center">
        Diagonal Grid Background
      </h1>
    </div>
  );
}
