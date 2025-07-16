'use client'
export default function PurpleRadialGlow() {
  return (
    <div className="min-h-screen w-full relative flex items-center justify-center">
      {/* Pattern Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "#020617",
          backgroundImage: "radial-gradient(circle 500px at 50% 100px, rgba(139,92,246,0.4), transparent)",
        }}
      />

      {/* Centered Text */}
      <h1 className="relative z-10 text-white text-4xl font-bold text-center">
        Purple Radial Glow
      </h1>
    </div>
  );
}
