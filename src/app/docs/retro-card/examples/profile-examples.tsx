"use client";
import RetroCard from "../retro-card";

const ProfileExamples: React.FC = () => {
  return (
    <section>
      <h2 className="text-2xl font-bold font-mono mb-6 text-center dark:text-white">
        Profile & Info Cards
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* User Profile */}
        <RetroCard>
          <div className="text-center space-y-3">
            <div className="w-16 h-16 bg-black dark:bg-white mx-auto flex items-center justify-center">
              <span className="text-white dark:text-black font-mono font-bold text-xl">
                JD
              </span>
            </div>
            <div>
              <h3 className="font-mono font-bold">JOHN DOE</h3>
              <p className="font-mono text-sm text-gray-600 dark:text-gray-400">
                Full Stack Developer
              </p>
            </div>
            <div className="flex justify-center space-x-4 text-xs font-mono">
              <span>📧 john@dev.com</span>
            </div>
          </div>
        </RetroCard>

        {/* Product Card */}
        <RetroCard>
          <div className="space-y-3">
            <div className="w-full h-24 bg-gray-200 dark:bg-gray-700 border-2 border-black dark:border-white flex items-center justify-center">
              <span className="font-mono text-gray-500 dark:text-gray-300">
                PRODUCT IMAGE
              </span>
            </div>
            <div>
              <h3 className="font-mono font-bold">RETRO KEYBOARD</h3>
              <p className="font-mono text-sm text-gray-600 dark:text-gray-400">
                Mechanical switches
              </p>
              <div className="font-mono font-bold text-lg">$129.99</div>
            </div>
          </div>
        </RetroCard>

        {/* Notification Card */}
        <RetroCard>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span className="font-mono font-bold text-sm">ALERT</span>
            </div>
            <p className="font-mono text-sm">
              System maintenance scheduled for tonight at 2:00 AM EST.
            </p>
            <div className="font-mono text-xs text-gray-500 dark:text-gray-400">
              2 hours ago
            </div>
          </div>
        </RetroCard>
      </div>
    </section>
  );
};

export default ProfileExamples;
