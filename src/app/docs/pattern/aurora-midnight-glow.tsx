export default function AuroraMidnightGlow() {
  return (
    <div className="w-full h-96 relative overflow-hidden rounded-lg border">
      <div 
        className="w-full h-full"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(120, 180, 255, 0.25), transparent 70%), #000000"
        }}
      >
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-2">
              Aurora Midnight Glow
            </h2>
            <p className="text-gray-300">
              Elliptical blue glow on black background
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
