/**
 * Categories Data
 *
 * Single source of truth for category metadata used by both
 * /categories (hub) and /categories/:slug (detail) pages.
 */

import type { GalleryItem } from './gallery-items';

export type Category = {
  slug: string;
  name: string;
  displayName: string;
  tagline: string;
  heroImage: string;
  whatItIs: string;
  whyItMatters: string[];
  materials: string[];
  useCases: string[];
  priceRange: string;
  faqs: { q: string; a: string }[];
  relatedSlugs: string[];
  keywords: string[];
};

/**
 * Slug → Category name mapping
 * Used to find the correct category from URL params
 */
export const SLUG_TO_NAME: Record<string, string> = {
  'railings-fences-and-gates': 'Railings, Fences, and Gates',
  'custom-furniture': 'Custom Furniture',
  'commercial': 'Commercial',
  'art-and-decor': 'Art and Decor',
  'doors-and-windows': 'Doors and Windows',
  'behind-the-scenes': 'Behind the Scenes',
  'custom-projects': 'Custom Projects',
  'outdoor-metal-decor': 'Outdoor Metal Decor',
  'kitchens-and-bar-tops': 'Kitchens & Bar Tops',
};

/**
 * Category name → Slug mapping
 */
export const NAME_TO_SLUG: Record<string, string> = Object.fromEntries(
  Object.entries(SLUG_TO_NAME).map(([slug, name]) => [name, slug])
);

/**
 * Helper to get category by slug
 */
export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find(c => c.slug === slug);
}

/**
 * Helper to get related categories
 */
export function getRelatedCategories(slugs: string[]): Category[] {
  return CATEGORIES.filter(c => slugs.includes(c.slug));
}

/**
 * All 9 categories with full AIO/AEO/SEO metadata
 */
export const CATEGORIES: Category[] = [
  {
    slug: 'railings-fences-and-gates',
    name: 'Railings, Fences, and Gates',
    displayName: 'Railings, Fences, and Gates',
    tagline: 'Architectural metalwork that defines boundaries with absolute authority',
    heroImage: '/gallery-images/CustomSecurity_NaturesGate1.jpeg',
    whatItIs: `Railings, fences, and gates represent the intersection of safety and statement-making design. Unlike mass-produced aluminum alternatives that rattle in the wind and corrode within seasons, hand-forged steel installations from my Traverse City forge are engineered to last generations. Every piece begins as raw stock—mild steel, stainless, or wrought iron—that I heat to 2,000+ degrees and shape using traditional blacksmithing techniques refined over 25 years at the anvil.

A railing is not merely a safety barrier; it dictates the physical boundary of a space with architectural precision. From sweeping spiral staircases in Lake Leelanau estates to heavy-duty perimeter fencing for Northern Michigan farms, each run is forged to exact dimensions that integrate seamlessly with wood, stone, glass, and modern building materials. Gates serve as the handshake of a property—they must swing with engineered precision while carrying the aesthetic weight of the estate, whether that means intricate scrollwork, nature-themed cutouts, or minimalist industrial lines.`,
    whyItMatters: [
      `In Northern Michigan, where lake-effect snow, freeze-thaw cycles, and salt spray from winter roads create punishing conditions for outdoor metalwork, material selection and finishing technique matter more than aesthetics alone. Powder coating provides a baked-on protective layer, but traditional oil-rubbed or chemically-induced patinas penetrate deeper into the steel grain, creating a finish that ages beautifully while maintaining structural integrity.`,
      `The difference between a railing that lasts 10 years and one that lasts 100 comes down to joinery. While welded joints dominate modern fabrication, traditional mortise-and-tenon connections combined with structural riveting create mechanical bonds that flex with temperature changes rather than cracking. For high-traffic commercial installations or multi-generational family homes, this longevity justifies the investment in master craftsmanship over commodity manufacturing.`,
      `Code compliance is non-negotiable for architectural railings. All structural installations include stamped engineering calculations and adhere to IBC (International Building Code) requirements for height, spacing, and load-bearing capacity. Whether you're a homeowner seeking peace of mind or a contractor needing documentation for permit approval, every railing installation includes the paperwork required for legal compliance.`,
    ],
    materials: ['Mild Steel', 'Stainless Steel', 'Wrought Iron', 'Cor-Ten Weathering Steel', 'Bronze Accents'],
    useCases: [
      'Interior spiral staircases and balcony guards',
      'Exterior deck and porch railings',
      'Driveway entry gates (single or double swing)',
      'Pedestrian walkway gates and garden entries',
      'Pool enclosures and safety barriers',
      'Commercial guardrails and ADA-compliant handrails',
    ],
    priceRange: '$4,000 per 10 linear feet and up; driveway gates from $12,000',
    faqs: [
      /* HIDDEN (prices unverified by owner) — restore this FAQ when pricing is confirmed:
      {
        q: 'How much does a custom railing cost?',
        a: 'Pricing is calculated per linear foot and varies based on scrollwork complexity, steel gauge, finish selection, and installation requirements. A basic industrial railing starts around $400 per linear foot installed, while ornate spiral staircases with intricate scrollwork can exceed $800 per linear foot. Site visits are required for firm quotes on all railing projects.',
      },
      */
      {
        q: 'Do custom steel railings rust in Northern Michigan winters?',
        a: 'When properly protected with zinc primer and baked-on powder coat or deep-penetrating oil finishes, steel railings resist rust even in harsh lake-effect snow zones. The key is proper drainage design—water must not pool in crevices. I engineer all outdoor installations with weep holes and slope considerations.',
      },
      {
        q: 'How long does a custom gate take to build?',
        a: 'Driveway gates typically require 8–12 weeks from design approval to installation. Pedestrian gates move faster at 6–8 weeks. Timeline factors include complexity of scrollwork, automation requirements (motorized openers), and integration with existing masonry or wood posts.',
      },
      {
        q: 'Can you match an existing historical gate or railing style?',
        a: 'Yes. Using traditional blacksmithing techniques including hand-forging, mortise-and-tenon joinery, and riveting, I can recreate historical styles from photographs or physical remnants. This is particularly valuable for historic home renovations and preservation projects.',
      },
      {
        q: 'Do you handle the installation or just fabrication?',
        a: 'I handle both fabrication and installation for all projects within Northern Michigan (Grand Traverse, Leelanau, Antrim, and Benzie counties). For out-of-state clients, I can fabricate crated components with detailed installation instructions for local contractors.',
      },
    ],
    relatedSlugs: ['doors-and-windows', 'custom-furniture', 'commercial'],
    keywords: [
      'custom railings Traverse City',
      'hand-forged gates Northern Michigan',
      'spiral staircase railings',
      'driveway gates Leelanau',
      'wrought iron fencing',
      'steel balcony guards',
      'architectural railings',
      'ADA compliant handrails',
    ],
  },

  {
    slug: 'custom-furniture',
    name: 'Custom Furniture',
    displayName: 'Custom Furniture',
    tagline: 'Heirloom pieces built to hold the weight of generations',
    heroImage: '/gallery-images/CustomIndoor-CounterTop-2.jpeg',
    whatItIs: `Custom furniture represents the antithesis of mass production. While factory-made pieces rattle, wobble, and ultimately fail within years, hand-forged steel furniture from my Traverse City workshop is engineered as structural sculpture—pieces intended to serve families for generations. Every table base, stool frame, shelving unit, and console begins as raw steel stock that I heat in the forge and shape using techniques unchanged since the Industrial Revolution.

The magic happens at the intersection of steel and complementary materials. Dining tables pair forged steel trestle bases with thick-cut live-edge lumber from Northern Michigan hardwoods. Bar seating combines steel frames with reclaimed barnwood or custom upholstery. Console tables feature steel bases with stone, glass, or wood tops. This hybrid approach allows each piece to exist simultaneously as functional furniture and sculptural art.`,
    whyItMatters: [
      `Mass-produced furniture relies on spot welds and thin-gauge tubing that fatigues under load and vibration. My pieces use 1/4-inch plate minimum for structural elements, with joinery techniques including through-tenons, structural rivets, and full-penetration welds that create mechanical bonds stronger than the parent material. A dining table built this way doesn't just hold Thanksgiving dinner—it holds the memory of every gathering for a century.`,
      `Finish selection determines both aesthetics and longevity. Powder coating provides a uniform, durable surface ideal for high-traffic commercial furniture. Hot-rolled steel with clear coat celebrates the material's industrial origin with visible mill scale. Oil-rubbed patinas create rich, variegated surfaces that darken beautifully with age. For pieces where the steel should whisper rather than shout, blackened steel provides a sophisticated, near-black finish that pairs elegantly with any interior palette.`,
      `Scale considerations separate architectural furniture from decorative metalwork. A 10-foot dining table supporting a 3-inch solid wood top requires engineering calculations to prevent sagging and joint failure. I provide structural documentation for all large-scale furniture, ensuring pieces meet load requirements without excessive weight that makes them impractical to move or install.`,
    ],
    materials: ['Mild Steel', 'Blackened Steel', 'Hot-Rolled Steel', 'Bronze', 'Stainless Steel', 'Reclaimed Barnwood', 'Live-Edge Hardwood', 'Stone', 'Glass'],
    useCases: [
      'Dining tables and kitchen islands',
      'Console and sofa tables',
      'Bar stools and counter seating',
      'Industrial shelving units',
      'Benches and ottomans',
      'Coffee and side tables',
      'Commercial bar seating',
    ],
    priceRange: '$2,500 per piece and up; dining tables from $4,500',
    faqs: [
      {
        q: 'How long does a custom table take to build?',
        a: 'Furniture commissions typically require 6–10 weeks from final design approval to delivery. Complex pieces with intricate joinery or mixed materials (steel + wood + stone) may extend to 12 weeks. Rush fees apply for timelines under 6 weeks.',
      },
      {
        q: 'Can you work with wood I already have?',
        a: 'Yes. Many clients provide sentimental lumber—barn beams from family property, trees felled from their land, or reclaimed timbers with personal history. I engineer steel bases specifically for the dimensions, weight, and structural characteristics of your wood.',
      },
      {
        q: 'Do you deliver and install furniture?',
        a: 'Local delivery and installation is included for all projects within 50 miles of Traverse City. For regional or national shipping, I crate furniture professionally with custom foam padding and coordinate freight delivery to your door.',
      },
      {
        q: 'How do I maintain steel furniture?',
        a: 'Powder-coated pieces require only occasional cleaning with mild soap and water. Oil-rubbed or patinated surfaces benefit from annual application of furniture wax to maintain luster. Avoid abrasive cleaners that can scratch protective finishes.',
      },
      {
        q: 'Can furniture be designed to come apart for moving?',
        a: 'Absolutely. For large dining tables or console pieces that may need to navigate tight staircases or move between homes, I engineer bolt-together joints that maintain structural integrity while allowing disassembly.',
      },
    ],
    relatedSlugs: ['kitchens-and-bar-tops', 'commercial', 'art-and-decor'],
    keywords: [
      'custom steel furniture Traverse City',
      'hand-forged dining tables',
      'metal bar stools Northern Michigan',
      'industrial shelving',
      'live edge steel tables',
      'custom console tables',
      'barnwood furniture',
      'heirloom furniture',
    ],
  },

  {
    slug: 'commercial',
    name: 'Commercial',
    displayName: 'Commercial Installations',
    tagline: 'Architectural metalwork for restaurants, breweries, and retail spaces',
    heroImage: '/gallery-images/GypsyFarms_CustomBarBuild7-2.jpeg',
    whatItIs: `Commercial installations demand a different scale of thinking than residential work. When a restaurant serves 200 covers per night, bar foot rails must withstand relentless impact. When a brewery hosts thousands of visitors weekly, custom metalwork must project permanence while surviving constant use. My commercial portfolio spans Traverse City, Petoskey, and throughout Northern Michigan, including full-scale renovations for Silver Spruce Brewing, Riverwalk Grill, Gypsy Farms, Union Cantina, High-Five Spirits, and Bonobo Winery.

The scope of commercial work extends far beyond single pieces to encompass complete interior transformations. This includes structural bar builds with integrated foot rails and glass racks, heavy-duty signage that withstands lake-effect winters, restaurant dividers that create intimate spaces within open floor plans, and ADA-compliant railings that don't compromise aesthetic vision. Every installation includes direct collaboration with architects, interior designers, and general contractors to ensure metalwork integrates seamlessly with the broader build-out.`,
    whyItMatters: [
      `Commercial spaces require materials and finishes that balance aesthetics with extreme durability. While a residential railing might see occasional use, a brewery's bar structure faces constant impact from stools, kegs, and cleaning equipment. I specify heavier gauge materials (3/16-inch minimum for high-traffic surfaces), reinforced joinery, and commercial-grade powder coatings rated for 10+ years of heavy use.`,
      `Code compliance for commercial spaces is significantly more stringent than residential. All commercial installations meet ADA requirements, IBC structural standards, and local fire codes. I provide stamped engineering drawings for load-bearing elements and coordinate with licensed structural engineers when required for permit approval.`,
      `Timeline coordination makes or breaks commercial projects. A restaurant can't delay opening because metalwork isn't installed. I work backward from your hard deadlines, fabricating components off-site while construction progresses, then executing final installation during the final week before opening. This parallel-track approach has helped numerous Northern Michigan establishments open on schedule.`,
    ],
    materials: ['Mild Steel', 'Stainless Steel', 'Hot-Rolled Steel', 'Bronze', 'Copper', 'Powder Coat', 'Patina Finishes'],
    useCases: [
      'Full bar builds with integrated structure',
      'Commercial foot rails and glass racks',
      'Heavy-duty blade signs and exterior signage',
      'Restaurant booth dividers and partitions',
      'Brewery taproom installations',
      'Wine display systems',
      'ADA-compliant commercial railings',
      'Host stands and service stations',
    ],
    priceRange: '$15,000 for partial installations; full renovations from $50,000',
    faqs: [
      {
        q: 'Do you install commercial pieces or just fabricate?',
        a: 'I handle both fabrication and installation for all commercial spaces in Northern Michigan. For projects outside the region, I can fabricate crated components with detailed installation packets for your local contractors.',
      },
      {
        q: 'Can you work with our existing design team?',
        a: "Absolutely. I regularly collaborate with architects, interior designers, and general contractors. I can work from CAD drawings, napkin sketches, or purely conceptual direction. The earlier I'm involved in the design process, the more value I can add regarding material selection and structural feasibility.",
      },
      {
        q: 'How do you handle tight commercial timelines?',
        a: 'Commercial projects run on parallel tracks—metalwork fabrication happens simultaneously with other construction phases. For a typical restaurant build, I begin fabrication once designs are approved, then execute final installation during the last week before opening.',
      },
      {
        q: 'Do commercial installations require special permits?',
        a: 'Most commercial metalwork requires building permits and inspections. I provide stamped engineering drawings for all load-bearing elements and coordinate with structural engineers when code requires. Permit assistance is included in commercial project management.',
      },
      {
        q: 'Can you match our brand aesthetic?',
        a: 'Yes. From sleek modern minimalism to rustic farmhouse charm to industrial grit, I adapt materials, finishes, and design vocabulary to align with your brand identity. Portfolio examples range from ultra-modern winery installations to heritage-style brewery builds.',
      },
    ],
    relatedSlugs: ['custom-furniture', 'kitchens-and-bar-tops', 'art-and-decor'],
    keywords: [
      'commercial metalwork Traverse City',
      'restaurant bar design Northern Michigan',
      'brewery metal installations',
      'commercial signage',
      'restaurant renovation metalwork',
      'hospitality design Michigan',
      'retail metal fixtures',
      'commercial ADA railings',
    ],
  },

  {
    slug: 'art-and-decor',
    name: 'Art and Decor',
    displayName: 'Art and Decor',
    tagline: 'Pure form unconstrained by pure function—sculptural metal art',
    heroImage: '/gallery-images/CustomMetalWallDecor1-2.jpeg',
    whatItIs: `Art and decor pieces represent the purest expression of blacksmithing craft—form unconstrained by the functional demands of railings or furniture. These are sculptures, wall hangings, and decorative focal points created for private collectors, public installations, and spaces where metalwork should command attention as fine art rather than blend into architecture.

The creative process for art pieces differs fundamentally from commissioned functional work. While a railing must meet specific dimensional and load requirements, a sculpture begins with pure concept—an emotion, a natural form, a geometric exploration. I work with collectors and designers through an iterative design process, developing maquettes (small-scale models) before committing to full-scale execution. This ensures the final piece achieves the intended impact while fitting its intended space.`,
    whyItMatters: [
      `Metal sculpture occupies a unique position in the art world—it combines the permanence of stone with the fluidity of clay. Hot-forged steel can achieve curves and textures impossible through machining or casting. Every hammer strike is an irreversible decision, making the creation process as much performance as fabrication. The resulting pieces carry the energy of their making, with surfaces that catch light differently throughout the day as shadows shift.`,
      `Scale dramatically affects impact. A 12-inch tabletop sculpture invites intimate contemplation, while a 12-foot wall installation transforms an entire room. I work across this entire spectrum, from modest accent pieces to monumental public commissions. Scale decisions influence material selection—larger pieces may incorporate Cor-Ten weathering steel for outdoor durability, while interior works might feature bronze or copper for warmer tonal qualities.`,
      `Installation considerations separate art from commodity decor. Heavy wall pieces require structural mounting into studs or blocking. Outdoor sculptures need engineered foundations that resist wind uplift. Ceiling-suspended installations demand load calculations and proper hardware. Every commissioned piece includes detailed installation guidance or professional installation services.`,
    ],
    materials: ['Mild Steel', 'Bronze', 'Copper', 'Cor-Ten Weathering Steel', 'Stainless Steel', 'Mixed Media'],
    useCases: [
      'Large-scale wall sculptures and panels',
      'Tabletop and mantel accent pieces',
      'Public plaza installations',
      'Corporate lobby focal points',
      'Estate garden sculptures',
      'Custom signage with artistic flair',
      'Ceiling-suspended kinetic pieces',
    ],
    priceRange: '$800 for accent pieces; large sculptures from $5,000',
    faqs: [
      /* HIDDEN (prices unverified by owner) — restore this FAQ when pricing is confirmed:
      {
        q: 'How do you price custom metal sculptures?',
        a: 'Sculpture pricing depends on scale, complexity, material selection, and installation requirements. Small wall pieces start around $800, while large-scale public installations can exceed $25,000. I provide detailed quotes after design development and maquette approval.',
      },
      */
      {
        q: 'Can you create art from my concept or sketch?',
        a: 'Yes. Many commissions begin with client concepts—a favorite natural form, a meaningful symbol, or an abstract idea. I develop these concepts through sketches and maquettes before full-scale fabrication begins.',
      },
      {
        q: 'How long does a sculpture commission take?',
        a: 'Small accent pieces (6–12 weeks). Large wall installations (10–16 weeks). Monumental public works (4–6 months). Timeline varies significantly based on complexity and scale.',
      },
      {
        q: 'Do you work with interior designers?',
        a: 'Regularly. Interior designers throughout Northern Michigan specify my work for luxury residential and commercial projects. I can work from design direction, mood boards, or purely conceptual conversations to create pieces that anchor intended spatial narratives.',
      },
      {
        q: 'Can sculptures be installed outdoors?',
        a: 'Yes, with proper material selection and installation. Cor-Ten steel develops a protective rust patina ideal for outdoor exposure. Powder-coated mild steel works well in sheltered outdoor areas. All outdoor installations include engineered mounting specifications.',
      },
    ],
    relatedSlugs: ['outdoor-metal-decor', 'custom-furniture', 'doors-and-windows'],
    keywords: [
      'custom metal art Traverse City',
      'hand-forged sculptures',
      'metal wall art Northern Michigan',
      'bronze sculptures',
      'corporate art installations',
      'public art commissions',
      'estate garden sculptures',
      'luxury home art',
    ],
  },

  {
    slug: 'doors-and-windows',
    name: 'Doors and Windows',
    displayName: 'Doors and Windows',
    tagline: 'Architectural steel entryways and fenestration solutions',
    heroImage: '/gallery-images/CustomDoor-SlidingPantryBarnDoors2.jpg',
    whatItIs: `Steel doors and windows represent the ultimate expression of industrial elegance in residential and commercial architecture. Replacing wood with metal instantly changes the acoustic profile, tactile weight, and visual authority of an opening. Unlike aluminum alternatives that feel hollow and conduct heat, properly engineered steel fenestration provides thermal performance while maintaining incredibly narrow sightlines and substantial heft.

My door and window portfolio spans the spectrum from wine cellar gates to grand entryways, pivot doors to bi-fold systems. Each installation is engineered to house modern insulated glass while maintaining sightlines as narrow as 1.5 inches—impossible with wood frames. The steel itself becomes a design feature, available in finishes from raw industrial to sophisticated blackened surfaces, often complemented by hand-forged bronze hardware.`,
    whyItMatters: [
      `Steel fenestration solves problems wood and aluminum cannot. Pivot doors weighing hundreds of pounds operate smoothly on precision-engineered hardware systems. Steel casement windows achieve larger glass areas with narrower frames than any alternative material. The thermal break technology in modern steel systems prevents condensation and energy loss while maintaining the aesthetic qualities that make steel desirable.`,
      `Security considerations make steel the material of choice for high-value installations. Vault-style doors for wine cellars, panic rooms, or secure storage areas rely on steel's inherent strength and the precision achievable through fabrication. Custom locking systems, multi-point hardware, and reinforced frames provide protection that decorative alternatives cannot match.`,
      `Acoustic performance distinguishes steel fenestration in urban or high-traffic environments. The mass of steel frames, combined with proper glazing selection, provides superior sound dampening compared to aluminum or vinyl. For lakefront homes facing wind exposure or commercial spaces requiring acoustic separation, steel delivers measurable performance benefits.`,
    ],
    materials: ['Mild Steel', 'Stainless Steel', 'Bronze', 'Tempered Glass', 'Insulated Glass Units', 'Thermal Break Systems'],
    useCases: [
      'Grand entry pivot doors',
      'Wine cellar gates and doors',
      'Steel casement and awning windows',
      'Interior barn and sliding doors',
      'French doors and bi-fold systems',
      'Vault-style security doors',
      'Industrial office partitions',
      'Custom garage doors',
    ],
    priceRange: '$6,000 for interior doors; entry systems from $12,000',
    faqs: [
      {
        q: 'Do custom steel doors rust?',
        a: 'When properly protected with zinc primer and baked-on powder coat finish, steel doors resist rust even in harsh Northern Michigan climates. For exterior applications, I specify marine-grade powder coats and proper drainage design that prevents water pooling in frames.',
      },
      {
        q: 'Are steel doors energy efficient?',
        a: 'Modern steel door systems incorporate thermal break technology—polymer separators between interior and exterior metal faces that prevent thermal bridging. Combined with insulated glass units, steel doors can achieve U-factors comparable to high-performance wood alternatives.',
      },
      {
        q: 'Can steel doors accommodate smart locks?',
        a: 'Yes. I engineer steel doors to accept standard smart lock hardware or create custom integrated locking solutions. Strike plates, bore holes, and mortise pockets are fabricated to match your selected hardware specifications.',
      },
      {
        q: 'How heavy are steel doors?',
        a: 'Weight varies dramatically based on size and construction. A standard 3x7 interior steel door might weigh 150–200 pounds. Grand entry pivot doors can exceed 500 pounds. All installations include properly sized hinges, pivots, or sliding hardware rated for the specific weight.',
      },
      {
        q: 'Do you handle glass installation?',
        a: 'For standard tempered or insulated glass units, I coordinate with local glass suppliers for installation. For specialty glass (low-iron, textured, or custom configurations), I can fabricate frames to accommodate glass you source separately.',
      },
    ],
    relatedSlugs: ['railings-fences-and-gates', 'commercial', 'art-and-decor'],
    keywords: [
      'custom steel doors Traverse City',
      'steel windows Northern Michigan',
      'pivot doors',
      'wine cellar gates',
      'industrial barn doors',
      'steel French doors',
      'custom entry doors',
      'security doors',
    ],
  },

  {
    slug: 'behind-the-scenes',
    name: 'Behind the Scenes',
    displayName: 'Behind the Scenes',
    tagline: 'The process, the forge, and the making of metal mastery',
    heroImage: '/gallery-images/workshop1-2.jpeg',
    whatItIs: `Behind the scenes photography and documentation offers a window into the craft that produces the finished pieces in my portfolio. These images capture the forge at 2,000 degrees, the shower of sparks from angle grinders, the careful layout of complex cuts, and the quiet moments of detailed finishing work that transform raw steel into finished art.

Unlike other categories showcasing completed installations, this collection reveals the process—the hours of heating, hammering, grinding, welding, and finishing that precede delivery. For clients considering custom commissions, these process images provide insight into the craftsmanship that justifies investment in hand-forged work over mass-produced alternatives. For fellow craftspeople and enthusiasts, they document techniques ranging from traditional blacksmithing to modern fabrication.`,
    whyItMatters: [
      `Understanding process builds appreciation for product. A railing that appears simple in its final form may represent 40 hours of heating, bending, and joining individual scrolls. A gate that seems effortlessly elegant required careful engineering to swing properly while carrying aesthetic weight. Process photography makes this labor visible, helping clients understand what separates master craftsmanship from commodity fabrication.`,
      `Educational value extends beyond marketing. I regularly host workshops, mentor apprentices, and collaborate with design professionals who benefit from understanding how forged metalwork differs from cast, stamped, or bent alternatives. Documenting techniques—from riveting to patina application—preserves knowledge and elevates the craft.`,
      `Transparency matters in an era of automation and offshore manufacturing. These images prove that work marketed as "hand-forged" truly is—photographed in my Traverse City workshop, created by me personally rather than outsourced to fabricators or imported from overseas. For clients investing significant resources in custom architectural metalwork, this transparency builds trust.`,
    ],
    materials: ['Documentation', 'Process Photography', 'Technique Demos', 'Workshop Views'],
    useCases: [
      'Client education and transparency',
      'Portfolio storytelling',
      'Technique documentation',
      'Apprentice training materials',
      'Social media content',
      'Professional collaboration',
    ],
    priceRange: 'Educational content—no pricing applicable',
    faqs: [
      {
        q: 'Can I visit the workshop?',
        a: 'I welcome client visits by appointment during business hours. Seeing the forge, equipment, and work-in-progress helps clients understand the scale and capability of my operation. Contact me to schedule a visit.',
      },
      {
        q: 'Do you offer workshops or classes?',
        a: 'I occasionally offer introductory blacksmithing workshops for small groups. These sessions cover forge safety, heating technique, and basic hammer control. Sign up for my newsletter to hear about upcoming classes.',
      },
      {
        q: 'Will you document my project being made?',
        a: 'Yes. All commissions include process photography at key stages—initial layout, forge work, assembly, and finishing. These images become part of your project documentation and my portfolio.',
      },
      {
        q: 'How do traditional and modern techniques combine?',
        a: 'The best metalwork leverages both. Traditional hand-forging creates curves and textures impossible to machine. Modern TIG welding provides precision joints for structural elements. Computer layout ensures accuracy. The craft lies in knowing which technique serves each element of a design.',
      },
      {
        q: 'What equipment is in your workshop?',
        a: 'The forge includes a 200-pound Peter Wright anvil from the early 1900s, a propane forge capable of 2,300 degrees, hydraulic presses for controlled forming, TIG and MIG welding equipment, various grinders and saws, and a complete metal finishing setup for patinas and coatings.',
      },
    ],
    relatedSlugs: ['custom-projects', 'art-and-decor', 'custom-furniture'],
    keywords: [
      'blacksmith workshop Traverse City',
      'hand forging process',
      'metalworking techniques',
      'custom metalwork shop',
      'artisan metalworker',
      'master blacksmith',
    ],
  },

  {
    slug: 'custom-projects',
    name: 'Custom Projects',
    displayName: 'Custom Projects',
    tagline: 'One-of-a-kind solutions for impossible problems',
    heroImage: '/gallery-images/CustomStovehood1-2.jpeg',
    whatItIs: `The custom projects category captures commissions that defy easy categorization—the hardware, fixtures, and specialty pieces that don't fit neatly into railings, furniture, or art classifications. These are the solutions clients seek when standard products fail to address unique challenges: fireplace doors for irregular openings, custom range hoods that integrate with cabinetry, shelving systems for unusual wall configurations, and hardware pieces fabricated to match historical remnants.

This category represents the purest form of problem-solving through metalwork. A client describes a need—sometimes sketched on a napkin, sometimes explained through conversation—and I engineer a solution that didn't exist until we created it. The common thread is uniqueness: these are pieces unavailable through catalogs or showrooms, fabricated specifically for the spaces and requirements they serve.`,
    whyItMatters: [
      `Standard products force spaces to adapt to their limitations. Custom fabrication adapts to the space. A range hood can precisely fit an irregular ceiling pitch. A fireplace door can accommodate century-old masonry that settled unevenly. Hardware can match existing pieces from homes built in the 1800s. This flexibility justifies the investment in master craftsmanship for projects where standard solutions fail.`,
      `Integration challenges dominate custom work. New metal pieces must coexist with existing woodwork, stone, tile, or other materials. Finish matching, dimension precision, and installation sequencing require expertise that separates professional metalwork from amateur attempts. I provide site consultation, detailed measurements, and installation coordination that ensures seamless integration.`,
      `Historical restoration work falls into this category. When a historic home requires replacement hardware, fireplace equipment, or structural elements that match original materials and techniques, mass-produced alternatives destroy authenticity. I recreate historical pieces using traditional techniques—riveting, hand-forging, mortise-and-tenon joinery—that preserve architectural heritage.`,
    ],
    materials: ['Mild Steel', 'Stainless Steel', 'Bronze', 'Copper', 'Wrought Iron', 'Mixed Media'],
    useCases: [
      'Custom range hoods and vent covers',
      'Fireplace doors and screens',
      'Irregular shelving and storage',
      'Specialty hardware and hinges',
      'Historical restoration pieces',
      'Custom brackets and supports',
      'One-of-a-kind fixtures',
      'Problem-solving commissions',
    ],
    priceRange: '$1,500 and up depending on complexity',
    faqs: [
      {
        q: 'Can you recreate a historical piece I have?',
        a: 'Yes. Using traditional blacksmithing techniques, I can forge matching hardware or structural components that seamlessly integrate with historic restorations. Bring photos, measurements, or the original piece itself for accurate replication.',
      },
      {
        q: 'How do custom range hoods work with existing ventilation?',
        a: 'I design range hoods to interface with your specified ventilation system—whether ducted through walls or ceilings, or configured for recirculating installation. All necessary mounting points and clearances are engineered into the design.',
      },
      {
        q: 'Can you match my existing finish or hardware?',
        a: 'Finish matching is a specialty. I can replicate patinas, powder coat colors, and metal tones to ensure new pieces blend with existing work. For hardware matching, I can create functional replicas of antique pieces using traditional techniques.',
      },
      {
        q: 'Do you do site visits for complex installations?',
        a: 'Absolutely. Custom projects requiring precise fit—fireplace doors, range hoods, irregular shelving—always include site measurement and templating. This ensures pieces arrive ready for installation without field modifications.',
      },
      {
        q: 'What if I only have a rough idea of what I need?',
        a: "That's the starting point for most custom work. I work with rough sketches, verbal descriptions, or even just problems you need solved. Through conversation and preliminary drawings, we develop the design together.",
      },
    ],
    relatedSlugs: ['kitchens-and-bar-tops', 'doors-and-windows', 'outdoor-metal-decor'],
    keywords: [
      'custom metal fixtures Traverse City',
      'fireplace doors Northern Michigan',
      'custom range hoods',
      'historical restoration metalwork',
      'specialty hardware',
      'custom brackets',
      'problem solving metalwork',
    ],
  },

  {
    slug: 'outdoor-metal-decor',
    name: 'Outdoor Metal Decor',
    displayName: 'Outdoor Metal Decor',
    tagline: 'Durable beauty for gardens, patios, and exterior spaces',
    heroImage: '/gallery-images/outdoormetalguardrailfloral1.jpeg',
    whatItIs: `Outdoor metal decor encompasses pieces designed specifically for exterior environments—garden art, patio accents, functional outdoor items, and decorative elements that must withstand Northern Michigan's challenging climate while maintaining aesthetic appeal. Unlike indoor pieces protected from the elements, outdoor work requires material selection and finishing techniques that embrace weathering or actively resist corrosion.

This category includes both purely decorative pieces (sculptures, wall panels, ornamental accents) and functional outdoor items (fire safety enclosures, anchor hardware, privacy screens) that serve practical purposes while contributing to landscape design. All pieces are engineered for outdoor exposure, with materials and finishes selected based on specific environmental conditions—proximity to water, sun exposure, snow load, and wind conditions.`,
    whyItMatters: [
      `Material selection determines longevity in outdoor environments. Cor-Ten weathering steel develops a protective rust patina that stabilizes over time, requiring no maintenance while achieving a distinctive orange-brown surface that complements natural landscapes. Stainless steel and marine-grade aluminum resist corrosion in lakeside installations where salt spray accelerates oxidation of mild steel. The right material for the environment ensures pieces that improve with age rather than deteriorating.`,
      `Finish engineering for outdoor work differs fundamentally from indoor applications. While interior pieces might feature oil-rubbed or blackened surfaces, outdoor installations typically rely on powder coating, hot-dip galvanizing, or natural weathering processes. I specify finishes based on exposure conditions—full sun versus shade, proximity to water, and expected snow loads all influence material and coating recommendations.`,
      `Scale and anchoring considerations separate outdoor decor from interior work. A garden sculpture must withstand wind uplift without toppling. A wall-mounted piece must account for freeze-thaw expansion in masonry. Privacy screens must maintain structural integrity under snow load. Every outdoor installation includes engineering calculations for environmental loads and proper anchoring specifications.`,
    ],
    materials: ['Cor-Ten Weathering Steel', 'Stainless Steel', 'Mild Steel (with protective coating)', 'Bronze', 'Powder Coat', 'Hot-Dip Galvanizing'],
    useCases: [
      'Garden sculptures and focal pieces',
      'Privacy screens and panels',
      'Patio accent pieces',
      'Outdoor wall art and panels',
      'Functional outdoor enclosures',
      'Landscape integration pieces',
      'Water feature accents',
      'Driveway and entry markers',
    ],
    priceRange: '$800 for accent pieces; large installations from $3,500',
    faqs: [
      {
        q: 'Will outdoor metal decor rust?',
        a: 'Cor-Ten steel develops a stable protective rust patina that prevents further corrosion. Powder-coated or hot-dip galvanized pieces resist rust entirely. Unprotected mild steel will rust in outdoor conditions—this is only appropriate for specific aesthetic intentions with clients who understand the maintenance implications.',
      },
      {
        q: 'How do you anchor outdoor pieces?',
        a: 'Anchoring depends on piece scale and substrate. Small sculptures may use buried concrete footings. Wall-mounted pieces require structural attachment to framing or masonry anchors rated for the load. I provide detailed installation specifications for every outdoor piece.',
      },
      {
        q: 'Can outdoor decor withstand Northern Michigan winters?',
        a: 'Yes, with proper material selection and engineering. I specify heavier materials for snow-prone areas, ensure proper drainage to prevent ice damage, and use finishes rated for extreme temperature cycling. Pieces installed throughout Northern Michigan have survived decades of harsh winters.',
      },
      {
        q: 'Do you create pieces specifically for lakeside properties?',
        a: 'Regularly. Lakeside installations face unique challenges from salt spray, high winds, and intense sun exposure. I specify marine-grade materials and finishes specifically engineered for these conditions, ensuring pieces that maintain their appearance despite challenging environments.',
      },
      {
        q: 'Can outdoor pieces be moved seasonally?',
        a: 'Many smaller pieces can be designed with mobility in mind—integrated handles, manageable weights, or mounting systems that allow seasonal relocation. Discuss mobility requirements during design consultation if this is important for your installation.',
      },
    ],
    relatedSlugs: ['railings-fences-and-gates', 'art-and-decor', 'custom-projects'],
    keywords: [
      'outdoor metal art Traverse City',
      'garden sculptures Northern Michigan',
      'patio metal decor',
      'weathering steel art',
      'outdoor privacy screens',
      'landscape metalwork',
      'lakeside metal decor',
      'cor-ten sculptures',
    ],
  },

  {
    slug: 'kitchens-and-bar-tops',
    name: 'Kitchens & Bar Tops',
    displayName: 'Kitchens & Bar Tops',
    tagline: 'Industrial elegance for culinary spaces',
    heroImage: '/gallery-images/CustomCopperBartops1-2.jpeg',
    whatItIs: `Kitchens and bar tops represent the specialized intersection of metalwork and culinary spaces—surfaces, accents, and structural elements that must withstand food preparation demands while contributing to interior design. This category encompasses steel countertops, copper bar tops, custom range hoods, kitchen islands with integrated metal components, and complete kitchen builds where metal serves as the dominant material.

Unlike general furniture or custom projects categories, kitchen and bar work requires specific expertise in food-safe finishes, heat management around cooking equipment, and integration with plumbing, electrical, and ventilation systems. These installations become the heart of homes and commercial establishments, spaces where families gather and businesses serve—requiring both durability under daily use and aesthetic appeal that elevates the entire environment.`,
    whyItMatters: [
      `Material selection for culinary spaces balances aesthetics with food safety and practicality. Copper and bronze develop natural antimicrobial properties, making them ideal for bar tops where hygiene matters. Steel countertops provide industrial durability unmatched by stone alternatives—resistant to heat, stains, and impact. Hot-rolled steel with clear coat or food-safe oil finishes celebrates the material's character while maintaining safe preparation surfaces.`,
      `Heat management distinguishes professional kitchen installations from amateur work. Range hoods must accommodate ventilation requirements without creating fire hazards. Surfaces near cooking equipment must withstand thermal cycling without warping or finish failure. Integration with existing or planned appliances requires detailed coordination that separates master craftsmanship from basic metal fabrication.`,
      `Finish selection for culinary spaces considers daily use patterns. Bar tops see constant contact with glassware, spills, and cleaning chemicals. Countertops endure cutting, heat transfer from pots, and aggressive cleaning. I specify finishes based on intended use—polished copper for showpiece bars that will develop beautiful patinas, sealed steel for workhorse kitchens that prioritize durability over aging character.`,
    ],
    materials: ['Hot-Rolled Steel', 'Copper', 'Bronze', 'Stainless Steel', 'Food-Safe Finishes', 'Clear Coats', 'Waxes'],
    useCases: [
      'Steel kitchen countertops and islands',
      'Copper bar tops and drink rails',
      'Custom range hoods and vents',
      'Kitchen shelving and storage',
      'Bar foot rails and accents',
      'Complete kitchen builds',
      'Backsplash and accent panels',
      'Wine storage integration',
    ],
    priceRange: '$3,500 for countertops; full kitchen builds from $25,000',
    faqs: [
      {
        q: 'Are steel countertops food-safe?',
        a: 'Yes, with proper finishing. I use food-safe clear coats, waxes, or oil finishes specifically rated for food contact. Unlike raw steel which can transfer metallic flavors and rust, properly sealed steel countertops provide safe, durable preparation surfaces that develop character while remaining hygienic.',
      },
      {
        q: 'How do copper bar tops age?',
        a: 'Copper develops a living finish that evolves with use. New copper is bright and reflective. Over months of contact with drinks, air, and cleaning, it develops warm brown tones, then eventually green patina in areas of high oxidation. Many clients prize this evolution; others prefer sealed copper that maintains its original color. Both options are available.',
      },
      {
        q: 'Can you integrate with my existing kitchen?',
        a: 'Yes. I regularly fabricate individual elements—range hoods, countertops, shelving—that integrate with existing cabinetry and appliances. Site measurement and templating ensure precise fit with your current kitchen layout.',
      },
      {
        q: 'How do I maintain steel or copper kitchen surfaces?',
        a: 'Sealed steel requires only normal cleaning with mild soap. Avoid abrasive scrubbers that can scratch protective finishes. Copper can be left to develop natural patina or periodically polished to restore shine. I provide detailed care instructions specific to your finish selection.',
      },
      {
        q: 'Do you handle installation and hookups?',
        a: "I handle the metalwork installation and coordinate with your plumber, electrician, and HVAC contractor for necessary connections. For range hoods, I ensure proper clearances and mounting for ventilation connections. For countertops, I template, fabricate, and install while coordinating with countertop fabricators if we're combining materials.",
      },
    ],
    relatedSlugs: ['custom-furniture', 'commercial', 'custom-projects'],
    keywords: [
      'custom steel countertops Traverse City',
      'copper bar tops Northern Michigan',
      'custom range hoods',
      'industrial kitchen design',
      'steel kitchen islands',
      'bar design metalwork',
      'kitchen renovation metalwork',
      'food safe metal finishes',
    ],
  },
];

/**
 * Helper to filter gallery items by category
 */
export function getItemsByCategory(items: GalleryItem[], categoryName: string): GalleryItem[] {
  return items.filter(item => item.category === categoryName);
}

/**
 * Get total photo count for a category (main images + child images)
 */
export function getCategoryPhotoCount(items: GalleryItem[], categoryName: string): number {
  return items
    .filter(item => item.category === categoryName)
    .reduce((total, item) => total + item.images.length + (item.childImages?.length ?? 0), 0);
}
