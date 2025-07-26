"use client";
import RetroCard from "../retro-card";

const InteractiveExamples: React.FC = () => {
  return (
    <section>
      <h2 className="text-2xl font-bold font-mono mb-6 text-center dark:text-white">
        Interactive Features
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Hover Demo */}
        <RetroCard>
          <div className="text-center space-y-2">
            <h3 className="font-mono font-bold">HOVER EFFECT</h3>
            <p className="font-mono text-sm text-gray-600 dark:text-gray-400">
              Hover over this card to see the shadow expand and the card lift
              up.
            </p>
            <div className="font-mono text-xs text-gray-500 dark:text-gray-400">
              ↗ Try hovering!
            </div>
          </div>
        </RetroCard>

        {/* Button Collection */}
        <RetroCard>
          <div className="space-y-3">
            <h3 className="font-mono font-bold text-center">ACTIONS</h3>
            <div className="space-y-2">
              <button className="w-full bg-black dark:bg-white text-white dark:text-black font-mono py-1 border-2 border-black dark:border-white hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors">
                PRIMARY
              </button>
              <button className="w-full bg-white dark:bg-gray-800 text-black dark:text-white font-mono py-1 border-2 border-black dark:border-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                SECONDARY
              </button>
              <button className="w-full bg-red-500 text-white font-mono py-1 border-2 border-black dark:border-white hover:bg-red-600 transition-colors">
                DANGER
              </button>
            </div>
          </div>
        </RetroCard>

        {/* Progress Card */}
        <RetroCard>
          <div className="space-y-3">
            <h3 className="font-mono font-bold">LOADING...</h3>
            <div className="w-full bg-gray-200 dark:bg-gray-700 border-2 border-black dark:border-white">
              <div
                className="bg-[#00ff84] h-4 border-r-2 border-black dark:border-white"
                style={{ width: "67%" }}
              ></div>
            </div>
            <div className="font-mono text-sm text-center">67% Complete</div>
          </div>
        </RetroCard>
      </div>
    </section>
  );
};

export default InteractiveExamples;
