'use client';

import { Sparkles, ArrowRight, Check, Star, Zap, Shield } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// Utility function for conditional class names
function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

// Card components
interface CardProps {
  className?: string;
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ className, children }) => (
  <div className={cn('rounded-lg border bg-card text-card-foreground shadow-sm', className)}>
    {children}
  </div>
);

const CardHeader: React.FC<CardProps> = ({ className, children }) => (
  <div className={cn('flex flex-col space-y-1.5 p-6', className)}>
    {children}
  </div>
);

const CardTitle: React.FC<CardProps> = ({ className, children }) => (
  <h3 className={cn('text-2xl font-semibold leading-none tracking-tight', className)}>
    {children}
  </h3>
);

const CardDescription: React.FC<CardProps> = ({ className, children }) => (
  <div className={cn('text-sm text-muted-foreground', className)}>
    {children}
  </div>
);

const CardContent: React.FC<CardProps> = ({ className, children }) => (
  <div className={cn('p-6 pt-0', className)}>
    {children}
  </div>
);

const CardFooter: React.FC<CardProps> = ({ className, children }) => (
  <div className={cn('flex items-center p-6 pt-0', className)}>
    {children}
  </div>
);

// Custom AnimatedNumber component to replace NumberFlow
interface AnimatedNumberProps {
  value: number;
  format: {
    style: 'currency' | 'decimal' | 'percent';
    currency?: string;
    maximumFractionDigits: number;
  };
  className?: string;
}

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({ value, format, className }) => {
  const [currentValue, setCurrentValue] = useState(0);
  const animationFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    const duration = 500; // milliseconds for the animation

    const animate = (timestamp: DOMHighResTimeStamp) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }

      const progress = (timestamp - startTimeRef.current) / duration;
      const easedProgress = Math.min(1, progress); // Ensure progress doesn't exceed 1

      const newValue = easedProgress * value;
      setCurrentValue(newValue);

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        setCurrentValue(value); // Ensure final value is exact
        startTimeRef.current = null; // Reset for next animation
      }
    };

    // Clear any existing animation frame before starting a new one
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    startTimeRef.current = null; // Reset start time for new animation
    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [value]);

  const formatter = new Intl.NumberFormat('en-US', {
    style: format.style,
    currency: format.currency,
    maximumFractionDigits: format.maximumFractionDigits,
  });

  return <span className={className}>{formatter.format(currentValue)}</span>;
};


// Define the structure for a plan for better type safety and readability
interface Plan {
  id: string;
  name: string;
  icon: React.ElementType; // Using React.ElementType for component props
  price: {
    monthly: number | string;
    yearly: number | string;
  };
  description: string;
  features: string[];
  cta: string;
  popular?: boolean; // Optional property
}

// Data for the pricing plans
const plans: Plan[] = [
  {
    id: 'starter',
    name: 'Starter AI',
    icon: Star,
    price: {
      monthly: 'Free forever',
      yearly: 'Free forever',
    },
    description:
      'Kickstart your AI journey with essential features for personal projects.',
    features: [
      '1,000 AI generations / month',
      'Basic AI model access',
      'Community support',
      'Standard processing speed',
      '500MB storage for models',
    ],
    cta: 'Start for Free',
  },
  {
    id: 'pro',
    name: 'Pro AI',
    icon: Zap,
    price: {
      monthly: 90,
      yearly: 75,
    },
    description: 'Unlock advanced AI capabilities for your growing applications.',
    features: [
      'Unlimited AI generations',
      'Premium AI model access',
      'Priority email support',
      'High-speed processing',
      '10GB storage for models',
    ],
    cta: 'Subscribe to Pro AI',
    popular: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise AI',
    icon: Shield,
    price: {
      monthly: 'Contact for pricing',
      yearly: 'Contact for pricing',
    },
    description: 'Tailored AI solutions for large-scale deployments and critical needs.',
    features: [
      'Customizable AI models',
      'Dedicated technical account manager',
      'On-premise deployment options',
      'Ultra-low latency processing',
      'Unlimited secure storage',
    ],
    cta: 'Request a Demo',
  },
];

export default function SimplePricing() {
  // State to manage the selected frequency (monthly or yearly)
  const [frequency, setFrequency] = useState<'monthly' | 'yearly'>('monthly');
  // State to track if the component has mounted to prevent hydration errors
  const [mounted, setMounted] = useState(false);

  // Set mounted to true after the component has been rendered on the client side
  useEffect(() => {
    setMounted(true);
  }, []);

  // Render nothing until the component is mounted to prevent hydration mismatches
  if (!mounted) {
    return null;
  }

  return (
    <div className="not-prose relative flex w-full flex-col gap-16 overflow-hidden px-4 py-24 text-center sm:px-8">
      {/* Background gradient effects for visual appeal */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-[10%] left-[50%] h-[40%] w-[60%] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-[10%] -right-[10%] h-[40%] w-[40%] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-[10%] -left-[10%] h-[40%] w-[40%] rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="flex flex-col items-center justify-center gap-8">
        {/* Section for title and description */}
        <div className="flex flex-col items-center space-y-2">
          {/* Pricing Plans Badge - Replaced with span */}
          <span
            className="mb-4 inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1 text-sm font-medium text-foreground"
          >
            <Sparkles className="mr-1 h-3.5 w-3.5 animate-pulse text-primary" />
            AI Subscription Plans
          </span>
          {/* Main Title with animation */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-b from-foreground to-foreground/30 bg-clip-text text-4xl font-bold text-transparent sm:text-5xl"
          >
            Choose the AI plan that powers your innovation
          </motion.h1>
          {/* Description with animation */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="max-w-md pt-2 text-lg text-muted-foreground"
          >
            Flexible and powerful AI plans designed to scale with your needs, from hobby projects to enterprise solutions.
          </motion.p>
        </div>

        {/* Frequency Tabs with animation - Replaced with div and buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <div
            className="inline-block rounded-full bg-muted/30 p-1 shadow-sm"
          >
            <div className="flex bg-transparent">
              <button
                onClick={() => setFrequency('monthly')}
                className={cn(
                  "inline-flex items-center justify-center whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
                  frequency === 'monthly'
                    ? 'bg-background shadow-sm'
                    : 'bg-transparent hover:bg-muted/50'
                )}
              >
                Monthly
              </button>
              <button
                onClick={() => setFrequency('yearly')}
                className={cn(
                  "inline-flex items-center justify-center whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
                  frequency === 'yearly'
                    ? 'bg-background shadow-sm'
                    : 'bg-transparent hover:bg-muted/50'
                )}
              >
                Yearly
                <span
                  className="ml-2 inline-flex items-center rounded-full border border-transparent bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary transition-colors hover:bg-primary/15"
                >
                  20% off
                </span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Pricing Cards Grid */}
        <div className="mt-8 grid w-full max-w-6xl grid-cols-1 gap-6 md:grid-cols-3">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
              whileHover={{ y: -5 }} // Hover effect for cards
              className="flex" // Use flex to make cards fill available height
            >
              <Card
                className={cn(
                  'relative h-full w-full bg-secondary/20 text-left transition-all duration-300 hover:shadow-lg',
                  plan.popular
                    ? 'shadow-md ring-2 ring-primary/50 dark:shadow-primary/10'
                    : 'hover:border-primary/30',
                  plan.popular &&
                    'bg-gradient-to-b from-primary/[0.03] to-transparent',
                )}
              >
                {/* "Popular" Badge for the popular plan - Replaced with span */}
                {plan.popular && (
                  <div className="absolute -top-3 left-0 right-0 mx-auto w-fit">
                    <span className="inline-flex items-center rounded-full bg-primary px-4 py-1 text-sm font-medium text-primary-foreground shadow-sm">
                      <Sparkles className="mr-1 h-3.5 w-3.5" />
                      Most Popular
                    </span>
                  </div>
                )}
                <CardHeader className={cn('pb-4', plan.popular && 'pt-8')}>
                  <div className="flex items-center gap-2">
                    {/* Plan Icon */}
                    <div
                      className={cn(
                        'flex h-8 w-8 items-center justify-center rounded-full',
                        plan.popular
                          ? 'bg-primary/10 text-primary'
                          : 'bg-secondary text-foreground',
                      )}
                    >
                      <plan.icon className="h-4 w-4" />
                    </div>
                    {/* Plan Name */}
                    <CardTitle
                      className={cn(
                        'text-xl font-bold',
                        plan.popular && 'text-primary',
                      )}
                    >
                      {plan.name}
                    </CardTitle>
                  </div>
                  <CardDescription className="mt-3 space-y-2">
                    {/* Plan Description */}
                    <p className="text-sm">{plan.description}</p>
                    {/* Price Display */}
                    <div className="pt-2">
                      {typeof plan.price[frequency] === 'number' ? (
                        <div className="flex items-baseline">
                          <AnimatedNumber // Using custom AnimatedNumber component
                            className={cn(
                              'text-3xl font-bold',
                              plan.popular ? 'text-primary' : 'text-foreground',
                            )}
                            format={{
                              style: 'currency',
                              currency: 'USD',
                              maximumFractionDigits: 0,
                            }}
                            value={plan.price[frequency] as number}
                          />
                          <span className="ml-1 text-sm text-muted-foreground">
                            /month, billed {frequency}
                          </span>
                        </div>
                      ) : (
                        <span
                          className={cn(
                            'text-2xl font-bold',
                            plan.popular ? 'text-primary' : 'text-foreground',
                          )}
                        >
                          {plan.price[frequency]}
                        </span>
                      )}
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-3 pb-6">
                  {/* Features List */}
                  {plan.features.map((feature, featureIndex) => (
                    <motion.div
                      key={featureIndex}
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.5 + featureIndex * 0.05 }}
                      className="flex items-center gap-2 text-sm"
                    >
                      <div
                        className={cn(
                          'flex h-5 w-5 items-center justify-center rounded-full',
                          plan.popular
                            ? 'bg-primary/10 text-primary'
                            : 'bg-secondary text-secondary-foreground',
                        )}
                      >
                        <Check className="h-3.5 w-3.5" />
                      </div>
                      <span
                        className={
                          plan.popular
                            ? 'text-foreground'
                            : 'text-muted-foreground'
                        }
                      >
                        {feature}
                      </span>
                    </motion.div>
                  ))}
                </CardContent>
                <CardFooter>
                  {/* Call to Action Button - Replaced with button */}
                  <button
                    className={cn(
                      'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 w-full group',
                      plan.popular
                        ? 'bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-md hover:shadow-primary/20'
                        : 'border border-input bg-background hover:border-primary/30 hover:bg-primary/5 hover:text-primary',
                    )}
                  >
                    {plan.cta}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </CardFooter>

                {/* Subtle gradient effects and border for popular plan */}
                {plan.popular ? (
                  <>
                    <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-1/2 rounded-b-lg bg-gradient-to-t from-primary/[0.05] to-transparent" />
                    <div className="pointer-events-none absolute inset-0 rounded-lg border border-primary/20" />
                  </>
                ) : (
                  <div className="pointer-events-none absolute inset-0 rounded-lg border border-transparent opacity-0 transition-opacity duration-300 hover:border-primary/10 hover:opacity-100" />
                )}
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
