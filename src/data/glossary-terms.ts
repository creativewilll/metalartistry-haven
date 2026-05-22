export interface GlossaryTerm {
  term: string;
  slug: string;
  definition: string;
  relatedTerms: string[];
  sameAs?: string;
}

// Helper to create URL-friendly slugs
function slugify(term: string): string {
  return term
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    term: "Anvil",
    slug: slugify("Anvil"),
    definition: "The immovable heart of the forge. A hardened steel block with a face for hammering and a horn for bending curves. In my Traverse City shop, the anvil is where raw stock becomes architectural reality—every railing scroll and furniture joint begins with steel meeting this surface.",
    relatedTerms: ["forging", "power-hammer", "swage"],
    sameAs: "https://en.wikipedia.org/wiki/Anvil"
  },
  {
    term: "Architectural Bronze",
    slug: slugify("Architectural Bronze"),
    definition: "A copper-tin alloy prized for its golden luster and exceptional corrosion resistance. Unlike steel, bronze develops a protective patina that deepens to rich browns and greens. I specify architectural bronze for Northern Michigan coastal projects where salt air would devour lesser metals.",
    relatedTerms: ["patina", "mild-steel", "cor-ten-steel"],
    sameAs: "https://en.wikipedia.org/wiki/Bronze"
  },
  {
    term: "Blackened Steel",
    slug: slugify("Blackened Steel"),
    definition: "Steel transformed through controlled heat and chemical application to achieve a deep charcoal-to-black finish. Not paint—this is the metal's surface altered permanently. The result is sophisticated, modern, and pairs beautifully with the timber and stone common in Grand Traverse County homes.",
    relatedTerms: ["patina", "mild-steel", "hot-rolled-steel", "powder-coating"],
    sameAs: "https://en.wikipedia.org/wiki/Blackening_of_steel"
  },
  {
    term: "Cold-Rolled Steel",
    slug: slugify("Cold-Rolled Steel"),
    definition: "Steel rolled at room temperature, yielding a smooth, precise finish with tight dimensional tolerances. The surface is clean and ready for fabrication without scale removal. I reach for cold-rolled stock when the project demands crisp lines and minimal post-processing—perfect for modern furniture and precision architectural elements.",
    relatedTerms: ["hot-rolled-steel", "mild-steel", "blackened-steel"],
    sameAs: "https://en.wikipedia.org/wiki/Rolling_(metalworking)#Cold_rolling"
  },
  {
    term: "Collaring",
    slug: slugify("Collaring"),
    definition: "A traditional blacksmithing technique where material is gathered and thickened at a specific point to create a decorative band or structural collar. Using a swage or hammer, the smith compresses the steel locally, building mass for visual weight or mechanical strength. Essential for ornamental scrollwork and period-accurate restoration work.",
    relatedTerms: ["swage", "upsetting", "forging", "scrollwork"],
    sameAs: "https://en.wikipedia.org/wiki/Blacksmith"
  },
  {
    term: "Cor-Ten Steel",
    slug: slugify("Cor-Ten Steel"),
    definition: "Weathering steel that develops a protective rust patina, eliminating the need for paint or coating. The stable oxide layer arrests further corrosion, making Cor-Ten ideal for exterior signage and monumental sculpture in Northern Michigan's harsh winters. The color evolves from bright orange to deep russet brown over two seasons.",
    relatedTerms: ["patina", "mild-steel", "hot-rolled-steel", "architectural-bronze"],
    sameAs: "https://en.wikipedia.org/wiki/Weathering_steel"
  },
  {
    term: "Drawing Out",
    slug: slugify("Drawing Out"),
    definition: "The fundamental forging operation of stretching heated steel to increase its length while reducing cross-section. By hammering perpendicular to the desired elongation, the smith pulls material from a thick section into a taper or elongated form. Every hand-forged scroll and furniture leg begins with drawing out the parent stock.",
    relatedTerms: ["upsetting", "forging", "anvil", "power-hammer"],
    sameAs: "https://en.wikipedia.org/wiki/Drawing_(manufacturing)"
  },
  {
    term: "Drift",
    slug: slugify("Drift"),
    definition: "A tapered tool used to enlarge or shape holes in hot steel, often through a punched or drilled opening. The drift is driven through the hole while the metal is at forging heat, creating precise internal profiles for tenons, bolts, or decorative piercings. Essential for traditional joinery where hidden connections carry visible loads.",
    relatedTerms: ["mortise-and-tenon", "forging", "fuller"],
    sameAs: "https://en.wikipedia.org/wiki/Drift_pin"
  },
  {
    term: "English Wheel",
    slug: slugify("English Wheel"),
    definition: "A metal-forming machine consisting of a large upper wheel and interchangeable lower anvils, used to create compound curves and smooth panels. By rolling sheet metal between the wheels, the smith gradually stretches the material into complex double-curvature shapes. In my shop, the English wheel shapes custom furniture elements and sculptural forms.",
    relatedTerms: ["forging", "mild-steel"],
    sameAs: "https://en.wikipedia.org/wiki/English_wheel"
  },
  {
    term: "Forging",
    slug: slugify("Forging"),
    definition: "The ancient art of shaping metal through localized compressive force while the material is hot. When steel reaches 2,000+ degrees Fahrenheit, it becomes plastic—capable of being stretched, compressed, twisted, and folded like clay. This is the foundation of everything I create, from massive gates to delicate hardware.",
    relatedTerms: ["anvil", "power-hammer", "drawing-out", "upsetting", "swage"],
    sameAs: "https://en.wikipedia.org/wiki/Forging"
  },
  {
    term: "Fuller",
    slug: slugify("Fuller"),
    definition: "A grooving tool used to create concave channels or spread material perpendicular to the hammering direction. The fuller can be handheld or set into the anvil's hardy hole. By hammering a fuller into hot steel, the smith creates blood grooves, decorative lines, or spreads mass for tenons and joints.",
    relatedTerms: ["swage", "drift", "forging", "mortise-and-tenon"],
    sameAs: "https://en.wikipedia.org/wiki/Fuller_(metalworking)"
  },
  {
    term: "GTAW",
    slug: slugify("GTAW"),
    definition: "Gas Tungsten Arc Welding—also known as TIG welding. A precision welding process using a non-consumable tungsten electrode and inert shielding gas. GTAW offers exceptional control over heat input, making it ideal for thin materials, cosmetic welds on visible architectural work, and joining dissimilar metals like steel to bronze.",
    relatedTerms: ["tig-welding", "mig-welding", "smaw"],
    sameAs: "https://en.wikipedia.org/wiki/Gas_tungsten_arc_welding"
  },
  {
    term: "Hot-Rolled Steel",
    slug: slugify("Hot-Rolled Steel"),
    definition: "Steel formed while hot, above its recrystallization temperature, producing a characteristic mill scale surface and rounded edges. Less expensive than cold-rolled and dimensionally looser, hot-rolled is the workhorse of structural work and sculptural pieces where surface finish is secondary to strength and form.",
    relatedTerms: ["cold-rolled-steel", "mild-steel", "cor-ten-steel", "blackened-steel"],
    sameAs: "https://en.wikipedia.org/wiki/Hot_rolling"
  },
  {
    term: "Hot Riveting",
    slug: slugify("Hot Riveting"),
    definition: "A traditional mechanical fastening method where a heated rivet is inserted through aligned holes and the trailing end is forged into a second head, locking the joint permanently. Unlike welding, riveting allows thermal expansion and contraction while maintaining structural integrity. I still use hot rivets on heritage restoration and high-end architectural gates.",
    relatedTerms: ["mortise-and-tenon", "collaring", "forging"],
    sameAs: "https://en.wikipedia.org/wiki/Riveting"
  },
  {
    term: "MIG Welding",
    slug: slugify("MIG Welding"),
    definition: "Metal Inert Gas welding—also called GMAW. A semi-automatic process using a continuously fed consumable wire electrode and shielding gas. MIG offers high deposition rates and is ideal for production work, structural fabrication, and joining thicker materials where speed outweighs the cosmetic perfection of TIG.",
    relatedTerms: ["tig-welding", "gtaw", "smaw"],
    sameAs: "https://en.wikipedia.org/wiki/Gas_metal_arc_welding"
  },
  {
    term: "Mild Steel",
    slug: slugify("Mild Steel"),
    definition: "Low-carbon steel containing less than 0.25% carbon, making it soft, ductile, and forgiving under the hammer. Mild steel is the backbone of architectural metalwork—easy to forge, weld, and finish. Most of my railings, furniture, and gates begin as mild steel before receiving their final patina or coating.",
    relatedTerms: ["hot-rolled-steel", "cold-rolled-steel", "blackened-steel", "cor-ten-steel"],
    sameAs: "https://en.wikipedia.org/wiki/Low-carbon_steel"
  },
  {
    term: "Mortise and Tenon",
    slug: slugify("Mortise and Tenon"),
    definition: "A fundamental woodworking joint adapted for metal, consisting of a projecting tenon that fits into a corresponding mortise hole. In blacksmithing, these joints are often hot-riveted or wedged after assembly, creating mechanical connections stronger than the parent material. Essential for traditional gates, railings, and heirloom furniture.",
    relatedTerms: ["hot-riveting", "drift", "forging", "collaring"],
    sameAs: "https://en.wikipedia.org/wiki/Mortise_and_tenon"
  },
  {
    term: "Patina",
    slug: slugify("Patina"),
    definition: "The surface character metal acquires through age, exposure, or chemical treatment. In my work, patina is never accidental—it's controlled through acids, heat, and proprietary solutions to achieve specific colors: deep browns for iron, verdigris for copper, gunmetal grey for steel. A proper patina protects the metal while telling a story.",
    relatedTerms: ["blackened-steel", "architectural-bronze", "cor-ten-steel", "powder-coating"],
    sameAs: "https://en.wikipedia.org/wiki/Patina"
  },
  {
    term: "Powder Coating",
    slug: slugify("Powder Coating"),
    definition: "A dry finishing process where electrostatically charged pigment particles adhere to metal, then cure into a durable skin under heat. Unlike paint, powder coating creates a uniform, chip-resistant finish available in virtually any color. Ideal for exterior railings and furniture in Northern Michigan where traditional finishes face salt, snow, and UV assault.",
    relatedTerms: ["patina", "blackened-steel", "mild-steel"],
    sameAs: "https://en.wikipedia.org/wiki/Powder_coating"
  },
  {
    term: "Power Hammer",
    slug: slugify("Power Hammer"),
    definition: "A mechanical or pneumatic forging machine that delivers controlled, repetitive blows with far greater force than hand hammering. The power hammer enables me to move heavy stock efficiently—shaping large scrolls, drawing thick bars, and texturing surfaces. It's an extension of the arm, not a replacement for skill.",
    relatedTerms: ["anvil", "forging", "drawing-out", "upsetting", "swage"],
    sameAs: "https://en.wikipedia.org/wiki/Power_hammer"
  },
  {
    term: "Scrollwork",
    slug: slugify("Scrollwork"),
    definition: "Decorative metalwork featuring spiral or volute forms, created by forging bar stock into graceful curves. Each scroll is shaped hot, using the anvil horn, bending forks, or the English wheel for tighter coils. Scrollwork transforms utilitarian railings and gates into architectural statements, bringing organic movement to rigid steel.",
    relatedTerms: ["forging", "anvil", "collaring", "english-wheel"],
    sameAs: "https://en.wikipedia.org/wiki/Scroll_(art)"
  },
  {
    term: "SMAW",
    slug: slugify("SMAW"),
    definition: "Shielded Metal Arc Welding—commonly called stick welding. An arc welding process using a consumable electrode coated in flux, which generates shielding gas and slag to protect the weld. SMAW is versatile, portable, and essential for field repairs and outdoor work in Northern Michigan where wind would blow away shielding gases used in other processes.",
    relatedTerms: ["tig-welding", "mig-welding", "gtaw"],
    sameAs: "https://en.wikipedia.org/wiki/Shielded_metal_arc_welding"
  },
  {
    term: "Swage",
    slug: slugify("Swage"),
    definition: "A tool or die used to shape metal by forcing it into a predetermined form, or the act of performing such shaping. Swages can create decorative profiles, tenon shoulders, or uniform reductions. In traditional joinery, matching swage dies ensure tenons fit mortises with precision that welding cannot match.",
    relatedTerms: ["fuller", "drift", "forging", "mortise-and-tenon", "collaring"],
    sameAs: "https://en.wikipedia.org/wiki/Swage"
  },
  {
    term: "TIG Welding",
    slug: slugify("TIG Welding"),
    definition: "Tungsten Inert Gas welding—also known as GTAW. A precision arc welding process using a non-consumable tungsten electrode and separate filler metal. The operator controls heat with a foot pedal, making TIG ideal for cosmetic welds on visible architectural elements. Every exposed weld on my high-end furniture and railings is laid down with TIG precision.",
    relatedTerms: ["gtaw", "mig-welding", "smaw"],
    sameAs: "https://en.wikipedia.org/wiki/Gas_tungsten_arc_welding"
  },
  {
    term: "Upsetting",
    slug: slugify("Upsetting"),
    definition: "The forging operation of compressing heated steel to increase its cross-sectional area while reducing length—the inverse of drawing out. By hammering end-on or using the power hammer's dies, the smith builds mass at a specific point for tenons, decorative collars, or mechanical strength. Essential for creating the visual weight traditional joinery demands.",
    relatedTerms: ["drawing-out", "forging", "collaring", "anvil", "power-hammer"],
    sameAs: "https://en.wikipedia.org/wiki/Upset_forging"
  }
];

// Sort alphabetically for display
export const GLOSSARY_TERMS_ALPHABETICAL = [...GLOSSARY_TERMS].sort((a, b) =>
  a.term.localeCompare(b.term, 'en', { sensitivity: 'base' })
);

// Get unique first letters for A-Z navigation
export const GLOSSARY_LETTERS = Array.from(
  new Set(GLOSSARY_TERMS.map(t => t.term.charAt(0).toUpperCase()))
).sort();

// Lookup helper for related terms
export function getTermBySlug(slug: string): GlossaryTerm | undefined {
  return GLOSSARY_TERMS.find(t => t.slug === slug);
}
