"use client";
import RetroCard from "../retro-card";

const GamingExamples: React.FC = () => {
  return (
    <section>
      <h2 className="text-2xl font-bold font-mono mb-6 text-center dark:text-white">
        Gaming & Interactive
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Game Score Card */}
        <RetroCard>
          <div className="text-center space-y-4">
            <h3 className="font-mono text-xl font-bold">HIGH SCORE</h3>
            <div className="space-y-2">
              <div className="flex justify-between font-mono">
                <span>1. PLAYER1</span>
                <span>999,999</span>
              </div>
              <div className="flex justify-between font-mono">
                <span>2. PLAYER2</span>
                <span>888,888</span>
              </div>
              <div className="flex justify-between font-mono">
                <span>3. PLAYER3</span>
                <span>777,777</span>
              </div>
            </div>
            <button className="w-full bg-black dark:bg-white text-white dark:text-black font-mono font-bold py-2 border-2 border-black dark:border-white hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors">
              PLAY AGAIN
            </button>
          </div>
        </RetroCard>

        {/* Terminal-style Card */}
        <RetroCard>
          <div className="bg-black dark:bg-gray-900 text-green-400 p-3 font-mono text-sm">
            <div className="mb-2">$ system --status</div>
            <div className="text-green-300">
              <div>CPU: 45% usage</div>
              <div>RAM: 2.1GB / 8GB</div>
              <div>DISK: 156GB free</div>
              <div>NET: Connected</div>
            </div>
            <div className="mt-2">
              <span className="animate-pulse">█</span>
            </div>
          </div>
        </RetroCard>
      </div>
    </section>
  );
};

export default GamingExamples;
