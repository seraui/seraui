"use client";
import React from "react";
import NoiseCard from "../noise-card";

const VibrantOrangeCard = () => {
  return (
    <NoiseCard
      width="w-80"
      height="h-80"
      className="shadow-2xl flex flex-col"
      animated={false}
      noiseOpacity={0.12}
      grainSize={1}
      bgColor="bg-[#FF8C00]"
    >
      <div className="flex-grow">
        <h3 className="text-2xl font-bold mb-4 text-white">Vibrant Orange</h3>
        <p className="text-gray-200 leading-relaxed">
          This card showcases the static noise effect on a vibrant orange
          background.
        </p>
      </div>
      <button className="mt-6 w-full px-6 py-3 bg-white text-[#FF8C00] font-semibold rounded-lg hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#FF8C00] focus:ring-white">
        Join Now
      </button>
    </NoiseCard>
  );
};

export default VibrantOrangeCard;
