export type GalleryItem = {
  id: number;
  category: 'Railings, Fences, and Gates' | 'Custom Furniture' | 'Commercial' | 'Art and Decor' | 'Doors and Windows' | 'Behind the Scenes' | 'Custom Projects';
  title: string;
  description: string;
  image: string;
  childImages?: {
    url: string;
    alt: string;
  }[];
  isCategoryImage?: boolean;
};

export type CategoryShowcase = {
  category: GalleryItem['category'];
  url: string;
  alt: string;
  description: string;
};

export const categories = [
  'All',
  'Railings, Fences, and Gates',
  'Custom Furniture',
  'Commercial',
  'Art and Decor',
  'Doors and Windows',
  'Behind the Scenes',
  'Custom Projects'
] as const;

export const categoryShowcases: CategoryShowcase[] = [
  {
    category: 'Railings, Fences, and Gates',
    url: "/gallery-images/CustomMetalRailing4-1.jpeg",
    alt: "Custom Railings and Gates Showcase",
    description: "Durable, long-lasting, and stylish"
  },
  {
    category: 'Custom Furniture',
    url: "/gallery-images/CustomIndoorShelving.jpeg",
    alt: "Custom Furniture Showcase",
    description: "View hand-crafted custom metal furniture, from stools to lighting fixtures"
  },
  {
    category: 'Commercial',
    url: "/gallery-images/BusinessBartop1.jpeg",
    alt: "Commercial Projects Showcase",
    description: "Experience the transformation of commercial spaces with my custom installations"
  },
  {
    category: 'Art and Decor',
    url: "/gallery-images/CustomMetalWallDecor1-1.jpeg",
    alt: "Art and Decor Showcase",
    description: "Browse through my hand-crafted metal wall art and decor"
  },
  {
    category: 'Doors and Windows',
    url: "/gallery-images/CustomMetalDoor1-5.jpeg",
    alt: "Doors and Windows Showcase",
    description: "Discover stylish, industrial door and window solutions"
  },
  {
    category: 'Behind the Scenes',
    url: "/gallery-images/workshop1.jpeg",
    alt: "Behind the Scenes Showcase",
    description: "Discover the detail-driven process of my projects, from idea to completion"
  },
  {
    category: 'Custom Projects',
    url: "/gallery-images/CustomStovehood1.jpeg",
    alt: "Custom Projects Showcase",
    description: "Browse my customized indoor solutions"
  }
];

export const galleryItems: GalleryItem[] = [
  // Custom Projects
  {
    id: 1,
    category: 'Custom Projects',
    title: 'Hand-Forged Iron Privacy Screen',
    description: 'A beautiful custom metal privacy screen, suspended from reclaimed barnwood beams, overlooking the stunning West Grand Traverse Bay',
    image: '/gallery-images/outdoormetalguardrailfloral1.jpeg',
    childImages: [
      { url: '/gallery-images/outdoormetalguardrailfloral1-1.jpeg', alt: 'Front view' },
      { url: '/gallery-images/outdoormetalguardrailfloral1-2.jpeg', alt: 'Up-close view' },
      { url: '/gallery-images/outdoormetalguardrailfloral1-3.jpeg', alt: 'From rough metal' },
      { url: '/gallery-images/outdoormetalguardrailfloral1-4.jpeg', alt: 'To a Polished Finished Product' }
    ]
  },
  // Commercial Projects
  {
    id: 2,
    category: 'Commercial',
    title: 'Bonobo Winery Transformation!',
    description: 'Bonobo Winery in Traverse City, MI gets a full indoor transformation!',
    image: '/gallery-images/BonoboWinery1.jpeg',
    childImages: [
      { url: '/gallery-images/BonoboWinery2.jpeg', alt: 'Front view' },
      { url: '/gallery-images/BonoboWinery3.jpeg', alt: 'Custom sliding interior barn doors' }
    ]
  },
  {
    id: 3,
    category: 'Commercial',
    title: 'Riverwalk Grill',
    description: 'Riverwalk Grill gets a full renovation to create a modern, industrial dining experience',
    image: '/gallery-images/RiverwalkGrill4.jpeg',
    childImages: [
      { url: '/gallery-images/RiverwalkGrill2.jpeg', alt: 'High-end, industrial bar design' },
      { url: '/gallery-images/RiverwalkGrill3.jpeg', alt: 'Hand-forged, custom metal wall decor' },
      { url: '/gallery-images/RiverwalkGrill1.jpeg', alt: 'Custom metal bar sign for Riverwalk Grill' },
      { url: '/gallery-images/RiverwalkGrill5.jpeg', alt: 'Full commercial bar renovation' },
      { url: '/gallery-images/RiverwalkGrill6.jpeg', alt: 'Riverwalk Grill custom metal Taproom sign' },
      { url: '/gallery-images/RiverwalkGrill7.jpeg', alt: 'Custom-built cozy booths' },
      { url: '/gallery-images/RiverwalkGrill8.jpeg', alt: 'Custom wall decor' },
      { url: '/gallery-images/RiverwalkGrill9.jpeg', alt: 'Fully renovated dining spaces' }
    ]
  },
  {
    id: 4,
    category: 'Commercial',
    title: 'Silver Spruce Brewing co. in Traverse City, MI',
    description: 'Silver Spruce Brewing co. in Traverse City, MI gets a full renovation to create a modern, industrial dining experience',
    image: '/gallery-images/SilverSpruceBrewingco6.jpeg',
    childImages: [
      { url: '/gallery-images/SilverSpruceBrewingco2.jpeg', alt: 'Custom bar design, side-view' },
      { url: '/gallery-images/SilverSpruceBrewingco3.jpeg', alt: 'Custom-built railing, bar, and stools' },
      { url: '/gallery-images/SilverSpruceBrewingco4.jpeg', alt: 'Reclaimed barnwood beams connected by heavy-duty custom brackets' },
      { url: '/gallery-images/SilverSpruceBrewingco5.jpeg', alt: 'Front-view of finished bar with custom stools and lighting' },
      { url: '/gallery-images/SilverSpruceBrewingco7.jpeg', alt: 'Custom bar accents and decor' },
      { url: '/gallery-images/SilverSpruceBrewingco8.jpeg', alt: 'Fully custom seating for 25+ customers at once' },
      { url: '/gallery-images/SilverSpruceBrewingco9.jpeg', alt: 'Handcrafted steel beer taps with custom metal signage' }
    ]
  },
  //Railings, Fences, and Gates
  {
    id: 5,
    category: 'Railings, Fences, and Gates',
    title: 'Handcrafted Metal Railing',
    description: 'A custom railing solution for a Traverse City homeowner',
    image: '/gallery-images/metalrailing3-1.jpeg',
    childImages: [
      { url: '/gallery-images/metalrailing3-2.jpeg', alt: 'Custom safety rails around staircase' },
      { url: '/gallery-images/metalrailing3-3.jpeg', alt: 'Looking up from the first floor' },
      { url: '/gallery-images/metalrailing3-5.jpeg', alt: 'Looking down from the second floor' }
    ]
  },
  //Doors and Windows
  {
    id: 6,
    category: 'Doors and Windows',
    title: 'Hand-Forged, Solid Steel Door',
    description: 'Industrial-style steel door with custom hardware, made-to-fit',
    image: '/gallery-images/CustomMetalDoor1 2.jpeg',
    childImages: [
      { url: '/gallery-images/CustomMetalDoor1-1 2.jpeg', alt: 'Installation process' },
      { url: '/gallery-images/CustomMetalDoor1-2 2.jpeg', alt: 'Detail view' }
    ]
  },
  //Custom Furniture
  {
    id: 7,
    category: 'Custom Furniture',
    title: 'Wood Block Table',
    description: 'A handcrafted, block-style table with custom metal legs and accents',
    image: '/gallery-images/custom-table-woodblocks1.jpeg',
    childImages: [
      { url: '/gallery-images/custom-table-woodblocks1-1.jpeg', alt: 'Hand-forged, solid steel legs and accents' }
    ]
  },
  {
    id: 8,
    category: 'Railings, Fences, and Gates',
    title: 'Handforged Steel Gate',
    description: 'Custom-crafted masonary-style gate, hand-forged from steel',
    image: '/gallery-images/CustomGate_MasonaryBricks1 2.jpeg',
    childImages: [
      { url: '/gallery-images/CustomGate_MasonaryBricks2 2.jpeg', alt: 'Custom-built to fit on custom steel brackets' },
      { url: '/gallery-images/CustomGate_MasonaryBricks3 2.jpeg', alt: 'Custom metal gate handle' }
    ]
  },
  {
    id: 9,
    category: 'Railings, Fences, and Gates',
    title: 'Custom Nature-Themed Steel Gate',
    description: 'A beautiful, handcrafted steel gate built for a driveway',
    image: '/gallery-images/CustomGate_FloralDesign1-2.jpeg',
    childImages: [
      { url: '/gallery-images/CustomGate_FloralDesign1-3.jpeg', alt: 'Custom metal gate handle' },
      { url: '/gallery-images/CustomGate_FloralDesign1-4.jpeg', alt: 'Custom metal gate handle' },
      { url: '/gallery-images/CustomGate_FloralDesign1-5.jpeg', alt: 'Custom metal gate handle' }
    ]
  },
  {
    id: 10,
    category: 'Railings, Fences, and Gates',
    title: 'Custom Bear Gate, Hand-Forged from Steel',
    description: 'Custom built driveway gate with an intricate bear design',
    image: '/gallery-images/CustomGate_Bear1 2.jpeg',
    childImages: [
      { url: '/gallery-images/CustomGate_Bear1-1 2.jpeg', alt: 'Complete installation build includes posts, gate, and custom hardware boxes' }
    ]
  },
  {
    id: 11,
    category: 'Railings, Fences, and Gates',
    title: 'Custom Steel Security Gate and Fencing',
    description: 'Custom-built steel gate and fencing, nature-themed and expertly crafted',
    image: '/gallery-images/CustomSecurity_NaturesGate1.jpeg',
    childImages: [
      { url: '/gallery-images/CustomSecurity_NaturesFence1-3.jpeg', alt: 'Meticulous attention to detail' },
      { url: '/gallery-images/CustomSecurity_NaturesFence1-2.jpeg', alt: 'Secondary view of the fencing' },
      { url: '/gallery-images/CustomSecurity_NaturesFence1-4.jpeg', alt: 'Another view of the security solution' }
    ]
  },
  {
    id: 12,
    category: 'Art and Decor',
    title: 'Olive Branch - Hand-Forged Metal Wall Decor',
    description: 'A beautiful metallic, natural accent for any space',
    image: '/gallery-images/CustomMetalWallDecor1 2.jpeg',
    childImages: [
      { url: '/gallery-images/CustomMetalWallDecor1-1 2.jpeg', alt: 'Up-close, detailed view of the finished piece' }
    ],
    isCategoryImage: false
  },
  {
    id: 14,
    category: 'Commercial',
    title: 'Villa Mari Custom Wine Displays',
    description: 'A comprehensive and custom wine storage solution, featuring metal spiraling bottle displays and custom-fitted storage racks',
    image: '/gallery-images/VillaMari1.jpeg',
    childImages: [
      { url: '/gallery-images/VillaMari2.jpeg', alt: 'Side view of the metal spiral wine rack, seamlessly integrated into a barrel display.' },
      { url: '/gallery-images/VillaMari3.jpeg', alt: 'A broader look at the custom-built wine storage, featuring multiple handcrafted racks.' },
      { url: '/gallery-images/VillaMari4.jpeg', alt: 'An expanded view of the custom wine storage, showcasing elegant metal craftsmanship.' },
      { url: '/gallery-images/VillaMari5.jpeg', alt: 'A wider perspective on the handcrafted barrel wine racks, emphasizing scale and function.' },
      { url: '/gallery-images/VillaMari6.jpeg', alt: 'A tabletop metal wine holder, integrating artistic curves into a compact design.' },
      { url: '/gallery-images/VillaMari7.jpeg', alt: 'A sleek, suspended metal shelf system, blending wine storage with modern aesthetics.' },
      { url: '/gallery-images/VillaMari8.jpeg', alt: 'A showroom-ready display featuring metal-framed storage and boutique presentation.' }
    ],
    isCategoryImage: false
  },
  {
    id: 15,
    category: 'Commercial',
    title: 'Union Cantina Metalwork Project 1',
    description: 'A completely hand-forged renovation of Union Cantina in Traverse City, Michigan',
    image: '/gallery-images/UnionCantina1.jpeg',
    childImages: [
      { url: '/gallery-images/UnionCantina2.jpeg', alt: 'Close-up of the sunburst metal light fixture, radiating warmth and ambiance.' },
      { url: '/gallery-images/UnionCantina3.jpeg', alt: 'A long view of the interior featuring handcrafted metal chairs and rustic wood tables.' },
      { url: '/gallery-images/UnionCantina4.jpeg', alt: 'Another perspective showcasing the metal-accented seating area and industrial lighting.' },
      { url: '/gallery-images/UnionCantina5.jpeg', alt: 'A view from the entrance, highlighting the fusion of metal, wood, and ambient lighting.' },
      { url: '/gallery-images/UnionCantina6.jpeg', alt: 'A cozy corner featuring metal-framed furniture and candle-lit ambiance.' },
      { url: '/gallery-images/UnionCantina7.jpeg', alt: 'A close-up of the custom metal dining chairs, designed for both comfort and elegance.' }
    ],
    isCategoryImage: false
  },
  {
    id: 16,
    category: 'Custom Furniture',
    title: 'Industrial Steel & Wood Table',
    description: 'A handcrafted steel-reinforced wooden table with a riveted metal edge for a bold industrial touch.',
    image: '/gallery-images/Custom-Steel-Table2 2.jpeg',
    childImages: [],
    isCategoryImage: false
  },
  {
    id: 17,
    category: 'Custom Furniture',
    title: 'Steel & Wood Bar Stool',
    description: 'A stunning fusion of sleek black steel and beautifully grained wood, designed for both style and durability.',
    image: '/gallery-images/Custom-SteelandWood-Stool2.jpeg',
    childImages: [
      { url: '/gallery-images/Custom-SteelandWood-Stool2-1.jpeg', alt: 'Side view of the handcrafted steel and wood bar stool, highlighting the unique grain pattern.' }
    ],
    isCategoryImage: false
  },
  {
    id: 18,
    category: 'Art and Decor',
    title: 'Hand-Forged Boat Anchor',
    description: 'A fully functional, hand-forged steel anchor with a rugged, weathered finish for an authentic maritime aesthetic.',
    image: '/gallery-images/Custom-BoatAnchor.jpeg',
    childImages: [],
    isCategoryImage: false
  },
  {
    id: 19,
    category: 'Art and Decor',
    title: 'Handcrafted Metal Candle Holder',
    description: 'An elegant wall-mounted candle holder with hand-formed scrolling metal leaves, blending rustic charm with fine craftsmanship.',
    image: '/gallery-images/Custom-CandleHolder 2.jpeg',
    childImages: [],
    isCategoryImage: false
  },
  {
    id: 20,
    category: 'Railings, Fences, and Gates',
    title: 'Custom Handrails for Seniors',
    description: 'Expertly crafted metal handrails, blending form and function for enhanced safety without sacrificing aesthetics.',
    image: '/gallery-images/Custom-Crafted Handrails for seniors1.jpeg',
    childImages: [
      { url: '/gallery-images/Custom-Crafted Handrails for seniors2.jpeg', alt: 'A wide-angle view showcasing the sturdy, elegant metal handrails along a landscaped path.' },
      { url: '/gallery-images/Custom-Crafted Handrails for seniors2-1.jpeg', alt: 'A closer look at the smooth metal finish and precision welds of the handrail design.' },
      { url: '/gallery-images/Custom-Crafted Handrails for seniors2-2.jpeg', alt: 'Handrails installed along a lakeside property, providing safety with a sleek, unobtrusive look.' }
    ],
    isCategoryImage: false
  },
  {
    id: 21,
    category: 'Art and Decor',
    title: 'Custom Fire Safety Box',
    description: 'A sleek, modern fire extinguisher cabinet with a bold cutout flame design, adding both style and functionality to safety.',
    image: '/gallery-images/Custom-FireSafetyBox1 2.jpeg',
    childImages: [
      { url: '/gallery-images/Custom-FireSafetyBox2 2.jpeg', alt: 'Detailed description of the image' }
    ],
    isCategoryImage: false
  },
  {
    id: 22,
    category: 'Railings, Fences, and Gates',
    title: 'Elegant Front Entrance Railing',
    description: 'A set of beautifully crafted wrought iron entrance rails, adding an inviting touch to this grand front entryway.',
    image: '/gallery-images/Custom-FrontEntranceRails 2.jpeg',
    childImages: [],
    isCategoryImage: false
  },
  {
    id: 23,
    category: 'Art and Decor',
    title: 'Hand-Forged Metal Dish Bowl',
    description: 'A rustic, hammered steel dish bowl with scroll feet, perfect for adding a handcrafted touch to any space.',
    image: '/gallery-images/Custom-MetalDishbowl 2.jpeg',
    childImages: [
      { url: '/gallery-images/Custom-MetalDishbowl2 2.jpeg', alt: 'Detailed description of the image' }
    ],
    isCategoryImage: false
  },
  {
    id: 24,
    category: 'Art and Decor',
    title: 'Twisted Steel Hook',
    description: 'A hand-forged metal hook featuring a twisted design, sturdy enough for heavy-duty use with a refined look.',
    image: '/gallery-images/Custom-MetalHook 2.jpeg',
    childImages: [
      { url: '/gallery-images/Custom-MetalHook2 2.jpeg', alt: 'Detailed description of the image' }
    ],
    isCategoryImage: false
  },
  {
    id: 25,
    category: 'Art and Decor',
    title: 'Hand-Forged Wine Rack',
    description: 'A rugged, industrial-style wine rack crafted from raw steel, designed to hold bottles in a sturdy and artistic way.',
    image: '/gallery-images/Custom-WineRack1.jpeg',
    childImages: [
      { url: '/gallery-images/Custom-WineRack2 2.jpeg', alt: 'Detailed description of the image' },
      { url: '/gallery-images/Custom-WinRack3 2.jpeg', alt: 'Detailed description of the image' }
    ],
    isCategoryImage: false
  },
  {
    id: 26,
    category: 'Custom Furniture',
    title: 'Live Edge Metal-Leg Bench',
    description: 'A handcrafted live-edge wood bench with custom-forged metal legs, combining rustic charm with industrial strength.',
    image: '/gallery-images/CustomBench1 2.jpeg',
    childImages: [
        { url: '/gallery-images/CustomBench1-1 2.jpeg', alt: 'Close-up of the custom metal legs, showcasing hand-forged details and polished mounting plates.' }
      ],
      isCategoryImage: false
    },
    {
      id: 27,
      category: 'Custom Furniture',
      title: 'Polished Bronze Bar Tops',
      description: 'Luxurious handcrafted bronze bar tops, meticulously polished for a sleek and reflective finish.',
      image: '/gallery-images/CustomBronzeBartops1 2.jpeg',
      isCategoryImage: false
    },
    {
      id: 28,
      category: 'Custom Projects',
      title: 'Custom Pergola Sun Screen',
      description: 'An artistic metal pergola sun screen, casting intricate patterned shadows while providing stylish shade.',
      image: '/gallery-images/CustomCrafted Pergola SunScreen1.jpeg',
      childImages: [
        { url: '/gallery-images/CustomCrafted Pergola SunScreen1-2.jpeg', alt: 'Alternative pergola design with a different intricate pattern, creating a striking interplay of light and shadow.' }
      ],
      isCategoryImage: false
    }, 
    {
      id: 29,
      category: 'Behind the Scenes',
      title: 'Custom Steel Privacy Screen Process',
      description: 'See how I crafted a custom steel privacy screen, from sketch to cutting',
      image: '/gallery-images/customsheetpatternprocess1-1.jpeg',
      childImages: [
        { url: '/gallery-images/customsheetpatternprocess1.jpeg', alt: 'Alternate angle of the steel privacy screen, showcasing the intricate pattern and design elements.' },
        { url: '/gallery-images/customsheetpatternprocess1-2.jpeg', alt: 'Close-up of the steel privacy screen, showcasing the intricate pattern and design elements.' }
      ],
    },
    {
      id: 30,
      category: 'Custom Furniture',
      title: 'Industrial Steel Kitchen Countertop',
      description: 'A bold steel kitchen countertop with a rugged industrial edge, seamlessly integrated into a rustic-modern space.',
      image: '/gallery-images/CustomIndoor-CounterTop 2.jpeg',
      isCategoryImage: false
    },
    {
      id: 31,
      category: 'Custom Projects',
      title: 'Modern Steel Fireplace Surround',
      description: 'A sleek steel fireplace surround, blending contemporary aesthetics with industrial strength in a modern home setting.',
      image: '/gallery-images/CustomIndoor-SteelFireplace1 2.jpeg',
      childImages: [
        { url: '/gallery-images/CustomIndoor-SteelFireplace2 2.jpeg', alt: 'Alternate angle of the steel fireplace surround, showcasing its towering structure and seamless finish.' }
      ],
      isCategoryImage: false
    },
    {
      id: 32,
      category: 'Railings, Fences, and Gates',
      title: 'Handcrafted Metal Stair Railing',
      description: 'A meticulously crafted wrought iron stair railing featuring elegant scrollwork and twisted balusters.',
      image: '/gallery-images/CustomIndoorRailing1 2.jpeg',
      childImages: [
        { url: '/gallery-images/CustomIndoorRailing1-2.jpeg', alt: 'Another angle of the decorative metal stair railing, emphasizing intricate details and craftsmanship.' },
        { url: '/gallery-images/CustomIndoorRailing1-3.jpeg', alt: 'Close-up of the custom metal handrail, highlighting smooth curves and secure mounting points.' }
      ],
      isCategoryImage: false
    },
    {
      id: 33,
      category: 'Custom Furniture',
      title: 'Minimalist Floating Metal Shelves',
      description: 'Sleek and modern floating metal shelves with a rounded frame, seamlessly integrated into the wall for a contemporary aesthetic.',
      image: '/gallery-images/CustomIndoorShelving 2.jpeg',
      isCategoryImage: false
    },
    {
      id: 34,
      category: 'Art and Decor',
      title: 'Hand-Forged Utensil Set',
      description: 'A unique set of hand-forged metal utensils, blending artistry with functionality in an elegant rustic design.',
      image: '/gallery-images/CustomMetal-Utensils1 2.jpeg',
      childImages: [
        { url: '/gallery-images/CustomMetal-Utensils2 2.jpeg', alt: 'Close-up of a custom-forged utensil with a twisted handle and textured blade.' }
      ],
      isCategoryImage: false
    },
    {
      id: 35,
      category: 'Art and Decor',
      title: 'Steel Angel Silhouette Sculpture',
      description: 'A striking handcrafted angel sculpture, featuring layered steel wings and a raw industrial finish.',
      image: '/gallery-images/CustomMetalDecor1 2.jpeg',
      isCategoryImage: false
    },
    {
      id: 36,
      category: 'Art and Decor',
      title: 'Forged Metal Cross Stand',
      description: 'A beautifully detailed hand-cut metal cross with an ornate design, mounted on a solid steel base.',
      image: '/gallery-images/CustomMetalDecor2 2.jpeg',
      isCategoryImage: false
    },
    {
      id: 37,
      category: 'Railings, Fences, and Gates',
      title: 'Wrought Iron Vineyard Gate',
      description: 'A handcrafted vineyard-inspired metal gate, adorned with intricate grapevine details and elegant curves.',
      image: '/gallery-images/CustomMetalGate1 2.jpeg',
      childImages: [
        { url: '/gallery-images/CustomMetalGate1-1 2.jpeg', alt: 'Alternate view of the vineyard gate, highlighting detailed metalwork and scenic backdrop.' }
      ],
      isCategoryImage: false
    },
    {
      id: 38,
      category: 'Railings, Fences, and Gates',
      title: 'Nature-Inspired Metal Stair Railing',
      description: 'A custom metal stair railing featuring an organic tree-branch design, adding a natural aesthetic to the space.',
      image: '/gallery-images/CustomMetalRailing1 2.jpeg',
      childImages: [
        { url: '/gallery-images/CustomMetalRailing1-2 2.jpeg', alt: 'Side angle of the branch-inspired railing, showing intricate craftsmanship and fluidity of design.' }
      ],
      isCategoryImage: false
    },
    {
      id: 39,
      category: 'Railings, Fences, and Gates',
      title: 'Artistic Wavy Metal Railings',
      description: 'A collection of wavy-patterned metal railings, adding a contemporary artistic touch to stairways and open spaces.',
      image: '/gallery-images/CustomMetalRailing2 2.jpeg',
      childImages: [
        { url: '/gallery-images/CustomMetalRailing2-1 2.jpeg', alt: 'Alternate perspective of the wavy metal railing, showcasing its modern fluid lines.' }
      ],
      isCategoryImage: false
    },
    {
      id: 40,
      category: 'Railings, Fences, and Gates',
      title: 'Striking Geometric Railing',
      description: 'A custom-crafted geometric railing design',
      image: '/gallery-images/CustomMetalRailing5.jpeg',
      childImages: [],
      isCategoryImage: false
    },
    {
      id: 41,
      category: 'Railings, Fences, and Gates',
      title: 'Elegant Metal and Wood Stair Railing',
      description: 'A striking metal railing with interwoven organic shapes, paired beautifully with warm wooden handrails for a timeless aesthetic.',
      image: '/gallery-images/CustomMetalRailing4.jpeg',
      childImages: [
        { url: '/gallery-images/CustomMetalRailing4-1.jpeg', alt: 'Alternate view of the metal and wood stair railing, emphasizing its handcrafted details.' },
        { url: '/gallery-images/CustomMetalRailing4-2.jpeg', alt: 'Close-up showcasing the precise metalwork and seamless wood integration.' }
      ],
      isCategoryImage: false
    },
    {
      id: 42,
      category: 'Commercial',
      title: 'Gypsy Farms Renovation',
      description: 'Full Interior Design and Renovation at Gypsy Farms in Petoskey, Michigan',
      image: '/gallery-images/GypsyFarms_CustomBarBuild7 2.jpeg',
      childImages: [
        { url: '/gallery-images/GypsyFarms_CustomBarBuild3.jpeg', alt: 'Alternate view of the interior, showcasing the custom metal work and rustic wood tables.' },
        { url: '/gallery-images/GypsyFarms_CustomBarBuild2.jpeg', alt: 'Close-up of the custom metal chairs, adding both comfort and elegance to the space.' },
        { url: '/gallery-images/GypsyFarms_CustomLightFixtures1 2.jpeg', alt: 'View of the kitchen, showcasing the custom cabinetry and wood countertops.' },
        { url: '/gallery-images/GypsyFarms_CustomLightFixtures1-1 2.jpeg', alt: 'Close-up of the custom metal bar, adding both style and functionality to the space.' },
        { url: '/gallery-images/GypsyFarms_CustomLightFixtures1-2 2.jpeg', alt: 'View of the living room, showcasing the custom textiles and wood flooring.' },
        { url: '/gallery-images/GypsyFarms_CustomVanity1 2.jpeg', alt: 'Close-up of the custom metal coffee table, adding both style and functionality to the space.' },
        { url: '/gallery-images/GypsyFarms_CustomVanity1-1 2.jpeg', alt: 'View of the dining room, showcasing the custom wood and metal chairs.' },
        { url: '/gallery-images/GypsyFarms_CustomVanity1-2.jpeg', alt: 'Close-up of the custom metal console table, adding both style and functionality to the space.' }
      ],
      isCategoryImage: false
    },
    {
      id: 43,
      category: 'Commercial',
      title: 'High-Five Spirits Bar',
      description: 'Complete interior bar redesign at High-Five Spirits in Traverse City, Michigan',
      image: '/gallery-images/HighFiveSpirits7.jpeg',
      childImages: [
        { url: '/gallery-images/HighFiveSpirits3.jpeg', alt: 'Alternate view of the interior, showcasing the custom metal work and rustic wood tables.' },
        { url: '/gallery-images/HighFiveSpirits4.jpeg', alt: 'Close-up of the custom metal chairs, adding both comfort and elegance to the space.' },
        { url: '/gallery-images/HighFiveSpirits5.jpeg', alt: 'View of the kitchen, showcasing the custom cabinetry and wood countertops.' },
        { url: '/gallery-images/HighFiveSpirits6.jpeg', alt: 'Close-up of the custom metal bar, adding both style and functionality to the space.' },
        { url: '/gallery-images/HighFiveSpirits1.jpeg', alt: 'View of the living room, showcasing the custom textiles and wood flooring.' },
        { url: '/gallery-images/HighFiveSpirits2.jpeg', alt: 'Team Photo at High-Five Spirits after renovation!' }
      ],
      isCategoryImage: false
    },
    {
      id: 44,
      category: 'Custom Furniture',
      title: 'Live-Edge Side Table',
      description: 'A side table featuring a live-edge wood surface, adding a unique and rustic feel to the space.',
      image: '/gallery-images/Handcrafted-Decorative-Side-Table1.jpeg',
    },
    {
      id: 45,
      category: 'Custom Furniture',
      title: 'Handcrafted Metal Stair Railing',
      description: 'A decorative metal stair railing, featuring intricate details and a sturdy construction, adding a unique touch to a home setting.',
      image: '/gallery-images/CustomIndoorRailing1 2.jpeg',
    }
];
