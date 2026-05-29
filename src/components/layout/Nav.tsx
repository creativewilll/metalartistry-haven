import { AnimatePresence, motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { SITE_IMAGES } from '../../data/site-images';
import { FEATURES } from '../../config/features';

const links = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'Process', path: '/process' },
  { name: 'Discover', path: '/discover' },
  { name: 'Journal', path: '/journal' },
  ...(FEATURES.aboutPage ? [{ name: 'About', path: '/about' }] : []),
  { name: 'Contact', path: '/contact' },
];

export function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggle = () => setIsOpen(!isOpen);

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-forge-black/80 backdrop-blur-md border-b border-hammered-steel">
      <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-brushed-bronze focus-visible:ring-offset-2 focus-visible:ring-offset-forge-black rounded-sm"
        >
          <div className="h-10 aspect-[294/150] overflow-hidden border border-brushed-bronze/30 transition-transform group-hover:scale-105">
            <img
              src={SITE_IMAGES.brand.logo}
              alt="Matt Coffey Design"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-xs font-bold tracking-[0.25em] text-brushed-bronze uppercase">
            Matt Coffey · Design
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10">
          {links.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  'text-[11px] uppercase tracking-[0.18em] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brushed-bronze focus-visible:ring-offset-2 focus-visible:ring-offset-forge-black rounded-sm',
                  isActive ? 'text-ember-orange' : 'text-iron-grey hover:text-ember-orange'
                )}
              >
                {link.name}
              </Link>
            )
          })}
        </nav>

        <div className="hidden md:block">
          <Link
            to="/contact"
            className="inline-flex px-6 py-2 border border-brushed-bronze text-brushed-bronze text-[10px] font-bold uppercase tracking-widest hover:bg-brushed-bronze hover:text-forge-black transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-brushed-bronze focus-visible:ring-offset-2 focus-visible:ring-offset-forge-black rounded-sm"
          >
            Start a Commission
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={toggle}
          className="md:hidden text-chalk focus:outline-none focus-visible:ring-2 focus-visible:ring-brushed-bronze focus-visible:ring-offset-2 focus-visible:ring-offset-forge-black rounded-sm p-1"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-24 inset-x-0 bg-forge-black/95 backdrop-blur-xl border-b border-hammered-steel md:hidden h-[calc(100vh-96px)]"
          >
            <nav className="flex flex-col px-6 py-8 gap-6">
              {links.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      'text-2xl font-display transition-colors',
                      isActive ? 'text-ember-orange' : 'text-chalk/90 hover:text-white-hot'
                    )}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <div className="pt-6 border-t border-hammered-steel">
                <Link
                  to="/contact"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex h-12 w-full items-center justify-center border border-brushed-bronze text-brushed-bronze text-sm font-bold uppercase tracking-widest hover:bg-brushed-bronze hover:text-forge-black transition-all"
                >
                  Start a Commission
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
