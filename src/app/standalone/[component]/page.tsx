import { notFound } from "next/navigation";
import { ComponentRegistry } from "./component-registry";

interface StandalonePageProps {
  params: Promise<{
    component: string;
  }>;
}

// Generate static params for all available components
export async function generateStaticParams() {
  return Object.keys(ComponentRegistry).map((component) => ({
    component,
  }));
}

export default async function StandalonePage({ params }: StandalonePageProps) {
  const { component: componentName } = await params;

  // Get the component from the registry
  const ComponentToRender = ComponentRegistry[componentName];

  if (!ComponentToRender) {
    notFound();
  }

  return (
    <main className="min-h-screen w-full flex items-center justify-center p-4">
      <div className="w-full max-w-7xl">
        <ComponentToRender />
      </div>
    </main>
  );
}
