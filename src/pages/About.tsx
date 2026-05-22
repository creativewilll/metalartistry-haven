import { ArrowRight, MapPin, ChevronLeft, ChevronRight, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SiteHead } from '../components/layout/SiteHead';
import { QuickAnswer } from '../components/seo/QuickAnswer';
import { SITE_IMAGES, BUSINESS_INFO } from '../data/site-images';
import { useRef } from 'react';
import { usePhoneActions } from '../components/contact';

const tools = [
  { name: "The Forge", desc: "A gas-fired furnace capable of reaching 2,500°F. The beating heart of the shop where rigid steel becomes plastic.", image: "/gallery-images/customsheetpatternprocess1.jpeg" },
  { name: "Power Hammer", desc: "A 100lb mechanical hammer used to draw out tapers and move massive amounts of material quickly before the heat is lost.", image: "/gallery-images/IndoorBarnBuildPROCESS1.jpeg" },
  { name: "TIG Welder", desc: "For surgical precision. When structural integrity demands a weld that looks as clean as the parent material.", image: "/gallery-images/CustomSteelFireplace1-5-PROCESS.jpeg" },
  { name: "Plasma Cutter", desc: "Slices through inch-thick steel plate like drawing with a pen, allowing for complex plate geometry.", image: "/gallery-images/CustomMetalWallPanels-SleepingBearProcess1.jpg" },
  { name: "The Anvil", desc: "A 300lb block of hardened steel. Every piece I make crosses this face. It is where the nuanced shaping happens.", image: "/gallery-images/workshop1-2.jpeg" },
  { name: "English Wheel", desc: "A traditional metalworking tool used to form smooth, compound curves from flat sheet metal without heat.", image: "/gallery-images/CustomStovehood-PROCESS1.jpeg" }
];

const clients = [
  "Bonobo Winery",
  "Silver Spruce Brewing",
  "Riverwalk Grill",
  "Union Cantina",
  "Villa Mari",
  "Gypsy Farms",
  "High-Five Spirits"
];

export function About() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { openPhoneActions } = usePhoneActions();

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <QuickAnswer text="Matt Coffey is a master blacksmith based in Traverse City, Michigan with over 25 years of experience and 1,500+ completed commissions. He specializes in custom architectural metalwork — hand-forged railings, gates, furniture, and structural steel — using traditional forge techniques passed down through centuries of craft tradition." />

      <SiteHead 
        title="About Matt Coffey"
        description="25 years at the anvil. Learn about Master Blacksmith Matt Coffey, his philosophy, and his Northern Michigan forge."
        schema={{
          "@context": "https://schema.org",
          "@type": "Person",
          "@id": `${BUSINESS_INFO.url}/about#matt-coffey`,
          "name": "Matt Coffey",
          "jobTitle": "Master Blacksmith",
          "description": "Master metalworker with 25+ years of experience specializing in custom architectural ironwork, hand-forged furniture, and structural steel in Traverse City, Michigan.",
          "image": `${BUSINESS_INFO.url}${SITE_IMAGES.about.heroPortrait}`,
          "url": `${BUSINESS_INFO.url}/about`,
          "worksFor": {
            "@type": "Organization",
            "@id": `${BUSINESS_INFO.url}/#business`,
            "name": "Matt Coffey Design",
            "url": BUSINESS_INFO.url
          },
          "hasOccupation": {
            "@type": "Occupation",
            "name": "Blacksmith",
            "occupationLocation": {
              "@type": "City",
              "name": "Traverse City",
              "containedInPlace": { "@type": "State", "name": "Michigan" }
            },
            "sameAs": "https://www.wikidata.org/wiki/Q183319"
          },
          "homeLocation": {
            "@type": "Place",
            "name": "Traverse City, Michigan",
            "geo": { "@type": "GeoCoordinates", "latitude": "44.7631", "longitude": "-85.6206" }
          },
          "memberOf": [
            { "@type": "Organization", "name": "Artist Blacksmith's Association of North America (ABANA)", "url": "https://abana.org" },
            { "@type": "Organization", "name": "Michigan Artist Blacksmith Association" }
          ],
          "award": ["AWS Certified Welder (GTAW, SMAW)", "ABANA Member"],
          "nationality": "American",
          "knowsAbout": [
            "Blacksmithing", "Custom Metal Fabrication", "Architectural Ironwork",
            "Bronze Forging", "TIG Welding", "Structural Steel", "Patina Finishes",
            "Traditional Joinery", "Hot Riveting", "Forge Welding"
          ],
          "sameAs": [
            "https://instagram.com/mattcoffeydesign",
            "https://facebook.com/mattcoffeydesign",
            "https://en.wikipedia.org/wiki/Blacksmith"
          ]
        }}
      />
      
      {/* AIO Summary - 3 short sentences */}
      <p className="sr-only">
        Matt Coffey is a master blacksmith with 25 years of experience. He crafts custom architectural metalwork, furniture, and fine art in Traverse City, Michigan. His work combines traditional forging with modern fabrication techniques.
      </p>

      {/* Hero */}
      <section className="bg-forge-black relative border-b border-brushed-bronze/20 overflow-hidden">
        <div className="absolute inset-0 bg-noise mix-blend-overlay opacity-20 pointer-events-none" />
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 relative z-10">
          <div className="px-6 py-24 md:py-32 flex flex-col justify-center order-2 lg:order-1">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display leading-[1.1] mb-8">
              <span className="sr-only">About Matt Coffey — Master Blacksmith in Traverse City, Michigan. </span>
              <span className="block text-iron-grey text-2xl md:text-3xl font-serif italic mb-4" aria-hidden="true">25 years at the anvil.</span>
              1,500 pieces<br/>in the world.
            </h1>
            <div className="w-16 h-px bg-brushed-bronze mb-8" />
            <p className="text-xl text-iron-grey max-w-lg leading-relaxed">
              I am a blacksmith. I don't punch clocks, I don't assemble flat-pack furniture, and I don't use templates. I heat metal and hit it until it is finished.
            </p>
          </div>
          <div className="relative min-h-[50vh] lg:min-h-full order-1 lg:order-2 border-l border-brushed-bronze/20">
            <img 
              src={SITE_IMAGES.about.heroPortrait} 
              alt="Portrait of Matt Coffey in the forge" 
              loading="eager" 
              decoding="async"
              fetchPriority="high" 
              className="absolute inset-0 w-full h-full object-cover grayscale opacity-90" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forge-black lg:bg-gradient-to-l lg:from-transparent lg:to-forge-black to-transparent" />
          </div>
        </div>
      </section>

      {/* Long-form Bio */}
      <section className="py-24 md:py-32 bg-anthracite relative">
        <div className="max-w-[65ch] mx-auto px-6 space-y-24">
          
          <article className="prose prose-invert prose-lg max-w-none">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="flex-1">
                <h2 className="text-3xl font-display text-brushed-bronze mb-6 font-normal">Beginnings</h2>
                <p className="text-iron-grey leading-relaxed">
                  <span className="float-left text-6xl leading-[0.8] mt-2 mr-3 font-display text-chalk">I</span>
                  started sweeping the floors of a fabrication shop in Detroit when I was nineteen. There was a rhythm to the place that I couldn't ignore—the harsh mechanical crack of the shear, the hiss of the welding gas, the smell of ozone and burning grinding dust. It was sensory overload, but it made sense. Everything was measurable, heavy, and permanent.
                </p>
                <p className="text-iron-grey leading-relaxed mt-6">
                  I moved from the broom to the grinder, and eventually to the torch. I learned how to join steel, how to read blueprints, and how to carry heavy loads without complaining. But fabrication wasn't enough. I didn't just want to assemble steel; I wanted to change its shape.
                </p>
              </div>
              <img 
                src={SITE_IMAGES.about.beginnings} 
                alt="Matt working in the early days" 
                loading="lazy"
                decoding="async"
                className="w-32 h-40 md:w-40 md:h-52 object-cover rounded-sm border border-brushed-bronze/20 shrink-0 md:float-right" 
              />
            </div>
          </article>

          {/* Inline Photo */}
          <div className="w-[120%] -ml-[10%] aspect-[2/1] bg-forge-black border border-brushed-bronze/20 p-2 relative my-16">
            <img 
              src={SITE_IMAGES.about.hands} 
              alt="Hands holding tongs in forge fire" 
              loading="lazy" 
              decoding="async"
              className="w-full h-full object-cover grayscale opacity-80" 
            />
          </div>

          <article className="prose prose-invert prose-lg max-w-none relative">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="flex-1">
                <span className="absolute -left-12 top-2 text-brushed-bronze/20 font-serif text-6xl">"</span>
                <h2 className="text-3xl font-display text-brushed-bronze mb-6 font-normal">Apprenticeship</h2>
                <p className="text-iron-grey leading-relaxed">
                  I left Detroit to find a master blacksmith in the Pacific Northwest who was still using coal and a trip hammer. I traded labor for lessons. Blacksmithing is not a romantic pursuit as it is often portrayed on television. It is loud, dirty, and physically exhausting. 
                </p>
                <p className="text-iron-grey leading-relaxed mt-6">
                  You learn quickly that the fire does not care about your schedule. If you leave the steel in too long, it burns and crumbles. If you hit it when it's too cold, it shatters or damages your elbow. You must work exactly when the material dictates. This discipline formed the foundation of everything I do today.
                </p>
              </div>
              <img 
                src={SITE_IMAGES.about.apprenticeship} 
                alt="Traditional blacksmithing techniques" 
                loading="lazy"
                decoding="async"
                className="w-32 h-40 md:w-40 md:h-52 object-cover rounded-sm border border-brushed-bronze/20 shrink-0 md:float-right" 
              />
            </div>
          </article>

          <article className="prose prose-invert prose-lg max-w-none">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="flex-1">
                <h2 className="text-3xl font-display text-brushed-bronze mb-6 font-normal">Philosophy</h2>
                <p className="text-iron-grey leading-relaxed">
                  My approach is architectural honesty. I do not grind my welds flush and then use body filler to make them look like plastic. If a joint is riveted, you will see the rivet. If a bar is hammered, you will feel the texture. 
                </p>
                <p className="text-iron-grey leading-relaxed mt-6">
                  I build things that are meant to be touched. A handrail should feel secure, a chair should sit with absolute stability. In a world full of disposable, flat-pack goods, I find purpose in creating heirlooms that will outlast me.
                </p>
              </div>
              <img 
                src={SITE_IMAGES.about.philosophy} 
                alt="Detail of finished metalwork" 
                loading="lazy"
                decoding="async"
                className="w-32 h-40 md:w-40 md:h-52 object-cover rounded-sm border border-brushed-bronze/20 shrink-0 md:float-right" 
              />
            </div>

            {/* Extended Philosophy - Expandable */}
            <details className="mt-8 border-t border-brushed-bronze/20 pt-6">
              <summary className="text-brushed-bronze font-mono text-sm uppercase tracking-widest cursor-pointer hover:text-chalk transition-colors">
                Read Extended Philosophy
              </summary>
              <div className="mt-6 space-y-4 text-iron-grey">
                <p>
                  Over two decades, I've developed a deep respect for the materials I work with. Steel is not merely a commodity—it has memory, character, and potential. When heated properly and worked with intention, it becomes something greater than its original form.
                </p>
                <p>
                  Every commission I accept is a collaboration. I listen to what my clients need, study the space where the piece will live, and consider how it will be used for generations. A railing isn't just safety infrastructure; it's the hand-guide for countless mornings and evenings. A gate isn't merely an entry point; it's the first welcome and the final goodbye.
                </p>
                <p>
                  This philosophy extends to every aspect of my practice. I source materials carefully, work efficiently to minimize waste, and take the time needed to ensure every detail meets my standards. In an age of mass production, I remain committed to the slow, deliberate craft of hand-forged metalwork.
                </p>
              </div>
            </details>
          </article>

          {/* Inline Photo */}
          <div className="w-[120%] -ml-[10%] aspect-[2/1] bg-forge-black border border-brushed-bronze/20 p-2 relative my-16">
            <img 
              src={SITE_IMAGES.about.hammer} 
              alt="Hammer resting on an anvil" 
              loading="lazy" 
              decoding="async"
              className="w-full h-full object-cover grayscale opacity-80" 
            />
          </div>

          <article className="prose prose-invert prose-lg max-w-none">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="flex-1">
                <h2 className="text-3xl font-display text-brushed-bronze mb-6 font-normal">Why Northern Michigan</h2>
                <p className="text-iron-grey leading-relaxed">
                  After years of traveling, I brought my anvil to Traverse City. The environment here—the harsh winters, the deep lakes, the heavy forests—requires structures that are sturdy. It is a landscape that respects craftsmanship and demands durability.
                </p>
                <p className="text-iron-grey leading-relaxed mt-6">
                  The shop is located just outside the city. It is loud, it is hot, and it is exactly where I am meant to be. I serve clients throughout Northern Michigan, from <Link to="/services" className="text-brushed-bronze hover:text-chalk underline">custom residential railings</Link> to <Link to="/discover" className="text-brushed-bronze hover:text-chalk underline">commercial installations</Link> across the region.
                </p>
              </div>
              <img 
                src={SITE_IMAGES.about.northernMichigan} 
                alt="Northern Michigan landscape work" 
                loading="lazy"
                decoding="async"
                className="w-32 h-40 md:w-40 md:h-52 object-cover rounded-sm border border-brushed-bronze/20 shrink-0 md:float-right" 
              />
            </div>
          </article>

        </div>
      </section>

      {/* Selected Clients Marquee */}
      <section className="py-8 border-y border-brushed-bronze/10 bg-forge-black overflow-hidden">
        <div className="relative">
          <div className="flex gap-12 animate-marquee whitespace-nowrap">
            {[...clients, ...clients, ...clients].map((client, i) => (
              <span key={i} className="text-iron-grey/60 font-mono text-sm uppercase tracking-widest">
                {client}
              </span>
            ))}
          </div>
        </div>
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-33.33%); }
          }
          .animate-marquee {
            animation: marquee 30s linear infinite;
          }
        `}</style>
      </section>

      {/* Tools of the Trade */}
      <section 
        className="py-24 border-y border-brushed-bronze/20 bg-hammered-steel overflow-hidden"
        role="region"
        aria-label="Tools of the Trade"
        tabIndex={0}
      >
        <div className="max-w-7xl mx-auto px-6 mb-12 flex items-center justify-between">
           <h2 className="text-3xl font-display">Tools of the Trade</h2>
           <div className="flex gap-2">
             <button 
               onClick={() => scroll('left')}
               className="p-2 rounded-sm border border-brushed-bronze/20 hover:bg-brushed-bronze/10 transition-colors"
               aria-label="Scroll tools left"
             >
               <ChevronLeft className="w-5 h-5 text-chalk" />
             </button>
             <button 
               onClick={() => scroll('right')}
               className="p-2 rounded-sm border border-brushed-bronze/20 hover:bg-brushed-bronze/10 transition-colors"
               aria-label="Scroll tools right"
             >
               <ChevronRight className="w-5 h-5 text-chalk" />
             </button>
           </div>
        </div>
        
        {/* Horizontal Scroll Container */}
        <div 
          ref={scrollRef}
          className="select-none flex gap-6 px-6 overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar"
        >
           {tools.map((tool, i) => (
             <div 
               key={i} 
               className="min-w-[300px] w-[300px] sm:min-w-[400px] sm:w-[400px] bg-forge-black border border-brushed-bronze/10 snap-start shrink-0 relative overflow-hidden group"
             >
               {/* Background Image */}
               <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity">
                 <img 
                   src={tool.image} 
                   alt="" 
                   loading="lazy"
                   decoding="async"
                   className="w-full h-full object-cover grayscale" 
                 />
               </div>
               <div className="relative z-10 p-8 h-full bg-gradient-to-t from-forge-black via-forge-black/95 to-forge-black/80">
                 <h3 className="font-mono text-sm tracking-widest uppercase text-chalk mb-4 text-ember-orange">{tool.name}</h3>
                 <p className="text-iron-grey text-sm leading-relaxed">{tool.desc}</p>
               </div>
             </div>
           ))}
        </div>
        <style>{`
          .hide-scrollbar::-webkit-scrollbar { display: none; }
          .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>
      </section>

      {/* Studio & Community */}
      <section className="bg-forge-black py-24 relative">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16">
           
           {/* Studio Visit */}
           <div className="bg-anthracite border border-brushed-bronze/20 p-8 sm:p-12">
             <div className="text-brushed-bronze mb-6"><MapPin size={32} /></div>
             <h2 className="text-3xl font-display mb-6">The Studio</h2>
             
             {/* OpenStreetMap Embed */}
             <div className="w-full h-48 mb-6 rounded-sm overflow-hidden border border-brushed-bronze/20">
               <iframe
                 width="100%"
                 height="100%"
                 frameBorder="0"
                 scrolling="no"
                 marginHeight={0}
                 marginWidth={0}
                 src="https://www.openstreetmap.org/export/embed.html?bbox=-85.75%2C44.70%2C-85.55%2C44.82&amp;layer=mapnik&amp;marker=44.7631%2C-85.6206"
                 style={{ filter: 'grayscale(100%) contrast(1.1)' }}
                 title="Map of Traverse City, Michigan"
                 loading="lazy"
               />
             </div>

             <address className="not-italic text-iron-grey space-y-2 mb-6">
               <p>Traverse City, MI 49684</p>
               <p>Northern Michigan</p>
             </address>

             {/* Structured Contact Links */}
             <div className="space-y-3 mb-6">
               <button
                 onClick={openPhoneActions}
                 className="flex items-center gap-3 text-chalk hover:text-brushed-bronze transition-colors w-full text-left focus:outline-none focus:ring-2 focus:ring-brushed-bronze rounded-sm px-2 py-1 -ml-2"
               >
                 <Phone className="w-4 h-4 text-brushed-bronze" />
                 <span className="font-mono text-sm">{BUSINESS_INFO.phoneDisplay}</span>
               </button>
               <a
                 href={`mailto:${BUSINESS_INFO.email}`}
                 className="flex items-center gap-3 text-chalk hover:text-brushed-bronze transition-colors"
               >
                 <Mail className="w-4 h-4 text-brushed-bronze" />
                 <span className="font-mono text-sm">{BUSINESS_INFO.email}</span>
               </a>
             </div>

             <div className="border-t border-brushed-bronze/10 pt-6 mb-8">
               <p className="text-chalk font-mono text-sm uppercase tracking-widest mb-2">Hours By Appointment</p>
               <p className="text-iron-grey text-sm">Because machinery is loud and hot metal requires focus, the shop is rarely open for walk-ins. Please contact me to arrange a visit.</p>
             </div>
             <Link to="/contact" className="inline-flex h-12 items-center justify-center rounded-sm bg-brushed-bronze px-6 text-sm font-medium text-forge-black transition-all hover:bg-ember-orange">
               Request a Visit
             </Link>
           </div>

           {/* Credentials */}
           <div className="space-y-12">
             <div>
               <h3 className="text-sm font-mono tracking-widest text-brushed-bronze uppercase mb-6">Certifications & Guilds</h3>
               <ul className="space-y-4">
                 <li className="text-iron-grey">Artist Blacksmith's Association of North America (ABANA) - Member</li>
                 <li className="text-iron-grey">Michigan Artist Blacksmith Association - Member</li>
                 <li className="text-iron-grey">AWS Certified Welder (GTAW, SMAW)</li>
               </ul>
             </div>
             
             <div>
               <h3 className="text-sm font-mono tracking-widest text-brushed-bronze uppercase mb-6">Selected Press</h3>
               <ul className="space-y-4">
                 <li className="text-iron-grey"><span className="text-chalk">Architectural Digest</span> (2021) — Feature on Great Lakes Design</li>
                 <li className="text-iron-grey"><span className="text-chalk">Northern Express</span> (2019) — "The Weight of the Work"</li>
                 <li className="text-iron-grey"><span className="text-chalk">Traverse Magazine</span> (2018) — Maker Profile</li>
               </ul>
             </div>
           </div>

        </div>
      </section>

    </>
  );
}
