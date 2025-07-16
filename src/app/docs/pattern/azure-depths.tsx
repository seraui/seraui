'use client'
export default function AzureDepths() {
  return (
    <div className="min-h-screen w-full relative flex items-center justify-center">
      {/* Light mode Azure Depths */}
      <div
        className="absolute inset-0 z-0 dark:hidden"
        style={{
          background: "radial-gradient(125% 125% at 50% 100%, #ffffff 40%, #3b82f6 100%)",
        }}
      />

      {/* Dark mode Azure Depths */}
      <div
        className="absolute inset-0 z-0 hidden dark:block"
        style={{
          background: "radial-gradient(125% 125% at 50% 100%, #000000 40%, #010133 100%)",
        }}
      />

      {/* Centered Text */}
      <h1 className="relative z-10 text-slate-800 dark:text-white text-4xl font-bold text-center">
        Azure Depths Background
      </h1>
    </div>
  );
}
