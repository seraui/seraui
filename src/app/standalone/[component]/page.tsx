'use client';

import { notFound } from 'next/navigation';
import { ComponentRegistry } from './component-registry';

interface StandalonePageProps {
  params: {
    component: string;
  };
}

export default function StandalonePage({ params }: StandalonePageProps) {
  const { component: componentName } = params;

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
