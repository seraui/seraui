"use client";
import Button from "./retro";
import React from "react";

export default function RetroButtonView() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  // Icon components for demonstration
  const StarIcon: React.FC = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );

  const HeartIcon: React.FC = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );

  const DownloadIcon: React.FC = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7,10 12,15 17,10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );

  const PlusIcon: React.FC = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );

  // Section Title Helper Component
  interface SectionTitleProps {
    title: string;
    description?: string;
  }

  const SectionTitle: React.FC<SectionTitleProps> = ({ title, description }) => (
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

  const handleLoadingClick = (): void => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Simulate a 3-second network request
  };

  return (
    <div className="py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-16">

        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Retro Button Components
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            A comprehensive showcase of retro-styled button components with hard shadows,
            vibrant colors, and smooth hover animations. Perfect for modern applications
            with a nostalgic twist.
          </p>
        </div>

        {/* Default Buttons */}
        <section>
          <SectionTitle
            title="Default Buttons"
            description="Primary action buttons with the signature retro styling and hard shadow effects"
          />
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Button variant="default" size="lg">
              Large Button
            </Button>
            <Button variant="default" size="md">
              Medium Button
            </Button>
            <Button variant="default" size="sm">
              Small Button
            </Button>
            <Button variant="default" size="md" disabled>
              Disabled
            </Button>
          </div>
        </section>

        {/* Secondary Buttons */}
        <section>
          <SectionTitle
            title="Secondary Buttons"
            description="Alternative styling for secondary actions with gray background"
          />
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Button variant="secondary" size="lg">
              Large Secondary
            </Button>
            <Button variant="secondary" size="md">
              Medium Secondary
            </Button>
            <Button variant="secondary" size="sm">
              Small Secondary
            </Button>
            <Button variant="secondary" size="md" disabled>
              Disabled
            </Button>
          </div>
        </section>

        {/* Outline Buttons */}
        <section>
          <SectionTitle
            title="Outline Buttons"
            description="Transparent buttons with colored borders that fill on hover"
          />
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Button variant="outline" size="lg">
              Large Outline
            </Button>
            <Button variant="outline" size="md">
              Medium Outline
            </Button>
            <Button variant="outline" size="sm">
              Small Outline
            </Button>
            <Button variant="outline" size="md" disabled>
              Disabled
            </Button>
          </div>
        </section>

        {/* Icon Buttons */}
        <section>
          <SectionTitle
            title="Icon Buttons"
            description="Square buttons designed specifically for icons and single actions"
          />
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Button variant="default" size="icon" aria-label="Star">
              <StarIcon />
            </Button>
            <Button variant="secondary" size="icon" aria-label="Heart">
              <HeartIcon />
            </Button>
            <Button variant="outline" size="icon" aria-label="Download">
              <DownloadIcon />
            </Button>
            <Button variant="default" size="icon" aria-label="Add" disabled>
              <PlusIcon />
            </Button>
          </div>
        </section>

        {/* Link Buttons */}
        <section>
          <SectionTitle
            title="Link Buttons"
            description="Minimal styling for text-based actions and navigation"
          />
          <div className="flex flex-wrap items-center justify-center gap-8">
            <Button variant="link">
              Primary Link
            </Button>
            <Button variant="link" disabled>
              Disabled Link
            </Button>
          </div>
        </section>

        {/* Loading States */}
        <section>
          <SectionTitle
            title="Loading States"
            description="Interactive buttons with loading spinners and disabled states during async operations"
          />
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Button
              variant="default"
              size="lg"
              loading={isLoading}
              onClick={handleLoadingClick}
            >
              {isLoading ? "Loading..." : "Click to Load"}
            </Button>
            <Button
              variant="secondary"
              size="md"
              loading={isLoading}
              onClick={handleLoadingClick}
            >
              {isLoading ? "Processing..." : "Process Data"}
            </Button>
            <Button
              variant="outline"
              size="md"
              loading={isLoading}
              onClick={handleLoadingClick}
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </section>

        {/* Button with Icons and Text */}
        <section>
          <SectionTitle
            title="Buttons with Icons"
            description="Combining icons with text for enhanced user experience and visual clarity"
          />
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Button variant="default" size="lg" className="gap-2">
              <DownloadIcon />
              Download File
            </Button>
            <Button variant="secondary" size="md" className="gap-2">
              <HeartIcon />
              Add to Favorites
            </Button>
            <Button variant="outline" size="md" className="gap-2">
              <PlusIcon />
              Create New
            </Button>
            <Button variant="default" size="sm" className="gap-2" disabled>
              <StarIcon />
              Rate Item
            </Button>
          </div>
        </section>

        {/* Form Buttons */}
        <section>
          <SectionTitle
            title="Form Actions"
            description="Common button combinations used in forms and dialogs"
          />
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Button variant="default" size="md" type="submit">
              Submit Form
            </Button>
            <Button variant="secondary" size="md" type="button">
              Cancel
            </Button>
            <Button variant="outline" size="md" type="reset">
              Reset Form
            </Button>
          </div>
        </section>

        {/* Size Comparison */}
        <section>
          <SectionTitle
            title="Size Comparison"
            description="All available button sizes side by side for easy comparison"
          />
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Button variant="default" size="sm">
              Small
            </Button>
            <Button variant="default" size="md">
              Medium
            </Button>
            <Button variant="default" size="lg">
              Large
            </Button>
            <Button variant="default" size="icon" aria-label="Icon size">
              <StarIcon />
            </Button>
          </div>
        </section>

        {/* Interactive Demo */}
        <section>
          <SectionTitle
            title="Interactive Demo"
            description="Try clicking these buttons to see the retro hover and click animations in action"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <Button variant="default" size="md" className="w-full mb-2">
                Hover Me!
              </Button>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Default button with shadow animation
              </p>
            </div>
            <div className="text-center">
              <Button variant="outline" size="md" className="w-full mb-2">
                Try This One
              </Button>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Outline button with fill animation
              </p>
            </div>
            <div className="text-center">
              <Button variant="secondary" size="md" className="w-full mb-2">
                And This!
              </Button>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Secondary button with smooth transitions
              </p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
