'use client'
export default function BlueRadialGlow() {
  return (
    <div className="min-h-screen w-full relative flex items-center justify-center">
      {/* Pattern Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "#0f172a",
          backgroundImage: "radial-gradient(circle 600px at 50% 50%, rgba(59,130,246,0.3), transparent)",
        }}
      />

      {/* Centered Text */}
      <h1 className="relative z-10 text-white text-4xl font-bold text-center">
        Blue Radial Glow
      </h1>
    </div>
  );
}
