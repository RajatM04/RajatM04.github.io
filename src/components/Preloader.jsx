import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Preloader.css";

const Preloader = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    let interval;
    const startTime = Date.now();
    const duration = 2500; // Minimum duration for branding

    const updateProgress = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const calculatedProgress = Math.min(Math.round((elapsed / duration) * 100), 100);
      
      setProgress(calculatedProgress);

      if (calculatedProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsDone(true);
          setTimeout(() => {
            if (onLoadingComplete) onLoadingComplete();
          }, 800);
        }, 500);
      }
    };

    interval = setInterval(updateProgress, 30);
    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            y: "-100%",
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
          }}
          className="fixed inset-0 z-[10000] bg-black flex flex-col items-center justify-center overflow-hidden"
        >
          <div className="noise opacity-20" />
          
          <div className="relative z-10 flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-[10px] font-mono tracking-[0.8em] text-white/40 mb-8 uppercase"
            >
              RAJAT MAHADULE // 2026
            </motion.div>

            <div className="relative">
              <motion.span 
                className="loader-percentage text-[15vw] md:text-[10vw] font-bold text-white leading-none flex items-baseline"
              >
                {progress}
                <span className="text-[4vw] md:text-[2vw] not-italic ml-2 opacity-20">%</span>
              </motion.span>
            </div>

            <div className="w-48 h-[1px] bg-white/10 mt-12 relative overflow-hidden">
              <motion.div 
                className="absolute inset-y-0 left-0 bg-white"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: "linear" }}
              />
              <div className="absolute inset-0 loader-bar-shimmer" />
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              className="mt-8 text-[8px] font-mono tracking-widest text-white/30 uppercase"
            >
              Building Cinematic Experience...
            </motion.div>
          </div>

          <motion.div 
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.05, 0.1, 0.05]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-white/5 rounded-full blur-[120px] pointer-events-none"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
