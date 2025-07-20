import React from 'react';
import { cn } from '@/lib/utils';
import { Github, Linkedin, Mail, ArrowRight } from 'lucide-react';

// Keyframe animations for minimal, elegant effects
const GlobalStyles = () => (
  <style>{`
    @keyframes fadeInUp {
      from { 
        opacity: 0; 
        transform: translateY(20px); 
      }
      to { 
        opacity: 1; 
        transform: translateY(0); 
      }
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    .animate-fade-in-up {
      animation: fadeInUp 0.6s ease-out forwards;
    }
    .animate-fade-in {
      animation: fadeIn 0.8s ease-out forwards;
    }
    .animate-delay-100 { animation-delay: 0.1s; }
    .animate-delay-200 { animation-delay: 0.2s; }
    .animate-delay-300 { animation-delay: 0.3s; }
    .animate-delay-400 { animation-delay: 0.4s; }
    .animate-delay-500 { animation-delay: 0.5s; }
  `}</style>
);

// Button component with shadcn/ui styling
const Button = ({ 
  children, 
  variant = 'default', 
  size = 'default',
  className,
  ...props 
}: {
  children: React.ReactNode;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'default' | 'lg';
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const baseStyles = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background";
  
  const variants = {
    default: "bg-foreground text-background hover:bg-foreground/90",
    outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    ghost: "hover:bg-accent hover:text-accent-foreground"
  };
  
  const sizes = {
    sm: "h-9 px-3",
    default: "h-10 px-4 py-2",
    lg: "h-11 px-8"
  };
  
  return (
    <button 
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

// Social link component
const SocialLink = ({ 
  href, 
  icon: Icon, 
  label 
}: {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="group p-2 rounded-md hover:bg-accent transition-colors"
    aria-label={label}
  >
    <Icon className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
  </a>
);

// Hero section component
const Hero = () => {
  const socialLinks = [
    { icon: Github, href: 'https://github.com', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:hello@example.com', label: 'Email' },
  ];

  return (
    <section className="flex flex-col items-center justify-center min-h-[80vh] text-center">
      {/* Text Content */}
      <div className="max-w-2xl space-y-8">
        <div className="space-y-4 animate-fade-in-up">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Hi, I&apos;m <span className="text-foreground">Alex</span>
          </h1>
          <h2 className="text-xl md:text-2xl text-muted-foreground font-medium">
            Digital Designer & Frontend Developer
          </h2>
        </div>
        
        <p className="text-lg text-muted-foreground max-w-lg leading-relaxed animate-fade-in-up animate-delay-200">
          Creating immersive digital experiences that blend beautiful design with seamless functionality.
        </p>
        
        <div className="flex flex-wrap gap-4 justify-center animate-fade-in-up animate-delay-300">
          <Button size="lg" className="group">
            View Work
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button variant="outline" size="lg">
            Contact Me
          </Button>
        </div>
        
        <div className="flex gap-2 justify-center animate-fade-in-up animate-delay-400">
          {socialLinks.map((link, index) => (
            <SocialLink key={index} {...link} />
          ))}
        </div>
      </div>


    </section>
  );
};

// Main App component
const PortfolioHero = () => {
  return (
    <>
      <GlobalStyles />
      
      <div className="text-foreground font-sans antialiased">
        <div className="container mx-auto px-6 sm:px-8 py-16 md:py-24">
          <Hero />
        </div>
      </div>
    </>
  );
};

export default PortfolioHero;
