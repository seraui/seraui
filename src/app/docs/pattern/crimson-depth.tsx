export default function CrimsonDepth() {
  return (
    <div className="w-full h-96 relative overflow-hidden rounded-lg border">
      <div 
        className="w-full h-full"
        style={{
          background: "#000000",
          backgroundImage: `radial-gradient(125% 125% at 50% 100%, #000000 40%, #2b0707 100%)`,
          backgroundSize: "100% 100%"
        }}
      >
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-2">
              Crimson Depth
            </h2>
            <p className="text-gray-300">
              Dark crimson radial gradient from bottom
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
