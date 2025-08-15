"use client";
import GlassButton from "./liquid-glass"


function LiquidGlassDemo() {

  return (
    <div className="relative w-full h-96 transition-colors duration-500 bg-gray-100 dark:bg-gray-900 overflow-hidden rounded-lg">
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1744125156184-e0d7e0bc04c4?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        }}
      ></div>

      <div className="relative z-10 w-full h-full flex items-center justify-center p-6">
        <div className="flex gap-4 flex-wrap justify-center items-center">
          <GlassButton variant="subtle" size="sm" onClick={() => console.log("Subtle")}>
            Subtle
          </GlassButton>
          <GlassButton variant="default" size="md" onClick={() => console.log("Default")}>
            Default
          </GlassButton>
          <GlassButton variant="bold" size="lg" onClick={() => console.log("Bold")}>
            Bold
          </GlassButton>
          <GlassButton variant="ghost" size="md" onClick={() => console.log("Ghost")} textClassName="text-white/80">
            Ghost
          </GlassButton>
          <GlassButton
            variant="default"
            size="icon"
            aria-label="Icon"
            onClick={() => console.log("Icon")}
          >
            😎
          </GlassButton>
        </div>
      </div>
    </div>
  );
}

export default LiquidGlassDemo;