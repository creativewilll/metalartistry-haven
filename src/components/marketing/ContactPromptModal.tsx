import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, FileText, Instagram, X, Flame } from 'lucide-react';
import { Link } from 'react-router-dom';
import { usePhoneActions } from '../contact/PhoneActionContext';
import { BUSINESS_INFO } from '../../data/site-images';

const SESSION_KEY = 'mcd_prompt_dismissed';
const SHOW_DELAY_MS = 60000; // 60 seconds

export function ContactPromptModal() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { openPhoneActions } = usePhoneActions();

  // Mount detection and timer
  useEffect(() => {
    setIsMounted(true);

    // Check if already dismissed this session
    const dismissed = sessionStorage.getItem(SESSION_KEY);
    if (dismissed) return;

    // Set timer to show after 60 seconds
    const timer = setTimeout(() => {
      const stillNotDismissed = !sessionStorage.getItem(SESSION_KEY);
      if (stillNotDismissed) {
        setIsVisible(true);
      }
    }, SHOW_DELAY_MS);

    return () => clearTimeout(timer);
  }, []);

  // Prevent body scroll when open
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isVisible]);

  // Close on escape key
  useEffect(() => {
    if (!isVisible) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleDismiss();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isVisible]);

  const handleDismiss = () => {
    sessionStorage.setItem(SESSION_KEY, 'true');
    setIsVisible(false);
  };

  const handleEmail = () => {
    handleDismiss();
    window.location.href = `mailto:${BUSINESS_INFO.email}`;
  };

  const handlePhone = () => {
    handleDismiss();
    openPhoneActions();
  };

  const handleIntake = () => {
    handleDismiss();
    // Link will handle navigation
  };

  // Don't render until mounted (prevents hydration mismatch)
  if (!isMounted) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop with forge heat effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-forge-black/90 backdrop-blur-md z-50"
            onClick={handleDismiss}
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: 'spring', stiffness: 250, damping: 25 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg z-50 px-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-prompt-title"
          >
            <div className="bg-anthracite border border-brushed-bronze/30 rounded-sm shadow-2xl overflow-hidden">
              {/* Animated forge heat gradient header */}
              <motion.div
                className="h-2 bg-gradient-to-r from-cooling-red via-ember-orange to-white-hot"
                animate={{
                  background: [
                    'linear-gradient(90deg, #A8341A, #E26A1F, #FFE8C7)',
                    'linear-gradient(90deg, #FFE8C7, #E26A1F, #A8341A)',
                    'linear-gradient(90deg, #A8341A, #E26A1F, #FFE8C7)',
                  ],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />

              <div className="p-8">
                {/* Header with flame icon */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-ember-orange"
                    >
                      <Flame size={28} />
                    </motion.div>
                    <div>
                      <h2 id="contact-prompt-title" className="text-2xl font-display text-chalk">
                        Talk to the Forge
                      </h2>
                      <p className="text-xs font-mono uppercase tracking-widest text-iron-grey mt-1">
                        Ready when you are
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleDismiss}
                    className="p-2 text-iron-grey hover:text-chalk transition-colors focus:outline-none focus:ring-2 focus:ring-brushed-bronze rounded-sm"
                    aria-label="Close"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Subhead */}
                <p className="text-iron-grey text-sm mb-8 leading-relaxed">
                  You&apos;ve had time to look around. If you&apos;ve got a project in mind—
                  a railing, a gate, a piece of furniture, or something entirely custom—
                  let&apos;s start the conversation.
                </p>

                {/* CTA Buttons Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
                  {/* Email Button */}
                  <button
                    onClick={handleEmail}
                    className="group p-4 bg-forge-black/50 border border-brushed-bronze/20 rounded-sm hover:border-brushed-bronze/50 hover:bg-forge-black/70 transition-all focus:outline-none focus:ring-2 focus:ring-brushed-bronze"
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className="w-10 h-10 rounded-full bg-brushed-bronze/20 flex items-center justify-center mb-3 group-hover:bg-brushed-bronze/30 transition-colors">
                        <Mail size={18} className="text-brushed-bronze" />
                      </div>
                      <span className="font-mono text-xs uppercase tracking-widest text-chalk">
                        Email
                      </span>
                      <span className="text-[10px] text-iron-grey mt-1">Direct to Matt</span>
                    </div>
                  </button>

                  {/* Call/Text Button */}
                  <button
                    onClick={handlePhone}
                    className="group p-4 bg-forge-black/50 border border-brushed-bronze/20 rounded-sm hover:border-brushed-bronze/50 hover:bg-forge-black/70 transition-all focus:outline-none focus:ring-2 focus:ring-brushed-bronze"
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className="w-10 h-10 rounded-full bg-brushed-bronze/20 flex items-center justify-center mb-3 group-hover:bg-brushed-bronze/30 transition-colors">
                        <Phone size={18} className="text-brushed-bronze" />
                      </div>
                      <span className="font-mono text-xs uppercase tracking-widest text-chalk">
                        Call / Text
                      </span>
                      <span className="text-[10px] text-iron-grey mt-1">{BUSINESS_INFO.phoneDisplay}</span>
                    </div>
                  </button>

                  {/* Full Intake Button */}
                  <Link
                    to="/contact-form"
                    onClick={handleIntake}
                    className="group p-4 bg-forge-black/50 border border-brushed-bronze/20 rounded-sm hover:border-brushed-bronze/50 hover:bg-forge-black/70 transition-all focus:outline-none focus:ring-2 focus:ring-brushed-bronze"
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className="w-10 h-10 rounded-full bg-brushed-bronze/20 flex items-center justify-center mb-3 group-hover:bg-brushed-bronze/30 transition-colors">
                        <FileText size={18} className="text-brushed-bronze" />
                      </div>
                      <span className="font-mono text-xs uppercase tracking-widest text-chalk">
                        Full Intake
                      </span>
                      <span className="text-[10px] text-iron-grey mt-1">Detailed project form</span>
                    </div>
                  </Link>
                </div>

                {/* Instagram link centered at bottom */}
                <div className="pt-6 border-t border-brushed-bronze/20">
                  <p className="text-[10px] font-mono uppercase tracking-widest text-iron-grey text-center mb-3">
                    Want to see more work first?
                  </p>
                  <a
                    href={BUSINESS_INFO.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleDismiss}
                    className="flex items-center justify-center gap-2 text-sm font-mono uppercase tracking-widest text-chalk hover:text-ember-orange transition-colors focus:outline-none focus:ring-2 focus:ring-brushed-bronze rounded-sm px-4 py-2 mx-auto w-fit"
                  >
                    <Instagram size={18} />
                    Follow on Instagram
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
