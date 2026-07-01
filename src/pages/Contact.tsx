import { motion } from 'motion/react';
import { Mail, Phone, MapPin, ChevronDown, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SiteHead } from '../components/layout/SiteHead';
import { QuickAnswer } from '../components/seo/QuickAnswer';
import { BUSINESS_INFO } from '../data/site-images';
import { galleryItems } from '../data/gallery-items';
import { usePhoneActions } from '../components/contact';

const faqs = [
  {
    q: "What is your typical lead time?",
    a: "My queue is typically booked 3 to 6 months in advance. For large builds like grand entry gates or full commercial restaurant build-outs, I recommend contacting me early in the architectural drafting phase so structural requirements can be coordinated."
  },
  /* HIDDEN (pricing/deposit terms unverified by owner) — restore when confirmed:
  {
    q: "How much is the deposit?",
    a: "Once a design is finalized and a fixed quote is provided, I require a 50% non-refundable deposit to secure your place in the queue and order raw materials. The remaining 50% is due upon completion or installation."
  },
  */
  {
    q: "Do you install or just deliver?",
    a: "For local projects in Northern Michigan, I typically handle installation myself or supervise a trusted crew. For furniture and smaller pieces, I offer custom crating and freight shipping nationwide. For large architectural installations outside my service area, we coordinate with local contractors."
  },
  {
    q: "Do you offer a warranty?",
    a: "All work carries a 1-year structural warranty covering fabrication defects and installation issues. Finish warranties vary by material—powder coat finishes carry manufacturer warranties, while living finishes like blackened steel evolve naturally over time and are not covered under warranty."
  },
  {
    q: "What finishes do you offer?",
    a: "I offer hot-rolled patina with clear coat, blackened steel, powder coat in any RAL color, bare steel with lacquer, and copper or bronze with various patinas. Each finish has specific care requirements and aesthetic characteristics we'll discuss during design."
  },
  {
    q: "Do you handle permitting?",
    a: "For structural work like railings and stairs, I provide engineered drawings stamped by a licensed PE that meet ICC and local code requirements. You or your contractor submit for permits. I do not pull permits directly but coordinate closely with your build team."
  },
  {
    q: "Can you provide engineer letters?",
    a: "Yes. All structural work includes PE-stamped drawings suitable for permit submission. For commercial projects requiring full engineer-of-record services, I coordinate with licensed structural engineers familiar with ornamental metal and architectural ironwork."
  },
  {
    q: "What payment methods do you accept?",
    a: "I accept checks, wire transfers, and ACH bank transfers. For deposits over $10,000, I can also accept credit cards with a processing fee. Payment schedules are outlined in every contract, with final payment due before delivery or at installation completion."
  }
];

// Recent commissions for the bottom strip
const recentCommissions = [
  galleryItems.find(item => item.title === 'Bonobo Winery Transformation!'),
  galleryItems.find(item => item.title === 'Custom Bear Gate, Hand-Forged from Steel'),
  galleryItems.find(item => item.title === 'Industrial Steel & Wood Table'),
].filter(Boolean);

export function Contact() {
  const { openPhoneActions } = usePhoneActions();

  return (
    <>
      <QuickAnswer text="Contact Matt Coffey Design to start a custom metalwork commission. Call (231) 645-0622 or email info@mattcoffeydesign.com. The studio is located in Traverse City, Michigan and serves all of Northern Michigan by appointment." />

      <SiteHead 
        title="Contact the Forge"
        description="Start a custom metalwork commission. Contact Matt Coffey Design in Traverse City, Michigan."
        schema={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "ContactPage",
              "name": "Contact Matt Coffey Design",
              "description": "Start a custom metalwork commission. Contact Matt Coffey Design in Traverse City, Michigan.",
              "url": `${BUSINESS_INFO.url}/contact`,
              "mainEntity": {
                "@type": "LocalBusiness",
                "@id": `${BUSINESS_INFO.url}/#business`,
                "name": BUSINESS_INFO.name,
                "contactPoint": {
                  "@type": "ContactPoint",
                  "telephone": BUSINESS_INFO.phone,
                  "email": BUSINESS_INFO.email,
                  "contactType": "customer service",
                  "availableLanguage": "English",
                  "hoursAvailable": {
                    "@type": "OpeningHoursSpecification",
                    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                    "opens": "09:00",
                    "closes": "17:00"
                  }
                }
              },
              "potentialAction": {
                "@type": "CommunicateAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": `${BUSINESS_INFO.url}/contact`,
                  "actionPlatform": ["http://schema.org/DesktopWebPlatform", "http://schema.org/MobileWebPlatform"]
                },
                "name": "Start a Commission"
              }
            },
            {
              "@type": "FAQPage",
              "mainEntity": faqs.map(faq => ({
                "@type": "Question",
                "name": faq.q,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": faq.a
                }
              }))
            },
            {
              "@type": "LocalBusiness",
              "@id": `${BUSINESS_INFO.url}/#business`,
              "name": BUSINESS_INFO.name,
              "description": BUSINESS_INFO.description,
              "url": BUSINESS_INFO.url,
              "email": BUSINESS_INFO.email,
              "telephone": BUSINESS_INFO.phone,
              "areaServed": {
                "@type": "State",
                "name": "Michigan"
              },
              "hasMap": "https://www.openstreetmap.org/#map=13/44.7629/-85.6204",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": BUSINESS_INFO.location.city,
                "addressRegion": BUSINESS_INFO.location.state,
                "addressCountry": BUSINESS_INFO.location.country
              }
            }
          ]
        }}
      />

      {/* Split Form Header */}
      <section className="bg-forge-black relative border-b border-brushed-bronze/20 overflow-hidden pt-24 pb-16 lg:py-32">
         {/* Hero Background Image */}
         <div className="absolute inset-0">
           <img 
             src="/gallery-images/MattCoffeyHero.jpeg" 
             alt="" 
             className="w-full h-full object-cover opacity-20" 
             aria-hidden="true"
           />
           <div className="absolute inset-0 bg-gradient-to-b from-forge-black/80 via-forge-black/70 to-forge-black" />
         </div>
         <div className="absolute inset-0 bg-noise mix-blend-overlay opacity-20 pointer-events-none" />
         <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 relative z-10">
            
            {/* Left: Communication Guide */}
            <div className="space-y-12">
               <div>
                  <h1 className="text-5xl md:text-6xl font-display mb-8">Start a Commission.</h1>
                  <p className="text-lg text-iron-grey leading-relaxed">
                    If you have an idea that requires fire and a hammer, I want to hear about it.
                  </p>
                  <p className="text-lg text-iron-grey leading-relaxed mt-4">
                    Send me the details of what you're imagining. I am typically in the shop with the machinery running during the day, so email or a phone call is the best way to initiate a project. I review inquiries every evening and will respond within 48 hours.
                  </p>
               </div>

               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Tags */}
                  <a 
                    href={`mailto:${BUSINESS_INFO.email}`}
                    className="p-4 border border-brushed-bronze/20 bg-anthracite rounded-sm hover:border-brushed-bronze/40 transition-colors"
                  >
                     <div className="flex items-center gap-3 text-chalk mb-2">
                       <Mail size={18} className="text-brushed-bronze" />
                       <span className="font-mono text-sm tracking-widest uppercase">Email</span>
                     </div>
                     <p className="text-sm text-iron-grey mb-2">{BUSINESS_INFO.email}</p>
                     <p className="text-xs text-iron-grey/60 font-mono">Best for: Project inquiries, sketches, dimension sharing.</p>
                  </a>

                  <button
                    onClick={openPhoneActions}
                    className="p-4 border border-brushed-bronze/20 bg-anthracite rounded-sm hover:border-brushed-bronze/40 transition-colors text-left w-full focus:outline-none focus:ring-2 focus:ring-brushed-bronze"
                  >
                     <div className="flex items-center gap-3 text-chalk mb-2">
                       <Phone size={18} className="text-brushed-bronze" />
                       <span className="font-mono text-sm tracking-widest uppercase">Phone</span>
                     </div>
                     <p className="text-sm text-iron-grey mb-2">{BUSINESS_INFO.phoneDisplay}</p>
                     <p className="text-xs text-iron-grey/60 font-mono">Best for: Time-sensitive active builds, site logistics.</p>
                  </button>
               </div>
            </div>

            {/* Right: Direct Contact Panel */}
            <div className="bg-chalk p-8 md:p-10 rounded-sm relative text-forge-black shadow-xl">
               <div className="absolute top-0 inset-x-0 h-2 bg-brushed-bronze rounded-t-sm" />
               <div className="mb-8 border-b border-forge-black/10 pb-6 flex justify-between items-end">
                 <h2 className="text-2xl font-display font-bold">Start the Conversation</h2>
                 <span className="font-mono text-xs uppercase tracking-widest text-iron-grey">Est. 1999</span>
               </div>

               <p className="text-sm text-iron-grey leading-relaxed mb-8">
                 The fastest way to reach me is directly. Email your project details, rough
                 dimensions, and any inspiration images, or call the shop. I read every
                 message personally and respond within 48 hours.
               </p>

               <div className="space-y-4">
                  <a
                    href={`mailto:${BUSINESS_INFO.email}`}
                    className="flex items-center justify-between gap-4 p-5 bg-forge-black text-chalk rounded-sm hover:bg-brushed-bronze hover:text-forge-black transition-colors group focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brushed-bronze"
                  >
                     <span className="flex items-center gap-4">
                       <Mail size={22} className="shrink-0" />
                       <span className="flex flex-col text-left">
                         <span className="font-mono text-[10px] uppercase tracking-widest opacity-70">Email the Forge</span>
                         <span className="font-mono text-sm tracking-wide break-all">{BUSINESS_INFO.email}</span>
                       </span>
                     </span>
                     <ArrowRight size={18} className="shrink-0 transition-transform group-hover:translate-x-1" />
                  </a>

                  <button
                    onClick={openPhoneActions}
                    className="w-full flex items-center justify-between gap-4 p-5 border border-forge-black/20 rounded-sm hover:border-brushed-bronze hover:bg-brushed-bronze/10 transition-colors group text-left focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brushed-bronze"
                  >
                     <span className="flex items-center gap-4">
                       <Phone size={22} className="shrink-0 text-brushed-bronze" />
                       <span className="flex flex-col">
                         <span className="font-mono text-[10px] uppercase tracking-widest text-iron-grey">Call or Text</span>
                         <span className="font-mono text-sm tracking-wide">{BUSINESS_INFO.phoneDisplay}</span>
                       </span>
                     </span>
                     <ArrowRight size={18} className="shrink-0 text-iron-grey transition-transform group-hover:translate-x-1" />
                  </button>
               </div>

               <p className="mt-8 pt-6 border-t border-forge-black/10 text-xs font-mono uppercase tracking-widest text-iron-grey text-center">
                 By appointment only · Traverse City, MI
               </p>
            </div>
         </div>
      </section>

      {/* Service Area Map */}
      <section className="bg-anthracite py-24 relative overflow-hidden border-b border-brushed-bronze/10">
         <div className="absolute inset-0 z-0">
            {/* TODO: atmospheric shot of forge fire or sparks filling background */}
            <img src="/images/placeholders/contact-service-area.jpg" alt="Atmospheric forge fire" loading="lazy" className="w-full h-full object-cover opacity-10 mix-blend-screen" />
         </div>
         <div className="max-w-5xl mx-auto px-6 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            
            <div>
               <div className="flex items-center gap-3 text-brushed-bronze mb-6">
                  <MapPin size={24} />
                  <span className="font-mono text-sm uppercase tracking-widest">Base of Operations</span>
               </div>
               <h2 className="text-4xl font-display mb-6">Traverse City, Michigan.</h2>
               <p className="text-iron-grey leading-relaxed mb-8">
                 The forge is situated just outside of town. I actively service architectural projects throughout the immediate surrounding counties, while smaller pieces and fine art ship nationwide.
               </p>
               <ul className="space-y-2 font-mono text-xs tracking-widest uppercase text-chalk/80">
                 <li className="flex items-center gap-3 before:content-[''] before:block before:w-1 before:h-1 before:bg-brushed-bronze before:rounded-full">Grand Traverse County</li>
                 <li className="flex items-center gap-3 before:content-[''] before:block before:w-1 before:h-1 before:bg-brushed-bronze before:rounded-full">Leelanau County</li>
                 <li className="flex items-center gap-3 before:content-[''] before:block before:w-1 before:h-1 before:bg-brushed-bronze before:rounded-full">Antrim & Benzie Counties</li>
                 <li className="flex items-center gap-3 before:content-[''] before:block before:w-1 before:h-1 before:bg-brushed-bronze before:rounded-full">Nationwide Freight (Art & Furniture)</li>
               </ul>
            </div>
            
            {/* OpenStreetMap Embed */}
            <div className="relative aspect-square bg-forge-black/50 border border-brushed-bronze/20 rounded-lg overflow-hidden">
               <iframe
                 title="Matt Coffey Design Location - Traverse City, Michigan"
                 src="https://www.openstreetmap.org/export/embed.html?bbox=-85.8204%2C44.6629%2C-85.4204%2C44.8629&layer=mapnik&marker=44.7629%2C-85.6204"
                 className="w-full h-full border-0"
                 loading="lazy"
                 aria-label="Map showing Matt Coffey Design location in Traverse City, Michigan"
               />
               <div className="absolute bottom-4 left-4 right-4">
                 <a 
                   href="https://www.openstreetmap.org/?mlat=44.7629&mlon=-85.6204#map=13/44.7629/-85.6204"
                   target="_blank"
                   rel="noopener noreferrer"
                   className="inline-flex items-center gap-2 px-3 py-2 bg-forge-black/90 text-chalk text-xs font-mono uppercase tracking-widest rounded-sm border border-brushed-bronze/30 hover:bg-forge-black transition-colors"
                 >
                   <MapPin size={14} className="text-brushed-bronze" />
                   View Larger Map
                 </a>
               </div>
            </div>

         </div>
      </section>

      {/* FAQ Accordion */}
      <section className="bg-forge-black py-24 md:py-32">
         <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-3xl md:text-5xl font-display mb-12 text-center">Frequently Asked Questions</h2>
            
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <details key={i} className="group bg-anthracite border border-brushed-bronze/20 rounded-sm">
                   <summary className="flex justify-between items-center font-sans font-medium cursor-pointer list-none p-6 text-chalk/90 hover:text-white-hot transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brushed-bronze rounded-sm">
                      <span className="pr-6">{faq.q}</span>
                      <span className="transition group-open:rotate-180 shrink-0 text-brushed-bronze">
                         <ChevronDown size={20} />
                      </span>
                   </summary>
                   <p className="text-iron-grey px-6 pb-6 pt-2 leading-relaxed text-sm">
                      {faq.a}
                   </p>
                </details>
              ))}
            </div>
         </div>
      </section>

      {/* Recent Commissions Strip */}
      <section className="bg-anthracite py-16 md:py-24 border-t border-brushed-bronze/20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-display">Recent Commissions</h2>
            <Link 
              to="/discover" 
              className="text-sm font-mono uppercase tracking-widest text-brushed-bronze hover:text-white-hot transition-colors"
            >
              View All Work &rarr;
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentCommissions.map((item) => item && (
              <Link 
                key={item.id} 
                to="/discover"
                className="group relative aspect-[4/3] overflow-hidden rounded-sm bg-forge-black"
              >
                <img 
                  src={item.images[0].url} 
                  alt={item.images[0].alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forge-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-xs font-mono uppercase tracking-widest text-brushed-bronze mb-1">
                    {item.category}
                  </p>
                  <h3 className="text-lg font-display text-chalk group-hover:text-white-hot transition-colors">
                    {item.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
