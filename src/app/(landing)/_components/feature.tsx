"use client";

import {
  BentoCard,
  BentoCardProps,
  BentoGrid,
} from "@/app/docs/bento-grid/bento-grid";
import {
  BoltIcon,
  CodeIcon,
  CogIcon,
  HeartIcon,
  PaintRollerIcon,
  SparklesIcon,
} from "lucide-react";

const features: BentoCardProps[] = [
  {
    name: "Beautiful Reusable React Components",
    description:
      "Versatile collection of pre-designed React and Next.js components based on JSX. From dynamic forms to interactive dashboards, Sera UI offers modular, reusable building blocks to accelerate your workflow and enhance project efficiency.",
    Icon: BoltIcon,
    className: "lg:col-span-1",
    background: (
      <div className="absolute inset-0 bg-amber-50 dark:bg-amber-950/20" />
    ),
  },
  {
    name: "Highly-Customizable with Tailwind CSS",
    description:
      "Effortlessly style and theme your UI with Tailwind CSS. Leverage utility-first classes and flexible configurations to create pixel-perfect, brand-aligned designs without writing custom CSS, saving time and ensuring consistency.",
    Icon: PaintRollerIcon,
    className: "lg:col-span-2",
    background: (
      <div className="absolute inset-0 bg-purple-50 dark:bg-purple-950/20" />
    ),
  },
  {
    name: "200+ Unique UI Components",
    description:
      "Access a diverse set of over 100 customizable UI components. Seamlessly integrated and scalable, these elements enhance your application's visual appeal and functionality, simplifying asset management.",
    Icon: CogIcon,
    className: "lg:col-span-2",
    background: (
      <div className="absolute inset-0 bg-green-50 dark:bg-green-950/20" />
    ),
  },
    {
    name: "Multi-framework Support with JSX",
    description:
      "Sera UI supports multiple frameworks and based on JSX, including React and Next.js, offering flexible integration for diverse projects. Its modular design ensures compatibility and ease of use across various development environments.",
    Icon: HeartIcon,
    className: "lg:col-span-1",
    background: (
      <div className="absolute inset-0 bg-rose-50 dark:bg-green-950/20" />
    ),
  },
  {
    name: "Engaging Animations Powered by Framer Motion",
    description:
      "Captivate users with fluid animations and transitions using Framer Motion. Sera UI delivers seamless micro-interactions and striking page transitions, balancing accessibility and performance to elevate user engagement.",
    Icon: SparklesIcon,
    className: "lg:col-span-1",
    background: (
      <div className="absolute inset-0 bg-blue-50 dark:bg-blue-950/20" />
    ),
  },
  {
    name: "Developer-Centric Design for Scalability",
    description:
      "Built for developers, Sera UI emphasizes clean, modular, and extensible code. From startup MVPs to enterprise applications, it scales effortlessly, supporting rapid development and long-term maintainability.",
    Icon: CodeIcon,
    className: "lg:col-span-2",
    background: (
      <div className="absolute inset-0 bg-amber-50 dark:bg-green-950/20" />
    ),
  },

];

export function FeatureSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12 md:py-20">
      <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-center leading-tight mb-16 text-gray-900 dark:text-white">
        Sera UI Features
      </h2>

      <BentoGrid className="auto-rows-[23rem]">
        {features.map((feature, idx) => (
          <BentoCard key={idx} {...feature} />
        ))}
      </BentoGrid>
    </section>
  );
}
