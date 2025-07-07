export default function DualGradientOverlay() {
  return (
    <div className="w-full h-96 relative overflow-hidden rounded-lg border">
      <div 
        className="w-full h-full"
        style={{
          background: "#ffffff",
          backgroundImage: `
            linear-gradient(to right, rgba(229,231,235,0.8) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(229,231,235,0.8) 1px, transparent 1px),
            radial-gradient(circle 500px at 20% 80%, rgba(139,92,246,0.3), transparent),
            radial-gradient(circle 500px at 80% 20%, rgba(59,130,246,0.3), transparent)
          `,
          backgroundSize: "48px 48px, 48px 48px, 100% 100%, 100% 100%"
        }}
      >
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Dual Gradient Overlay
            </h2>
            <p className="text-gray-600">
              Grid with dual gradient overlays
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
