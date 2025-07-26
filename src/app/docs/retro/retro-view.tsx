"use client";
import React from "react";
import DefaultButtons from "./components/DefaultButtons";
import SecondaryButtons from "./components/SecondaryButtons";
import OutlineButtons from "./components/OutlineButtons";
import IconButtons from "./components/IconButtons";
import LinkButtons from "./components/LinkButtons";
import LoadingButtons from "./components/LoadingButtons";
import ButtonsWithIcons from "./components/ButtonsWithIcons";
import FormButtons from "./components/FormButtons";
import SizeComparison from "./components/SizeComparison";
import InteractiveDemo from "./components/InteractiveDemo";

export default function RetroButtonView() {
  // Section Title Helper Component
  interface SectionTitleProps {
    title: string;
    description?: string;
  }

  const SectionTitle: React.FC<SectionTitleProps> = ({
    title,
    description,
  }) => (
    <div className="mb-8 text-center">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
        {title}
      </h2>
      {description && (
        <p className="text-gray-600 dark:text-gray-400 text-sm max-w-2xl mx-auto">
          {description}
        </p>
      )}
    </div>
  );

  return (
    <div className="py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Retro Button Components
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            A comprehensive showcase of retro-styled button components with hard
            shadows, vibrant colors, and smooth hover animations. Perfect for
            modern applications with a nostalgic twist.
          </p>
        </div>

        {/* Default Buttons */}
        <section>
          <SectionTitle
            title="Default Buttons"
            description="Primary action buttons with the signature retro styling and hard shadow effects"
          />
          <DefaultButtons />
        </section>

        {/* Secondary Buttons */}
        <section>
          <SectionTitle
            title="Secondary Buttons"
            description="Alternative styling for secondary actions with gray background"
          />
          <SecondaryButtons />
        </section>

        {/* Outline Buttons */}
        <section>
          <SectionTitle
            title="Outline Buttons"
            description="Transparent buttons with colored borders that fill on hover"
          />
          <OutlineButtons />
        </section>

        {/* Icon Buttons */}
        <section>
          <SectionTitle
            title="Icon Buttons"
            description="Square buttons designed specifically for icons and single actions"
          />
          <IconButtons />
        </section>

        {/* Link Buttons */}
        <section>
          <SectionTitle
            title="Link Buttons"
            description="Minimal styling for text-based actions and navigation"
          />
          <LinkButtons />
        </section>

        {/* Loading States */}
        <section>
          <SectionTitle
            title="Loading States"
            description="Interactive buttons with loading spinners and disabled states during async operations"
          />
          <LoadingButtons />
        </section>

        {/* Button with Icons and Text */}
        <section>
          <SectionTitle
            title="Buttons with Icons"
            description="Combining icons with text for enhanced user experience and visual clarity"
          />
          <ButtonsWithIcons />
        </section>

        {/* Form Buttons */}
        <section>
          <SectionTitle
            title="Form Actions"
            description="Common button combinations used in forms and dialogs"
          />
          <FormButtons />
        </section>

        {/* Size Comparison */}
        <section>
          <SectionTitle
            title="Size Comparison"
            description="All available button sizes side by side for easy comparison"
          />
          <SizeComparison />
        </section>

        {/* Interactive Demo */}
        <section>
          <SectionTitle
            title="Interactive Demo"
            description="Try clicking these buttons to see the retro hover and click animations in action"
          />
          <InteractiveDemo />
        </section>
      </div>
    </div>
  );
}
