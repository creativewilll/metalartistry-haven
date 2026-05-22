import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState, useMemo } from 'react';

interface Spark {
  id: number;
  x: number;
  y: number;
  delay: number;
  duration: number;
  size: number;
}

interface Ember {
  id: number;
  x: number;
  delay: number;
  duration: number;
}

interface ForgeLoaderProps {
  onComplete?: () => void;
}

export function ForgeLoader({ onComplete }: ForgeLoaderProps) {
  const [heatingProgress, setHeatingProgress] = useState(0);
  const [showLogo, setShowLogo] = useState(false);
  const [doorsOpen, setDoorsOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const sparks = useMemo<Spark[]>(() =>
    Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: 20 + Math.random() * 60,
      y: 40 + Math.random() * 40,
      delay: Math.random() * 1.2,
      duration: 0.5 + Math.random() * 1,
      size: 2 + Math.random() * 4,
    })), []);

  const embers = useMemo<Ember[]>(() =>
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: 10 + Math.random() * 80,
      delay: Math.random() * 1.5,
      duration: 2 + Math.random() * 3,
    })), []);

  // Self-contained sequence: heat up → show logo → open doors → dismiss
  useEffect(() => {
    const heatingInterval = setInterval(() => {
      setHeatingProgress(prev => {
        if (prev >= 100) {
          clearInterval(heatingInterval);
          return 100;
        }
        return prev + 4;
      });
    }, 30);

    return () => clearInterval(heatingInterval);
  }, []);

  // When heating hits 100, show logo briefly then open doors
  useEffect(() => {
    if (heatingProgress < 100) return;

    const logoTimer = setTimeout(() => {
      setShowLogo(true);
    }, 100);

    const doorsTimer = setTimeout(() => {
      setDoorsOpen(true);
    }, 600);

    const dismissTimer = setTimeout(() => {
      setDismissed(true);
      onComplete?.();
    }, 2000);

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(doorsTimer);
      clearTimeout(dismissTimer);
    };
  }, [heatingProgress >= 100, onComplete]);

  const glowIntensity = Math.min(1, heatingProgress / 80);
  const heatColor = heatingProgress < 30
    ? `rgba(140, 107, 58, ${glowIntensity})`
    : heatingProgress < 60
      ? `rgba(226, 106, 31, ${glowIntensity})`
      : `rgba(255, 232, 199, ${glowIntensity})`;

  return (
    <AnimatePresence>
      {!dismissed && (
        <motion.div
          className="fixed inset-0 z-[100] overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Background forge heat glow */}
          <motion.div
            className="absolute inset-0 bg-forge-black"
            animate={{
              background: `radial-gradient(ellipse at 50% 100%, ${heatColor} 0%, #0A0908 60%)`,
            }}
          />

          {/* Bottom heat source */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-1/2"
            animate={{
              background: `linear-gradient(to top, rgba(226, 106, 31, ${glowIntensity * 0.5}), transparent)`,
            }}
          />

          {/* Floating embers */}
          <div className="absolute inset-0 pointer-events-none">
            {embers.map((ember) => (
              <motion.div
                key={ember.id}
                className="absolute w-1 h-1 rounded-full bg-ember-orange"
                style={{ left: `${ember.x}%`, bottom: '0%' }}
                initial={{ opacity: 0, y: 0, scale: 0 }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  y: [0, -300, -500, -600],
                  x: [0, Math.random() * 40 - 20, Math.random() * 60 - 30],
                  scale: [0, 1, 0.8, 0],
                }}
                transition={{
                  duration: ember.duration,
                  delay: ember.delay,
                  repeat: Infinity,
                  ease: 'easeOut',
                }}
              />
            ))}
          </div>

          {/* Heavy Forge Doors - Left */}
          <motion.div
            className="absolute top-0 left-0 w-1/2 h-full bg-anthracite border-r-4 border-brushed-bronze/50 z-20"
            style={{
              background: `linear-gradient(90deg, #0A0908 0%, #161412 50%, #2A2724 100%)`,
              boxShadow: `inset -20px 0 60px rgba(0,0,0,0.8), 0 0 40px ${heatColor}`,
            }}
            initial={{ x: 0 }}
            animate={{ x: doorsOpen ? '-100%' : 0 }}
            transition={{
              duration: 1.2,
              ease: [0.6, 0.05, 0.15, 1],
            }}
          >
            <div className="absolute inset-0 flex flex-col justify-around items-end pr-8 py-20">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-4 h-4 rounded-full bg-hammered-steel border border-brushed-bronze/30"
                  animate={{
                    boxShadow: `0 0 ${glowIntensity * 15}px ${heatColor}`,
                  }}
                />
              ))}
            </div>
            <div className="absolute right-6 top-1/2 -translate-y-1/2">
              <motion.div
                className="w-3 h-32 bg-hammered-steel rounded-full border border-brushed-bronze/50"
                animate={{
                  boxShadow: `0 0 ${glowIntensity * 20}px ${heatColor}`,
                }}
              />
            </div>
          </motion.div>

          {/* Heavy Forge Doors - Right */}
          <motion.div
            className="absolute top-0 right-0 w-1/2 h-full bg-anthracite border-l-4 border-brushed-bronze/50 z-20"
            style={{
              background: `linear-gradient(90deg, #2A2724 0%, #161412 50%, #0A0908 100%)`,
              boxShadow: `inset 20px 0 60px rgba(0,0,0,0.8), 0 0 40px ${heatColor}`,
            }}
            initial={{ x: 0 }}
            animate={{ x: doorsOpen ? '100%' : 0 }}
            transition={{
              duration: 1.2,
              ease: [0.6, 0.05, 0.15, 1],
            }}
          >
            <div className="absolute inset-0 flex flex-col justify-around items-start pl-8 py-20">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-4 h-4 rounded-full bg-hammered-steel border border-brushed-bronze/30"
                  animate={{
                    boxShadow: `0 0 ${glowIntensity * 15}px ${heatColor}`,
                  }}
                />
              ))}
            </div>
            <div className="absolute left-6 top-1/2 -translate-y-1/2">
              <motion.div
                className="w-3 h-32 bg-hammered-steel rounded-full border border-brushed-bronze/50"
                animate={{
                  boxShadow: `0 0 ${glowIntensity * 20}px ${heatColor}`,
                }}
              />
            </div>
          </motion.div>

          {/* Sparks flying between doors */}
          <div className="absolute inset-0 pointer-events-none z-30 flex items-center justify-center">
            {sparks.map((spark) => (
              <motion.div
                key={spark.id}
                className="absolute rounded-full bg-white-hot"
                style={{
                  width: spark.size,
                  height: spark.size,
                  left: `${spark.x}%`,
                  top: `${spark.y}%`,
                }}
                initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0],
                  x: [0, (Math.random() - 0.5) * 200],
                  y: [0, -Math.random() * 150 - 50],
                }}
                transition={{
                  duration: spark.duration,
                  delay: spark.delay,
                  repeat: Infinity,
                  ease: 'easeOut',
                }}
              />
            ))}
          </div>

          {/* Central logo reveal */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center z-10"
            animate={{ opacity: showLogo ? 1 : 0 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div
              className="text-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={showLogo ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            >
              <motion.div
                className="mx-auto mb-6 w-24 h-20 relative"
                animate={{
                  filter: `drop-shadow(0 0 ${glowIntensity * 30}px ${heatColor})`,
                }}
              >
                <svg viewBox="0 0 100 80" className="w-full h-full">
                  <defs>
                    <linearGradient id="anvilGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#8C6B3A" />
                      <stop offset="50%" stopColor="#2A2724" />
                      <stop offset="100%" stopColor="#0A0908" />
                    </linearGradient>
                  </defs>
                  <motion.path
                    d="M10 50 L90 50 L85 70 L15 70 Z"
                    fill="url(#anvilGrad)"
                    stroke={heatColor}
                    strokeWidth={2}
                    animate={{ stroke: heatColor }}
                  />
                  <motion.path
                    d="M5 35 L95 35 L90 50 L10 50 Z"
                    fill="#3A3530"
                    stroke={heatColor}
                    strokeWidth={1}
                  />
                  <motion.path
                    d="M5 35 Q0 20 20 15 L30 35 Z"
                    fill="url(#anvilGrad)"
                    stroke={heatColor}
                    strokeWidth={1}
                  />
                  <motion.path
                    d="M20 70 L80 70 L75 80 L25 80 Z"
                    fill="#1A1714"
                    stroke={heatColor}
                    strokeWidth={1}
                  />
                </svg>
              </motion.div>

              <motion.p
                className="text-[10px] uppercase tracking-[0.4em] font-mono mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                animate={{ color: heatColor }}
              >
                {heatingProgress < 30 && 'Stoking the fire...'}
                {heatingProgress >= 30 && heatingProgress < 60 && 'Heating the steel...'}
                {heatingProgress >= 60 && heatingProgress < 90 && 'Forging...'}
                {heatingProgress >= 90 && 'Ready'}
              </motion.p>

              <div className="w-48 h-[2px] bg-hammered-steel mx-auto overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-forge"
                  initial={{ width: '0%' }}
                  animate={{ width: `${heatingProgress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>

              <motion.h1
                className="mt-6 text-2xl md:text-3xl font-display tracking-tight text-chalk drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]"
                initial={{ opacity: 0, y: 10 }}
                animate={showLogo ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <span className="text-gradient-forge drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">Matt Coffey</span>
                <span className="block text-sm font-mono tracking-[0.3em] text-chalk mt-1 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">DESIGN</span>
              </motion.h1>
            </motion.div>
          </motion.div>

          {/* Vignette overlay */}
          <div
            className="absolute inset-0 pointer-events-none z-40"
            style={{
              background: 'radial-gradient(ellipse at center, transparent 40%, rgba(10,9,8,0.8) 100%)',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
