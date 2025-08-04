'use client';
import {
  ElementType,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { cn } from '@/lib/utils';

type HighlightDirection = 'ltr' | 'rtl' | 'ttb' | 'btt';

type UseInViewOptions = {
  once?: boolean;
  initial?: boolean;
  amount?: number;
  margin?: string;
};

type Transition = {
  duration?: number;
  delay?: number;
  type?: 'spring' | 'ease' | 'linear';
  bounce?: number;
};

type TextHighlighterProps = {
  children: React.ReactNode;
  as?: ElementType;
  triggerType?: 'hover' | 'ref' | 'inView' | 'auto';
  transition?: Transition;
  useInViewOptions?: UseInViewOptions;
  className?: string;
  highlightColor?: string;
  useTailwindClasses?: boolean;
  direction?: HighlightDirection;
  rounded?: string;
} & React.HTMLAttributes<HTMLElement>;

export type TextHighlighterRef = {
  animate: (direction?: HighlightDirection) => void;
  reset: () => void;
};

const useInView = (ref: React.RefObject<HTMLElement | null>, options: UseInViewOptions = {}) => {
  const [isInView, setIsInView] = useState(options.initial || false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (options.once) {
            observer.unobserve(element);
          }
        } else if (!options.once) {
          setIsInView(false);
        }
      },
      {
        threshold: options.amount || 0.1,
        rootMargin: options.margin || '0px',
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [ref, options.amount, options.margin, options.once]);

  return isInView;
};

export const TextHighlighter = forwardRef<TextHighlighterRef, TextHighlighterProps>(
  (
    {
      children,
      as = 'span',
      triggerType = 'inView',
      transition = { type: 'spring', duration: 0.8, delay: 0.2, bounce: 0 },
      useInViewOptions = {
        once: true,
        initial: false,
        amount: 0.1,
      },
      className,
      highlightColor = 'linear-gradient(rgb(253 141 62), rgb(250, 196, 158))',
      useTailwindClasses = false,
      direction = 'ltr',
      rounded = 'rounded-md',
      ...props
    },
    ref
  ) => {
    const componentRef = useRef<HTMLDivElement>(null);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [currentDirection, setCurrentDirection] = useState<HighlightDirection>(direction);

    // Update direction when prop changes
    useEffect(() => {
      setCurrentDirection(direction);
    }, [direction]);

    // Always call the hook, but only use the result when needed
    const inViewResult = useInView(componentRef, useInViewOptions);
    const isInView = triggerType === 'inView' ? inViewResult : false;

    useImperativeHandle(ref, () => ({
      animate: (animationDirection?: HighlightDirection) => {
        if (animationDirection) {
          setCurrentDirection(animationDirection);
        }
        setIsAnimating(true);
      },
      reset: () => setIsAnimating(false),
    }));

    const shouldAnimate =
      triggerType === 'hover'
        ? isHovered
        : triggerType === 'inView'
          ? isInView
          : triggerType === 'ref'
            ? isAnimating
            : triggerType === 'auto'
              ? true
              : false;

    const ElementTag = as || 'span';

    const animatedSize = useMemo(() => {
      switch (currentDirection) {
        case 'ltr':
          return shouldAnimate ? '100% 100%' : '0% 100%';
        case 'rtl':
          return shouldAnimate ? '100% 100%' : '0% 100%';
        case 'ttb':
          return shouldAnimate ? '100% 100%' : '100% 0%';
        case 'btt':
          return shouldAnimate ? '100% 100%' : '100% 0%';
        default:
          return shouldAnimate ? '100% 100%' : '0% 100%';
      }
    }, [shouldAnimate, currentDirection]);

    const initialSize = useMemo(() => {
      switch (currentDirection) {
        case 'ltr':
          return '0% 100%';
        case 'rtl':
          return '0% 100%';
        case 'ttb':
          return '100% 0%';
        case 'btt':
          return '100% 0%';
        default:
          return '0% 100%';
      }
    }, [currentDirection]);

    const backgroundPosition = useMemo(() => {
      switch (currentDirection) {
        case 'ltr':
          return '0% 0%';
        case 'rtl':
          return '100% 0%';
        case 'ttb':
          return '0% 0%';
        case 'btt':
          return '0% 100%';
        default:
          return '0% 0%';
      }
    }, [currentDirection]);

    const getTimingFunction = (type: string = 'spring') => {
      switch (type) {
        case 'spring':
          return 'cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        case 'ease':
          return 'ease-out';
        case 'linear':
          return 'linear';
        default:
          return 'cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      }
    };

    const defaultGradient =
      'bg-gradient-to-r from-orange-400 to-orange-200 dark:from-orange-500 dark:to-orange-300';

    const getHighlightStyles = (): React.CSSProperties => {
      const baseStyles: React.CSSProperties = {
        backgroundSize: shouldAnimate ? animatedSize : initialSize,
        backgroundPosition: backgroundPosition,
        transition: `background-size ${transition.duration || 1}s ${getTimingFunction(transition.type)} ${transition.delay || 0}s`,
      };

      if (useTailwindClasses) {
        return baseStyles;
      } else {
        const backgroundImage = highlightColor.includes('gradient')
          ? highlightColor
          : `linear-gradient(${highlightColor}, ${highlightColor})`;

        return {
          ...baseStyles,
          backgroundImage,
          backgroundRepeat: 'no-repeat',
          boxDecorationBreak: 'clone' as const,
          WebkitBoxDecorationBreak: 'clone' as const,
        };
      }
    };

    const highlightStyle = getHighlightStyles();

    const getTailwindClasses = () => {
      if (!useTailwindClasses) return `${rounded} px-1`;

      const gradientClass = highlightColor.includes('bg-') ? highlightColor : defaultGradient;

      return `${gradientClass} ${rounded} px-1`;
    };

    return (
      <ElementTag
        ref={componentRef}
        onMouseEnter={() => triggerType === 'hover' && setIsHovered(true)}
        onMouseLeave={() => triggerType === 'hover' && setIsHovered(false)}
        {...props}
      >
        <span className={cn('inline', getTailwindClasses(), className)} style={highlightStyle}>
          {children}
        </span>
      </ElementTag>
    );
  }
);

TextHighlighter.displayName = 'TextHighlighter';
export default TextHighlighter;
