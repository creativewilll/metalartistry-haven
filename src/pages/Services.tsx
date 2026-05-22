import { ArrowRight, CircleCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SiteHead } from '../components/layout/SiteHead';
import { QuickAnswer } from '../components/seo/QuickAnswer';
import { cn } from '../lib/utils';
import { CATEGORIES } from '../data/categories';
import { BUSINESS_INFO } from '../data/site-images';

const accentColors = [
  "#8c6b3a",
  "#e26a1f",
  "#6b6b6b",
  "#8c2a2a",
  "#f0f0f0",
  "#4a7c59",
  "#c9a959",
  "#5a6a7a",
];

const finishesMap = {
  steel: ["Mild Steel", "Stainless", "Blackened Steel", "Hot-Rolled"],
  finishes: ["Patina", "Powder Coat", "Raw Forged", "Oil Rubbed", "Clear Coat"],
  copperBronze: ["Bronze", "Copper"]
};

const hubFaqs = [
  {
    q: "What types of metalwork does Matt Coffey Design specialize in?",
    a: "Matt Coffey Design specializes in nine categories of custom architectural metalwork: Railings, Fences, and Gates; Custom Furniture; Commercial Installations; Art and Decor; Doors and Windows; Custom Projects; Outdoor Metal Decor; Kitchens and Bar Tops; and Behind the Scenes process work. All pieces are hand-forged in Traverse City, Northern Michigan using traditional blacksmithing techniques refined over 25 years."
  },
  {
    q: "What is the difference between residential and commercial metalwork?",
    a: "Residential metalwork prioritizes aesthetics and longevity for family homes, typically using refined finishes and detailed scrollwork. Commercial installations emphasize extreme durability for high-traffic spaces like restaurants and breweries, with heavier gauge materials, ADA compliance, and finishes rated for 10+ years of intensive use. Commercial work also includes more extensive documentation for permits and inspections."
  },
  {
    q: "How do I choose the right category for my project?",
    a: "Start with your project's primary function: Railings and Gates for safety barriers and entryways; Doors and Windows for fenestration; Custom Furniture for tables, seating, and storage; Commercial for business spaces; Outdoor Metal Decor for garden and exterior pieces; Kitchens and Bar Tops for culinary spaces; Art and Decor for pure sculpture; Custom Projects for unique problem-solving. Contact me for guidance if your project spans multiple categories."
  },
  {
    q: "Can a project span multiple categories?",
    a: "Absolutely. Many comprehensive projects include elements from multiple categories—a restaurant renovation might include Commercial bar structures, Custom Furniture seating, Art and Decor wall pieces, and Doors and Windows for the entry. I coordinate across all relevant categories to ensure cohesive design, material consistency, and unified installation scheduling."
  },
  {
    q: "What materials and finishes are available across all categories?",
    a: "Available materials include Mild Steel, Stainless Steel, Wrought Iron, Cor-Ten Weathering Steel, Bronze, and Copper. Finishes range from powder coating (durable, uniform, many color options) to traditional patinas (oil-rubbed, chemically-induced, living finishes that age beautifully) to clear coats (celebrating raw steel character) to blackened steel (sophisticated near-black surfaces). Material and finish selection depends on the application, environment, and aesthetic goals."
  }
];

export function Services() {
  const siteUrl = import.meta.env.VITE_SITE_URL || 'https://mattcoffeydesign.com';

  const offerCatalogSchema = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    "name": "Custom Metalwork Services by Matt Coffey Design",
    "description": "Nine categories of hand-forged architectural metalwork available from our Traverse City, Michigan forge.",
    "url": `${BUSINESS_INFO.url}/services`,
    "numberOfItems": CATEGORIES.length,
    "itemListElement": CATEGORIES.map((cat, i) => ({
      "@type": "OfferCatalog",
      "position": i + 1,
      "name": cat.displayName,
      "itemOffered": {
        "@type": "Service",
        "@id": `${BUSINESS_INFO.url}/services/${cat.slug}`,
        "name": cat.displayName,
        "description": cat.whatItIs.slice(0, 200),
        "url": `${siteUrl}/services/${cat.slug}`,
        "provider": {
          "@type": "LocalBusiness",
          "@id": `${BUSINESS_INFO.url}/#business`,
          "name": BUSINESS_INFO.name,
          "url": BUSINESS_INFO.url
        },
        "areaServed": [
          { "@type": "City", "name": "Traverse City" },
          { "@type": "State", "name": "Michigan" },
          { "@type": "AdministrativeArea", "name": "Grand Traverse County" },
          { "@type": "AdministrativeArea", "name": "Leelanau County" },
          { "@type": "AdministrativeArea", "name": "Benzie County" }
        ]
      }
    }))
  };

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Custom Metalwork Services | Matt Coffey Design",
    "description": "Explore nine categories of hand-forged architectural metalwork: railings, gates, furniture, commercial installations, doors, windows, kitchens, outdoor decor, art, and custom projects.",
    "url": `${siteUrl}/services`,
    "inLanguage": "en-US",
    "isPartOf": {
      "@type": "WebSite",
      "name": BUSINESS_INFO.name,
      "url": BUSINESS_INFO.url
    },
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": CATEGORIES.map((cat, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": cat.displayName,
        "description": cat.tagline,
        "url": `${siteUrl}/services/${cat.slug}`,
        "image": `${siteUrl}${cat.heroImage}`
      }))
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": hubFaqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": { "@type": "Answer", "text": faq.a }
    }))
  };

  return (
    <>
      <QuickAnswer
        id="quick-answer"
        text="Matt Coffey Design offers nine categories of custom hand-forged metalwork in Northern Michigan: Railings, Fences, and Gates; Custom Furniture; Commercial Installations; Art and Decor; Doors and Windows; Custom Projects; Outdoor Metal Decor; Kitchens and Bar Tops; and Behind the Scenes process documentation. Each category features extensive portfolios with pricing, materials, and typical use cases."
      />

      <SiteHead
        title="Custom Metalwork Services | Traverse City Blacksmith"
        description="Custom railings, gates, signage, doors, structural steel supports, and furniture forged in Traverse City, Northern Michigan. 25 years at the anvil."
        keywords={["custom railings Traverse City", "custom metal gates Michigan", "custom metal signage", "custom steel doors", "structural steel supports", "custom metal furniture", "commercial metalwork Northern Michigan"]}
        schema={[offerCatalogSchema, collectionSchema, faqSchema]}
      />

      <p className="sr-only">
        Matt Coffey Design offers nine categories of custom metalworking: Railings, Fences, and Gates; Custom Furniture; Commercial Installations; Art and Decor; Doors and Windows; Custom Projects; Outdoor Metal Decor; Kitchens and Bar Tops; and Behind the Scenes. All work is hand-forged in Traverse City, Northern Michigan using mild steel, bronze, copper, and traditional patinas.
      </p>

      {/* Hero Band */}
      <section id="hero" className="pt-32 pb-24 border-b border-brushed-bronze/20 bg-forge-black relative">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-display mb-6">Custom Metalwork Capabilities</h1>
          <p className="text-xl text-iron-grey max-w-2xl mx-auto leading-relaxed">
            Custom railings, gates, signage, doors, structural steel supports, and heirloom furniture forged in Traverse City. I buy raw stock, put it in the fire, and hit it with a hammer until it becomes what you need it to be.
          </p>
          <p className="text-lg text-iron-grey max-w-3xl mx-auto leading-relaxed mt-4" data-speakable="true">
            For 25 years at the anvil, I've specialized in nine distinct categories of architectural metalwork,
            each representing different functional needs, aesthetic vocabularies, and technical challenges.
            From the safety-critical precision of railings to the pure artistic expression of sculptural work,
            every piece emerges from the same forge in Traverse City, shaped by fire and hammer.
          </p>
        </div>
      </section>

      {/* Sticky TOC - desktop only */}
      <nav className="hidden lg:block sticky top-20 z-40 bg-forge-black/95 backdrop-blur-sm border-y border-brushed-bronze/10" aria-label="Service sections">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex items-center gap-1 overflow-x-auto">
            <span className="text-xs font-mono uppercase tracking-widest text-iron-grey mr-4 shrink-0">Jump to:</span>
            {CATEGORIES.map(cat => (
              <a
                key={cat.slug}
                href={`#service-${cat.slug}`}
                className="px-3 py-1.5 text-xs font-mono uppercase tracking-wide text-chalk hover:text-brushed-bronze hover:bg-anthracite rounded-sm transition-colors shrink-0"
              >
                {cat.displayName.split(' ')[0]}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Category Walls */}
      {CATEGORIES.map((category, index) => (
        <article
          key={category.slug}
          id={`service-${category.slug}`}
          aria-labelledby={`service-title-${category.slug}`}
          className={cn("py-24 md:py-32 relative", index % 2 === 0 ? "bg-anthracite" : "bg-forge-black")}
        >
          <div className="absolute inset-0 bg-noise mix-blend-overlay opacity-20 pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start relative z-10">

             {/* Left Col: Imagery & AEO */}
             <div className={cn("lg:col-span-6 space-y-12", index % 2 !== 0 && "lg:order-2")}>
                <div className="aspect-[4/3] border border-brushed-bronze/20 bg-forge-black relative overflow-hidden group">
                   <img
                     src={category.heroImage}
                     alt={`${category.displayName} showcase`}
                     width="800"
                     height="600"
                     loading={index < 2 ? "eager" : "lazy"}
                     decoding="async"
                     className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                   />
                   <div className="absolute inset-0 border border-brushed-bronze/10 pointer-events-none" />
                   {/* Price Range Badge */}
                   <div className="absolute top-4 right-4 px-3 py-1.5 bg-forge-black/80 backdrop-blur-sm border border-brushed-bronze/30 text-xs font-mono uppercase tracking-wider text-chalk">
                     {category.priceRange.split(';')[0]}
                   </div>
                </div>

                {/* AEO Block - Collapsible */}
                {category.faqs[0] && (
                  <details className="border-l-2 border-brushed-bronze pl-6 py-2 group">
                    <summary className="cursor-pointer font-mono text-sm uppercase tracking-widest text-chalk mb-2 hover:text-brushed-bronze transition-colors list-none flex items-center justify-between">
                      <span>{category.faqs[0].q}</span>
                      <ArrowRight size={14} className="rotate-90 group-open:rotate-[-90deg] transition-transform" />
                    </summary>
                    <p className="text-iron-grey leading-relaxed pt-2">{category.faqs[0].a}</p>
                  </details>
                )}
             </div>

             {/* Right Col: Content */}
             <div className={cn("lg:col-span-6", index % 2 !== 0 && "lg:order-1")}>
                <div className="flex items-center gap-4 mb-8">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: accentColors[index % accentColors.length] }}
                    aria-hidden="true"
                  />
                  <h2 id={`service-title-${category.slug}`} className="text-4xl md:text-5xl font-display text-balance">{category.displayName}</h2>
                </div>

                <div className="space-y-6 text-chalk/90 leading-relaxed mb-12">
                  {category.whatItIs.split('\n\n').slice(0, 2).map((p, i) => <p key={i}>{p}</p>)}
                </div>

                <div className="grid sm:grid-cols-2 gap-12 sm:gap-6 mb-12">
                  <div>
                    <h4 className="font-mono text-xs tracking-widest uppercase text-iron-grey mb-4">Materials & Finishes</h4>
                    <div className="flex flex-wrap gap-2">
                      {category.materials.map(mat => (
                        <span key={mat} className="px-3 py-1 border border-brushed-bronze/20 text-xs font-mono text-chalk/80 tracking-wide rounded-sm bg-forge-black">
                          {mat}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-mono text-xs tracking-widest uppercase text-iron-grey mb-4">Typical Use Cases</h4>
                    <ul className="space-y-3">
                      {category.useCases.slice(0, 4).map(uc => (
                        <li key={uc} className="flex items-start gap-3 text-sm text-chalk/80">
                           <CircleCheck size={16} className="text-brushed-bronze shrink-0 mt-0.5" />
                           {uc}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/contact" className="inline-flex items-center gap-2 group/link text-sm font-mono tracking-widest text-brushed-bronze hover:text-ember-orange uppercase transition-colors">
                    Discuss a {category.displayName.split(' ')[0]} Project <ArrowRight size={16} className="transition-transform group-hover/link:translate-x-1" />
                  </Link>
                  <Link to={`/services/${category.slug}`} className="inline-flex items-center gap-2 group/link text-sm font-mono tracking-widest text-iron-grey hover:text-chalk uppercase transition-colors">
                    See {category.displayName.split(' ')[0]} Portfolio <ArrowRight size={16} className="transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </div>
             </div>
          </div>
        </article>
      ))}

      {/* How to Choose Section */}
      <section id="choosing" className="py-24 bg-forge-black border-y border-brushed-bronze/10">
        <div className="max-w-4xl mx-auto px-6" data-speakable="true">
          <h2 className="text-3xl md:text-4xl font-display mb-8 text-center">
            How to Choose the Right Category for Your Project
          </h2>

          <div className="space-y-6 text-iron-grey leading-relaxed">
            <p>
              Selecting the appropriate category for your metalwork project requires understanding both
              <strong> function</strong> and <strong>context</strong>. Begin by asking what the piece must
              <em> do</em>: prevent falls (railings), control access (gates and doors), support activity
              (furniture), define space (art and decor), solve unique problems (custom projects), or enhance
              culinary environments (kitchens and bar tops).
            </p>

            <p>
              Next, consider <strong>environmental exposure</strong>. Outdoor installations in Northern Michigan
              face lake-effect snow, freeze-thaw cycles, and intense summer sun. These conditions demand specific
              materials—Cor-Ten weathering steel, stainless steel, or heavily powder-coated mild steel—and finishes
              engineered for longevity. Indoor pieces offer more flexibility in material selection, allowing
              warmer tones from bronze and copper or raw industrial aesthetics from hot-rolled steel.
            </p>

            <p>
              <strong>Scale and integration</strong> requirements often determine category selection. A residential
              railing for a spiral staircase involves different engineering than a commercial bar structure serving
              hundreds of customers nightly. Similarly, a custom range hood must integrate with ventilation systems,
              while a sculpture requires only aesthetic consideration and proper anchoring.
            </p>

            <p>
              Finally, consider <strong>budget parameters</strong> relative to project scope. Railings and gates
              typically represent larger investments ($4,000–$25,000+) due to material volume and structural
              requirements. Accent pieces and art start more modestly ($800–$5,000) while still delivering
              significant visual impact. Commercial installations require the largest budgets ($15,000–$100,000+)
              reflecting both scale and durability demands.
            </p>

            <p>
              If your vision spans multiple categories—a restaurant requiring railings, furniture, and signage
              simultaneously—contact me directly. I coordinate comprehensive projects across all relevant categories,
              ensuring cohesive design language, consistent material finishes, and unified installation scheduling.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 bg-anthracite relative">
        <div className="absolute inset-0 bg-noise mix-blend-overlay opacity-20 pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <h2 className="text-3xl md:text-4xl font-display mb-12">Frequently Asked Questions</h2>

          <div className="space-y-6">
            {hubFaqs.map((faq, index) => (
              <details key={index} className="group border-l-2 border-brushed-bronze pl-6 py-2 bg-forge-black/50">
                <summary className="cursor-pointer font-medium text-chalk hover:text-brushed-bronze transition-colors list-none flex items-center justify-between">
                  <span>{faq.q}</span>
                  <ArrowRight size={16} className="rotate-90 group-open:rotate-[-90deg] transition-transform" />
                </summary>
                <p className="text-iron-grey leading-relaxed pt-4">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Materials & Finishes Band */}
      <section className="py-16 bg-anthracite border-y border-hammered-steel" aria-labelledby="materials-band-heading">
        <div className="max-w-7xl mx-auto px-6">
          <h2 id="materials-band-heading" className="text-sm font-mono uppercase tracking-widest text-iron-grey mb-8 text-center">Materials Available Across All Services</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {Array.from(new Set([...finishesMap.steel, ...finishesMap.finishes, ...finishesMap.copperBronze])).map(mat => (
              <span
                key={mat}
                className="px-4 py-2 bg-forge-black border border-brushed-bronze/20 text-xs font-mono text-chalk hover:border-brushed-bronze hover:text-brushed-bronze transition-colors rounded-sm"
              >
                {mat}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA Band */}
      <section id="closing" className="py-24 bg-hammered-steel border-y border-brushed-bronze/20 relative overflow-hidden text-center" aria-label="Start a custom commission">
         <div className="absolute inset-0 bg-noise mix-blend-overlay opacity-30" />
         <div className="relative z-10 max-w-2xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-display mb-6 text-balance">Don't see what you're imagining?</h2>
            <p className="text-iron-grey mb-10">I build one-of-a-kind. Bring your sketches, dimensions, and wild ideas for railings, gates, signage, doors, supports, or furniture.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/discover" className="inline-flex h-14 items-center justify-center rounded-sm border border-brushed-bronze px-8 text-base font-medium text-chalk transition-all hover:bg-brushed-bronze hover:text-forge-black">
                Browse All Work
              </Link>
              <Link to="/contact" className="inline-flex h-14 items-center justify-center rounded-sm bg-brushed-bronze px-8 text-base font-medium text-forge-black transition-all hover:bg-ember-orange hover:shadow-[0_4px_24px_-4px_rgba(226,106,31,0.5)]">
                Contact the Forge
              </Link>
            </div>
         </div>
      </section>
    </>
  );
}
