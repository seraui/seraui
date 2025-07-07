'use client'
export default function NoiseTexture() {
  return (
    <div className="min-h-screen w-full bg-white dark:bg-[#000000] relative flex items-center justify-center">
      {/* Light mode Noise Texture */}
      <div
        className="absolute inset-0 z-0 dark:hidden"
        style={{
          background: "#ffffff",
          backgroundImage: `
            radial-gradient(circle at 1px 1px, rgba(0, 0, 0, 0.35) 1px, transparent 0)
          `,
          backgroundSize: "20px 20px",
        }}
      />

      {/* Dark mode Noise Texture */}
      <div
        className="absolute inset-0 z-0 hidden dark:block"
        style={{
          background: "#000000",
          backgroundImage: `
            radial-gradient(circle at 1px 1px, rgba(139, 92, 246, 0.2) 1px, transparent 0),
            radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.18) 1px, transparent 0),
            radial-gradient(circle at 1px 1px, rgba(236, 72, 153, 0.15) 1px, transparent 0)
          `,
          backgroundSize: "20px 20px, 30px 30px, 25px 25px",
          backgroundPosition: "0 0, 10px 10px, 15px 5px",
        }}
      />

      {/* Centered Text */}
      <h1 className="relative z-10 text-slate-800 dark:text-white text-4xl font-bold text-center">
        Noise Texture Background
      </h1>
    </div>
  );
}
