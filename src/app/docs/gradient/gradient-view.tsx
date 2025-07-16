import Gradient from './gradient';

function GradientView() {
  return (
    <div className="font-sans flex items-center justify-center">
      <Gradient>
        <div className="bg-slate-900 rounded-lg p-8 w-full max-w-md">
          <div className="text-center">
          <span className="pointer-events-none z-10 h-full whitespace-pre-wrap bg-gradient-to-br from-[#ff2975] from-35% to-[#00FFF1] bg-clip-text text-center text-6xl font-bold leading-none tracking-tighter text-transparent dark:drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">
          Neon Gradient Card
          </span>
          </div>
        </div>
      </Gradient>
    </div>
  );
}

export default GradientView