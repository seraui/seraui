import GlitchVault from "./glitchvault";

export default function GlitchVaultCard() {
  return (
    <GlitchVault
      className="w-full max-w-md border border-slate-200 dark:border-slate-800 rounded-xl bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm"
      glitchColor="#FF6B6B"
      glitchRadius={80}
    >
      <div className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-pink-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">🚀</span>
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 dark:text-slate-100">
              Project Launch
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Ready to deploy
            </p>
          </div>
        </div>
        <p className="text-slate-700 dark:text-slate-300 text-sm mb-4">
          Your application is ready for production deployment with all tests
          passing.
        </p>
        <div className="flex gap-2">
          <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            Deploy Now
          </button>
          <button className="border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
            View Details
          </button>
        </div>
      </div>
    </GlitchVault>
  );
}
