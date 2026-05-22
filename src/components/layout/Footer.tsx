import { Link } from 'react-router-dom';
import { Instagram, Facebook } from 'lucide-react';
import { SITE_IMAGES, BUSINESS_INFO } from '../../data/site-images';
import { usePhoneActions } from '../contact';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { openPhoneActions } = usePhoneActions();

  return (
    <footer className="bg-anthracite border-t border-brushed-bronze/20 px-6 py-8 md:py-12 relative z-20 overflow-hidden">
      <div className="absolute inset-0 bg-noise pointer-events-none opacity-30" />
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 relative z-10">
        
        {/* Col 1 */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="h-10 aspect-[294/150] overflow-hidden border border-brushed-bronze/30">
              <img
                src={SITE_IMAGES.brand.logo}
                alt="Matt Coffey Design"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-xs font-bold tracking-[0.25em] text-brushed-bronze uppercase">
              Matt Coffey · Design
            </span>
          </div>
          <p className="text-[11px] text-iron-grey max-w-sm uppercase tracking-widest leading-relaxed">
            Architectural metalwork, custom furniture, and bespoke commissions forged with heavy intent.
          </p>
          <div className="text-[10px] text-iron-grey uppercase tracking-widest space-y-1">
            <p>Traverse City, MI</p>
            <p>Forged in Northern Michigan since 1999.</p>
          </div>
        </div>

        {/* Col 2 */}
        <div className="space-y-6">
          <h3 className="font-mono text-[10px] tracking-tighter text-brushed-bronze uppercase">Navigation</h3>
          <ul className="flex flex-col gap-3">
            {[
              { name: 'Home', path: '/' },
              { name: 'Services', path: '/services' },
              { name: 'Process', path: '/process' },
              { name: 'Discover', path: '/discover' },
              { name: 'Journal', path: '/journal' },
              { name: 'About', path: '/about' },
              { name: 'Glossary', path: '/glossary' },
              { name: 'Contact', path: '/contact' }
            ].map(link => (
              <li key={link.name}>
                <Link to={link.path} className="text-[11px] uppercase tracking-[0.18em] text-iron-grey hover:text-ember-orange transition-colors focus:outline-none focus:ring-1 focus:ring-brushed-bronze rounded-sm">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
          
          <div className="pt-4 border-t border-brushed-bronze/10">
            <h4 className="font-mono text-[10px] tracking-tighter text-iron-grey uppercase mb-3">Serving</h4>
            <p className="text-[10px] text-iron-grey leading-relaxed uppercase tracking-widest">
              Grand Traverse, Leelanau, Antrim, Benzie, and nationwide for select commissions.
            </p>
          </div>
        </div>

        {/* Col 3 */}
        <div className="space-y-6">
          <h3 className="font-mono text-[10px] tracking-tighter text-brushed-bronze uppercase">Contact</h3>
          <div className="space-y-3">
            <a href={`mailto:${BUSINESS_INFO.email}`} className="block text-[11px] tracking-widest uppercase text-iron-grey hover:text-ember-orange transition-colors">
               {BUSINESS_INFO.email}
            </a>
            <button
              onClick={openPhoneActions}
              className="block text-[11px] tracking-widest uppercase text-iron-grey hover:text-ember-orange transition-colors text-left focus:outline-none focus:ring-2 focus:ring-brushed-bronze rounded-sm"
            >
              {BUSINESS_INFO.phoneDisplay}
            </button>
            <p className="text-[11px] tracking-widest uppercase text-brushed-bronze">By appointment only.</p>
          </div>
          
          <div className="flex gap-4 pt-2">
            <a href="https://instagram.com/mattcoffeydesign" className="text-iron-grey hover:text-brushed-bronze transition-colors flex items-center justify-center p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-brushed-bronze" aria-label="Instagram">
              <Instagram size={20} />
            </a>
            <a href="https://facebook.com/mattcoffeydesign" className="text-iron-grey hover:text-brushed-bronze transition-colors flex items-center justify-center p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-brushed-bronze" aria-label="Facebook">
              <Facebook size={20} />
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-6 pt-6 border-t border-brushed-bronze/10 relative z-10 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-[9px] text-iron-grey uppercase tracking-widest">
          © {currentYear} Matt Coffey Design. All rights reserved.
        </p>
        <Link to="/privacy" className="text-[9px] text-iron-grey uppercase tracking-widest hover:text-chalk transition-colors">
          Privacy Policy
        </Link>
      </div>
    </footer>
  );
}
