'use client'
export default function PaperTexture() {
  return (
    <div className="min-h-screen w-full relative flex items-center justify-center">
      {/* Light mode Paper Texture */}
      <div
        className="absolute inset-0 z-0 dark:hidden"
        style={{
          background: "#faf9f6",
          backgroundImage: `
            radial-gradient(circle at 1px 1px, rgba(0,0,0,0.08) 1px, transparent 0),
            repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.02) 2px, rgba(0,0,0,0.02) 4px),
            repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,0.02) 2px, rgba(0,0,0,0.02) 4px)
          `,
          backgroundSize: "8px 8px, 32px 32px, 32px 32px",
        }}
      />

      {/* Dark mode Paper Texture */}
      <div
        className="absolute inset-0 z-0 hidden dark:block"
        style={{
          background: "#1a1a1a",
          backgroundImage: `
            radial-gradient(circle at 1px 1px, rgba(255,255,255,0.08) 1px, transparent 0),
            repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.02) 2px, rgba(255,255,255,0.02) 4px),
            repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255,255,255,0.02) 2px, rgba(255,255,255,0.02) 4px)
          `,
          backgroundSize: "8px 8px, 32px 32px, 32px 32px",
        }}
      />

      {/* Centered Text */}
      <h1 className="relative z-10 text-slate-800 dark:text-white text-4xl font-bold text-center">
        Paper Texture Background
      </h1>
    </div>
  );
}
