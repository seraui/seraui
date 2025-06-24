import { TiltCard } from "@/components/core/tilt-card";

const TiltCardBasic = () => {
  return (
    <TiltCard>
      <div className="w-full h-full flex flex-col bg-zinc-50 dark:bg-zinc-950">
        <img
          src="/images/plants.jpg"
          alt="plant"
          className="w-full aspect-square object-fill"
        />
        <div className="py-2 px-4">
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
            Tilt Card Component
          </h3>
          <p className="text-xs font-normal text-zinc-600 dark:text-zinc-400">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sed,
            cumque nostrum minus quod perspiciatis aspernatur.
          </p>
        </div>
      </div>
    </TiltCard>
  );
};

export default TiltCardBasic;
