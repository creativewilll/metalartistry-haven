import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';

interface SteelLoaderProps {
  isLoading: boolean;
  onComplete?: () => void;
  pageName?: string;
}

interface Strike {
  id: number;
  x: number;
  delay: number;
}

export function SteelLoader({ isLoading, onComplete, pageName = 'Loading' }: SteelLoaderProps) {
  const [strikes, setStrikes] = useState<Strike[]>([]);
  const [slideProgress, setSlideProgress] = useState(0);
  const [revealComplete, setRevealComplete] = useState(false);

  // Generate hammer strikes
  useEffect(() => {
    const newStrikes: Strike[] = Array.from({ length: 5 }, (_, i) => ({
      id: i,
      x: 20 + i * 15,
      delay: i * 0.15,
    }));
    setStrikes(newStrikes);
  }, []);

  // Loading sequence
  useEffect(() => {
    if (!isLoading) {
      // Start sliding away
      const timer = setTimeout(() => {
        setRevealComplete(true);
        setTimeout(() => onComplete?.(), 600);
      }, 400);
      return () => clearTimeout(timer);
    }

    // Simulate progress while loading
    const progressInterval = setInterval(() => {
      setSlideProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 8;
      });
    }, 50);

    return () => clearInterval(progressInterval);
  }, [isLoading, onComplete]);

  return (
    <AnimatePresence>
      {(isLoading || !revealComplete) && (
        <motion.div
          className="fixed inset-0 z-[100] overflow-hidden pointer-events-none"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Top steel plate - slides up */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-1/2 bg-anthracite z-20 overflow-hidden"
            style={{
              background: `linear-gradient(180deg, #0A0908 0%, #161412 60%, #2A2724 100%)`,
              boxShadow: '0 10px 40px rgba(0,0,0,0.6)',
            }}
            initial={{ y: 0 }}
            animate={{ y: revealComplete ? '-100%' : 0 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* Plate texture */}
            <div className="absolute bottom-0 left-0 right-0 h-4 flex">
              {[...Array(20)].map((_, i) => (
                <div 
                  key={i} 
                  className="flex-1 border-r border-brushed-bronze/20"
                />
              ))}
            </div>
            {/* Center bolt */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
              <motion.div 
                className="w-6 h-6 rounded-full bg-hammered-steel border-2 border-brushed-bronze/50 flex items-center justify-center"
                animate={{
                  boxShadow: slideProgress > 50 
                    ? '0 0 15px rgba(226, 106, 31, 0.5)' 
                    : '0 0 0px rgba(226, 106, 31, 0)',
                }}
              >
                <div className="w-2 h-2 rounded-full bg-forge-black" />
              </motion.div>
            </div>
          </motion.div>

          {/* Bottom steel plate - slides down */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-1/2 bg-anthracite z-20 overflow-hidden"
            style={{
              background: `linear-gradient(0deg, #0A0908 0%, #161412 60%, #2A2724 100%)`,
              boxShadow: '0 -10px 40px rgba(0,0,0,0.6)',
            }}
            initial={{ y: 0 }}
            animate={{ y: revealComplete ? '100%' : 0 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* Plate texture */}
            <div className="absolute top-0 left-0 right-0 h-4 flex">
              {[...Array(20)].map((_, i) => (
                <div 
                  key={i} 
                  className="flex-1 border-r border-brushed-bronze/20"
                />
              ))}
            </div>
            {/* Center bolt */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2">
              <motion.div 
                className="w-6 h-6 rounded-full bg-hammered-steel border-2 border-brushed-bronze/50 flex items-center justify-center"
                animate={{
                  boxShadow: slideProgress > 50 
                    ? '0 0 15px rgba(226, 106, 31, 0.5)' 
                    : '0 0 0px rgba(226, 106, 31, 0)',
                }}
              >
                <div className="w-2 h-2 rounded-full bg-forge-black" />
              </motion.div>
            </div>
          </motion.div>

          {/* Center content */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <motion.div
              className="text-center"
              animate={{ 
                opacity: revealComplete ? 0 : 1,
                scale: revealComplete ? 0.95 : 1 
              }}
              transition={{ duration: 0.3 }}
            >
              {/* Hammer strikes */}
              <div className="relative h-16 mb-4">
                {strikes.map((strike) => (
                  <motion.div
                    key={strike.id}
                    className="absolute top-1/2 -translate-y-1/2 w-8 h-px bg-ember-orange"
                    style={{ left: `${strike.x}%` }}
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{
                      scaleX: slideProgress > strike.id * 20 ? [0, 1, 1, 0] : 0,
                      opacity: slideProgress > strike.id * 20 ? [0, 1, 1, 0] : 0,
                    }}
                    transition={{
                      duration: 0.4,
                      delay: strike.delay,
                    }}
                  />
                ))}

                {/* Anvil symbol */}
                <motion.div
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                  animate={{
                    scale: slideProgress > 80 ? [1, 1.1, 1] : 1,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <svg width="48" height="36" viewBox="0 0 48 36" className="opacity-60">
                    <defs>
                      <linearGradient id="steelAnvilGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#8C6B3A" />
                        <stop offset="100%" stopColor="#2A2724" />
                      </linearGradient>
                    </defs>
                    <path d="M4 20 L44 20 L42 28 L6 28 Z" fill="url(#steelAnvilGrad)" />
                    <path d="M2 12 L46 12 L44 20 L4 20 Z" fill="#3A3530" />
                    <path d="M10 28 L38 28 L36 36 L12 36 Z" fill="#1A1714" />
                  </svg>
                </motion.div>
              </div>

              {/* Page name */}
              <motion.p 
                className="text-xs uppercase tracking-[0.3em] font-mono text-iron-grey mb-2"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                {pageName}
              </motion.p>

              {/* Progress line */}
              <div className="w-32 h-[2px] bg-hammered-steel mx-auto overflow-hidden">
                <motion.div
                  className="h-full bg-brushed-bronze"
                  initial={{ width: '0%' }}
                  animate={{ width: `${slideProgress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
            </motion.div>
          </div>

          {/* Spark effect at center seam */}
          {!revealComplete && (
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none"
              animate={{
                opacity: slideProgress > 70 && slideProgress < 95 ? 1 : 0,
              }}
            >
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 rounded-full bg-ember-orange"
                  animate={{
                    x: [0, (i % 2 === 0 ? 1 : -1) * (20 + Math.random() * 30)],
                    y: [0, -Math.random() * 40],
                    opacity: [1, 0],
                    scale: [1, 0],
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    delay: i * 0.05,
                  }}
                />
              ))}
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
