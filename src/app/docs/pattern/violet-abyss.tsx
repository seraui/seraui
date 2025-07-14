'use client'
export default function VioletAbyss() {
  return (
    <div className="min-h-screen w-full relative flex items-center justify-center">
      {/* Pattern Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "#000000",
          backgroundImage: "radial-gradient(125% 125% at 50% 90%, #000000 40%, #2b092b 100%)",
          backgroundSize: "100% 100%",
        }}
      />

      {/* Centered Text */}
      <h1 className="relative z-10 text-white text-4xl font-bold text-center">
        Violet Abyss
      </h1>
    </div>
  );
}
