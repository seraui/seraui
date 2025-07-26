"use client";
import React from "react";
import Button from "../retro";

export default function LoadingButtons() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const handleLoadingClick = (): void => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };

  return (
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
  );
}
