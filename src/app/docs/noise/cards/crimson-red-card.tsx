"use client";
import React from "react";
import NoiseCard from "../noise-card";

const CrimsonRedCard = () => {
  return (
    <NoiseCard
      width="w-80"
      height="h-80"
      className="shadow-2xl flex flex-col"
      animated={false}
      noiseOpacity={0.12}
      grainSize={1}
      bgColor="bg-[#8B0000]"
    >
      <div className="flex-grow">
        <h3 className="text-2xl font-bold mb-4 text-white">Crimson Red</h3>
        <p className="text-gray-200 leading-relaxed">
          This card showcases the static noise effect on a crimson red
          background.
        </p>
      </div>
      <button className="mt-6 w-full px-6 py-3 bg-white text-[#8B0000] font-semibold rounded-lg hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#8B0000] focus:ring-white">
        Discover
      </button>
    </NoiseCard>
  );
};

export default CrimsonRedCard;
