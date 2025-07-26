"use client";
import RetroCard from "../retro-card";

const BasicExamples: React.FC = () => {
  return (
    <section>
      <h2 className="text-2xl font-bold font-mono mb-6 text-center dark:text-white">
        Basic Examples
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Simple Content Card */}
        <RetroCard>
          <div className="text-center">
            <h3 className="font-mono text-lg font-bold mb-2">HELLO WORLD</h3>
            <p className="font-mono text-sm text-gray-700 dark:text-gray-300">
              A simple retro card with basic content.
            </p>
          </div>
        </RetroCard>

        {/* Stats Card */}
        <RetroCard>
          <div className="text-center space-y-2">
            <div className="font-mono text-2xl font-bold">1,337</div>
            <div className="font-mono text-sm text-gray-600 dark:text-gray-400">
              USERS ONLINE
            </div>
            <div className="w-full bg-black dark:bg-white h-1"></div>
            <div className="font-mono text-xs">↑ 12% from yesterday</div>
          </div>
        </RetroCard>

        {/* Status Card */}
        <RetroCard>
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <div>
              <div className="font-mono font-bold">SYSTEM STATUS</div>
              <div className="font-mono text-sm text-gray-600 dark:text-gray-400">
                All systems operational
              </div>
            </div>
          </div>
        </RetroCard>
      </div>
    </section>
  );
};

export default BasicExamples;
