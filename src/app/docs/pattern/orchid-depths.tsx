'use client'
export default function OrchidDepths() {
  return (
    <div className="min-h-screen w-full relative flex items-center justify-center">
      {/* Pattern Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "#000000",
          backgroundImage: "radial-gradient(125% 125% at 50% 100%, #000000 40%, #350136 100%)",
          backgroundSize: "100% 100%",
        }}
      />

      {/* Centered Text */}
      <h1 className="relative z-10 text-white text-4xl font-bold text-center">
        Orchid Depths
      </h1>
    </div>
  );
}
