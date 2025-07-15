'use client';
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const WavyText = ({ text = "Wavy Motion" }: { text?: string }) => {
    const [animationTime, setAnimationTime] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setAnimationTime(prev => prev + 0.1);
        }, 50);
        return () => clearInterval(interval);
    }, []);

    return (
        <h2 className="text-4xl md:text-6xl font-bold text-center">
            {text.split('').map((char, i) => {
                const yOffset = Math.sin(animationTime + i * 0.3) * 10;
                return (
                    <motion.span
                        key={i}
                        animate={{
                            y: yOffset,
                            transition: {
                                type: "spring",
                                stiffness: 300,
                                damping: 30,
                                mass: 0.8
                            }
                        }}
                        className="inline-block"
                    >
                        {char === ' ' ? '\u00A0' : char}
                    </motion.span>
                );
            })}
        </h2>
    );
};

const WavyView = () => {
    return (
        <div className="flex flex-col items-center justify-center font-sans p-4">
            <WavyText text="Smooth Wave Flow" />
        </div>
    );
};

export default WavyView;
