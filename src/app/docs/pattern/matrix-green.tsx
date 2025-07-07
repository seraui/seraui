'use client'
export default function MatrixGreen() {
  return (
    <div className="min-h-screen w-full bg-white dark:bg-[#000000] relative flex items-center justify-center">
      {/* Light mode Matrix Green */}
      <div
        className="absolute inset-0 z-0 dark:hidden"
        style={{
          background: "#f8fafc",
          backgroundImage: `
            repeating-linear-gradient(45deg, rgba(34, 197, 94, 0.08) 0, rgba(34, 197, 94, 0.08) 1px, transparent 1px, transparent 12px),
            repeating-linear-gradient(-45deg, rgba(34, 197, 94, 0.08) 0, rgba(34, 197, 94, 0.08) 1px, transparent 1px, transparent 12px),
            repeating-linear-gradient(90deg, rgba(34, 197, 94, 0.03) 0, rgba(34, 197, 94, 0.03) 1px, transparent 1px, transparent 4px)
          `,
          backgroundSize: "24px 24px, 24px 24px, 8px 8px",
        }}
      />

      {/* Dark mode Matrix Green */}
      <div
        className="absolute inset-0 z-0 hidden dark:block"
        style={{
          background: "#000000",
          backgroundImage: `
            repeating-linear-gradient(45deg, rgba(0, 255, 65, 0.08) 0, rgba(0, 255, 65, 0.08) 1px, transparent 1px, transparent 12px),
            repeating-linear-gradient(-45deg, rgba(0, 255, 65, 0.08) 0, rgba(0, 255, 65, 0.08) 1px, transparent 1px, transparent 12px),
            repeating-linear-gradient(90deg, rgba(0, 255, 65, 0.03) 0, rgba(0, 255, 65, 0.03) 1px, transparent 1px, transparent 4px)
          `,
          backgroundSize: "24px 24px, 24px 24px, 8px 8px",
        }}
      />

      {/* Centered Text */}
      <h1 className="relative z-10 text-slate-800 dark:text-green-400 text-4xl font-bold text-center">
        Matrix Green Background
      </h1>
    </div>
  );
}
