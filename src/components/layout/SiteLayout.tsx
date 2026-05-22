import { ReactNode, useEffect } from 'react';
import { Nav } from './Nav';
import { Footer } from './Footer';
import { useLocation } from 'react-router-dom';
import { PhoneActionProvider, PhoneActionModal } from '../contact';
import { ContactPromptModal, ForgeNewsletterTab } from '../marketing';

export function SiteLayout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const isImmersive = pathname === '/discover' || pathname.startsWith('/discover/');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  if (isImmersive) {
    // Full-bleed immersive route: no Nav, no Footer, no decorative rails, no top padding, no marketing popups.
    // But we still need PhoneActionProvider for the phone modal to work.
    return (
      <PhoneActionProvider>
        <div className="flex flex-col min-h-screen bg-forge-black relative overscroll-none selection:bg-brushed-bronze/30 selection:text-white-hot">
          <main className="flex-1 flex flex-col relative z-10">{children}</main>
          <PhoneActionModal />
        </div>
      </PhoneActionProvider>
    );
  }

  return (
    <PhoneActionProvider>
      <div className="flex flex-col min-h-screen bg-forge-black relative overscroll-none selection:bg-brushed-bronze/30 selection:text-white-hot">
        {/* Vertical Scored Steel Rail Decorations */}
        <div className="hidden lg:block absolute left-12 top-0 bottom-0 w-[1px] bg-hammered-steel opacity-20 pointer-events-none z-0"></div>
        <div className="hidden lg:block absolute left-14 top-0 bottom-0 w-[1px] bg-hammered-steel opacity-20 pointer-events-none z-0"></div>
        <div className="hidden lg:block absolute right-12 top-0 bottom-0 w-[1px] bg-hammered-steel opacity-20 pointer-events-none z-0"></div>
        <div className="hidden lg:block absolute right-14 top-0 bottom-0 w-[1px] bg-hammered-steel opacity-20 pointer-events-none z-0"></div>

        <Nav />
        {/* 96px top padding accounts for the fixed nav height (h-24 is 6rem = 96px) */}
        <main className="flex-1 pt-24 flex flex-col relative z-10">{children}</main>
        <Footer />

        {/* Global overlays */}
        <PhoneActionModal />
        <ContactPromptModal />
        <ForgeNewsletterTab />
      </div>
    </PhoneActionProvider>
  );
}
