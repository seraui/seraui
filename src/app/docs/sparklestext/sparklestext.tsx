"use client";

import * as React from 'react';
import {
    useState,
    useEffect,
    createContext,
    useContext,
    useMemo,
    FC,
    ReactNode,
    ElementType,
    ComponentProps,
    CSSProperties,
} from 'react';
import { motion } from 'framer-motion';

// Helper function to generate a random number in a given range
const random = (min: number, max: number): number => Math.random() * (max - min) + min;

// --- TYPE DEFINITIONS ---

// Defines the properties for a single sparkle
interface Sparkle {
    id: string;
    color: string;
    size: number;
    style: {
        top: string;
        left: string;
        animationDelay: string;
    };
}

// Defines the configuration options for the useSparkles hook
interface UseSparklesOptions {
    colors?: { first: string; second: string };
    sparkleCount?: number;
    sparkleSize?: number;
}

// Defines the shape of the context data
interface SparklesContextType {
    sparkles: Sparkle[];
}

// Defines the props for the SparkleInstance component
interface SparkleInstanceProps {
    size: number;
    color: string;
    style: CSSProperties;
    key?: string; // Add key prop to fix the type error
}

// Defines the base props for the SparklesText component
interface BaseSparklesTextProps extends UseSparklesOptions {
    children?: ReactNode;
    className?: string;
}

// Makes the SparklesText component polymorphic, allowing the 'as' prop
// to change the rendered HTML element and accept its specific attributes.
type PolymorphicSparklesTextProps<T extends ElementType> = {
    as?: T;
} & BaseSparklesTextProps & Omit<ComponentProps<T>, keyof BaseSparklesTextProps>;


// --- HOOK ---

/**
 * useSparkles Hook
 * This custom hook encapsulates the logic for generating and managing sparkles.
 * @param options - Configuration for the sparkles.
 * @returns An array of sparkle objects.
 */
const useSparkles = ({
    colors = { first: '#9E7AFF', second: '#FE8BBB' },
    sparkleCount = 20,
    sparkleSize = 12,
}: UseSparklesOptions = {}): Sparkle[] => {
    const [sparkles, setSparkles] = useState<Sparkle[]>([]);

    useEffect(() => {
        const generateSparkle = (): Sparkle => {
            const color = Math.random() > 0.5 ? colors.first : colors.second;
            return {
                id: crypto.randomUUID(),
                color,
                size: random(sparkleSize * 0.7, sparkleSize * 1.3),
                style: {
                    top: `${random(0, 100)}%`,
                    left: `${random(0, 100)}%`,
                    // animationDelay is a valid CSS property, so we can assert the type
                    animationDelay: `${random(0, 2.5)}s`,
                },
            };
        };

        const newSparkles = Array.from({ length: sparkleCount }, generateSparkle);
        setSparkles(newSparkles);
    }, [sparkleCount, colors.first, colors.second, sparkleSize]);

    return sparkles;
};

// --- CONTEXT ---
const SparklesContext = createContext<SparklesContextType | null>(null);


// --- COMPONENTS ---

/**
 * SparkleInstance Component
 * Renders a single animated sparkle using an SVG shape.
 */
const SparkleInstance: FC<SparkleInstanceProps> = React.memo(({ size, color, style }) => {
    const path = "M120 80L100 0 80 80 0 100l80 20 20 80 20-80 80-20-80-20z";

    return (
        <motion.span
            className="absolute pointer-events-none z-10"
            style={style}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: [0, 1, 0], scale: 1, rotate: [0, 90, 180] }}
            transition={{
                duration: random(1.5, 2.5),
                ease: 'easeInOut',
                repeat: Infinity,
                delay: parseFloat(style.animationDelay as string),
            }}
        >
            <svg
                width={size}
                height={size}
                viewBox="0 0 200 200"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d={path} fill={color} />
            </svg>
        </motion.span>
    );
});

/**
 * SparklesWrapper Component
 * Consumes the sparkles context and renders the SparkleInstance components.
 */
const SparklesWrapper: FC = React.memo(() => {
    const context = useContext(SparklesContext);
    if (!context) {
        // This should not happen if the component is used correctly.
        return null;
    }
    const { sparkles } = context;

    return (
        <>
            {sparkles.map((sparkle) => (
                <SparkleInstance
                    key={sparkle.id}
                    size={sparkle.size}
                    color={sparkle.color}
                    style={sparkle.style as CSSProperties}
                />
            ))}
        </>
    );
});

/**
 * SparklesText Component
 * The main component that wraps text and adds a sparkling effect.
 * It's a polymorphic component, meaning you can change the underlying
 * HTML element using the `as` prop.
 */
export const SparklesText = <T extends ElementType = 'h1'>({
    as,
    children,
    className,
    ...sparkleOptions
}: PolymorphicSparklesTextProps<T>) => {
    const Component = as || 'h1';
    const sparkles = useSparkles(sparkleOptions);
    const contextValue = useMemo(() => ({ sparkles }), [sparkles]);

    return (
        <SparklesContext.Provider value={contextValue}>
            <Component className={`relative inline-block ${className || ''}`}>
                <SparklesWrapper />
                <span className="relative z-20">{children}</span>
            </Component>
        </SparklesContext.Provider>
    );
};

export default SparklesText;
