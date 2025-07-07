export default function BottomGradientRadial() {
  return (
    <div className="w-full h-96 relative overflow-hidden rounded-lg border">
      <div 
        className="w-full h-full"
        style={{
          background: "radial-gradient(125% 125% at 50% 90%, #fff 40%, #6366f1 100%)"
        }}
      >
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Bottom Gradient Radial
            </h2>
            <p className="text-gray-600">
              Radial gradient from white to purple starting from bottom
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
