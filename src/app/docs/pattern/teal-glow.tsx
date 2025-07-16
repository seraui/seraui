export default function TealGlow() {
  return (
    <div className="w-full h-96 relative overflow-hidden rounded-lg border">
      <div 
        className="w-full h-full"
        style={{
          background: "#ffffff",
          backgroundImage: `radial-gradient(125% 125% at 50% 90%, #ffffff 40%, #14b8a6 100%)`,
          backgroundSize: "100% 100%"
        }}
      >
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Teal Glow
            </h2>
            <p className="text-gray-600">
              Radial teal glow from bottom center
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
