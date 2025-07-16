'use client';
import { motion } from "framer-motion";

const ScaleInText = ({ text = "Think Different" }: { text?: string }) => {
    return (
        <h2 className="text-4xl md:text-6xl font-bold text-center">
            {text.split('').map((char, i) => (
                <motion.span
                    key={i}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: i * 0.08, type: 'spring', stiffness: 150, damping: 10 }}
                    className="inline-block"
                >
                    {char === ' ' ? '\u00A0' : char}
                </motion.span>
            ))}
        </h2>
    );
};

const ScaleInView = () => {
    return (
        <div className="flex flex-col items-center justify-center font-sans p-4 ">
            <ScaleInText text="Simplicity is the ultimate sophistication." />
        </div>
    );
};

export default ScaleInView;
