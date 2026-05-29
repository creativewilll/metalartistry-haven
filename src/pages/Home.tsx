import { motion } from 'motion/react';
import { ArrowRight, Link as LinkIcon, HandIcon, LayoutDashboard, Component, Scaling, Flame, MapPin, Signpost } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SiteHead } from '../components/layout/SiteHead';
import { cn } from '../lib/utils';
import { useState, useEffect } from 'react';
import { SITE_IMAGES, BUSINESS_INFO } from '../data/site-images';
import { galleryItems } from '../data/gallery-items';
import { ForgeFeed } from '../components/marketing';
import { QuickAnswer } from '../components/seo/QuickAnswer';
import { FEATURES } from '../config/features';

const specialties = [
  { title: "Railings & Gates", desc: "Forged safety that doubles as art.", icon: <Scaling size={24} />, bgImage: SITE_IMAGES.specialties.railings, link: "/discover?category=Railings,%20Fences,%20and%20Gates" },
  { title: "Custom Furniture", desc: "Heirloom weight. Generational endurance.", icon: <LayoutDashboard size={24} />, bgImage: SITE_IMAGES.specialties.furniture, link: "/discover?category=Custom%20Furniture" },
  { title: "Commercial Installations", desc: "Branded steel for public spaces.", icon: <Component size={24} />, bgImage: SITE_IMAGES.specialties.commercial, link: "/discover?category=Commercial" },
  { title: "Architectural Art", desc: "One-off focal points in pure metal.", icon: <Flame size={24} />, bgImage: SITE_IMAGES.specialties.art, link: "/discover?category=Art%20and%20Decor" },
  { title: "Doors & Windows", desc: "Steel casements and grand entryways.", icon: <HandIcon size={24} />, bgImage: SITE_IMAGES.specialties.doors, link: "/discover?category=Doors%20and%20Windows" },
  { title: "Custom Signage", desc: "Branded metal signs that command attention.", icon: <Signpost size={24} />, bgImage: SITE_IMAGES.specialties.signage, link: "/discover?category=Art%20and%20Decor" },
  { title: "Bespoke Commissions", desc: "If you can sketch it, I can forge it.", icon: <LinkIcon size={24} />, bgImage: SITE_IMAGES.specialties.bespoke, link: "/contact" }
];

const testimonials = [
  { quote: "Matt didn't just build a railing, he anchored the entire architectural feel of our home.", author: "S. Reynolds" },
  { quote: "The weight and precision of the bronze work took my breath away.", author: "T. Janson, Lead Architect" },
  { quote: "25 years of experience shows in every hammer mark. Absolute perfection.", author: "M. Davies" }
];

// Curated home gallery preview pulling from real galleryItems
const recentProjects = [
  galleryItems.find(g => g.title.includes('Privacy Screen')) || galleryItems[0],
  galleryItems.find(g => g.title.includes('Door') && g.images[0].url.includes('Metal')) || galleryItems[2],
  galleryItems.find(g => g.title.includes('Fireplace')) || galleryItems[3],
  galleryItems.find(g => g.category === 'Commercial') || galleryItems[1],
  galleryItems.find(g => g.title.includes('Stovehood') || g.title.includes('Range')) || galleryItems[4],
  galleryItems.find(g => g.title.includes('Sign') || g.images[0].url.includes('Sign')) || galleryItems[5],
].filter(Boolean).slice(0, 6);

export function Home() {
  const [activeQuote, setActiveQuote] = useState(0);
  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (prefersReducedMotion) return;
    const interval = setInterval(() => {
      setActiveQuote(prev => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  const homeServiceSchema = [
    { name: "Custom Railings & Gates", description: "Hand-forged architectural railings, fences, and entry gates engineered for residential and commercial sites across Northern Michigan." },
    { name: "Custom Metal Furniture", description: "Heirloom-grade dining tables, console bases, industrial shelving, and bar seating built from forged steel, bronze, and reclaimed timber." },
    { name: "Custom Metal Signage", description: "Storefront blade signs, address monuments, restaurant marquees, and estate plaques fabricated from Cor-Ten and hot-rolled steel." },
    { name: "Steel & Bronze Doors", description: "Bespoke steel casement windows, pivot entryway doors, and barn doors with hand-forged hardware." },
    { name: "Architectural Art", description: "One-off sculptures, focal-point wall pieces, and public installations forged at over 2,000 degrees." },
    { name: "Structural Steel Supports", description: "I-beams, decorative mantel brackets, header supports, and load-bearing posts for high-end residential build-outs." },
  ].map((s, i) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    "position": i + 1,
    "name": s.name,
    "description": s.description,
    "provider": {
      "@type": "LocalBusiness",
      "name": BUSINESS_INFO.name,
      "url": BUSINESS_INFO.url
    },
    "areaServed": ["Traverse City", "Northern Michigan", "Grand Traverse County", "Leelanau County"]
  }));

  const homeFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Do you install outside of Traverse City?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. While our primary footprint covers Leelanau, Grand Traverse, and Benzie counties, we frequently travel statewide across Michigan for major architectural installations, and coordinate crating and freight delivery for nationwide furniture commissions."
        }
      },
      {
        "@type": "Question",
        "name": "How long does a custom steel railing take to build?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A standard architectural railing commission typically spans 8 to 12 weeks from finalized design and 50% deposit to final installation. The exact timeline depends on current forge capacity and the complexity of the traditional joinery involved."
        }
      },
      {
        "@type": "Question",
        "name": "Will the raw steel rust if used outdoors?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Bare exposed steel will inevitably return to iron oxide (rust). For exterior applications, we utilize hot-dip galvanizing followed by specialized marine-grade patinas, or we recommend switching materials to architectural bronze or aluminum, ensuring longevity even in harsh Northern Michigan winters."
        }
      }
    ]
  };

  return (
    <>
      <QuickAnswer text="Matt Coffey Design is a custom architectural metalwork studio in Traverse City, Michigan, led by master blacksmith Matt Coffey. With 25+ years and 1,500+ commissions, the forge specializes in hand-forged railings, gates, furniture, doors, signage, and structural steel for residential and commercial clients across Northern Michigan." />

      <SiteHead 
        title="Master Blacksmith | Traverse City"
        description="25+ years of master metalworking. Custom railings, gates, signage, doors, structural supports, and heirloom furniture forged in Traverse City, Northern Michigan."
        keywords={["blacksmith Traverse City", "custom metal railings", "custom metal gates", "custom metal signage", "custom metal doors", "structural steel supports", "custom metal furniture", "forged ironwork Michigan", "architectural blacksmith"]}
        speakableSelectors={['[data-speakable="true"]', '#faq-section']}
        preloadImage={SITE_IMAGES.home.hero}
        prefetch={["/discover", "/contact", "/services"]}
        schema={[
          {
            "@context": "https://schema.org",
            "@type": ["WebSite", "Organization"],
            "name": BUSINESS_INFO.name,
            "url": BUSINESS_INFO.url,
            "description": BUSINESS_INFO.description
          },
          ...homeServiceSchema,
          homeFaqSchema
        ]}
      />
      
      {/* 1. Hero */}
      <section id="hero" className="relative h-[100svh] min-h-[600px] flex items-center justify-center overflow-hidden -mt-24" aria-label="Hero">
        {/* Parallax Bed */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-forge-black object-cover" /> 
          <img src={SITE_IMAGES.home.hero} alt="Master blacksmith Matt Coffey forging custom architectural metalwork in his Traverse City studio" width="1920" height="1080" loading="eager" fetchPriority="high" className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-luminosity" />
          <div className="absolute inset-0 bg-gradient-to-t from-forge-black via-forge-black/80 to-transparent" />
          <div className="absolute inset-0 bg-noise opacity-30" />
        </div>

        {/* Subtle Ember Background Gradient */}
        <div className="absolute inset-0 pointer-events-none opacity-40 z-0">
          <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-[radial-gradient(var(--color-cooling-red),transparent)] blur-[120px] rounded-full"></div>
          <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-[radial-gradient(rgba(226,106,31,0.2),transparent)] blur-[100px] rounded-full"></div>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-24 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="max-w-4xl"
          >
            <span className="block text-[11px] uppercase tracking-[0.4em] text-brushed-bronze mb-4 font-mono">Established 1999 · Traverse City, MI</span>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-display leading-[0.9] mb-6 tracking-tighter text-balance">
              <span className="sr-only">Custom Architectural Metalwork in Traverse City, Michigan — </span>
              <span className="bg-clip-text text-transparent text-gradient-forge block" aria-hidden="true">
                FORGED WITH
              </span>
              <span className="text-chalk uppercase">Heavy Intent.</span>
            </h1>
            <p className="text-lg md:text-xl text-iron-grey max-w-2xl mx-auto leading-relaxed mb-10">
              Master metalwork native to Northern Michigan. 25 years at the anvil crafting custom architectural steel, bronze, and structural art.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
              <Link to="/contact" className="w-full sm:w-auto bg-brushed-bronze text-forge-black px-10 py-5 text-xs font-bold uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(226,106,31,0.2)] hover:shadow-[0_0_30px_rgba(226,106,31,0.4)] transition-shadow">
                Start a Commission
              </Link>
              <Link to="/discover" className="w-full sm:w-auto group flex items-center justify-center gap-4 text-xs font-bold uppercase tracking-[0.2em] text-chalk hover:text-brushed-bronze transition-colors">
                <span className="hidden sm:block w-12 h-[1px] bg-brushed-bronze group-hover:w-16 transition-all"></span>
                See the Work
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll Cue */}
        <div className="absolute bottom-24 right-12 md:right-24 flex flex-col items-center gap-4 animate-bounce z-10">
          <div className="w-[1px] h-24 bg-gradient-to-b from-brushed-bronze to-transparent"></div>
          <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-brushed-bronze [writing-mode:vertical-rl] rotate-180">Scroll to Begin</span>
        </div>
      </section>

      {/* 2. Trust Strip */}
      <section id="trust" className="bg-anthracite border-t border-b border-hammered-steel px-6 py-12 relative z-20" aria-label="Studio credentials at a glance">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-wrap justify-center md:justify-start gap-12 lg:gap-16">
            <div className="flex flex-col items-center md:items-start">
              <span className="text-[10px] font-mono text-brushed-bronze uppercase tracking-tighter mb-1">Experience</span>
              <span className="text-xl font-serif italic text-chalk">25+ Years</span>
            </div>
            <div className="flex flex-col items-center md:items-start">
              <span className="text-[10px] font-mono text-brushed-bronze uppercase tracking-tighter mb-1">Works Completed</span>
              <span className="text-xl font-serif italic text-chalk">1,500+ Pieces</span>
            </div>
            <div className="flex flex-col items-center md:items-start">
              <span className="text-[10px] font-mono text-brushed-bronze uppercase tracking-tighter mb-1">Location</span>
              <span className="text-xl font-serif italic text-chalk uppercase">Northern Michigan</span>
            </div>
            <div className="flex flex-col items-center md:items-start">
              <span className="text-[10px] font-mono text-brushed-bronze uppercase tracking-tighter mb-1">Status</span>
              <span className="text-xl font-serif italic text-chalk uppercase">Fully Insured</span>
            </div>
          </div>
          
          {/* Specialties Peek */}
          <div className="hidden lg:flex gap-4" aria-hidden="true">
            <div className="w-12 h-12 border border-hammered-steel bg-forge-black flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity">
              <div className="w-4 h-4 border-t border-l border-brushed-bronze"></div>
            </div>
            <div className="w-12 h-12 border border-hammered-steel bg-forge-black flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity">
              <div className="w-4 h-1 bg-brushed-bronze"></div>
            </div>
            <div className="w-12 h-12 border border-hammered-steel bg-forge-black flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity">
              <div className="w-1 h-4 bg-brushed-bronze"></div>
            </div>
          </div>
        </div>
      </section>

      {/* As Featured By */}
      <section className="bg-forge-black border-b border-hammered-steel px-6 py-10" aria-label="Press features">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-brushed-bronze">As Featured By</span>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 text-iron-grey font-serif italic text-sm md:text-base">
            <span className="hover:text-chalk transition-colors">Architectural Digest</span>
            <span className="hidden md:inline opacity-30">·</span>
            <span className="hover:text-chalk transition-colors">Northern Express</span>
            <span className="hidden md:inline opacity-30">·</span>
            <span className="hover:text-chalk transition-colors">Traverse Magazine</span>
            <span className="hidden md:inline opacity-30">·</span>
            <span className="hover:text-chalk transition-colors">Michigan Blue</span>
          </div>
        </div>
      </section>

      {/* Recent Forge Projects */}
      <section id="recent-projects" className="bg-anthracite py-20 px-6 border-b border-hammered-steel" aria-labelledby="recent-projects-heading">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-brushed-bronze mb-2 block">From the Forge</span>
              <h2 id="recent-projects-heading" className="text-3xl md:text-4xl font-display">Recent Commissions</h2>
            </div>
            <Link to="/discover" className="text-xs font-mono uppercase tracking-widest text-brushed-bronze hover:text-ember-orange transition-colors inline-flex items-center gap-2">
              View all 168 pieces <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {recentProjects.map((project, i) => (
              <Link
                key={i}
                to="/discover"
                className="group relative aspect-square overflow-hidden bg-forge-black border border-hammered-steel"
                aria-label={`Browse the gallery — ${project.title}`}
              >
                <img
                  src={project.images[0].url}
                  alt={project.title}
                  width="400"
                  height="400"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover grayscale opacity-70 transition-all duration-500 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forge-black via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-0 inset-x-0 p-3 z-10">
                  <p className="text-xs text-chalk font-mono leading-tight line-clamp-2">{project.title}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* NEW: The Philosophy of Heavy Metal */}
      <section id="philosophy" className="py-24 md:py-32 bg-anthracite border-b border-brushed-bronze/10 px-6" aria-labelledby="philosophy-heading">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          <div className="flex-1 space-y-8">
            <h2 id="philosophy-heading" className="text-4xl md:text-5xl font-display leading-tight text-balance">Why Choose Custom Forged Steel Over Prefabricated?</h2>
            <div className="w-16 h-[2px] bg-brushed-bronze"></div>
            <p className="text-lg text-iron-grey leading-relaxed">
              In an era of mass production and hollow-core metals, authentic blacksmithing offers something increasingly rare: permanence. When a client commissions a custom railing, gate, or architectural centerpiece, they aren't just purchasing a functional barrier. They are investing in site-specific art forged to the exact topography of their property.
            </p>
            <p className="text-lg text-iron-grey leading-relaxed">
              Prefabricated components—often cold-rolled and fastened with cheap hardware—lack the structural integrity and aesthetic gravity of solid steel. Each piece crafted in our Traverse City forge carries the distinctive hammer marks and joinery of traditional metalwork, ensuring it stands as a multi-generational asset to your architecture.
            </p>
          </div>
          <div className="flex-1 w-full aspect-square md:aspect-[4/3] bg-forge-black relative border border-hammered-steel group overflow-hidden">
             <img src={SITE_IMAGES.home.philosophySteel} alt="Hand-cut decorative steel sheet pattern revealing traditional blacksmithing texture" width="1200" height="900" loading="lazy" decoding="async" className="w-full h-full object-cover grayscale opacity-50 transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0 group-hover:opacity-80" />
             <div className="absolute inset-0 bg-noise opacity-40 mix-blend-overlay"></div>
          </div>
        </div>
      </section>

      {/* 3. Signature Specialties Grid */}
      <section id="specialties" className="py-24 md:py-32 bg-forge-black relative" aria-labelledby="specialties-heading">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 md:mb-24">
            <h2 id="specialties-heading" className="text-4xl md:text-5xl font-display mb-4">Signature Specialties</h2>
            <p className="text-iron-grey max-w-2xl mx-auto">Railings, gates, signage, doors, structural supports, and heirloom furniture &mdash; every piece hand-forged in our Traverse City studio.</p>
            <div className="w-12 h-px bg-brushed-bronze mx-auto mt-6" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {specialties.map((spec, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <Link
                  to={spec.link}
                  tabIndex={0}
                  className="group relative h-[320px] rounded-sm overflow-hidden flex flex-col justify-end p-8 border border-brushed-bronze/20 bg-anthracite focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brushed-bronze focus-visible:ring-offset-2 focus-visible:ring-offset-forge-black transition-shadow"
                  aria-label={`Explore ${spec.title} \u2014 ${spec.desc}`}
                >
                  <div className="absolute inset-0 z-0">
                    <img
                      src={spec.bgImage}
                      alt={`${spec.title} \u2014 example custom metalwork by Matt Coffey Design`}
                      width="800"
                      height="600"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover grayscale opacity-20 transition-all duration-700 group-hover:scale-105 group-hover:opacity-40 group-hover:grayscale-0 group-focus-visible:scale-105 group-focus-visible:opacity-40 group-focus-visible:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-forge-black via-forge-black/60 to-transparent" />
                    <div className="absolute inset-0 bg-noise opacity-50" />
                  </div>
                  
                  <div className="relative z-10 text-chalk transition-transform duration-500 group-hover:-translate-y-2 group-focus-visible:-translate-y-2">
                    <div className="mb-4 text-brushed-bronze group-hover:text-ember-orange transition-colors">
                      {spec.icon}
                    </div>
                    <h3 className="text-2xl font-display mb-2">{spec.title}</h3>
                    <p className="text-sm text-chalk/70 font-sans">{spec.desc}</p>
                  </div>
                  
                  <div className="absolute bottom-0 inset-x-0 h-[2px] bg-ember-orange transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100 group-focus-visible:scale-x-100" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* NEW: Materials in the Forge */}
      <section id="materials" className="py-24 bg-forge-black px-6 border-b border-hammered-steel relative overflow-hidden" aria-labelledby="materials-heading">
        <div className="absolute right-0 top-0 w-1/3 h-full bg-[radial-gradient(ellipse_at_right_center,rgba(140,107,58,0.1),transparent)] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 id="materials-heading" className="text-3xl md:text-5xl font-display mb-6 text-balance">The Anatomy of Our Materials.</h2>
            <p className="text-iron-grey max-w-2xl leading-relaxed">We select metals based on structural necessity, environmental exposure, and the desired aging process over decades.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
             <div className="border border-brushed-bronze/20 p-8 hover:bg-anthracite transition-colors group">
               <h3 className="font-mono text-sm tracking-widest uppercase text-brushed-bronze mb-4">Mild Steel</h3>
               <p className="text-sm text-chalk leading-relaxed mb-4">The backbone of structural metalwork. Malleable at critical temperatures, allowing for complex scrollwork and rigid, load-bearing architecture.</p>
             </div>
             <div className="border border-brushed-bronze/20 p-8 hover:bg-anthracite transition-colors group">
               <h3 className="font-mono text-sm tracking-widest uppercase text-brushed-bronze mb-4">Architectural Bronze</h3>
               <p className="text-sm text-chalk leading-relaxed mb-4">Prized for its warm luster and corrosion resistance. Perfect for high-touch surfaces like custom door pulls, handrails, and marine-adjacent projects.</p>
             </div>
             <div className="border border-brushed-bronze/20 p-8 hover:bg-anthracite transition-colors group">
               <h3 className="font-mono text-sm tracking-widest uppercase text-brushed-bronze mb-4">Copper</h3>
               <p className="text-sm text-chalk leading-relaxed mb-4">A living material that develops a distinct verdigris patina over time. Often used in bespoke range hoods, flashing, and decorative focal points.</p>
             </div>
             <div className="border border-brushed-bronze/20 p-8 hover:bg-anthracite transition-colors group">
               <h3 className="font-mono text-sm tracking-widest uppercase text-brushed-bronze mb-4">Chemical Patinas</h3>
               <p className="text-sm text-chalk leading-relaxed mb-4">Instead of hiding the metal under plastic powder coats, we utilize hand-rubbed oils, waxes, and oxidizing acids to protect and highlight the raw material.</p>
             </div>
          </div>
        </div>
      </section>

      {/* 4. Process Teaser */}
      <section id="process-teaser" className="border-t border-brushed-bronze/10 bg-anthracite py-24 relative overflow-hidden" aria-labelledby="process-teaser-heading">
         <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 id="process-teaser-heading" className="text-3xl md:text-4xl font-display mb-16">From Sketch to Steel</h2>
            
            <div className="flex flex-col md:flex-row items-start justify-between gap-8 md:gap-4 relative mb-16">
              {/* Desktop connecting line */}
              <div className="hidden md:block absolute top-[28px] left-[10%] right-[10%] h-px bg-brushed-bronze/20" />
              
              {["Discovery", "Concept", "Forging", "Installation"].map((step, i) => (
                <div key={i} className="flex-1 w-full relative z-10 flex flex-row md:flex-col items-center md:text-center text-left gap-6 md:gap-4">
                  <div className="text-forge-black bg-brushed-bronze w-14 h-14 rounded-sm flex items-center justify-center font-display text-xl shrink-0 mx-auto border-2 border-anthracite ring-1 ring-brushed-bronze">
                    0{i+1}
                  </div>
                  <div>
                    <h3 className="font-mono text-sm tracking-widest uppercase mb-2">{step}</h3>
                    <p className="text-sm text-iron-grey max-w-[200px] mx-auto hidden md:block">
                      {i === 0 && "Defining scope and constraints."}
                      {i === 1 && "Drafting blueprints and materials."}
                      {i === 2 && "Heating and shaping the metal."}
                      {i === 3 && "Final delivery and mounting."}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Link to="/process" className="inline-flex items-center gap-2 group text-sm font-mono tracking-widest text-brushed-bronze hover:text-ember-orange uppercase transition-colors">
              Explore the full process <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
         </div>
      </section>

      {/* NEW: For Architects & Designers */}
      <section id="trade" className="py-24 bg-anthracite px-6 border-b border-hammered-steel text-center relative overflow-hidden" aria-labelledby="trade-heading">
        <div className="absolute inset-0 bg-noise mix-blend-overlay opacity-30"></div>
        <div className="max-w-4xl mx-auto space-y-8 relative z-10">
          <span className="font-mono text-xs uppercase tracking-widest text-iron-grey block">B2B Partnerships</span>
          <h2 id="trade-heading" className="text-4xl md:text-5xl font-display leading-tight text-balance">Serving Architecture & Design Partners</h2>
          <p className="text-lg text-chalk/80 leading-relaxed mx-auto max-w-2xl">
            We collaborate directly with Northern Michigan builders, landscape architects, and interior designers on high-end residential and commercial build-outs. From structural steel staircases that require precise engineering to bespoke hardware that defines a room's character, we speak the language of blueprints and firm deadlines.
          </p>
          <div className="pt-8">
             <Link to="/contact" className="text-xs font-bold uppercase tracking-widest text-brushed-bronze border-b border-brushed-bronze pb-1 hover:text-ember-orange hover:border-ember-orange transition-colors">
               Request Our Trade Kit
             </Link>
          </div>
        </div>
      </section>

      {/* Forge Feed — Instagram commissions showcase */}
      <ForgeFeed variant="commissions" />

      {/* 5. About Teaser */}
      <section id="about-teaser" className="py-24 md:py-32 bg-forge-black relative" aria-labelledby="about-teaser-heading">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="order-2 lg:order-1 space-y-8">
            <h2 id="about-teaser-heading" className="text-4xl md:text-6xl font-display leading-[1.1] text-balance">25 Years at the Anvil.</h2>
            <p className="text-lg text-chalk/80 leading-relaxed max-w-lg">
              Every strike of the hammer is permanent. There are no undo buttons in blacksmithing. I build pieces designed to outlast the buildings they are installed in, using traditional techniques paired with modern architectural precision.
            </p>
            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-brushed-bronze/20">
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                 <div className="text-4xl md:text-5xl font-display text-ember-orange mb-2">1,500+</div>
                 <div className="font-mono text-xs text-iron-grey uppercase tracking-widest">Completed Pieces</div>
              </motion.div>
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, delay: 0.2 }}>
                 <div className="text-4xl md:text-5xl font-display text-brushed-bronze mb-2">1999</div>
                 <div className="font-mono text-xs text-iron-grey uppercase tracking-widest">Year Established</div>
              </motion.div>
            </div>
            {FEATURES.aboutPage && (
              <div className="pt-4">
                <Link to="/about" className="inline-flex items-center gap-2 group text-sm font-mono tracking-widest text-chalk hover:text-white-hot uppercase transition-colors">
                  Read the Story <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            )}
          </div>
          
          <div className="order-1 lg:order-2 relative">
             <div className="aspect-[4/5] bg-anthracite p-4 border border-brushed-bronze/20 relative z-10 overflow-hidden">
               <img src={SITE_IMAGES.home.mattPortrait} alt="Matt Coffey, master blacksmith and founder of Matt Coffey Design, in the Traverse City forge" width="800" height="1000" loading="lazy" decoding="async" className="w-full h-full object-cover grayscale" />
             </div>
             <div className="absolute -bottom-8 -left-8 w-2/3 aspect-square bg-brushed-bronze/5 z-0" />
          </div>
        </div>
      </section>

     {/* NEW: Deep Dive: The Art of the Joinery */}
      <section id="joinery" className="py-24 bg-forge-black border-t border-brushed-bronze/10 px-6" aria-labelledby="joinery-heading">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
             <div className="space-y-8 order-2 lg:order-1">
                <h2 id="joinery-heading" className="text-4xl font-display text-balance">The Lost Art of Mechanical Joinery</h2>
                <div className="w-12 h-[1px] bg-brushed-bronze"></div>
                <div className="space-y-6 text-chalk/80 text-lg leading-relaxed">
                  <p>
                    While modern fabrication relies heavily on electric arc welding, true traditional craftsmanship utilizes mechanical joinery. This isn't just about historical accuracy; it produces a visual texture and structural integrity that a grinder can never replicate.
                  </p>
                  <ul className="space-y-4 pt-4">
                    <li className="flex gap-4 items-start">
                      <div className="w-1.5 h-1.5 bg-brushed-bronze mt-2 rounded-full shrink-0"></div>
                      <p><strong>Hot Riveting:</strong> Fusing overlapping plates with steel rivets, heated to 2,000°F and hammered flat, creating a permanent, shrinking bind.</p>
                    </li>
                    <li className="flex gap-4 items-start">
                      <div className="w-1.5 h-1.5 bg-brushed-bronze mt-2 rounded-full shrink-0"></div>
                      <p><strong>Mortise and Tenon:</strong> Passing one solid bar of steel entirely through another, precisely punched and drifted while red-hot.</p>
                    </li>
                    <li className="flex gap-4 items-start">
                      <div className="w-1.5 h-1.5 bg-brushed-bronze mt-2 rounded-full shrink-0"></div>
                      <p><strong>Collaring:</strong> Forging custom steel bands wrapped tightly around intersecting balusters, favored in traditional French and Spanish ironwork.</p>
                    </li>
                  </ul>
                  <p className="mt-6 text-sm">
                    <Link to="/glossary" className="text-brushed-bronze hover:text-ember-orange transition-colors underline underline-offset-4">
                      Explore our full metalworking glossary &rarr;
                    </Link>
                  </p>
                </div>
             </div>
             <div className="order-1 lg:order-2 grid grid-cols-2 gap-4">
               <div className="aspect-square bg-anthracite border border-hammered-steel overflow-hidden group">
                  <img src={SITE_IMAGES.home.joineryRivet} alt="Traditional hot-riveted steel joinery on a custom barn build" width="600" height="600" loading="lazy" decoding="async" className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105" />
               </div>
               <div className="aspect-square bg-anthracite border border-hammered-steel overflow-hidden group mt-12">
                  <img src={SITE_IMAGES.home.joineryMortise} alt="Hand-forged mortise and tenon steel joinery on a custom range hood" width="600" height="600" loading="lazy" decoding="async" className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105" />
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* 6. Testimonials */}
      <section id="testimonials" className="py-32 bg-hammered-steel border-y border-brushed-bronze/10 text-center relative overflow-hidden" aria-label="Client testimonials">
        <div className="absolute inset-0 bg-noise mix-blend-overlay opacity-30" />
        <div className="max-w-4xl mx-auto px-6 relative z-10 h-[240px] flex flex-col justify-center" aria-live="polite" aria-atomic="true">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: activeQuote === i ? 1 : 0, y: activeQuote === i ? 0 : 20, pointerEvents: activeQuote === i ? 'auto' : 'none' }}
                transition={{ duration: 0.8 }}
                className="absolute inset-x-6 flex flex-col items-center"
              >
                <span className="sr-only">Testimonial:</span>
                <div className="text-brushed-bronze mb-6 opacity-50" aria-hidden="true" focusable="false">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
                </div>
                <blockquote className="text-2xl md:text-4xl font-display leading-tight mb-8">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <cite className="font-mono text-sm tracking-widest uppercase text-iron-grey not-italic">
                  &mdash; {t.author}
                </cite>
              </motion.div>
            ))}
        </div>
      </section>

      {/* NEW: Frequently Asked Questions (Home AEO) */}
      <section id="faq" className="py-24 bg-anthracite border-b border-hammered-steel px-6" aria-labelledby="faq-heading">
         <div className="max-w-3xl mx-auto space-y-12">
            <div className="text-center">
              <h2 id="faq-heading" className="text-3xl md:text-5xl font-display mb-4">Frequently Asked Questions</h2>
              <p className="text-iron-grey uppercase tracking-widest text-xs font-mono">Commissioning Custom Metalwork</p>
            </div>
            
            <div className="space-y-8">
              <div className="border-b border-hammered-steel pb-6">
                <h3 className="text-xl font-display text-chalk mb-3">Do you install outside of Traverse City?</h3>
                <p className="text-iron-grey leading-relaxed">Yes. While our primary footprint covers Leelanau, Grand Traverse, and Benzie counties, we frequently travel statewide across Michigan for major architectural installations, and coordinate crating and freight delivery for nationwide furniture commissions.</p>
              </div>
              <div className="border-b border-hammered-steel pb-6">
                <h3 className="text-xl font-display text-chalk mb-3">How long does a custom steel railing take to build?</h3>
                <p className="text-iron-grey leading-relaxed">A standard architectural railing commission typically spans 8 to 12 weeks from finalized design and 50% deposit to final installation. The exact timeline depends on current forge capacity and the complexity of the traditional joinery involved.</p>
              </div>
              <div className="border-b border-hammered-steel pb-6 border-b-transparent">
                <h3 className="text-xl font-display text-chalk mb-3">Will the raw steel rust if used outdoors?</h3>
                <p className="text-iron-grey leading-relaxed">Bare exposed steel will inevitably return to iron oxide (rust). For exterior applications, we utilize hot-dip galvanizing followed by specialized marine-grade patinas, or we recommend switching materials to architectural bronze or aluminum, ensuring longevity even in harsh Northern Michigan winters.</p>
              </div>
            </div>
         </div>
      </section>

      {/* 7. Local Hook & Closing CTA together */}
      <section id="local" className="relative" aria-label="Closing call to action">
        <div className="py-24 bg-forge-black relative border-b border-brushed-bronze/10">
          <div className="max-w-7xl mx-auto px-6 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-anthracite border border-brushed-bronze/30 flex items-center justify-center text-ember-orange mb-8">
              <MapPin size={24} />
            </div>
            <h2 className="text-3xl font-display mb-4">Forged in Northern Michigan</h2>
            <p className="text-iron-grey max-w-lg mb-8">
              Based in Traverse City, serving Grand Traverse, Leelanau, and the surrounding counties with heavy, hand-crafted metalwork designed for the harsh coastal winters.
            </p>
          </div>
        </div>
        
        <div className="relative py-32 overflow-hidden flex items-center justify-center text-center px-6">
          <div className="absolute inset-0 z-0">
             <img src={SITE_IMAGES.home.closingCta} alt="Custom hand-forged steel fireplace installation in Northern Michigan home" width="1920" height="1080" loading="lazy" decoding="async" className="w-full h-full object-cover grayscale opacity-20" />
             <div className="absolute inset-0 bg-gradient-to-t from-forge-black via-forge-black/80 to-forge-black" />
             <div className="absolute inset-0 bg-noise mix-blend-overlay opacity-30" />
          </div>
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-5xl md:text-7xl font-display tracking-tighter mb-8 text-balance">Ready to Build Something Real?</h2>
            <Link to="/contact" className="inline-flex items-center justify-center border border-brushed-bronze px-10 py-4 text-xs font-bold uppercase tracking-widest text-brushed-bronze transition-all hover:bg-brushed-bronze hover:text-forge-black shadow-[0_0_15px_rgba(140,107,58,0.2)] hover:shadow-[0_0_25px_rgba(140,107,58,0.4)]">
              Discuss Your Project
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
