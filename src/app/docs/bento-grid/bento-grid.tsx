"use client";
import React, {
  ComponentPropsWithoutRef,
  ReactNode,
  FC,
  SVGProps,
} from "react";

const cn = (...inputs: (string | boolean | undefined | null)[]) => {
  return inputs.filter(Boolean).join(" ");
};

const ArrowRightIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill="currentColor"
    {...props}
  >
    <path
      fillRule="evenodd"
      d="M8.22 2.72a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 8.5H3.75a.75.75 0 0 1 0-1.5h8.19L8.22 3.78a.75.75 0 0 1 0-1.06Z"
      clipRule="evenodd"
    />
  </svg>
);

// --- Bento Grid Components ---

interface BentoGridProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
  className?: string;
}

const BentoGrid: FC<BentoGridProps> = ({ children, className, ...props }) => {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[22rem] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

interface BentoCardProps extends ComponentPropsWithoutRef<"div"> {
  name: string;
  className: string;
  background: ReactNode;
  Icon: React.ElementType;
  description: string;
  href: string;
  cta: string;
}

const BentoCard: FC<BentoCardProps> = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
  ...props
}) => (
  <div
    key={name}
    className={cn(
      "group relative flex flex-col justify-between overflow-hidden rounded-xl",
      // Base styles including shadows and borders
      "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
      // Dark mode styles
      "transform-gpu dark:bg-black dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
      className
    )}
    {...props}
  >
    {/* The background element is rendered here. It's passed as a ReactNode. */}
    <div>{background}</div>
    <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-6 transition-all duration-300 group-hover:-translate-y-10">
      {/* The Icon component */}
      <Icon className="h-12 w-12 origin-left transform-gpu text-neutral-700 transition-all duration-300 ease-in-out group-hover:scale-75 dark:text-neutral-300" />
      {/* The card title */}
      <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
        {name}
      </h3>
      {/* The card description */}
      <p className="max-w-lg text-neutral-500 dark:text-neutral-400">
        {description}
      </p>
    </div>

    {/* The call-to-action button, which becomes visible on hover */}
    <div
      className={cn(
        "pointer-events-none absolute bottom-0 flex w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
      )}
    >
      {/* The link is styled as a button. `pointer-events-auto` makes it clickable even though parent is non-clickable. */}
      <a
        href={href}
        className="pointer-events-auto text-sm font-semibold text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-500 flex items-center"
      >
        {cta}
        <ArrowRightIcon className="ml-2 h-4 w-4" />
      </a>
    </div>

    {/* A subtle overlay that appears on hover to create a depth effect */}
    <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.03] group-hover:dark:bg-neutral-800/10" />
  </div>
);

// --- Example Usage ---

const FileTextIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <line x1="10" y1="9" x2="8" y2="9" />
  </svg>
);
const IntegrationIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2L2 7l10 5 10-5-10-5z" />
    <path d="M2 17l10 5 10-5" />
    <path d="M2 12l10 5 10-5" />
  </svg>
);
const ShareIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
    <polyline points="16 6 12 2 8 6" />
    <line x1="12" y1="2" x2="12" y2="15" />
  </svg>
);
const GlobeIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
    <path d="M2 12h20" />
  </svg>
);

// Explicitly defining a type for the feature objects for better type safety.
type Feature = {
  Icon: FC<SVGProps<SVGSVGElement>>;
  name: string;
  description: string;
  href: string;
  cta: string;
  className: string;
  background: ReactNode;
};

// Example data for the cards, now strongly typed.
const features: Feature[] = [
  {
    Icon: FileTextIcon,
    name: "Automated Reporting",
    description: "Generate and export detailed reports with a single click.",
    href: "#",
    cta: "Learn More",
    className: "lg:col-span-1",
    background: (
      <div className="absolute inset-0 bg-amber-50 dark:bg-amber-950/20" />
    ),
  },
  {
    Icon: IntegrationIcon,
    name: "Seamless Integration",
    description: "Connect with your favorite tools and services effortlessly.",
    href: "#",
    cta: "View Integrations",
    className: "lg:col-span-2",
    background: (
      <div className="absolute inset-0 bg-purple-50 dark:bg-purple-950/20" />
    ),
  },
  {
    Icon: ShareIcon,
    name: "Real-Time Collaboration",
    description: "Work together with your team in real-time on any project.",
    href: "#",
    cta: "Try It Now",
    className: "lg:col-span-2",
    background: (
      <div className="absolute inset-0 bg-blue-50 dark:bg-blue-950/20" />
    ),
  },
  {
    Icon: GlobeIcon,
    name: "Global Reach",
    description:
      "Deploy your applications anywhere in the world with our robust infrastructure.",
    href: "#",
    cta: "Explore Regions",
    className: "lg:col-span-1",
    background: (
      <div className="absolute inset-0 bg-green-50 dark:bg-green-950/20" />
    ),
  },
];

export default function BentoGridCom() {
  return (
    <div className="w-full p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <BentoGrid>
          {features.map((feature, idx) => (
            <BentoCard key={idx} {...feature} />
          ))}
        </BentoGrid>
      </div>
    </div>
  );
}
