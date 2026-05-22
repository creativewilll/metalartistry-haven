import { useEffect, useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, X, Sparkles, ChevronLeft } from 'lucide-react';

const SESSION_KEY = 'mcd_newsletter_state';
const TAB_DELAY_MS = 3000; // Show tab after 3 seconds

interface FormState {
  email: string;
  status: 'idle' | 'submitting' | 'success' | 'error';
  errorMessage: string;
}

export function ForgeNewsletterTab() {
  const [isMounted, setIsMounted] = useState(false);
  const [isTabVisible, setIsTabVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [formState, setFormState] = useState<FormState>({
    email: '',
    status: 'idle',
    errorMessage: '',
  });

  // Mount detection and tab timer
  useEffect(() => {
    setIsMounted(true);

    // Check saved state
    const savedState = sessionStorage.getItem(SESSION_KEY);
    if (savedState === 'expanded') {
      setIsExpanded(true);
    }

    // Show tab after delay
    const timer = setTimeout(() => {
      setIsTabVisible(true);
    }, TAB_DELAY_MS);

    return () => clearTimeout(timer);
  }, []);

  // Save state when expanded changes
  useEffect(() => {
    if (!isMounted) return;
    if (isExpanded) {
      sessionStorage.setItem(SESSION_KEY, 'expanded');
    } else {
      sessionStorage.setItem(SESSION_KEY, 'collapsed');
    }
  }, [isExpanded, isMounted]);

  const handleExpand = () => {
    setIsExpanded(true);
  };

  const handleCollapse = () => {
    setIsExpanded(false);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formState.email || formState.status === 'submitting') return;

    setFormState((prev) => ({ ...prev, status: 'submitting', errorMessage: '' }));

    try {
      const formData = new URLSearchParams();
      formData.append('form-name', 'newsletter');
      formData.append('email', formState.email);
      formData.append('bot-field', ''); // Honeypot

      const response = await fetch('/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
      });

      if (response.ok) {
        setFormState({
          email: '',
          status: 'success',
          errorMessage: '',
        });
      } else {
        setFormState((prev) => ({
          ...prev,
          status: 'error',
          errorMessage: 'Something went wrong. Please try again.',
        }));
      }
    } catch {
      setFormState((prev) => ({
        ...prev,
        status: 'error',
        errorMessage: 'Unable to subscribe. Please try again.',
      }));
    }
  };

  // Don't render until mounted (prevents hydration mismatch)
  if (!isMounted) return null;

  return (
    <>
      {/* Collapsed Tab - Always visible after delay when not expanded */}
      <AnimatePresence>
        {isTabVisible && !isExpanded && (
          <motion.button
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            onClick={handleExpand}
            className="fixed right-0 top-[35vh] z-40 group focus:outline-none"
            aria-label="Open newsletter signup"
          >
            <div className="relative">
              {/* Tab background with heat effect */}
              <div className="bg-anthracite border-l border-y border-brushed-bronze/40 py-6 px-3 rounded-l-sm shadow-lg shadow-forge-black/50 flex items-center gap-2 hover:border-brushed-bronze/70 transition-colors">
                {/* Vertical rotated text */}
                <span
                  className="font-mono text-[11px] uppercase tracking-widest text-chalk whitespace-nowrap origin-center"
                  style={{
                    writingMode: 'vertical-rl',
                    textOrientation: 'mixed',
                    transform: 'rotate(180deg)',
                  }}
                >
                  Forge a Discount
                </span>

                {/* Animated spark/heat indicator */}
                <motion.div
                  animate={{
                    opacity: [0.5, 1, 0.5],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="text-ember-orange"
                >
                  <Sparkles size={14} />
                </motion.div>
              </div>

              {/* Heat glow on hover */}
              <div className="absolute inset-0 rounded-l-sm bg-ember-orange/0 group-hover:bg-ember-orange/5 transition-colors pointer-events-none" />
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Expanded Panel - The "Pulled from the Forge" effect */}
      <AnimatePresence>
        {isExpanded && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-forge-black/60 backdrop-blur-sm z-40"
              onClick={handleCollapse}
              aria-hidden="true"
            />

            {/* Slide-out panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 120, damping: 18 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md z-50 bg-anthracite border-l border-brushed-bronze/30 shadow-2xl"
              style={{
                boxShadow: '0 0 60px rgba(226,106,31,0.35), -10px 0 30px rgba(0,0,0,0.5)',
              }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="newsletter-title"
            >
              {/* Animated forge heat gradient on left edge */}
              <motion.div
                className="absolute left-0 top-0 bottom-0 w-1"
                initial={{
                  background: 'linear-gradient(180deg, #FFE8C7, #E26A1F, #A8341A)',
                }}
                animate={{
                  background: [
                    'linear-gradient(180deg, #FFE8C7, #E26A1F, #A8341A)',
                    'linear-gradient(180deg, #A8341A, #E26A1F, #FFE8C7)',
                    'linear-gradient(180deg, #FFE8C7, #E26A1F, #A8341A)',
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />

              <div className="h-full flex flex-col p-8 overflow-y-auto">
                {/* Close button */}
                <div className="flex justify-end mb-4">
                  <button
                    onClick={handleCollapse}
                    className="p-2 text-iron-grey hover:text-chalk transition-colors focus:outline-none focus:ring-2 focus:ring-brushed-bronze rounded-sm"
                    aria-label="Close"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Header */}
                <div className="mb-8">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex items-center gap-3 mb-4"
                  >
                    <div className="w-12 h-12 rounded-full bg-brushed-bronze/20 flex items-center justify-center">
                      <Mail size={24} className="text-brushed-bronze" />
                    </div>
                    <div>
                      <h2 id="newsletter-title" className="text-2xl font-display text-chalk">
                        Join the Forge
                      </h2>
                    </div>
                  </motion.div>

                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="text-iron-grey leading-relaxed"
                  >
                    Get 10% off your next custom commission when you subscribe.
                    Plus behind-the-scenes looks at projects, material insights,
                    and early access to available pieces.
                  </motion.p>
                </div>

                {/* Form */}
                <motion.form
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  onSubmit={handleSubmit}
                  className="flex-1"
                  data-netlify="true"
                  name="newsletter"
                  method="POST"
                >
                  <input type="hidden" name="form-name" value="newsletter" />
                  <input name="bot-field" hidden />

                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="newsletter-email"
                        className="block font-mono text-xs uppercase tracking-widest text-brushed-bronze mb-2"
                      >
                        Email Address
                      </label>
                      <input
                        id="newsletter-email"
                        name="email"
                        type="email"
                        value={formState.email}
                        onChange={(e) =>
                          setFormState((prev) => ({ ...prev, email: e.target.value }))
                        }
                        placeholder="you@example.com"
                        required
                        disabled={formState.status === 'submitting'}
                        className="w-full bg-forge-black border border-brushed-bronze/30 px-4 py-3 text-chalk placeholder:text-iron-grey/50 focus:border-brushed-bronze focus:outline-none transition-colors disabled:opacity-50"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={formState.status === 'submitting' || !formState.email}
                      className="w-full py-4 bg-brushed-bronze text-forge-black font-mono text-sm uppercase tracking-widest hover:bg-chalk transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-brushed-bronze focus:ring-offset-2 focus:ring-offset-anthracite"
                    >
                      {formState.status === 'submitting' ? 'Subscribing...' : 'Claim 10% Off'}
                    </button>
                  </div>

                  {/* Status messages */}
                  {formState.status === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 p-4 bg-green-900/30 border border-green-500/30 rounded-sm"
                    >
                      <p className="text-sm text-green-400 font-medium">
                        Welcome to the forge!
                      </p>
                      <p className="text-xs text-green-300/80 mt-1">
                        Check your inbox for your discount code.
                      </p>
                    </motion.div>
                  )}

                  {formState.status === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 p-4 bg-red-900/30 border border-red-500/30 rounded-sm"
                    >
                      <p className="text-sm text-red-400">
                        {formState.errorMessage}
                      </p>
                    </motion.div>
                  )}
                </motion.form>

                {/* Footer note */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mt-auto pt-6 text-[10px] font-mono uppercase tracking-widest text-iron-grey text-center"
                >
                  No spam. Unsubscribe anytime.
                </motion.p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
