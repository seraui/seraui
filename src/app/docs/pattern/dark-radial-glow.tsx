'use client'
export default function DarkRadialGlow() {
  return (
    <div className="min-h-screen w-full relative flex items-center justify-center">
      {/* Pattern Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "#020617",
          backgroundImage: "radial-gradient(circle 500px at 50% 200px, #3e3e3e, transparent)",
        }}
      />

      {/* Centered Text */}
      <h1 className="relative z-10 text-white text-4xl font-bold text-center">
        Dark Radial Glow
      </h1>
    </div>
  );
}
