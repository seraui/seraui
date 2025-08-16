import { BorderBeam } from "@/components/ui";
import Link from "next/link";
import Button from "@/app/docs/button/button";
import { BookOpen, Wrench } from "lucide-react";
import Image from "next/image";

export const Hero = () => {
  return (
    <div className="relative flex items-center justify-center overflow-hidden">
      {/* Base Grid Background - Very Low Opacity */}
      <div className="absolute inset-0 grid-bg-hero" />
      {/* Light mode: Very subtle top fade, Dark mode: More pronounced */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-black/1 to-transparent dark:from-black/60 dark:via-black/10 dark:to-transparent" />

      {/* Light mode: Subtle color overlay, Dark mode: Enhanced overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/5 via-transparent to-purple-50/5 dark:from-blue-950/2 dark:via-transparent dark:to-purple-950/2" />

      <div className="relative z-10 container mx-auto px-4 py-16 sm:py-20 md:py-24">
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
          {/* Badge - smaller on mobile */}
          <div className="relative inline-flex items-center px-3 sm:px-5 py-2 sm:py-2.5 rounded-full bg-background/50 border border-border/50 mb-6 sm:mb-10 backdrop-blur-sm">
            <BorderBeam
              size={30}
              duration={8}
              colorFrom="#71717a"
              colorTo="#a1a1aa"
              className="rounded-full"
            />
            <span className="text-xs sm:text-sm font-medium text-muted-foreground tracking-wide">
              ✨ Now with enhanced components
            </span>
          </div>

          {/* Main Heading - better mobile scaling */}
          <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl tracking-tight leading-[1.1] mb-4 sm:mb-6">
            <span className="block">
              <span className="mask-l-from-0%">Build</span>{" "}
              <Image
                src="/images/rose.webp"
                alt="Rose"
                width={70}
                height={70}
                priority={true}
                unoptimized={true}
                className="inline mx-1 sm:mx-2 align-middle w-8 h-8 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 xl:w-[70px] xl:h-[70px]"
              />
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                beautiful
              </span>
            </span>
            <span className="block">
              websites <span className="mask-r-from-0%">with ease</span>
            </span>
          </h1>

          {/* Subtitle - better mobile spacing */}
          <p className="text-sm sm:text-base md:text-lg font-medium text-zinc-600 dark:text-zinc-400 mb-8 sm:mb-12 max-w-2xl leading-relaxed px-2 sm:px-0">
            Effortlessly copy and paste stunning, responsive components—no need
            to worry about styling or animations. Build quickly and launch
            faster.
          </p>

          {/* Action Buttons - better mobile layout */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-center w-full sm:w-auto">
            <Link href="/docs">
              <Button
                size="lg"
                variant="default"
                iconLeft={<BookOpen className="h-5 w-5" />}
                className="w-full sm:w-auto min-w-[180px] shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                Browse Components
              </Button>
            </Link>

            <Link href="/docs/pattern">
              <Button
                size="lg"
                variant="outline"
                iconLeft={<Wrench className="h-5 w-5" />}
                className="w-full sm:w-auto min-w-[180px] shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                Visit Tools
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
