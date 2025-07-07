export default function MatrixGreenAdvanced() {
  return (
    <div className="w-full h-96 relative overflow-hidden rounded-lg border">
      <div 
        className="w-full h-full"
        style={{
          background: "#000000",
          backgroundImage: `
            repeating-linear-gradient(45deg, rgba(0, 255, 65, 0.08) 0, rgba(0, 255, 65, 0.08) 1px, transparent 1px, transparent 12px),
            repeating-linear-gradient(-45deg, rgba(0, 255, 65, 0.08) 0, rgba(0, 255, 65, 0.08) 1px, transparent 1px, transparent 12px),
            repeating-linear-gradient(90deg, rgba(0, 255, 65, 0.03) 0, rgba(0, 255, 65, 0.03) 1px, transparent 1px, transparent 4px)
          `,
          backgroundSize: "24px 24px, 24px 24px, 8px 8px"
        }}
      >
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-green-400 mb-2">
              Matrix Green Advanced
            </h2>
            <p className="text-green-300">
              Complex matrix-style diagonal grid pattern
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
