import CanvasCurvedLoop from "./curved-text"

export default function CanvasCurvedLoopExample() {
  return (
    <div className="flex flex-col items-center w-full font-sans">
      <div className="w-full max-w-7xl px-4">
        <CanvasCurvedLoop
          text="A helpful UI library for design engineers. Use cool animations and components with just a copy and paste. Free and open source"
          speed={1}
          curveHeight={50}
          fontSize={64}
          height={200}
          gap={0.5}
          easing={0.05}
          direction="left"
          interactive={true}
          className="rounded-lg overflow-hidden text-black dark:text-white"
        />
      </div>
    </div>
  );
}
