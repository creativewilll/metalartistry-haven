#!/usr/bin/env node
/**
 * SEO Artifacts Generator
 *
 * This script generates all SEO-related artifacts at build time:
 * 1. public/sitemap.xml - XML sitemap for search engines
 * 2. public/rss.xml - RSS feed for blog subscribers
 * 3. public/llms-full.txt - Comprehensive content for AI/LLM consumption
 * 4. public/sitemap-images.xml - Google image sitemap extension
 *
 * Run during build: node scripts/generate-seo-artifacts.mjs
 */

import { writeFileSync, mkdirSync, readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = join(__dirname, '..', 'public');

// Site configuration
const SITE_URL = process.env.VITE_SITE_URL || 'https://mattcoffeydesign.com';
const SITE_NAME = 'Matt Coffey Design';
const SITE_DESCRIPTION = 'Master Blacksmith | Traverse City | 25+ years of master metalworking. Custom railings, furniture, and architectural art in Northern Michigan.';

// Category routes for sitemap
const CATEGORY_ROUTES = [
  { path: '/services/railings-fences-and-gates', priority: 0.8, changefreq: 'monthly' },
  { path: '/services/custom-furniture', priority: 0.8, changefreq: 'monthly' },
  { path: '/services/commercial', priority: 0.8, changefreq: 'monthly' },
  { path: '/services/art-and-decor', priority: 0.8, changefreq: 'monthly' },
  { path: '/services/doors-and-windows', priority: 0.8, changefreq: 'monthly' },
  { path: '/services/behind-the-scenes', priority: 0.7, changefreq: 'monthly' },
  { path: '/services/custom-projects', priority: 0.8, changefreq: 'monthly' },
  { path: '/services/outdoor-metal-decor', priority: 0.8, changefreq: 'monthly' },
  { path: '/services/kitchens-and-bar-tops', priority: 0.8, changefreq: 'monthly' },
];

// Static routes
const STATIC_ROUTES = [
  { path: '/', priority: 1.0, changefreq: 'weekly' },
  { path: '/services', priority: 0.9, changefreq: 'monthly' },
  { path: '/process', priority: 0.8, changefreq: 'monthly' },
  { path: '/discover', priority: 0.8, changefreq: 'weekly' },
  // { path: '/journal', priority: 0.9, changefreq: 'weekly' },  // hidden — re-add when FEATURES.journal is true
  // { path: '/about', priority: 0.7, changefreq: 'monthly' },  // disabled at launch — re-add when FEATURES.aboutPage is true
  { path: '/contact', priority: 0.9, changefreq: 'monthly' },
  { path: '/glossary', priority: 0.7, changefreq: 'monthly' },
  // { path: '/contact-form', priority: 0.6, changefreq: 'monthly' },  // intake form removed — dead lead pipeline
  ...CATEGORY_ROUTES,
];

// Journal is hidden (FEATURES.journal = false). Flip to true to re-include
// journal posts in the sitemap, RSS feed, and llms-full.txt.
const JOURNAL_ENABLED = false;

// Journal posts data (inline to avoid import issues during build)
const JOURNAL_POSTS = [
  {
    slug: 'powder-coat-vs-patina-finishes',
    title: 'The Truth About Powder Coating vs. Traditional Patina Finishes',
    excerpt: 'In architectural metalwork, the finish dictates the lifespan. Why we often argue against commercial powder coating in favor of deep-penetrating oil and chemical patinas.',
    date: 'October 14, 2026',
    dateTime: '2026-10-14',
    updatedDateTime: '2026-10-20',
    category: 'Materials',
    image: '/gallery-images/CustomIndoor-KitchenBuild-2.jpeg',
  },
  {
    slug: 'lake-leelanau-spiral-staircase-case-study',
    title: 'Case Study: Engineering the Lake Leelanau Spiral Staircase',
    excerpt: 'Engineering a floating three-story spiral staircase using one-inch solid mild steel, without visible welds.',
    date: 'September 22, 2026',
    dateTime: '2026-09-22',
    category: 'Projects',
    image: '/gallery-images/CustomIndoorRailing1-2.jpeg',
  },
  {
    slug: 'anatomy-of-an-anvil',
    title: 'Anatomy of an Anvil: Why I Still Use a 100-Year-Old Tool',
    excerpt: 'Modern anvils lack the rebound and soul of forged-steel historic pieces. A deep dive into the Peter Wright anvil.',
    date: 'August 07, 2026',
    dateTime: '2026-08-07',
    category: 'Philosophy',
    image: '/gallery-images/workshop1-2.jpeg',
  },
  {
    slug: 'hot-rolled-vs-cold-rolled-steel',
    title: 'Hot-Rolled vs Cold-Rolled Steel in Architectural Metalwork',
    excerpt: 'They look identical on a spreadsheet, but behave entirely differently at the forge. Which material is right for your home?',
    date: 'July 18, 2026',
    dateTime: '2026-07-18',
    category: 'Materials',
    image: '/gallery-images/customsheetpatternprocess1.jpeg',
  },
  {
    slug: 'the-lost-art-of-structural-riveting',
    title: 'The Lost Art of Structural Riveting in Modern Metalwork',
    excerpt: 'Before ARC and MIG welding, bridges and skyscrapers were pinned entirely by rivets. We bring this ancient joinery technique to modern residential designs.',
    date: 'June 02, 2026',
    dateTime: '2026-06-02',
    category: 'Process',
    image: '/gallery-images/IndoorBarnBuildPROCESS1.jpeg',
  },
  // New journal posts
  {
    slug: 'blacksmith-vs-welder-whats-the-difference',
    title: 'Blacksmith vs. Welder: What\'s the Difference?',
    excerpt: 'Understanding the distinction between blacksmiths and welders helps clients choose the right craftsman for their architectural metalwork project.',
    date: 'May 01, 2026',
    dateTime: '2026-05-01',
    category: 'Education',
    image: '/gallery-images/workshop1-2.jpeg',
  },
  {
    slug: 'wrought-iron-vs-cast-iron-vs-mild-steel',
    title: 'Wrought Iron vs. Cast Iron vs. Mild Steel: A Guide for Homeowners',
    excerpt: 'Three materials, three distinct characteristics. Learn which metal is right for your railing, gate, or furniture project.',
    date: 'April 15, 2026',
    dateTime: '2026-04-15',
    category: 'Materials',
    image: '/gallery-images/customsheetpatternprocess1.jpeg',
  },
];

// Full journal post content (for llms-full.txt)
const JOURNAL_POST_CONTENT = {
  'blacksmith-vs-welder-whats-the-difference': {
    title: 'Blacksmith vs. Welder: What\'s the Difference?',
    date: '2026-05-01',
    category: 'Education',
    content: `
## The Craftsman Spectrum

In the world of metalwork, two titles often get conflated: blacksmith and welder. While both work with heated metal, the scope, training, and output differ dramatically. Understanding these distinctions helps homeowners and architects choose the right craftsman for their project.

## What is a Welder?

A welder is a specialist in joining metal pieces using various fusion techniques—MIG, TIG, stick, and flux-cored arc welding. Welders are essential in construction, manufacturing, and repair work. Their training focuses on:

- Reading blueprints and welding symbols
- Selecting appropriate welding processes for materials
- Achieving code-compliant joints with proper penetration
- Working efficiently in production environments

Most welders complete certification programs through trade schools or union apprenticeships. Their expertise is in the joint—creating strong, reliable connections between metal components.

## What is a Blacksmith?

A blacksmith is a metal shaper who uses heat and hand tools (primarily hammers) to forge metal into form. The term derives from "black metal"—iron—which appears black when heated. Blacksmiths practice a craft that predates industrial welding by millennia. Their training encompasses:

- Forge management and fire control
- Understanding how different steels behave at temperature
- Hand-forging techniques: drawing, upsetting, punching, twisting
- Heat treatment: hardening, tempering, and annealing
- Tool making and maintenance

Becoming a competent blacksmith typically requires years of apprenticeship and decades of practice to master.

## Where the Roles Diverge

A welder excels at joining pre-fabricated components according to engineered specifications. They work with stock materials—angle iron, tubing, plate—and connect them as designed. The aesthetic result depends largely on grinding and finishing after the weld is complete.

A blacksmith begins with raw stock and creates form through heat and force. They can taper a bar from one inch to quarter-inch diameter. They can scroll flat stock into organic curves. They can forge-weld without electricity, creating molecular bonds indistinguishable from solid steel.

The blacksmith makes the pieces; the welder joins them. Of course, many craftsmen do both—modern architectural metalwork requires both skill sets.

## For Your Project: Which Do You Need?

If you're installing standard structural steel or making repairs, a certified welder is what you need. For custom architectural elements—railings with hand-forged scrolls, furniture with shaped legs, gates with artistic components—you need a blacksmith.

At Matt Coffey Design, I work as both, as the project requires. Some pieces demand hours at the anvil; others benefit from efficient modern welding. The key is understanding which approach serves the client's vision and the piece's longevity.

## The Philosophical Difference

Perhaps the deepest distinction lies in how each views metal. To a welder, metal is a material to be joined efficiently. To a blacksmith, metal is a plastic medium—something that flows and yields under the hammer, something alive with possibility at 2000 degrees.

Both perspectives have value. Both produce necessary work. But when you want metal shaped by fire and will rather than merely connected by electricity, you want a blacksmith.
    `.trim()
  },
  'wrought-iron-vs-cast-iron-vs-mild-steel': {
    title: 'Wrought Iron vs. Cast Iron vs. Mild Steel: A Guide for Homeowners',
    date: '2026-04-15',
    category: 'Materials',
    content: `
## Three Materials, Three Histories

Clients often ask for "wrought iron" railings or "cast iron" furniture, not realizing that these terms describe distinct materials with different properties, histories, and applications. Understanding the differences ensures you get the right metal for your project.

## Wrought Iron: The Historic Choice

Wrought iron is iron with very low carbon content (less than 0.08%), worked while hot to create a fibrous structure. Its name comes from "wrought"—meaning worked by hand. For centuries, it was the primary material for gates, railings, and decorative metalwork.

**Characteristics:**
- Highly ductile and malleable when heated
- Resistant to corrosion (the fibrous structure traps protective oxide)
- Cannot be hardened by heat treatment
- Workable at the forge—ideal for scrolling and shaping
- No longer commercially produced in significant quantities

True wrought iron is now rare and expensive, mostly salvaged from old buildings and bridges. When you see "wrought iron" advertised today, it typically means forged mild steel with a decorative finish.

## Cast Iron: Heavy and Brittle

Cast iron contains 2-4% carbon, making it hard but brittle. It's formed by pouring molten metal into molds, allowing complex shapes that would be difficult or impossible to forge.

**Characteristics:**
- Excellent compression strength
- Very brittle—will crack rather than bend under stress
- Cannot be forged or welded easily
- Excellent for decorative castings, engine blocks, cookware
- Heavy and dense

For architectural applications, cast iron excels in decorative elements—finials, rosettes, grilles—where its brittleness isn't a structural concern. It's inappropriate for load-bearing elements that might experience impact or bending.

## Mild Steel: The Modern Standard

Mild steel (low-carbon steel, typically A36 specification) contains 0.15-0.25% carbon. It combines the workability of wrought iron with the strength needed for modern structural applications.

**Characteristics:**
- Ductile and forgeable at high temperatures
- Stronger than wrought iron in structural applications
- Readily available and economical
- Can be welded, cut, formed, and machined
- Requires protection from corrosion (paint, patina, galvanizing)

Mild steel is what most modern "wrought iron" work is actually made from. It responds beautifully to traditional blacksmithing techniques while meeting contemporary structural codes.

## Making the Right Choice

**Choose wrought iron (or its mild steel equivalent) for:**
- Hand-forged railings and gates
- Decorative architectural elements requiring shaping
- Projects where traditional appearance matters
- Outdoor installations needing corrosion resistance

**Choose cast iron for:**
- Decorative hardware and accents
- Garden urns and planters
- Historical restoration matching existing cast elements
- Purely ornamental interior pieces

**Consider these factors:**
- Structural requirements (mild steel is stronger)
- Budget (true wrought iron is expensive; mild steel is economical)
- Finish preferences (all can achieve similar appearances with proper finishing)
- Weight considerations (cast iron is heaviest)

## The Matt Coffey Design Approach

In my Traverse City forge, I work primarily with mild steel, shaping it using traditional wrought iron techniques. The result captures the aesthetic and structural qualities that made wrought iron desirable for centuries, while meeting modern building codes and budget realities.

For clients specifically requesting cast iron elements—perhaps historic reproductions or specific decorative pieces—I coordinate with foundries to integrate cast components into forged frameworks. The combination of cast ornament with forged structure represents the best of both traditions.

## A Note on Terminology

When you ask a metalworker for "wrought iron," clarify what you mean. Do you want:
- True historic wrought iron (expensive, rare)
- Mild steel worked with traditional forging techniques (standard for custom work)
- Ornamental steel with a wrought iron appearance (mass-produced, lower cost)

Understanding these distinctions helps ensure you get quotes for comparable work and that the final product meets your expectations for quality, durability, and appearance.
    `.trim()
  },
  'powder-coat-vs-patina-finishes': {
    title: 'The Truth About Powder Coating vs. Traditional Patina Finishes',
    content: `In architectural metalwork, the finish dictates the lifespan. For decades, powder coating has dominated the industry, but for harsh climates like Northern Michigan's, traditional patina finishes often outperform commercial alternatives. Powder coating creates a barrier layer that can fail at edges and chips, allowing water to spread beneath the coating. Traditional patinas react with the metal surface itself, creating a conversion coating that penetrates into the material. When sealed with high-quality oil or wax, these finishes breathe with the metal, expand and contract together, and can be refreshed indefinitely. For the Lake Leelanau spiral staircase, we used a hybrid approach: galvanizing for base protection, chemical patina for aesthetic depth, and linseed oil with beeswax for ongoing maintenance. Five years later, a small scratch was easily touched up by the homeowner—something impossible with powder coating. The choice comes down to values: lowest initial cost versus longevity, beauty, and repairability.`
  },
  'lake-leelanau-spiral-staircase-case-study': {
    title: 'Case Study: Engineering the Lake Leelanau Spiral Staircase',
    content: `Engineering a floating three-story spiral staircase using one-inch solid mild steel, without visible welds. The challenge: 312 inches of total rise, 39 steps with 8-inch rise, supporting 2,400 pounds of static weight plus dynamic loads. We used finite element analysis combined with traditional load calculations. The central column—a solid 6-inch diameter steel pipe with 3/4-inch wall thickness—experiences maximum stresses well within safety factors. Instead of hollow tubing, we chose one-inch solid mild steel plate for treads to avoid acoustic resonance and stress concentration. For invisible welds, we used forge welding at 2,300°F, creating molecular bonds indistinguishable from solid steel. Hand-forged grapevines and white pine branches reference the region's character. Installation required a crane, three days of precise stacking with 1/16-inch tolerances, and structural reinforcement of the foundation. The finish: ferric chloride patina with a proprietary linseed oil and pine tar blend for marine environments.`
  },
  'anatomy-of-an-anvil': {
    title: 'Anatomy of an Anvil: Why I Still Use a 100-Year-Old Tool',
    content: `A 278-pound Peter Wright anvil, manufactured around 1890, remains my primary tool. Historic anvils like this were forged from wrought iron with hardened steel faces, creating grain structures that transmit energy differently than modern cast steel. The "rebound"—approximately 30% energy return—allows rhythmic, efficient forging where the hammer seems to work with you. Peter Wright & Co. operated from the 1830s to 1930s in Birmingham, England. The weight marking "2-1-14" indicates 2 hundredweight, 1 quarter, and 14 pounds. Anvils improve with age through crystalline realignment and proven survival—the poor ones were scrapped decades ago. My anvil sits on a massive oak stump with silicone-impregnated cork isolation. When working at it, there's a connection that forms—not mystical, but the result of decades of proprioceptive awareness. Some tools are equipment; this anvil is a partner in the craft.`
  },
  'hot-rolled-vs-cold-rolled-steel': {
    title: 'Hot-Rolled vs Cold-Rolled Steel in Architectural Metalwork',
    content: `Hot-rolled steel forms above recrystallization temperature (~1700°F), allowing dramatic thickness reduction and creating characteristic mill scale—a dark, bluish-black coating that provides temporary corrosion protection. For blacksmiths, hot-rolled steel responds more willingly to forging and forming. Cold-rolled steel is pickled (acid-washed) hot-rolled material passed through rollers at room temperature, producing smooth, polished surfaces with tighter tolerances and increased strength through work hardening. At Matt Coffey Design, we specify hot-rolled steel for most custom architectural metalwork because it responds better to heat and hammer, its natural surface character accepts patinas beautifully, and it's more economical. Cold-rolled excels where precision and painted finishes matter—automotive-quality applications, corrugated panels, and components requiring tight dimensional tolerances without additional machining.`
  },
  'the-lost-art-of-structural-riveting': {
    title: 'The Lost Art of Structural Riveting in Modern Metalwork',
    content: `Before electric arc welding, bridges and skyscrapers were pinned by rivets. The Empire State Building contains 60,000 rivets per floor; the Golden Gate Bridge required 600,000 rivets per tower. These connections survive earthquakes and hurricanes while welded structures from the 1960s require repair. Why? Rivets work on friction and clamping force rather than fusion. Heated to 1800°F and hammered into place, they cool and contract, pulling joints together with thousands of pounds of force. Riveted joints allow slight movement, accommodating thermal expansion and load redistribution without cracking. For residential applications—gate hinges, railing connections, decorative brackets—riveting offers both engineering superiority and aesthetic honesty. Each rivet represents a discrete decision, a moment of installation, a point of craft. At Matt Coffey Design, we've assembled the necessary tools: forge, pneumatic guns, bucking bars, and the knowledge to use them. Riveting is slower than welding—3 to 5 times slower—but delivers qualities that no other technique can replicate.`
  },
};

// Services data
const SERVICES = [
  {
    title: 'Railings & Gates',
    description: 'A railing should not just prevent a fall; it should dictate the physical boundary of a space with absolute authority. From sweeping residential spiral staircases to heavy industrial perimeter fencing, every run is forged to exact dimensions. Gates are the handshake of a property. They must swing with engineered precision while carrying the aesthetic weight of the estate.',
    materials: ['Mild Steel', 'Stainless', 'Blackened Steel', 'Hot-Rolled', 'Patina', 'Powder Coat', 'Raw Forged', 'Oil Rubbed'],
    useCases: ['Interior Stairways', 'Exterior Balcony Guards', 'Driveway Entry Gates', 'Pedestrian Walkways'],
    aeo: { q: 'How much does a custom railing cost?', a: 'Every railing is priced per linear foot and dictated by the complexity of the scrollwork, the gauge of the steel, and the chosen finish. A site visit is required for a firm quote.' }
  },
  {
    title: 'Custom Furniture',
    description: 'Mass-produced furniture rattles and bends. These pieces are built to hold the weight of generations. Dining tables, heavy steel shelving, console tables, and seating structures. Every piece is an exploration of geometry and raw strength, often pairing forged steel bases with thick-cut lumber or custom glass.',
    materials: ['Mild Steel', 'Blackened Steel', 'Bronze', 'Clear Coat'],
    useCases: ['Dining Tables', 'Industrial Shelving Units', 'Console Tables', 'Bespoke Bar Seating'],
    aeo: { q: 'How long does a custom table take to build?', a: 'Furniture commissions typically require 6 to 10 weeks from final design approval to delivery, depending on the complexity of the joints and final patination process.' }
  },
  {
    title: 'Commercial Installations',
    description: 'Restaurants, breweries, and retail environments require a different scale of thinking. Bars need structural foot rails. Signage needs to withstand the elements while projecting establishment permanence. I collaborate directly with lead architects and interior designers to ensure the metalwork integrates seamlessly with the broader build-out.',
    materials: ['Mild Steel', 'Stainless', 'Blackened Steel', 'Hot-Rolled', 'Powder Coat'],
    useCases: ['Bar Foot Rails & Structure', 'Hanging Glass Racks', 'Heavy Duty Signage', 'Restaurant Dividers'],
    aeo: { q: 'Do you install commercial pieces?', a: 'Yes. I handle the fabrication and the final installation for commercial spaces in Northern Michigan to ensure the structural integrity matches the blueprints.' }
  },
  {
    title: 'Custom Signage',
    description: 'Your sign is the first impression. It must speak to your brand before a customer enters. I fabricate blade signs, address monuments, restaurant marquees, and estate plaques that command attention. Using Cor-Ten steel, hot-rolled plate, or bronze, each sign is cut, formed, and finished to withstand the harshest Northern Michigan winters while aging beautifully.',
    materials: ['Hot-Rolled', 'Cor-Ten', 'Powder Coat', 'Patina'],
    useCases: ['Storefront blade signs', 'Address monuments', 'Restaurant marquees', 'Estate gate plaques'],
    aeo: { q: 'How long does a custom metal sign take?', a: 'Signage commissions typically span 8 to 10 weeks from design lock to installation. Rush fees apply for timelines under 6 weeks. Permitting assistance available for commercial signage.' }
  },
  {
    title: 'Architectural Art',
    description: 'Pure form unconstrained by pure function. Sculptures, large-scale wall hangings, and focal point installations for private collectors and public spaces. These pieces explore the plastic nature of metal exposed to extreme heat. Every strike is an irreversible decision.',
    materials: ['Bronze', 'Copper', 'Blackened Steel', 'Patina'],
    useCases: ['Public Plazas', 'Estate Gardens', 'Corporate Lobbies', 'Private Fine Art Collections'],
    aeo: { q: 'What is hot-forged steel?', a: 'Hot-forging involves heating raw steel to over 2,000 degrees in a forge, rendering it pliable enough to be shaped, stretched, and folded by a hammer before it cools back into a rigid state.' }
  },
  {
    title: 'Doors & Windows',
    description: 'Custom steel casements, wine cellar gates, and grand entryways. Replacing wood with metal instantly changes the acoustic profile and tactile weight of opening a door. Engineered to house modern insulated glass while maintaining incredibly narrow sightlines.',
    materials: ['Mild Steel', 'Powder Coat', 'Bronze Handles'],
    useCases: ['Wine Cellar Gates', 'Steel Casement Windows', 'Grand Entry Doors', 'Interior Glass Partitions'],
    aeo: { q: 'Do custom steel doors rust?', a: 'When properly protected with a zinc primer and a baked-on powder coat finish, steel doors and windows are highly resistant to rust and can withstand the harsh Northern Michigan climate.' }
  },
  {
    title: 'Structural Supports',
    description: 'I-beams, decorative mantel brackets, header supports, and load-bearing posts for high-end residential build-outs. These are structural elements that refuse to hide. Architects and builders call me when the standard lumber-yard bracket won\'t do. Every support is engineered for the load and forged for the eye.',
    materials: ['Mild Steel', 'Blackened Steel', 'Raw Forged', 'Oil Rubbed'],
    useCases: ['Mantel Brackets', 'Header Supports', 'I-Beam Post Wraps', 'Load-Bearing Brackets'],
    aeo: { q: 'Can you provide structural engineering letters?', a: 'Yes. For load-bearing elements requiring code compliance, I work with licensed structural engineers to provide stamped drawings and calculations.' }
  },
  {
    title: 'Bespoke Commissions',
    description: 'Hardware, lighting fixtures, fireplace doors, fire pits, and tools. If it requires heating metal, shaping it, and welding it, it can be done. Bring me a napkin sketch or an impossible problem, and we will figure out the physics required to make it reality.',
    materials: ['All Materials', 'Mixed Media', 'Custom Solutions'],
    useCases: ['Fireplace Enclosures', 'Custom Hardware', 'Heavy Duty Fire Pits', 'Hand-Forged Tools'],
    aeo: { q: 'Can you recreate a historical metal piece?', a: 'Yes. Using traditional blacksmithing techniques, I can forge matching hardware or structural components to seamlessly integrate with historic restorations.' }
  }
];

// Process steps
const PROCESS_STEPS = [
  {
    title: 'Discovery Call',
    description: 'Every project starts with a conversation. We discuss the scope, the function, the aesthetic intent, and the rough budget parameters. I will tell you immediately if I am the right blacksmith for the job. If we are aligned, we move to the site visit.',
    receive: 'A verbal go/no-go and a ballpark estimate.',
    time: '1 - 2 Days'
  },
  {
    title: 'On-Site Consultation',
    description: 'I do not build hypothetical metalwork. I need to see the space. I take exact measurements, evaluate structural tie-in points, and assess how light will interact with the finish. For heavy installations, we also discuss logistics, access, and floor load capacities.',
    receive: 'Exact dimensional capture and structural assessment.',
    time: '1 Week'
  },
  {
    title: 'Concept & Sketch',
    description: 'I take the measurements back to the forge and draft the piece. You will receive a scaled drawing showing exactly how the design elements interact. This is where we finalize the scrollwork, the proportions, and the joinery methods. It\'s the last stage before raw material is ordered.',
    receive: 'Scaled formal sketches and a firm fixed-price quote.',
    time: '1 - 2 Weeks'
  },
  {
    title: 'Material & Finish Selection',
    description: 'You will select the exact texture and finish. A raw hammered steel looks entirely different from a brushed bronze or an oil-rubbed patina. I will provide physical strike-offs (sample plates) if the finish is custom, so you can see how it reacts to the light in your chosen space.',
    receive: 'Final material lock and deposit invoice.',
    time: '1 Week'
  },
  {
    title: 'Forging & Fabrication',
    description: 'The fire gets lit. Raw stock is cut, heated to 2,000 degrees, and manipulated at the anvil. This is the longest phase of the project. I do not rush the fire. The metal dictates the pace. I will send progress photos from the shop so you can see your piece coming to life.',
    receive: 'Progress photos and heavy hammering.',
    time: '4 - 12 Weeks'
  },
  {
    title: 'Delivery & Installation',
    description: 'For local projects, I personally deliver and mount the work. The installation must be as flawless as the fabrication to ensure absolute structural integrity. For out-of-state commissions, the piece is custom-crated and shipped via freight with detailed mounting schematics.',
    receive: 'Final installed piece and care instructions.',
    time: '1 Week'
  }
];

// FAQs from all pages
const ALL_FAQS = [
  // Home page FAQs
  { q: 'Do you install outside of Traverse City?', a: 'Yes. While our primary footprint covers Leelanau, Grand Traverse, and Benzie counties, we frequently travel statewide across Michigan for major architectural installations, and coordinate crating and freight delivery for nationwide furniture commissions.' },
  { q: 'How long does a custom steel railing take to build?', a: 'A standard architectural railing commission typically spans 8 to 12 weeks from finalized design and 50% deposit to final installation. The exact timeline depends on current forge capacity and the complexity of the traditional joinery involved.' },
  { q: 'Will the raw steel rust if used outdoors?', a: 'Bare exposed steel will inevitably return to iron oxide (rust). For exterior applications, we utilize hot-dip galvanizing followed by specialized marine-grade patinas, or we recommend switching materials to architectural bronze or aluminum, ensuring longevity even in harsh Northern Michigan winters.' },
  // Contact page FAQs
  { q: 'What is your typical lead time?', a: 'My queue is typically booked 3 to 6 months in advance. For large builds like grand entry gates or full commercial restaurant build-outs, I recommend contacting me early in the architectural drafting phase so structural requirements can be coordinated.' },
  { q: 'How much is the deposit?', a: 'Once a design is finalized and a fixed quote is provided, I require a 50% non-refundable deposit to secure your place in the queue and order raw materials. The remaining 50% is due upon completion or installation.' },
  { q: 'Do you install or just deliver?', a: 'For local projects in Northern Michigan, I typically handle installation myself or supervise a trusted crew. For furniture and smaller pieces, I offer custom crating and freight shipping nationwide. For large architectural installations outside my service area, we coordinate with local contractors.' },
  { q: 'Do you offer a warranty?', a: 'All work carries a 1-year structural warranty covering fabrication defects and installation issues. Finish warranties vary by material—powder coat finishes carry manufacturer warranties, while living finishes like blackened steel evolve naturally over time and are not covered under warranty.' },
  { q: 'What finishes do you offer?', a: 'I offer hot-rolled patina with clear coat, blackened steel, powder coat in any RAL color, bare steel with lacquer, and copper or bronze with various patinas. Each finish has specific care requirements and aesthetic characteristics we\'ll discuss during design.' },
  { q: 'Do you handle permitting?', a: 'For structural work like railings and stairs, I provide engineered drawings stamped by a licensed PE that meet ICC and local code requirements. You or your contractor submit for permits. I do not pull permits directly but coordinate closely with your build team.' },
  { q: 'Can you provide engineer letters?', a: 'Yes. All structural work includes PE-stamped drawings suitable for permit submission. For commercial projects requiring full engineer-of-record services, I coordinate with licensed structural engineers familiar with ornamental metal and architectural ironwork.' },
  { q: 'What payment methods do you accept?', a: 'I accept checks, wire transfers, and ACH bank transfers. For deposits over $10,000, I can also accept credit cards with a processing fee. Payment schedules are outlined in every contract, with final payment due before delivery or at installation completion.' },
  // Services page FAQs (from aeo fields)
  { q: 'How much does a custom railing cost?', a: 'Every railing is priced per linear foot and dictated by the complexity of the scrollwork, the gauge of the steel, and the chosen finish. A site visit is required for a firm quote.' },
  { q: 'How long does a custom table take to build?', a: 'Furniture commissions typically require 6 to 10 weeks from final design approval to delivery, depending on the complexity of the joints and final patination process.' },
  { q: 'Do you install commercial pieces?', a: 'Yes. I handle the fabrication and the final installation for commercial spaces in Northern Michigan to ensure the structural integrity matches the blueprints.' },
  { q: 'How long does a custom metal sign take?', a: 'Signage commissions typically span 8 to 10 weeks from design lock to installation. Rush fees apply for timelines under 6 weeks. Permitting assistance available for commercial signage.' },
  { q: 'What is hot-forged steel?', a: 'Hot-forging involves heating raw steel to over 2,000 degrees in a forge, rendering it pliable enough to be shaped, stretched, and folded by a hammer before it cools back into a rigid state.' },
  { q: 'Do custom steel doors rust?', a: 'When properly protected with a zinc primer and a baked-on powder coat finish, steel doors and windows are highly resistant to rust and can withstand the harsh Northern Michigan climate.' },
  { q: 'Can you provide structural engineering letters?', a: 'Yes. For load-bearing elements requiring code compliance, I work with licensed structural engineers to provide stamped drawings and calculations.' },
  { q: 'Can you recreate a historical metal piece?', a: 'Yes. Using traditional blacksmithing techniques, I can forge matching hardware or structural components to seamlessly integrate with historic restorations.' }
];

// Glossary terms
const GLOSSARY_TERMS = [
  { term: 'Anvil', definition: 'A heavy iron or steel block with a smooth flat top on which blacksmiths hammer heated metal into shape.' },
  { term: 'Blacksmith', definition: 'A metalsmith who creates objects primarily from wrought iron or steel by forging the metal using tools to hammer, bend, and cut.' },
  { term: 'Cor-Ten Steel', definition: 'A group of steel alloys designed to eliminate the need for painting by forming a stable rust-like appearance after exposure to weather.' },
  { term: 'Forge', definition: 'A hearth or workplace where metal is heated and worked; also refers to the act of shaping metal by heating and hammering.' },
  { term: 'Forge Welding', definition: 'A solid-state welding process that joins metals by heating them to a high temperature and then hammering them together.' },
  { term: 'Hardy', definition: 'A chisel-like tool with a square shank that fits into the hardy hole of an anvil, used for cutting hot metal.' },
  { term: 'Hot-Rolled Steel', definition: 'Steel that has been roll-pressed at high temperatures (over 1,700°F), making it easier to form and resulting in a characteristic mill scale surface.' },
  { term: 'Mill Scale', definition: 'The flaky surface of hot-rolled iron or steel consisting of iron oxides that form on the surface during the manufacturing process.' },
  { term: 'Mild Steel', definition: 'A low-carbon steel containing approximately 0.05-0.25% carbon, making it ductile, malleable, and suitable for forging.' },
  { term: 'Patina', definition: 'A thin layer that forms on the surface of metals through oxidation, chemical treatment, or aging, creating a protective and decorative finish.' },
  { term: 'Punch', definition: 'A tool used to create holes in hot metal by striking the opposite end with a hammer while the point rests on the workpiece.' },
  { term: 'Rebound', definition: 'The elastic return of energy from an anvil face when struck, contributing to the efficiency of hammer work.' },
  { term: 'Rivet', definition: 'A permanent mechanical fastener consisting of a smooth cylindrical shaft with a head on one end, installed hot and hammered to form a second head.' },
  { term: 'Scroll', definition: 'A decorative metal element formed by twisting or bending a bar into a spiral or coiled shape.' },
  { term: 'Slag', definition: 'A byproduct of smelting ore and forging, consisting of impurities that separate from the metal during heating.' },
  { term: 'Swage', definition: 'A tool or form used for shaping metal by hammering, or the decorative groove or channel formed in metalwork.' },
  { term: 'Tempering', definition: 'A heat treatment process that reduces the brittleness of hardened steel by reheating it to a specific temperature below its critical point.' },
  { term: 'Tenon', definition: 'A projecting piece of metal designed to fit into a corresponding mortise hole to form a secure joint.' },
  { term: 'Tong', definition: 'A tool used by blacksmiths to grip and hold hot metal while working at the forge or anvil.' },
  { term: 'Upsetting', definition: 'The process of thickening or increasing the diameter of a metal section by hammering it end-on, forcing it to shorten and widen.' },
  { term: 'Welding Heat', definition: 'The temperature (typically 2,000-2,300°F for steel) at which metal becomes plastic enough to forge weld.' },
  { term: 'Wrought Iron', definition: 'An iron alloy with very low carbon content that is fibrous in nature, malleable when heated, and resistant to corrosion.' },
  { term: 'Quenching', definition: 'The rapid cooling of hot metal in water, oil, or air to harden it or relieve internal stresses.' },
  { term: 'Fuller', definition: 'A tool with a rounded nose used to create grooves or spread metal in a controlled manner.' },
  { term: 'Drawing Out', definition: 'The process of lengthening and reducing the cross-section of a metal bar by hammering it while hot.' }
];

// Gallery images for image sitemap
const GALLERY_IMAGES = [
  { url: '/gallery-images/MattCoffeyHero.jpeg', caption: 'Master blacksmith Matt Coffey in his Traverse City forge', page: '/' },
  { url: '/gallery-images/CustomIndoorRailing1-2.jpeg', caption: 'Custom hand-forged interior steel railing with scrollwork', page: '/discover' },
  { url: '/gallery-images/CustomGate_Bear1-2.jpeg', caption: 'Custom bear-themed steel entry gate with hand-forged details', page: '/discover' },
  { url: '/gallery-images/CustomMetalDoor1-2.jpeg', caption: 'Custom architectural steel door with bronze patina finish', page: '/discover' },
  { url: '/gallery-images/GypsyFarms_CustomBarBuild7-2.jpeg', caption: 'Commercial bar installation with custom steel foot rail', page: '/discover' },
  { url: '/gallery-images/CustomIndoor-KitchenBuild-2.jpeg', caption: 'Custom indoor kitchen steel build with range hood', page: '/discover' },
  { url: '/gallery-images/CustomBench1-2.jpeg', caption: 'Custom steel and wood bench with forged legs', page: '/discover' },
  { url: '/gallery-images/CustomMetalWallDecor1-2.jpeg', caption: 'Custom metal wall art sculpture with organic forms', page: '/discover' },
  { url: '/gallery-images/CustomIndoor-SteelFireplace1-2.jpeg', caption: 'Custom steel fireplace surround with patina finish', page: '/discover' },
  { url: '/gallery-images/CustomStovehood1-2.jpeg', caption: 'Custom forged steel range hood with riveted details', page: '/discover' },
  { url: '/gallery-images/CustomRanchGate1-2.jpeg', caption: 'Custom ranch entry gate with hand-forged scrollwork', page: '/discover' },
  { url: '/gallery-images/CustomCopperBartops1-2.jpeg', caption: 'Custom copper bar top with hand-hammered texture', page: '/discover' },
  { url: '/gallery-images/CustomMetalGate1-2.jpeg', caption: 'Custom steel gate with architectural bronze handles', page: '/discover' },
  { url: '/gallery-images/CustomSteelBarnRack-2.jpeg', caption: 'Heavy-duty structural steel barn rack installation', page: '/discover' },
  { url: '/gallery-images/CustomGate_MasonaryBricks1-2.jpeg', caption: 'Custom steel gate integrated with masonry brick pillars', page: '/discover' },
  { url: '/gallery-images/CustomIndoorShelving-2.jpeg', caption: 'Custom steel shelving unit with forged brackets', page: '/discover' },
  { url: '/gallery-images/CustomFireSafetyBox1-2.jpeg', caption: 'Custom steel fire safety box with patina finish', page: '/discover' },
  // { url: '/gallery-images/workshop1-2.jpeg', caption: 'Interior of the Matt Coffey Design forge workshop', page: '/about' },  // disabled at launch — re-add when FEATURES.aboutPage is true
  { url: '/gallery-images/Custom-CandleHolder-2.jpeg', caption: 'Custom forged steel candle holder with scroll base', page: '/discover' },
  { url: '/gallery-images/Custom-Crafted-Handrails-for-seniors1.jpeg', caption: 'Custom accessibility handrails with decorative forged elements', page: '/discover' },
];

// Format date for sitemap (YYYY-MM-DD)
function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toISOString().split('T')[0];
}

// Format date for RSS (RFC 822)
function formatRSSDate(dateStr) {
  const date = new Date(dateStr);
  return date.toUTCString();
}

// Escape XML special characters
function escapeXml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// Generate Sitemap XML
function generateSitemap() {
  const urls = [
    // Static routes
    ...STATIC_ROUTES.map(route => ({
      loc: `${SITE_URL}${route.path}`,
      lastmod: formatDate(new Date()),
      changefreq: route.changefreq,
      priority: route.priority,
    })),
    // Journal posts (hidden while JOURNAL_ENABLED is false)
    ...(JOURNAL_ENABLED ? JOURNAL_POSTS.map(post => ({
      loc: `${SITE_URL}/journal/${post.slug}`,
      lastmod: formatDate(post.updatedDateTime || post.dateTime),
      changefreq: 'monthly',
      priority: 0.8,
    })) : []),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${escapeXml(url.loc)}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority.toFixed(1)}</priority>
  </url>`).join('\n')}
</urlset>`;

  return xml;
}

// Generate RSS XML
function generateRSS() {
  const now = new Date().toUTCString();
  const items = (JOURNAL_ENABLED ? JOURNAL_POSTS : []).map(post => {
    const postUrl = `${SITE_URL}/journal/${post.slug}`;
    const imageUrl = `${SITE_URL}${post.image}`;

    return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${escapeXml(postUrl)}</link>
      <guid isPermaLink="true">${escapeXml(postUrl)}</guid>
      <pubDate>${formatRSSDate(post.dateTime)}</pubDate>
      <description>${escapeXml(post.excerpt)}</description>
      <category>${escapeXml(post.category)}</category>
      <enclosure url="${escapeXml(imageUrl)}" type="image/jpeg" />
    </item>`;
  }).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${escapeXml(SITE_NAME)} Journal</title>
    <link>${escapeXml(SITE_URL)}/journal</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>en-US</language>
    <lastBuildDate>${now}</lastBuildDate>
    <atom:link href="${escapeXml(SITE_URL)}/rss.xml" rel="self" type="application/rss+xml" />
    <image>
      <url>${escapeXml(SITE_URL)}/gallery-images/MattCoffeyHero.jpeg</url>
      <title>${escapeXml(SITE_NAME)} Journal</title>
      <link>${escapeXml(SITE_URL)}/journal</link>
    </image>
${items}
  </channel>
</rss>`;

  return xml;
}

// Generate LLMs Full Content
function generateLLMsFullTxt() {
  const generationDate = new Date().toISOString().split('T')[0];

  let content = `# Matt Coffey Design — Complete Site Content for LLMs

> This file contains the full textual content of mattcoffeydesign.com for AI model consumption.
> Last generated: ${generationDate}
> Site URL: ${SITE_URL}

## Business Overview

Matt Coffey Design is a master blacksmithing and metal fabrication studio based in Traverse City, Michigan. For over 25 years, Matt Coffey has forged custom architectural metalwork including railings, gates, signage, doors, structural supports, and heirloom furniture for homes and businesses across Northern Michigan and beyond.

**Core Services:**
- Custom Railings & Gates: Hand-forged spiral staircases, balcony guards, driveway gates, and pedestrian walkways engineered for safety and visual weight.
- Custom Metal Furniture: Dining tables, shelving units, console tables, and bar seating built from forged steel, bronze, and reclaimed timber.
- Custom Signage: Storefront blade signs, address monuments, restaurant marquees, and estate plaques fabricated from Cor-Ten and hot-rolled steel.
- Steel & Bronze Doors: Bespoke steel casement windows, pivot entryways, wine cellar gates, and barn doors with hand-forged hardware.
- Architectural Art: One-off sculptures, focal-point wall pieces, and public installations exploring the plastic nature of metal heated to 2,000+ degrees.
- Structural Supports: I-beams, mantel brackets, header supports, and load-bearing posts for high-end residential build-outs.
- Bespoke Commissions: Custom hardware, lighting fixtures, fireplace enclosures, fire pits, and hand-forged tools.

**Materials & Finishes:**
- Mild steel, stainless steel, blackened steel, hot-rolled steel
- Architectural bronze and copper with living patinas
- Powder coat, clear coat, oil-rubbed, and raw forged finishes
- Hand-rubbed patinas using oxidizing acids, oils, and waxes

**Service Area:**
Primary footprint: Grand Traverse, Leelanau, Benzie, and Antrim counties in Northern Michigan. Available statewide for major architectural installations and nationwide for furniture commissions via custom crating and freight.

**Key Facts:**
- Established: 1999
- Works completed: 1,500+
- Experience: 25+ years at the anvil
- Status: Fully insured, AWS certified (GTAW, SMAW), ABANA member

## Services

`;

  // Add services
  SERVICES.forEach(service => {
    content += `### ${service.title}\n\n${service.description}\n\n**Materials:** ${service.materials.join(', ')}\n\n**Use Cases:** ${service.useCases.join(', ')}\n\n`;
  });

  // Add process
  content += `## Process
\n`;
  PROCESS_STEPS.forEach((step, index) => {
    content += `${index + 1}. **${step.title}** — ${step.description}\n\n   You receive: ${step.receive} (Typical time: ${step.time})\n\n`;
  });

  // Add categories
  content += `## Portfolio Categories
\n`;
  content += `Matt Coffey Design organizes work into nine distinct categories, each with dedicated portfolio pages at mattcoffeydesign.com/services/[category-name].\n\n`;

  const CATEGORIES_DATA = [
    {
      name: 'Railings, Fences, and Gates',
      slug: 'railings-fences-and-gates',
      description: 'Hand-forged spiral staircases, balcony guards, driveway gates, and pedestrian walkways engineered for safety and visual weight. Durable, long-lasting, and stylish architectural metalwork that defines boundaries with absolute authority.',
      priceRange: '$4,000 per 10 linear feet and up; driveway gates from $12,000',
      materials: 'Mild Steel, Stainless Steel, Wrought Iron, Cor-Ten Weathering Steel, Bronze Accents',
    },
    {
      name: 'Custom Furniture',
      slug: 'custom-furniture',
      description: 'Heirloom pieces built to hold the weight of generations. Dining tables, shelving, console tables, and seating structures combining forged steel with live-edge lumber and complementary materials.',
      priceRange: '$2,500 per piece and up; dining tables from $4,500',
      materials: 'Mild Steel, Blackened Steel, Hot-Rolled Steel, Bronze, Reclaimed Barnwood, Live-Edge Hardwood',
    },
    {
      name: 'Commercial Installations',
      slug: 'commercial',
      description: 'Architectural metalwork for restaurants, breweries, and retail spaces. Full bar builds, signage, restaurant dividers, and ADA-compliant railings engineered for extreme durability in high-traffic environments.',
      priceRange: '$15,000 for partial installations; full renovations from $50,000',
      materials: 'Mild Steel, Stainless Steel, Hot-Rolled Steel, Bronze, Copper, Powder Coat',
    },
    {
      name: 'Art and Decor',
      slug: 'art-and-decor',
      description: 'Pure form unconstrained by pure function—sculptural metal art. Large-scale wall hangings, public installations, and decorative focal points exploring the plastic nature of metal exposed to extreme heat.',
      priceRange: '$800 for accent pieces; large sculptures from $5,000',
      materials: 'Mild Steel, Bronze, Copper, Cor-Ten Weathering Steel, Stainless Steel',
    },
    {
      name: 'Doors and Windows',
      slug: 'doors-and-windows',
      description: 'Architectural steel entryways and fenestration solutions. Custom steel casements, wine cellar gates, pivot doors, and grand entryways with incredibly narrow sightlines and substantial heft.',
      priceRange: '$6,000 for interior doors; entry systems from $12,000',
      materials: 'Mild Steel, Stainless Steel, Bronze, Tempered Glass, Insulated Glass Units',
    },
    {
      name: 'Outdoor Metal Decor',
      slug: 'outdoor-metal-decor',
      description: 'Durable beauty for gardens, patios, and exterior spaces. Garden sculptures, privacy screens, patio accents, and functional outdoor pieces engineered for Northern Michigan\'s challenging climate.',
      priceRange: '$800 for accent pieces; large installations from $3,500',
      materials: 'Cor-Ten Weathering Steel, Stainless Steel, Mild Steel with protective coating, Bronze',
    },
    {
      name: 'Kitchens & Bar Tops',
      slug: 'kitchens-and-bar-tops',
      description: 'Industrial elegance for culinary spaces. Steel countertops, copper bar tops, custom range hoods, and complete kitchen builds combining durability with food-safe finishes.',
      priceRange: '$3,500 for countertops; full kitchen builds from $25,000',
      materials: 'Hot-Rolled Steel, Copper, Bronze, Stainless Steel, Food-Safe Finishes',
    },
    {
      name: 'Custom Projects',
      slug: 'custom-projects',
      description: 'One-of-a-kind solutions for impossible problems. Range hoods, fireplace doors, specialty hardware, and unique problem-solving commissions unavailable through catalogs or showrooms.',
      priceRange: '$1,500 and up depending on complexity',
      materials: 'Mild Steel, Stainless Steel, Bronze, Copper, Wrought Iron',
    },
    {
      name: 'Behind the Scenes',
      slug: 'behind-the-scenes',
      description: 'Process documentation revealing the forge at 2,000 degrees, the craft of heating and hammering raw steel, and the techniques that separate master metalwork from commodity fabrication.',
      priceRange: 'Educational content',
      materials: 'Process Photography, Workshop Documentation',
    },
  ];

  CATEGORIES_DATA.forEach(cat => {
    content += `### ${cat.name}\n\n`;
    content += `**URL:** ${SITE_URL}/services/${cat.slug}\n\n`;
    content += `${cat.description}\n\n`;
    content += `**Materials:** ${cat.materials}\n\n`;
    content += `**Price Range:** ${cat.priceRange}\n\n`;
  });

  // Add pricing
  content += `## Pricing Transparency

- Custom Table / Furniture: Starts at $2,500
- Interior Railing (Per 10ft): Starts at $4,000
- Driveway Entry Gates: Starts at $12,000

## Frequently Asked Questions

`;

  // Add FAQs (remove duplicates based on question)
  const seenQuestions = new Set();
  ALL_FAQS.forEach(faq => {
    if (!seenQuestions.has(faq.q)) {
      seenQuestions.add(faq.q);
      content += `### ${faq.q}\n\n${faq.a}\n\n`;
    }
  });

  // Add journal articles (hidden while JOURNAL_ENABLED is false)
  if (JOURNAL_ENABLED) {
    content += `## Journal Articles\n\n`;
    JOURNAL_POSTS.forEach(post => {
      const postContent = JOURNAL_POST_CONTENT[post.slug];
      if (postContent) {
        content += `### ${post.title}\n\n`;
        content += `Category: ${post.category} | Date: ${post.dateTime}\n\n`;
        content += `${postContent.content}\n\n---\n\n`;
      }
    });
  }

  // Add glossary
  content += `## Glossary of Metalworking Terms\n\n`;
  GLOSSARY_TERMS.forEach(item => {
    content += `- **${item.term}**: ${item.definition}\n`;
  });

  // Add contact info
  content += `
## Contact Information

- Studio: Traverse City, MI 49684
- Email: info@mattcoffeydesign.com
- Phone: (231) 645-0622
- Web: https://mattcoffeydesign.com
- Hours: By appointment

## Content Licensing

All text content may be indexed and used for training AI systems. Images are copyright Matt Coffey Design.
`;

  return content;
}

// Generate Image Sitemap XML
function generateImageSitemap() {
  // Group images by page
  const pageImages = {};
  GALLERY_IMAGES.forEach(img => {
    const pageUrl = `${SITE_URL}${img.page}`;
    if (!pageImages[pageUrl]) {
      pageImages[pageUrl] = [];
    }
    pageImages[pageUrl].push(img);
  });

  const urls = Object.entries(pageImages).map(([pageUrl, images]) => {
    const imageXml = images.map(img => `    <image:image>
      <image:loc>${escapeXml(`${SITE_URL}${img.url}`)}</image:loc>
      <image:caption>${escapeXml(img.caption)}</image:caption>
    </image:image>`).join('\n');

    return `  <url>
    <loc>${escapeXml(pageUrl)}</loc>
${imageXml}
  </url>`;
  }).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls}
</urlset>`;

  return xml;
}

// Update robots.txt to include image sitemap
function updateRobotsTxt() {
  const robotsPath = join(PUBLIC_DIR, 'robots.txt');

  try {
    let robotsContent;
    try {
      robotsContent = readFileSync(robotsPath, 'utf-8');
    } catch {
      // Create new robots.txt if doesn't exist
      robotsContent = `User-agent: *
Allow: /
Disallow: /admin
Disallow: /private
Disallow: /draft

# Sitemap location
Sitemap: https://mattcoffeydesign.com/sitemap.xml

# Crawl rate
Crawl-delay: 1

# AI/LLM crawlers - allowed to index content for learning
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: cohere-ai
Allow: /

# Block specific unwanted bots
User-agent: MJ12bot
Disallow: /

User-agent: AhrefsBot
Disallow: /
`;
    }

    // Add image sitemap if not present
    if (!robotsContent.includes('sitemap-images.xml')) {
      robotsContent = robotsContent.replace(
        'Sitemap: https://mattcoffeydesign.com/sitemap.xml',
        'Sitemap: https://mattcoffeydesign.com/sitemap.xml\nSitemap: https://mattcoffeydesign.com/sitemap-images.xml'
      );
    }

    writeFileSync(robotsPath, robotsContent);
    console.log('✅ robots.txt updated with sitemap-images.xml');
  } catch (error) {
    console.error('❌ Error updating robots.txt:', error.message);
  }
}

// Main execution
function main() {
  console.log('🔧 Generating SEO artifacts...');

  try {
    // Generate sitemap
    const sitemap = generateSitemap();
    writeFileSync(join(PUBLIC_DIR, 'sitemap.xml'), sitemap);
    console.log('✅ Sitemap generated: public/sitemap.xml');

    // Generate RSS
    const rss = generateRSS();
    writeFileSync(join(PUBLIC_DIR, 'rss.xml'), rss);
    console.log('✅ RSS feed generated: public/rss.xml');

    // Generate llms-full.txt
    const llmsFull = generateLLMsFullTxt();
    writeFileSync(join(PUBLIC_DIR, 'llms-full.txt'), llmsFull);
    console.log('✅ LLMs full content generated: public/llms-full.txt');

    // Generate image sitemap
    const imageSitemap = generateImageSitemap();
    writeFileSync(join(PUBLIC_DIR, 'sitemap-images.xml'), imageSitemap);
    console.log('✅ Image sitemap generated: public/sitemap-images.xml');

    // Update robots.txt
    updateRobotsTxt();

    console.log('\n📊 Summary:');
    console.log(`   - ${STATIC_ROUTES.length} static pages (including 9 category pages)`);
    console.log(`   - ${JOURNAL_POSTS.length} journal posts`);
    console.log(`   - ${GALLERY_IMAGES.length} gallery images`);
    console.log(`   - ${GLOSSARY_TERMS.length} glossary terms`);
    console.log(`   - ${ALL_FAQS.length} FAQs (deduplicated)`);
    console.log(`   - 9 portfolio categories`);
    console.log(`   - Site URL: ${SITE_URL}`);

  } catch (error) {
    console.error('❌ Error generating SEO artifacts:', error.message);
    process.exit(1);
  }
}

main();
