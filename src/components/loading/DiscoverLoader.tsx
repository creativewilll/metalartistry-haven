import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';

interface DiscoverLoaderProps {
  onComplete?: () => void;
}

/**
 * DiscoverLoader — a tight 1.3s intro for the gallery wall.
 *
 * Timeline (ms):
 *   0   – 400  : title + rule + subtitle fade/scale in
 *   400 – 1000 : full hold (text fully readable for ~600ms)
 *   1000 – 1300: clean fade out, fires onComplete at 1300
 *
 * Self-contained — ignores any external "progress". The real gallery image
 * loading happens behind it; this is purely a brand intro.
 */
export function DiscoverLoader({ onComplete }: DiscoverLoaderProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const exitTimer = setTimeout(() => setVisible(false), 1000);
    const completeTimer = setTimeout(() => onComplete?.(), 1300);
    return () => {
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-forge-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="relative flex flex-col items-center px-6 text-center">
            <motion.p
              className="text-[10px] uppercase tracking-[0.5em] font-mono text-brushed-bronze mb-5"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            >
              Matt Coffey Design
            </motion.p>

            <motion.h2
              className="font-display text-chalk text-[clamp(2.5rem,8vw,5.5rem)] leading-none tracking-tight"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            >
              The Gallery
            </motion.h2>

            <motion.div
              className="mt-6 h-px bg-brushed-bronze origin-center"
              style={{ width: '180px' }}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.45, delay: 0.15, ease: [0.4, 0, 0.2, 1] }}
            />

            <motion.p
              className="mt-5 text-[11px] uppercase tracking-[0.35em] font-mono text-iron-grey"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.25, ease: [0.4, 0, 0.2, 1] }}
            >
              168 pieces · forged in steel
            </motion.p>
          </div>

          <motion.div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse at center, transparent 55%, rgba(10,9,8,0.85) 100%)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
