import dynamic from "next/dynamic";
import { ComponentType } from "react";

// Loading skeleton component
const LoadingSkeleton = ({ height = "200px" }: { height?: string }) => (
  <div
    className="animate-pulse bg-gray-200 dark:bg-gray-800 rounded-lg"
    style={{ height }}
  />
);

// Dynamic component wrapper with loading state
export function createDynamicComponent<T = object>(
  importFn: () => Promise<{ default: ComponentType<T> }>,
  options?: {
    ssr?: boolean;
    height?: string;
  }
) {
  return dynamic(importFn, {
    ssr: options?.ssr ?? false,
    loading: () => <LoadingSkeleton height={options?.height} />,
  });
}

// For your carousel component
export const DynamicCarousel = createDynamicComponent(
  () => import("@/app/docs/carousel/enhanced-carousel"),
  { height: "250px" }
);
