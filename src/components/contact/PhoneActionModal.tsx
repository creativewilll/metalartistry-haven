import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Phone, X, Mail, Copy, Check } from 'lucide-react';
import { usePhoneActions } from './PhoneActionContext';
import { BUSINESS_INFO } from '../../data/site-images';

// Device capability detection
function getDeviceCapabilities() {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return { canText: false, canCall: false };
  }

  const ua = navigator.userAgent.toLowerCase();
  const platform = navigator.platform?.toLowerCase() || '';

  // iOS devices (iPhone, iPad)
  const isIOS = /iphone|ipad|ipod/.test(ua) || (platform === 'macintel' && navigator.maxTouchPoints > 1);

  // Android
  const isAndroid = /android/.test(ua);

  // macOS (can text via Messages handoff, can call via FaceTime)
  const isMac = platform.includes('mac') && !isIOS;

  // Windows (Phone Link allows calls)
  const isWindows = platform.includes('win');

  // Linux/ChromeOS (generally no native calling)
  const isLinux = platform.includes('linux');

  const canText = isIOS || isAndroid || isMac;
  const canCall = isIOS || isAndroid || isMac || isWindows;

  return { canText, canCall, isIOS, isAndroid, isMac, isWindows, isLinux };
}

export function PhoneActionModal() {
  const { isOpen, closePhoneActions } = usePhoneActions();
  const [capabilities, setCapabilities] = useState({ canText: false, canCall: false });
  const [isCallConfirming, setIsCallConfirming] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setCapabilities(getDeviceCapabilities());
      setIsCallConfirming(false);
    }
  }, [isOpen]);

  // Close on escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closePhoneActions();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closePhoneActions]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleText = useCallback(() => {
    const body = encodeURIComponent('Hi Matt, I have a project inquiry from your website.');
    window.location.href = `sms:${BUSINESS_INFO.phoneSms}?&body=${body}`;
  }, []);

  const handleCall = useCallback(() => {
    if (!isCallConfirming) {
      setIsCallConfirming(true);
      return;
    }
    window.location.href = `tel:${BUSINESS_INFO.phone}`;
    setIsCallConfirming(false);
  }, [isCallConfirming]);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(BUSINESS_INFO.phoneDisplay);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-forge-black/80 backdrop-blur-sm z-50"
            onClick={closePhoneActions}
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-50 px-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="phone-modal-title"
          >
            <div className="bg-anthracite border border-brushed-bronze/30 rounded-sm shadow-2xl shadow-ember-orange/10 overflow-hidden">
              {/* Header with forge gradient accent */}
              <div className="h-1 bg-gradient-to-r from-cooling-red via-ember-orange to-white-hot" />

              <div className="p-6">
                {/* Title and close */}
                <div className="flex items-center justify-between mb-6">
                  <h2 id="phone-modal-title" className="text-xl font-display text-chalk">
                    Connect with Matt
                  </h2>
                  <button
                    onClick={closePhoneActions}
                    className="p-2 text-iron-grey hover:text-chalk transition-colors focus:outline-none focus:ring-2 focus:ring-brushed-bronze rounded-sm"
                    aria-label="Close"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Phone number display */}
                <div className="flex items-center justify-between p-4 bg-forge-black/50 border border-brushed-bronze/20 rounded-sm mb-6">
                  <span className="text-lg font-mono text-chalk tracking-wide">
                    {BUSINESS_INFO.phoneDisplay}
                  </span>
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-iron-grey hover:text-chalk transition-colors focus:outline-none focus:ring-2 focus:ring-brushed-bronze rounded-sm px-3 py-2"
                    aria-label={copied ? 'Copied' : 'Copy number'}
                  >
                    {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                    {copied ? 'Copied' : 'Copy'}
                  </button>
                </div>

                {/* Action buttons */}
                <div className="space-y-3">
                  {/* Text Me Button */}
                  <button
                    onClick={handleText}
                    disabled={!capabilities.canText}
                    className="w-full flex items-center justify-between p-4 rounded-sm border transition-all focus:outline-none focus:ring-2 focus:ring-brushed-bronze
                      enabled:bg-brushed-bronze/10 enabled:border-brushed-bronze/30 enabled:hover:bg-brushed-bronze/20 enabled:hover:border-brushed-bronze/50
                      disabled:bg-forge-black/30 disabled:border-iron-grey/20 disabled:cursor-not-allowed disabled:opacity-60"
                    aria-disabled={!capabilities.canText}
                  >
                    <div className="flex items-center gap-3">
                      <MessageSquare
                        size={20}
                        className={capabilities.canText ? 'text-brushed-bronze' : 'text-iron-grey'}
                      />
                      <div className="text-left">
                        <span className="block font-mono text-sm uppercase tracking-widest text-chalk">
                          Text Me
                        </span>
                        {!capabilities.canText && (
                          <span className="text-[10px] text-iron-grey">
                            Texting requires a phone or Messages app
                          </span>
                        )}
                      </div>
                    </div>
                    {capabilities.canText && (
                      <span className="text-xs font-mono text-ember-orange uppercase tracking-widest">
                        Opens Messages
                      </span>
                    )}
                  </button>

                  {/* Call Me Button */}
                  <button
                    onClick={handleCall}
                    disabled={!capabilities.canCall}
                    className="w-full flex items-center justify-between p-4 rounded-sm border transition-all focus:outline-none focus:ring-2 focus:ring-brushed-bronze
                      enabled:bg-brushed-bronze/10 enabled:border-brushed-bronze/30 enabled:hover:bg-brushed-bronze/20 enabled:hover:border-brushed-bronze/50
                      disabled:bg-forge-black/30 disabled:border-iron-grey/20 disabled:cursor-not-allowed disabled:opacity-60"
                    aria-disabled={!capabilities.canCall}
                  >
                    <div className="flex items-center gap-3">
                      <Phone
                        size={20}
                        className={capabilities.canCall ? 'text-brushed-bronze' : 'text-iron-grey'}
                      />
                      <div className="text-left">
                        <span className="block font-mono text-sm uppercase tracking-widest text-chalk">
                          Call Me
                        </span>
                        {!capabilities.canCall ? (
                          <span className="text-[10px] text-iron-grey">
                            No calling capability on this device
                          </span>
                        ) : isCallConfirming ? (
                          <span className="text-[10px] text-ember-orange">
                            Tap again to confirm call
                          </span>
                        ) : null}
                      </div>
                    </div>
                    {capabilities.canCall && !isCallConfirming && (
                      <span className="text-xs font-mono text-ember-orange uppercase tracking-widest">
                        Confirm First
                      </span>
                    )}
                    {isCallConfirming && (
                      <span className="text-xs font-mono text-ember-orange uppercase tracking-widest animate-pulse">
                        Confirm?
                      </span>
                    )}
                  </button>
                </div>

                {/* Email fallback */}
                <div className="mt-6 pt-6 border-t border-brushed-bronze/20">
                  <a
                    href={`mailto:${BUSINESS_INFO.email}`}
                    className="flex items-center justify-center gap-2 text-sm font-mono uppercase tracking-widest text-iron-grey hover:text-chalk transition-colors focus:outline-none focus:ring-2 focus:ring-brushed-bronze rounded-sm px-4 py-3"
                  >
                    <Mail size={16} />
                    Email Instead: {BUSINESS_INFO.email}
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
