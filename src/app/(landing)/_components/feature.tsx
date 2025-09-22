import {
  BentoCard,
  BentoCardProps,
  BentoGrid,
} from "@/app/docs/bento-grid/bento-grid";

const features: BentoCardProps[] = [
  {
    name: "Rapid Development with Reusable Components",
    description:
      "Accelerate your project timelines with a robust library of pre-built, modular React and Next.js components. From dynamic forms to interactive dashboards, Sera UI provides intuitive, ready-to-use building blocks that reduce coding overhead and boost productivity.",
    className: "lg:col-span-1",
    background: (
      <div className="absolute inset-0 bg-amber-50 dark:bg-amber-950/20" />
    ),
  },
  {
    name: "Seamless Customization with Tailwind CSS",
    description:
      "Utilize the power of Tailwind CSS for effortless theming and styling. Customize your UI with precision using Tailwind's utility-first classes and configuration, ensuring your designs are pixel-perfect and aligned with your brand—without writing custom CSS from scratch.",
    className: "lg:col-span-2",
    background: (
      <div className="absolute inset-0 bg-purple-50 dark:bg-purple-950/20" />
    ),
  },
  {
    name: "Engaging Animations Powered by Framer Motion",
    description:
      "Elevate user experiences with smooth, performant animations and transitions. Sera UI integrates Framer Motion to deliver dynamic motion effects that captivate users, from subtle micro-interactions to bold page transitions, all while maintaining accessibility and performance.",
    className: "lg:col-span-2",
    background: (
      <div className="absolute inset-0 bg-blue-50 dark:bg-blue-950/20" />
    ),
  },
  {
    name: "Built-In Iconography with Lucide React",
    description:
      "Enhance your interfaces with a sleek, scalable and large collection of Lucide React icons. Seamlessly integrated and fully customizable, these icons add visual flair and clarity to your applications, saving you time on asset management.",
    className: "lg:col-span-1",
    background: (
      <div className="absolute inset-0 bg-green-50 dark:bg-green-950/20" />
    ),
  },
  {
    name: "Developer-Centric Design for Scalability",
    description:
      "Created by developers, for developers, Sera UI prioritizes clean code, modularity, and extensibility. Whether you’re building a startup MVP or an enterprise-grade application, Sera UI scales effortlessly to meet your project’s needs.",
    className: "lg:col-span-full _lg:justify-self-center",
    background: (
      <div className="absolute inset-0 bg-amber-50 dark:bg-green-950/20" />
    ),
  },
];

export function FeatureSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12 md:py-20">
      <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-center leading-tight mb-16 text-gray-900 dark:text-white">
        Features
      </h2>

      <BentoGrid className="auto-rows-[20rem]">
        {features.map((feature, idx) => (
          <BentoCard key={idx} {...feature} />
        ))}
      </BentoGrid>
    </section>
  );
}
