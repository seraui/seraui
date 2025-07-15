'use client';
import { motion } from "framer-motion";

const SlideInText = ({ text = "Simplicity is the ultimate sophistication." }: { text?: string }) => {
    return (
        <h2 className="text-2xl md:text-4xl font-bold text-center">
            {text.split('').map((char, i) => (
                <motion.span
                    key={i}
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.03, ease: "easeOut" }}
                    className="inline-block"
                >
                    {char === ' ' ? '\u00A0' : char}
                </motion.span>
            ))}
        </h2>
    );
};

const SlideInView = () => {
    return (
        <div className="flex flex-col items-center justify-center font-sans p-4">
            <SlideInText text="Simplicity is the ultimate sophistication." />
        </div>
    );
};

export default SlideInView;
