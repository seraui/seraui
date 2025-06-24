import { TiltCard } from "@/components/core/tilt-card";

const TiltCardCTA = () => {
  return (
    <TiltCard depth={150} range={50}>
      <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-indigo-300 to-purple-700 text-zinc-50 p-6">
        <h2 className="text-lg font-semibold">Upgrade to Pro</h2>
        <p className="text-sm mb-4 text-center">
          Get unlimited access to all features and premium support.
        </p>
        <button className="bg-zinc-50 text-indigo-600 px-4 py-2 text-sm rounded-lg font-medium cursor-pointer">
          Get Started
        </button>
      </div>
    </TiltCard>
  );
};

export default TiltCardCTA;
