export default function DiagonalSynthwave() {
  return (
    <div className="w-full h-96 relative overflow-hidden rounded-lg border">
      <div 
        className="w-full h-full"
        style={{
          background: "#0a0a0a",
          backgroundImage: `
            repeating-linear-gradient(45deg, rgba(255, 20, 147, 0.15) 0, rgba(255, 20, 147, 0.15) 2px, transparent 2px, transparent 30px),
            repeating-linear-gradient(-45deg, rgba(0, 255, 255, 0.1) 0, rgba(0, 255, 255, 0.1) 1px, transparent 1px, transparent 25px)
          `,
          backgroundSize: "40px 40px"
        }}
      >
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-pink-400 mb-2">
              Diagonal Synthwave
            </h2>
            <p className="text-cyan-300">
              Retro synthwave diagonal grid pattern
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
