"use client";
import React, { FC } from "react";
import DeepOceanCard from "./cards/deep-ocean-card";
import ElectricPurpleCard from "./cards/electric-purple-card";
import ForestGreenCard from "./cards/forest-green-card";
import ClassicBlackCard from "./cards/classic-black-card";
import CrimsonRedCard from "./cards/crimson-red-card";
import VibrantOrangeCard from "./cards/vibrant-orange-card";

// The main App component demonstrates a gallery of NoiseCards with different colors.
const App: FC = () => {
  return (
    <div className="min-h-screen w-full bg-gray-800 flex items-center justify-center p-8 font-sans">
      <div className="flex flex-wrap gap-8 justify-center">
        <DeepOceanCard />
        <ElectricPurpleCard />
        <ForestGreenCard />
        <ClassicBlackCard />
        <CrimsonRedCard />
        <VibrantOrangeCard />
      </div>
    </div>
  );
};

export default App;
