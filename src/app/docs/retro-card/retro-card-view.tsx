"use client";
import BasicExamples from "./examples/basic-examples";
import FormExamples from "./examples/form-examples";
import ProfileExamples from "./examples/profile-examples";
import GamingExamples from "./examples/gaming-examples";
import InteractiveExamples from "./examples/interactive-examples";

const RetroCardView: React.FC = () => {
  return (
    <div className="bg-[#f5f5f5] dark:bg-gray-900 min-h-screen w-full p-4 sm:p-6 lg:p-8 transition-colors">
      <div className="max-w-6xl mx-auto space-y-12">
        <BasicExamples />
        <FormExamples />
        <ProfileExamples />
        <GamingExamples />
        <InteractiveExamples />
      </div>
    </div>
  );
};

export default RetroCardView;
