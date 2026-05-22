import { useState, useEffect, useRef, type ReactNode, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Phone, Mail, Lock, X } from 'lucide-react';
import { SITE_IMAGES, BUSINESS_INFO } from '../data/site-images';

const PASSWORD = 'Matt20Coffey26!';
const SESSION_MS = 7 * 24 * 60 * 60 * 1000;
const STORAGE_KEY = 'mcd_auth_until';

function isAuthenticated(): boolean {
  try {
    const until = localStorage.getItem(STORAGE_KEY);
    return !!until && Date.now() < Number(until);
  } catch {
    return false;
  }
}

function authenticate() {
  localStorage.setItem(STORAGE_KEY, String(Date.now() + SESSION_MS));
}

const BG_IMAGES = [
  SITE_IMAGES.home.hero,
  SITE_IMAGES.specialties.commercial,
  SITE_IMAGES.specialties.art,
];

export function ComingSoonGate({ children }: { children: ReactNode }) {
  const [authed, setAuthed] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('unlock') === PASSWORD) {
        authenticate();
        window.history.replaceState({}, '', window.location.pathname);
        return true;
      }
      return isAuthenticated();
    }
    return false;
  });

  if (authed) return <>{children}</>;

  return (
    <AnimatePresence mode="wait">
      <TeaseScreen
        key="teaser"
        onAuthenticated={() => setAuthed(true)}
      />
    </AnimatePresence>
  );
}

function TeaseScreen({ onAuthenticated, ...rest }: { onAuthenticated: () => void } & Record<string, unknown>) {
  const [showSignIn, setShowSignIn] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (showSignIn) inputRef.current?.focus();
  }, [showSignIn]);

  useEffect(() => {
    if (!showSignIn) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowSignIn(false);
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [showSignIn]);

  useEffect(() => {
    if (!error) return;
    const t = setTimeout(() => setError(false), 2000);
    return () => clearTimeout(t);
  }, [error]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (password === PASSWORD) {
      authenticate();
      onAuthenticated();
    } else {
      setError(true);
      setPassword('');
    }
  };

  const smsBody = encodeURIComponent('Hi Matt, I have a project inquiry from your website.');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[9999] bg-forge-black flex items-center justify-center overflow-hidden"
    >
      {/* Background images */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 grid grid-cols-3 gap-0">
          {BG_IMAGES.map((src, i) => (
            <img
              key={i}
              src={src}
              alt=""
              className="w-full h-full object-cover opacity-15"
            />
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-forge-black/85 via-forge-black/75 to-forge-black" />
        <div className="absolute inset-0 bg-noise mix-blend-overlay opacity-20 pointer-events-none" />
      </div>

      {/* Content */}
      <main className="relative z-10 w-full max-w-lg mx-auto px-6 text-center">
        {/* Brand mark */}
        <p className="font-mono text-xs sm:text-sm uppercase tracking-[0.25em] text-brushed-bronze mb-8">
          Matt Coffey Design
        </p>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-display text-chalk mb-6 leading-tight">
          Site Revamp&thinsp;&mdash;&thinsp;Coming Soon
        </h1>

        {/* Subhead */}
        <p className="text-iron-grey text-base sm:text-lg leading-relaxed mb-12 max-w-md mx-auto">
          The new mattcoffeydesign.com is in final review. The forge is still
          open&thinsp;&mdash;&thinsp;reach Matt directly below.
        </p>

        {/* Contact buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a
            href={`sms:${BUSINESS_INFO.phoneSms}?&body=${smsBody}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 py-3.5 border border-brushed-bronze/30 bg-anthracite rounded-sm text-chalk font-mono text-sm uppercase tracking-widest hover:border-brushed-bronze/60 hover:bg-brushed-bronze/10 transition-colors focus:outline-none focus:ring-2 focus:ring-brushed-bronze"
            aria-label="Send a text message to Matt"
          >
            <MessageSquare size={18} className="text-brushed-bronze" />
            Text
          </a>

          <a
            href={`tel:${BUSINESS_INFO.phone}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 py-3.5 border border-brushed-bronze/30 bg-anthracite rounded-sm text-chalk font-mono text-sm uppercase tracking-widest hover:border-brushed-bronze/60 hover:bg-brushed-bronze/10 transition-colors focus:outline-none focus:ring-2 focus:ring-brushed-bronze"
            aria-label="Call Matt"
          >
            <Phone size={18} className="text-brushed-bronze" />
            Call
          </a>

          <a
            href={`mailto:${BUSINESS_INFO.email}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 py-3.5 border border-brushed-bronze/30 bg-anthracite rounded-sm text-chalk font-mono text-sm uppercase tracking-widest hover:border-brushed-bronze/60 hover:bg-brushed-bronze/10 transition-colors focus:outline-none focus:ring-2 focus:ring-brushed-bronze"
            aria-label="Email Matt"
          >
            <Mail size={18} className="text-brushed-bronze" />
            Email
          </a>
        </div>

        {/* Footer line */}
        <p className="text-iron-grey/60 font-mono text-xs tracking-widest">
          Est. {BUSINESS_INFO.yearEstablished} · {BUSINESS_INFO.location.city}, {BUSINESS_INFO.location.state}
        </p>
      </main>

      {/* Sign-in trigger */}
      <div className="absolute bottom-6 right-6 z-20">
        <AnimatePresence mode="wait">
          {showSignIn ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.2 }}
              role="dialog"
              aria-label="Owner sign in"
              className="bg-anthracite border border-brushed-bronze/30 rounded-sm p-4 shadow-2xl w-64"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-iron-grey">
                  <Lock size={14} className="text-brushed-bronze" />
                  <span className="font-mono text-xs uppercase tracking-widest">Sign In</span>
                </div>
                <button
                  onClick={() => { setShowSignIn(false); setError(false); }}
                  className="p-1 text-iron-grey hover:text-chalk transition-colors focus:outline-none focus:ring-2 focus:ring-brushed-bronze rounded-sm"
                  aria-label="Close sign in"
                >
                  <X size={16} />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  ref={inputRef}
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className={`w-full bg-forge-black/60 border ${error ? 'border-cooling-red animate-[shake_0.3s_ease-in-out]' : 'border-brushed-bronze/20'} rounded-sm px-3 py-2 text-sm text-chalk placeholder:text-iron-grey/50 focus:outline-none focus:border-brushed-bronze transition-colors`}
                  aria-label="Password"
                  autoComplete="off"
                />
                {error && (
                  <p className="text-cooling-red text-xs font-mono">Incorrect password.</p>
                )}
                <button
                  type="submit"
                  className="w-full py-2 bg-forge-black text-chalk font-mono text-xs uppercase tracking-widest border border-brushed-bronze/20 rounded-sm hover:bg-brushed-bronze/10 hover:border-brushed-bronze/40 transition-colors focus:outline-none focus:ring-2 focus:ring-brushed-bronze"
                >
                  Enter
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.button
              key="trigger"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSignIn(true)}
              className="text-xs font-mono uppercase tracking-widest text-iron-grey/40 hover:text-brushed-bronze transition-colors focus:outline-none focus:ring-2 focus:ring-brushed-bronze rounded-sm px-2 py-1"
            >
              Sign In
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
