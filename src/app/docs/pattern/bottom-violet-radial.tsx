'use client'
export default function BottomVioletRadial() {
  return (
    <div className="min-h-screen w-full relative flex items-center justify-center">
      {/* Light mode */}
      <div
        className="absolute inset-0 z-0 dark:hidden"
        style={{
          background: "radial-gradient(125% 125% at 50% 90%, #fff 40%, #7c3aed 100%)",
        }}
      />

      {/* Dark mode */}
      <div
        className="absolute inset-0 z-0 hidden dark:block"
        style={{
          background: "radial-gradient(125% 125% at 50% 90%, #000 40%, #7c3aed 100%)",
        }}
      />

      {/* Centered Text */}
      <h1 className="relative z-10 text-slate-800 dark:text-white text-4xl font-bold text-center">
        Bottom Violet Radial
      </h1>
    </div>
  );
}
