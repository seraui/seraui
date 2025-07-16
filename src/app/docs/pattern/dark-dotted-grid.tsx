'use client'
export default function DarkDottedGrid() {
  return (
    <div className="min-h-screen w-full relative flex items-center justify-center">
      {/* Pattern Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "#0f172a",
          backgroundImage: `
            radial-gradient(circle, rgba(139,92,246,0.6) 1px, transparent 1px),
            radial-gradient(circle, rgba(59,130,246,0.4) 1px, transparent 1px),
            radial-gradient(circle, rgba(236,72,153,0.5) 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px, 40px 40px, 60px 60px",
          backgroundPosition: "0 0, 10px 10px, 30px 30px",
        }}
      />

      {/* Centered Text */}
      <h1 className="relative z-10 text-white text-4xl font-bold text-center">
        Dark Dotted Grid
      </h1>
    </div>
  );
}
