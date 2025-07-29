import GlitchVault from "./glitchvault";
export default function GlitchVaultProfile() {
  return (
    <main className="w-full  flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0"></div>
      <GlitchVault
        className="w-full max-w-sm backdrop-blur-xl bg-white/20 dark:bg-black/20 border border-white/30 dark:border-white/10 rounded-2xl shadow-2xl shadow-cyan-500/10 relative z-10"
        glitchColor="#0AF0F0"
        glitchRadius={120}
      >
        <div className="p-8 text-center relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent rounded-2xl"></div>
          <div className="flex justify-center items-center mb-8 relative z-10">
            <div className="w-28 h-28 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20 shadow-lg shadow-cyan-500/20 group cursor-pointer hover:scale-105 transition-all duration-500">
              <div className="w-24 h-24 bg-gradient-to-br from-cyan-500/10 to-blue-600/10 rounded-full flex items-center justify-center border border-white/10">
                <span className="text-cyan-600 dark:text-cyan-300 text-sm font-medium opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
                  Hover me
                </span>
              </div>
            </div>
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-cyan-700 dark:from-white dark:via-slate-100 dark:to-cyan-300 bg-clip-text text-transparent mb-2 tracking-wide relative z-10">
            Aura
          </h2>
          <p className="text-slate-600/80 dark:text-slate-300/80 mb-8 text-sm font-medium relative z-10">
            UI/UX Designer & Developer
          </p>
          <button className="bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-cyan-500/10 backdrop-blur-sm border border-cyan-400/30 text-cyan-700 dark:text-cyan-300 px-8 py-3 rounded-full hover:from-cyan-500/20 hover:via-blue-500/20 hover:to-cyan-500/20 hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 font-medium relative z-10 hover:scale-105">
            View Profile
          </button>
        </div>
      </GlitchVault>
    </main>
  );
}
