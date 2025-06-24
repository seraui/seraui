import { FlipCard } from "@/components/core/flip-card";

const FlipCardVertical = () => {
  return (
    <FlipCard
      front={<Front />}
      back={<Back />}
      className="w-[350px]"
      panelClassName="rounded-2xl bg-black"
      flipDirection="vertical"
      flipRotation="reverse"
    />
  );
};

const Front = () => {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center gap-4 bg-gradient-to-b from-sky-600 to-blue-800 p-6  text-center text-white overflow-hidden">
      <div className="absolute inset-0 bg-white/10 blur-2xl opacity-20" />
      <h2 className="text-xl font-bold uppercase tracking-wider z-10">
        Build Mode
      </h2>
      <p className="text-sm z-10 max-w-xs">
        We used to look up at the sky and wonder.
      </p>
      <span className="text-xs font-mono opacity-60 z-10">npm run dev</span>
    </div>
  );
};

const Back = () => {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center gap-4 bg-gradient-to-t from-zinc-900 to-zinc-700 p-6 text-center text-zinc-100 overflow-hidden">
      <div className="absolute inset-0 bg-white/5 blur-xl opacity-10" />
      <h2 className="text-xl font-bold uppercase tracking-wider z-10">
        Ship Mode
      </h2>
      <p className="text-sm z-10 max-w-xs">
        Now we just look down and worry. Time to launch.
      </p>
      <span className="text-xs font-mono text-green-400 z-10">
        git push origin main
      </span>
    </div>
  );
};

export default FlipCardVertical;
