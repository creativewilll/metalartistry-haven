import { useEffect, useState, useMemo, FormEvent } from 'react';
import { ArrowRight, Home, Briefcase, Compass, Mail, Search } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { SiteHead } from '../components/layout/SiteHead';
import { SITE_IMAGES, BUSINESS_INFO } from '../data/site-images';

const ROUTES = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/services', label: 'Services', icon: Briefcase },
  { path: '/discover', label: 'Discover', icon: Compass },
  { path: '/contact', label: 'Contact', icon: Mail },
];

// Simple fuzzy match function
function fuzzyMatch(input: string, target: string): boolean {
  const normalizedInput = input.toLowerCase().trim();
  const normalizedTarget = target.toLowerCase();
  
  if (normalizedTarget.includes(normalizedInput)) return true;
  
  // Character-by-character matching for basic fuzzy logic
  let inputIdx = 0;
  for (let targetIdx = 0; targetIdx < normalizedTarget.length && inputIdx < normalizedInput.length; targetIdx++) {
    if (normalizedTarget[targetIdx] === normalizedInput[inputIdx]) {
      inputIdx++;
    }
  }
  
  return inputIdx === normalizedInput.length;
}

export function NotFound() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  // Log 404 pathname to console for audit
  useEffect(() => {
    console.log(`[404 Audit] Page not found: ${pathname} at ${new Date().toISOString()}`);
  }, [pathname]);

  // Filter routes based on search query
  const filteredRoutes = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return ROUTES.filter(route => fuzzyMatch(searchQuery, route.label));
  }, [searchQuery]);

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (filteredRoutes.length > 0) {
      navigate(filteredRoutes[0].path);
    }
  };

  const currentYear = new Date().getFullYear();
  const yearsInBusiness = currentYear - BUSINESS_INFO.yearEstablished;

  return (
    <>
      <SiteHead 
        title="Page Not Found" 
        description="This page got forged out of existence." 
        noindex={true}
      />
      
      <section className="flex-1 flex flex-col min-h-screen relative">
        {/* Full-bleed atmospheric background */}
        <div className="absolute inset-0 z-0">
          <img 
            src={SITE_IMAGES.notFound.bg} 
            alt="" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-forge-black/85" />
          <div className="absolute inset-0 bg-noise mix-blend-overlay opacity-30 pointer-events-none" />
        </div>
        
        {/* Content */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-20 text-center">
          <div className="max-w-2xl mx-auto space-y-8">
            {/* Brand Logo */}
            <div className="mx-auto w-24 h-24 rounded-full overflow-hidden border-2 border-brushed-bronze/30">
              <img 
                src={SITE_IMAGES.brand.logo} 
                alt="Matt Coffey Design" 
                className="w-full h-full object-cover"
              />
            </div>

            {/* sr-only h1 for accessibility */}
            <h1 className="sr-only">404 — Page Not Found</h1>

            {/* Anvil SVG Illustration */}
            <div className="text-brushed-bronze/40 mx-auto w-24 h-24 flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <path d="M4 11C4 11 6 11 6 9C6 7 4 7 4 7H20V9H22V11H20V15C20 16.1046 19.1046 17 18 17H16C15.9324 18.1565 15.006 19.349 14.1623 20.3013L13.8893 20.6095C13.5186 21.0281 12.87 21 12.5 20.5L11.5 19H8L7 20.5C6.63 21 5.98138 21.0281 5.61066 20.6095L5.33772 20.3013C4.494 19.349 3.56763 18.1565 3.5 17H2.5C1.67157 17 1 16.3284 1 15.5C1 14.6716 1.67157 14 2.5 14H3.045C3.15835 12.8596 3.51177 11.8344 4 11ZM8.5 17C8.5 17.5523 8.94772 18 9.5 18H14.5C15.0523 18 15.5 17.5523 15.5 17V15H8.5V17Z" />
              </svg>
            </div>

            {/* Headline with aria-live */}
            <div>
              <p 
                aria-live="assertive" 
                className="text-4xl md:text-5xl font-display mb-4"
              >
                Melted Down.
              </p>
              <p className="text-iron-grey text-lg max-w-md mx-auto">
                This page got forged out of existence. The URL you're looking for doesn't point to anything structural.
              </p>
            </div>

            {/* Search/Redirect Input */}
            <form onSubmit={handleSearchSubmit} className="max-w-md mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-iron-grey" size={18} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for a page..."
                  className="w-full h-14 pl-12 pr-4 rounded-sm bg-forge-black/50 border border-white/10 text-chalk placeholder:text-iron-grey/50 focus:outline-none focus:border-brushed-bronze transition-colors"
                />
              </div>
              
              {/* Search suggestions */}
              {searchQuery.trim() && (
                <div className="mt-2 text-left">
                  {filteredRoutes.length > 0 ? (
                    <div className="rounded-sm bg-forge-black/70 border border-white/10 overflow-hidden">
                      {filteredRoutes.map((route) => (
                        <Link
                          key={route.path}
                          to={route.path}
                          className="flex items-center gap-3 px-4 py-3 hover:bg-brushed-bronze/10 transition-colors border-b border-white/5 last:border-b-0"
                        >
                          <route.icon size={16} className="text-brushed-bronze" />
                          <span className="text-chalk">{route.label}</span>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <p className="text-iron-grey text-sm px-1">No matching pages found</p>
                  )}
                </div>
              )}
            </form>

            {/* Most Popular Pages - 4 Tile Grid */}
            <div className="pt-4">
              <p className="text-iron-grey text-xs uppercase tracking-widest mb-4 font-mono">Most Popular Pages</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {ROUTES.map((route) => (
                  <Link
                    key={route.path}
                    to={route.path}
                    className="flex flex-col items-center gap-2 p-4 rounded-sm bg-forge-black/40 border border-white/10 hover:border-brushed-bronze/40 hover:bg-brushed-bronze/5 transition-all group"
                  >
                    <route.icon size={20} className="text-brushed-bronze group-hover:scale-110 transition-transform" />
                    <span className="text-sm text-chalk font-medium">{route.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Browse gallery link */}
            <div className="pt-2">
              <Link 
                to="/discover" 
                className="inline-flex items-center gap-2 text-brushed-bronze hover:text-ember-orange transition-colors text-sm"
              >
                Browse the gallery instead
                <ArrowRight size={14} />
              </Link>
            </div>

            {/* Primary CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
              <Link 
                to="/" 
                className="w-full sm:w-auto inline-flex h-14 items-center justify-center rounded-sm bg-brushed-bronze px-8 text-sm font-mono tracking-widest uppercase font-semibold text-forge-black transition-all hover:bg-ember-orange hover:shadow-[0_4px_24px_-4px_rgba(226,106,31,0.5)]"
              >
                Return Home
              </Link>
              <Link 
                to="/services" 
                className="w-full sm:w-auto inline-flex h-14 items-center justify-center gap-2 rounded-sm border border-brushed-bronze/40 px-8 text-sm font-mono tracking-widest uppercase font-semibold text-chalk transition-all hover:border-brushed-bronze hover:bg-brushed-bronze/10 group"
              >
                View Services <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>

        {/* Trust Strip Footer */}
        <div className="relative z-10 border-t border-white/10 bg-forge-black/60 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto px-6 py-6">
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-center">
              <div className="flex flex-col items-center">
                <span className="text-2xl font-display text-brushed-bronze">{yearsInBusiness}+</span>
                <span className="text-xs text-iron-grey uppercase tracking-wider">Years Crafting</span>
              </div>
              <div className="w-px h-10 bg-white/10 hidden sm:block" />
              <div className="flex flex-col items-center">
                <span className="text-2xl font-display text-brushed-bronze">{BUSINESS_INFO.piecesCompleted.toLocaleString()}+</span>
                <span className="text-xs text-iron-grey uppercase tracking-wider">Pieces Completed</span>
              </div>
              <div className="w-px h-10 bg-white/10 hidden sm:block" />
              <div className="flex flex-col items-center">
                <span className="text-2xl font-display text-brushed-bronze">{BUSINESS_INFO.location.city}</span>
                <span className="text-xs text-iron-grey uppercase tracking-wider">Northern Michigan</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
