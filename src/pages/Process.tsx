import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import { PhoneCall, Map, PenTool, Layers, Hammer, CheckCircle2, FileDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SiteHead } from '../components/layout/SiteHead';
import { QuickAnswer } from '../components/seo/QuickAnswer';
import { cn } from '../lib/utils';
import { SITE_IMAGES } from '../data/site-images';
import { ForgeFeed } from '../components/marketing';

const steps = [
  {
    id: "discovery",
    icon: <PhoneCall size={28} />,
    title: "Discovery Call",
    desc: ["Every project starts with a conversation. We discuss the scope, the function, the aesthetic intent, and the rough budget parameters.", "I will tell you immediately if I am the right blacksmith for the job. If we are aligned, we move to the site visit."],
    receive: "A verbal go/no-go and a ballpark estimate.",
    time: "1 - 2 Days",
    image: SITE_IMAGES.process.discovery,
    imageCaption: "Initial sketches and project planning during the discovery phase"
  },
  {
    id: "consultation",
    icon: <Map size={28} />,
    title: "On-Site Consultation",
    desc: ["I do not build hypothetical metalwork. I need to see the space. I take exact measurements, evaluate structural tie-in points, and assess how light will interact with the finish.", "For heavy installations, we also discuss logistics, access, and floor load capacities."],
    receive: "Exact dimensional capture and structural assessment.",
    time: "1 Week",
    image: SITE_IMAGES.process.consultation,
    imageCaption: "On-site measurement and structural evaluation of the installation area"
  },
  {
    id: "sketch",
    icon: <PenTool size={28} />,
    title: "Concept & Sketch",
    desc: ["I take the measurements back to the forge and draft the piece. You will receive a scaled drawing showing exactly how the design elements interact.", "This is where we finalize the scrollwork, the proportions, and the joinery methods. It's the last stage before raw material is ordered."],
    receive: "Scaled formal sketches and a firm fixed-price quote.",
    time: "1 - 2 Weeks",
    image: SITE_IMAGES.process.sketch,
    imageCaption: "Detailed sketches and technical drawings on the drafting table"
  },
  {
    id: "material",
    icon: <Layers size={28} />,
    title: "Material & Finish Selection",
    desc: ["You will select the exact texture and finish. A raw hammered steel looks entirely different from a brushed bronze or an oil-rubbed patina.", "I will provide physical strike-offs (sample plates) if the finish is custom, so you can see how it reacts to the light in your chosen space."],
    receive: "Final material lock and deposit invoice.",
    time: "1 Week",
    image: SITE_IMAGES.process.material,
    imageCaption: "Metal sample plates showing various finishes and textures"
  },
  {
    id: "fabrication",
    icon: <Hammer size={28} />,
    title: "Forging & Fabrication",
    desc: ["The fire gets lit. Raw stock is cut, heated to 2,000 degrees, and manipulated at the anvil. This is the longest phase of the project.", "I do not rush the fire. The metal dictates the pace. I will send progress photos from the shop so you can see your piece coming to life."],
    receive: "Progress photos and heavy hammering.",
    time: "4 - 12 Weeks",
    image: SITE_IMAGES.process.fabrication,
    imageCaption: "The forge at work—heated steel being shaped at the anvil"
  },
  {
    id: "installation",
    icon: <CheckCircle2 size={28} />,
    title: "Delivery & Installation",
    desc: ["For local projects, I personally deliver and mount the work. The installation must be as flawless as the fabrication to ensure absolute structural integrity.", "For out-of-state commissions, the piece is custom-crated and shipped via freight with detailed mounting schematics."],
    receive: "Final installed piece and care instructions.",
    time: "1 Week",
    image: SITE_IMAGES.process.installation,
    imageCaption: "Careful installation and mounting of the finished piece",
    hasDiscoverLink: true
  }
];

const tools = [
  "Forge",
  "Anvil",
  "Power Hammer",
  "Plasma Cutter",
  "MIG/TIG Welder",
  "Measuring Tools",
  "Drafting Software"
];

const prepChecklist = [
  "Rough dimensions of the space (height, width, or linear run).",
  "Images of the current installation area.",
  "2-3 inspiration photos or rough sketches of what you want.",
  "Your timeline constraints, if any.",
  "A general idea of your finish preference (e.g., dark, light, rustic, polished)."
];

export function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState<string>(steps[0].id);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const prefersReducedMotion = useReducedMotion();

  // Height of the gradient fill based on scroll
  const fillHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // IntersectionObserver for aria-current="step" support
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const stepId = entry.target.getAttribute('data-step-id');
            if (stepId) setActiveStep(stepId);
          }
        });
      },
      {
        root: null,
        rootMargin: '-40% 0px -40% 0px',
        threshold: 0
      }
    );

    const stepElements = document.querySelectorAll('[data-step-id]');
    stepElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Calculate total time from steps
  const totalTime = "6 - 18 Weeks";
  // HIDDEN (prices unverified by owner) — restore to re-add estimatedCost to the HowTo schema:
  // const estimatedCost = {
  //   currency: "USD",
  //   min: 2500,
  //   max: 50000
  // };

  return (
    <>
      <QuickAnswer text="Matt Coffey Design's custom metalwork process has six stages — discovery call, on-site consultation, sketching, material selection, forging and fabrication, and installation — typically spanning 6 to 18 weeks. Every commission is bespoke and quoted per project after a discovery call and site visit." />

      <SiteHead
        title="The Process"
        description="Learn how a custom metal commission goes from a conversation to a forged-in-place installation."
        schema={[
          {
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": "How to Commission Custom Architectural Metalwork",
            "description": "A 6-step process for commissioning custom hand-forged metalwork from Matt Coffey Design in Traverse City, Michigan — from discovery call to installed piece.",
            "totalTime": "P6W/P18W",
            /* HIDDEN (prices unverified by owner) — restore to re-add estimatedCost to schema:
            "estimatedCost": {
              "@type": "MonetaryAmount",
              "currency": estimatedCost.currency,
              "minValue": estimatedCost.min,
              "maxValue": estimatedCost.max
            },
            */
            "tool": tools.map(t => ({ "@type": "HowToTool", "name": t })),
            "step": steps.map((s, i) => ({
              "@type": "HowToStep",
              "position": i + 1,
              "name": s.title,
              "text": s.desc.join(' '),
              "url": `https://mattcoffeydesign.com/process#step-${s.id}`,
              "image": `https://mattcoffeydesign.com${s.image}`
            })),
            "yield": "Custom hand-forged architectural metalwork piece, installed and ready for use"
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              /* HIDDEN (prices unverified by owner) — restore this FAQ when pricing is confirmed:
              {
                "@type": "Question",
                "name": "How much does custom metalwork cost?",
                "acceptedAnswer": { "@type": "Answer", "text": "Custom metalwork is priced per project based on labor hours and materials. Starting prices: custom furniture from $2,500, interior railings from $4,000 per 10 linear feet, driveway entry gates from $12,000." }
              },
              */
              {
                "@type": "Question",
                "name": "How long does the custom metalwork process take?",
                "acceptedAnswer": { "@type": "Answer", "text": "The full process from discovery call to installed piece typically spans 6 to 18 weeks, depending on the scope and complexity. Forging and fabrication alone takes 4 to 12 weeks." }
              }
            ]
          }
        ]}
      />

      {/* Hero */}
      <section id="process-hero" className="pt-32 pb-24 border-b border-brushed-bronze/20 bg-forge-black text-center relative overflow-hidden">
        {/* Hero Background Photo */}
        <div className="absolute inset-0 z-0">
          <img
            src={SITE_IMAGES.process.fabrication}
            alt="Metal fabrication in progress"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-forge-black/80 via-forge-black/60 to-forge-black" />
        </div>
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <h1 className="text-5xl md:text-7xl font-display mb-6">The Process.</h1>
          <p className="text-xl md:text-2xl text-iron-grey font-serif italic">From conversation to forged-in-place.</p>
        </div>
      </section>

      {/* Main Process Timeline */}
      <section id="process-timeline" className="py-24 bg-anthracite relative" ref={containerRef}>
        <noscript>
          <div className="max-w-4xl mx-auto px-6 mb-12">
            <h2 className="text-2xl font-display mb-6">Our 6-Step Process</h2>
            <ol className="list-decimal list-inside space-y-2 text-iron-grey">
              {steps.map((step) => (
                <li key={step.id}>
                  <a href={`#step-${step.id}`} className="text-chalk hover:text-brushed-bronze transition-colors">
                    {step.title}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </noscript>

        <div className="absolute inset-0 bg-noise mix-blend-overlay opacity-20 pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 relative">

          {/* The Scroll Rail */}
          <div className="absolute left-[36px] md:left-[44px] top-0 bottom-0 w-1 bg-forge-black rounded-full overflow-hidden">
            <motion.div
              className="absolute top-0 inset-x-0 bg-gradient-to-b from-cooling-red via-ember-orange to-white-hot rounded-full"
              style={prefersReducedMotion ? { height: "100%" } : { height: fillHeight }}
            />

            {/* Sparks falling along rail */}
            {!prefersReducedMotion && (
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1.5 h-1.5 bg-white-hot rounded-full blur-[1px]"
                    initial={{ top: "-5%" }}
                    animate={{ top: "105%" }}
                    transition={{
                      duration: Math.random() * 3 + 4,
                      repeat: Infinity,
                      delay: Math.random() * 5,
                      ease: "linear"
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Timeline Steps */}
          <div className="space-y-24 md:space-y-32">
            {steps.map((step, i) => (
              <div
                key={step.id}
                id={`step-${step.id}`}
                data-step-id={step.id}
                aria-current={activeStep === step.id ? "step" : undefined}
                className="relative pl-16 md:pl-24"
              >
                {/* Circle Node */}
                <div className="absolute left-[24px] md:left-[32px] top-6 -translate-x-1/2 w-6 h-6 rounded-full bg-forge-black border-2 border-brushed-bronze ring-4 ring-anthracite z-10" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                  <div>
                    <div className="text-brushed-bronze mb-6 bg-forge-black/50 p-4 inline-block rounded-sm border border-brushed-bronze/20">
                      {step.icon}
                    </div>
                    <h2 className="text-3xl font-display mb-6 text-balance">{step.title}</h2>
                    <div className="space-y-4 text-iron-grey mb-8">
                      {step.desc.map((p, idx) => <p key={idx}>{p}</p>)}
                    </div>
                    {step.hasDiscoverLink && (
                      <div className="mb-6 p-4 bg-brushed-bronze/10 border border-brushed-bronze/20 rounded-sm">
                        <p className="text-chalk text-sm">
                          Want to see more of our work?{" "}
                          <Link to="/discover" className="text-brushed-bronze hover:text-ember-orange transition-colors underline">
                            Explore the gallery
                          </Link>
                        </p>
                      </div>
                    )}
                    <div className="space-y-3">
                      <div className="bg-forge-black/50 border-l-2 border-brushed-bronze px-4 py-3">
                        <div className="font-mono text-xs uppercase tracking-widest text-chalk mb-1">What you'll receive:</div>
                        <div className="text-sm text-chalk/80">{step.receive}</div>
                      </div>
                      <div className="bg-forge-black/50 border-l-2 border-iron-grey px-4 py-3">
                        <div className="font-mono text-xs uppercase tracking-widest text-chalk mb-1">Typical Timeline:</div>
                        <div className="text-sm text-iron-grey">{step.time}</div>
                      </div>
                    </div>
                  </div>

                  <figure className="aspect-square bg-forge-black border border-brushed-bronze/20 p-2 relative group mt-8 md:mt-0">
                    <img
                      src={step.image}
                      alt={step.title}
                      loading={i === 0 ? "eager" : "lazy"}
                      fetchPriority={i === 0 ? "high" : "auto"}
                      className="w-full h-full object-cover grayscale opacity-80 transition-all duration-500 group-hover:grayscale-0 group-hover:opacity-100"
                    />
                    <figcaption className="absolute bottom-2 left-2 right-2 text-xs text-iron-grey bg-forge-black/80 px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {step.imageCaption}
                    </figcaption>
                  </figure>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Forge Feed — behind-the-scenes Instagram showcase */}
      <ForgeFeed variant="behindTheScenes" />

      {/* Preparation & Pricing Footer */}
      <section id="process-prep" className="py-24 bg-forge-black border-t border-brushed-bronze/20">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Checklist */}
          <div className="space-y-8">
            <h2 className="text-3xl font-display">What to prepare for our first call</h2>
            <ul className="space-y-4">
              {prepChecklist.map((item, i) => (
                <li key={i} className="flex items-start gap-4 text-iron-grey">
                  <div className="mt-1 w-1.5 h-1.5 bg-brushed-bronze rounded-full shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            {/* Downloadable Prep Checklist Link */}
            <a
              href="/downloads/project-prep-checklist.pdf"
              download
              className="inline-flex items-center gap-2 text-brushed-bronze hover:text-ember-orange transition-colors text-sm font-medium"
            >
              <FileDown size={16} />
              Download printable checklist (PDF)
            </a>
          </div>

          {/* HIDDEN (prices unverified by owner) — change `false` to `true` to restore the Pricing Transparency block */}
          {false && (
          <div className="space-y-8">
            <h2 className="text-3xl font-display">Pricing Transparency</h2>
            <p className="text-iron-grey">
              Every commission is entirely bespoke. I do not carry inventory, and I do not have a catalog of standard prices. Pricing is dictated strictly by the labor hours required at the anvil and the mass of the material used. However, to help you gauge the scale of this work:
            </p>
            <dl className="space-y-4">
              <div className="flex justify-between items-end border-b border-brushed-bronze/10 pb-2">
                <dt className="font-mono text-sm uppercase text-chalk tracking-wider">Custom Table / Furniture</dt>
                <dd className="font-mono text-xs text-brushed-bronze">Starts at $2,500</dd>
              </div>
              <div className="flex justify-between items-end border-b border-brushed-bronze/10 pb-2">
                <dt className="font-mono text-sm uppercase text-chalk tracking-wider">Interior Railing (Per 10ft)</dt>
                <dd className="font-mono text-xs text-brushed-bronze">Starts at $4,000</dd>
              </div>
              <div className="flex justify-between items-end border-b border-brushed-bronze/10 pb-2">
                <dt className="font-mono text-sm uppercase text-chalk tracking-wider">Driveway Entry Gates</dt>
                <dd className="font-mono text-xs text-brushed-bronze">Starts at $12,000</dd>
              </div>
            </dl>
          </div>
          )}
        </div>
      </section>

      {/* Closing CTA */}
      <section id="process-cta" className="py-24 bg-hammered-steel border-t border-brushed-bronze/20 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-noise mix-blend-overlay opacity-30" />
        <Link to="/contact" className="relative z-10 inline-flex h-16 items-center justify-center rounded-sm bg-brushed-bronze px-10 text-lg font-medium text-forge-black transition-all hover:bg-ember-orange hover:-translate-y-1 hover:shadow-[0_8px_32px_-8px_rgba(226,106,31,0.6)]">
          Book a Discovery Call
        </Link>
      </section>
    </>
  );
}
