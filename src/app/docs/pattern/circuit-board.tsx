'use client'
export default function CircuitBoard() {
  return (
    <div className="min-h-screen w-full bg-[#f8fafc] dark:bg-[#0f0f0f] relative flex items-center justify-center">
      {/* Light mode Circuit Board */}
      <div
        className="absolute inset-0 z-0 dark:hidden"
        style={{
          background: "#f8fafc",
          backgroundImage: `
            linear-gradient(90deg, #e2e8f0 1px, transparent 1px),
            linear-gradient(180deg, #e2e8f0 1px, transparent 1px),
            linear-gradient(90deg, #cbd5e1 1px, transparent 1px),
            linear-gradient(180deg, #cbd5e1 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px, 50px 50px, 10px 10px, 10px 10px",
        }}
      />

      {/* Dark mode Circuit Board */}
      <div
        className="absolute inset-0 z-0 hidden dark:block"
        style={{
          background: "#0f0f0f",
          backgroundImage: `
            repeating-linear-gradient(0deg, transparent, transparent 19px, rgba(34, 197, 94, 0.15) 19px, rgba(34, 197, 94, 0.15) 20px, transparent 20px, transparent 39px, rgba(34, 197, 94, 0.15) 39px, rgba(34, 197, 94, 0.15) 40px),
            repeating-linear-gradient(90deg, transparent, transparent 19px, rgba(34, 197, 94, 0.15) 19px, rgba(34, 197, 94, 0.15) 20px, transparent 20px, transparent 39px, rgba(34, 197, 94, 0.15) 39px, rgba(34, 197, 94, 0.15) 40px),
            radial-gradient(circle at 20px 20px, rgba(16, 185, 129, 0.18) 2px, transparent 2px),
            radial-gradient(circle at 40px 40px, rgba(16, 185, 129, 0.18) 2px, transparent 2px)
          `,
          backgroundSize: "40px 40px, 40px 40px, 40px 40px, 40px 40px",
        }}
      />

      {/* Centered Text */}
      <h1 className="relative z-10 text-slate-800 dark:text-white text-4xl font-bold text-center">
        Circuit Board Background
      </h1>
    </div>
  );
}
