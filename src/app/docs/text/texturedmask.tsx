'use client';
import { motion } from "framer-motion";

const TexturedMaskText = () => {
    return (
        <motion.h2
            className="text-5xl md:text-8xl font-black uppercase text-transparent bg-clip-text"
            style={{
                backgroundImage: 'url(https://images.unsplash.com/photo-1501630834273-4b5604d2ee31?q=80&w=2070&auto=format&fit=crop)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
            initial={{ scale: 1.5 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, ease: 'linear', repeat: Infinity, repeatType: 'reverse' }}
        >
            Explore
        </motion.h2>
    );
};

const TexturedMaskView = () => {
    return (
        <div className="flex flex-col items-center justify-center font-sans p-4 bg-black/5 dark:bg-white/5 rounded-lg">
            <TexturedMaskText />
        </div>
    );
};

export default TexturedMaskView;
