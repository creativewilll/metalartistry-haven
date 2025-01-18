export type GalleryItem = {
  id: number;
  category: 'Railings, Fences, and Gates' | 'Custom Furniture' | 'Commercial' | 'Art and Decor' | 'Doors and Windows' | 'Behind the Scenes' | 'Custom Indoor Projects';
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
  'Custom Indoor Projects'
] as const;

export const categoryShowcases: CategoryShowcase[] = [
  {
    category: 'Railings, Fences, and Gates',
    url: "/lovable-uploads/CustomMetalRailing4-1.JPG",
    alt: "Custom Railings and Gates Showcase",
    description: "Explore our custom metalwork for your property"
  },
  {
    category: 'Custom Furniture',
    url: "/lovable-uploads/CustomIndoorShelving.jpeg",
    alt: "Custom Furniture Showcase",
    description: "View our custom furniture pieces"
  },
  {
    category: 'Commercial',
    url: "/lovable-uploads/BusinessBartop1.jpeg",
    alt: "Commercial Projects Showcase",
    description: "See our commercial installations"
  },
  {
    category: 'Art and Decor',
    url: "/lovable-uploads/CustomMetalWallDecor1-1.jpeg",
    alt: "Art and Decor Showcase",
    description: "Browse our artistic metalwork"
  },
  {
    category: 'Doors and Windows',
    url: "/lovable-uploads/CustomMetalDoor1-5.jpeg",
    alt: "Doors and Windows Showcase",
    description: "Discover our door and window solutions"
  },
  {
    category: 'Behind the Scenes',
    url: "/lovable-uploads/workshop1.jpeg",
    alt: "Behind the Scenes Showcase",
    description: "Experience our craftsmanship process"
  },
  {
    category: 'Custom Indoor Projects',
    url: "/lovable-uploads/CustomStovehood1.jpeg",
    alt: "Custom Indoor Projects Showcase",
    description: "Discover our indoor metalwork solutions"
  }
];

export const galleryItems: GalleryItem[] = [
  // Commercial Projects
  {
    id: 1,
    category: 'Commercial',
    title: 'Business Posts',
    description: 'Custom metalwork for commercial space',
    image: '/lovable-uploads/BulkBusiness1-Posts.jpg'
  },
  {
    id: 2,
    category: 'Commercial',
    title: 'Commercial Door Handles',
    description: 'Custom-designed metal handles for commercial doors',
    image: '/lovable-uploads/BulkBusiness2-Handles.jpeg'
  },
  {
    id: 3,
    category: 'Commercial',
    title: 'Commercial Bed Rails',
    description: 'Heavy-duty bed rails for commercial use',
    image: '/lovable-uploads/BulkBusiness3-bedrails.jpg'
  },
  {
    id: 4,
    category: 'Commercial',
    title: 'Commercial Bar Top',
    description: 'Custom metalwork bar top installation',
    image: '/lovable-uploads/BusinessBartop1.jpeg'
  },
  {
    id: 5,
    category: 'Commercial',
    title: 'Commercial Vanity Installation',
    description: 'Custom vanity setup for commercial space',
    image: '/lovable-uploads/CustomCommercialVanity1.jpeg',
    childImages: [
      {
        url: '/lovable-uploads/CustomCommercialVanity2.jpeg',
        alt: 'Detail view of commercial vanity'
      }
    ]
  },
  
  // Railings, Fences, and Gates
  {
    id: 6,
    category: 'Railings, Fences, and Gates',
    title: 'Custom Bear Gate',
    description: 'Unique bear-themed gate design',
    image: '/lovable-uploads/Custom-BearGate1.jpeg',
    childImages: [
      {
        url: '/lovable-uploads/Custom-BearGate2.jpeg',
        alt: 'Additional view of bear gate'
      }
    ]
  },
  {
    id: 7,
    category: 'Railings, Fences, and Gates',
    title: 'Front Entrance Rails',
    description: 'Elegant front entrance railing system',
    image: '/lovable-uploads/Custom-FrontEntranceRails.jpeg'
  },
  
  // Doors and Windows
  {
    id: 8,
    category: 'Doors and Windows',
    title: 'Custom Metal Door',
    description: 'Modern metal door with unique design',
    image: '/lovable-uploads/CustomMetalDoor1.jpeg',
    childImages: [
      {
        url: '/lovable-uploads/CustomMetalDoor1-1.jpeg',
        alt: 'Installation process'
      },
      {
        url: '/lovable-uploads/CustomMetalDoor1-2.jpeg',
        alt: 'Detail view'
      }
    ]
  },
  
  // Custom Furniture
  {
    id: 9,
    category: 'Custom Furniture',
    title: 'Custom Steel Stool Collection',
    description: 'Handcrafted steel stools with modern design',
    image: '/lovable-uploads/CustomSteelStool1.jpeg',
    childImages: [
      {
        url: '/lovable-uploads/CustomSteelStool1-1.jpeg',
        alt: 'Alternative view of steel stool'
      }
    ]
  },
  {
    id: 10,
    category: 'Custom Furniture',
    title: 'Custom Side Table',
    description: 'Modern metal side table with unique design',
    image: '/lovable-uploads/Custom-SideTable1.jpeg'
  },
  {
    id: 11,
    category: 'Custom Furniture',
    title: 'Steel Accented Table',
    description: 'Table with custom steel accents',
    image: '/lovable-uploads/Custom-SteelAccentedTable1.jpeg'
  },
  
  // Art and Decor
  {
    id: 12,
    category: 'Art and Decor',
    title: 'Custom Wine Rack',
    description: 'Artistic wine storage solution',
    image: '/lovable-uploads/Custom-WineRack1.jpg',
    childImages: [
      {
        url: '/lovable-uploads/Custom-WineRack2.jpeg',
        alt: 'Detail view of wine rack'
      }
    ]
  },
  {
    id: 13,
    category: 'Art and Decor',
    title: 'Metal Wall Art',
    description: 'Custom metal wall decoration',
    image: '/lovable-uploads/CustomMetalWallDecor1.jpeg',
    childImages: [
      {
        url: '/lovable-uploads/CustomMetalWallDecor1-1.jpeg',
        alt: 'Close-up of wall art detail'
      }
    ]
  },
  {
    id: 14,
    category: 'Art and Decor',
    title: 'Custom Fire Poker Set',
    description: 'Handcrafted fire poker set with stand',
    image: '/lovable-uploads/Custom-FirePokerSet1.jpeg',
    childImages: [
      {
        url: '/lovable-uploads/Custom-FirePokerSet2.jpeg',
        alt: 'Detail view of fire poker set'
      }
    ]
  },
  
  // Behind the Scenes
  {
    id: 15,
    category: 'Behind the Scenes',
    title: 'Workshop Process',
    description: 'Behind the scenes of our metalwork creation',
    image: '/lovable-uploads/workshop1.jpeg'
  },
  {
    id: 16,
    category: 'Behind the Scenes',
    title: 'Metal Railing Installation Process',
    description: 'Step-by-step installation of custom metal railings',
    image: '/lovable-uploads/CustomMetalRails1PROCESS1.jpeg',
    childImages: [
      {
        url: '/lovable-uploads/CustomMetalRails-PROCESS2.JPG',
        alt: 'Detailed view of installation process'
      }
    ]
  },
  {
    id: 17,
    category: 'Behind the Scenes',
    title: 'Stove Hood Fabrication',
    description: 'Behind the scenes of custom stove hood creation',
    image: '/lovable-uploads/CustomStovehood-PROCESS1.jpg',
    childImages: [
      {
        url: '/lovable-uploads/CustomStovehood1.jpeg',
        alt: 'Final installation result'
      }
    ]
  },
  {
    id: 18,
    category: 'Behind the Scenes',
    title: 'Masonry Gate Construction',
    description: 'The process of building and installing a custom masonry gate',
    image: '/lovable-uploads/CustomMasonaryGate-Process1.jpeg',
    childImages: [
      {
        url: '/lovable-uploads/CustomMasonaryGate3.jpeg',
        alt: 'Installation progress'
      },
      {
        url: '/lovable-uploads/CustomMasonaryGate4.jpeg',
        alt: 'Final stages of installation'
      }
    ]
  },
  {
    id: 19,
    category: 'Behind the Scenes',
    title: 'Indoor Barn Door Installation',
    description: 'Step-by-step process of indoor barn door project',
    image: '/lovable-uploads/IndoorBarnBuildPROCESS1.jpeg',
    childImages: [
      {
        url: '/lovable-uploads/IndoorBarnBuildPROCESS1-2.jpeg',
        alt: 'Installation techniques and methods'
      }
    ]
  },
  
  // Additional Commercial Projects
  {
    id: 20,
    category: 'Commercial',
    title: 'Wood Accent Stools',
    description: 'Custom metal and wood stools for commercial space',
    image: '/lovable-uploads/BulkBusiness4-WoodAccentStools1.jpg',
    childImages: [
      {
        url: '/lovable-uploads/BulkBusiness4-WoodAccentStools2.jpeg',
        alt: 'Additional view of wood accent stools'
      }
    ]
  },
  {
    id: 21,
    category: 'Commercial',
    title: 'Custom Machine Stands',
    description: 'Industrial yoga machine stands',
    image: '/lovable-uploads/BulkBusiness5-YogaMachineStands.jpeg',
    childImages: [
      {
        url: '/lovable-uploads/BulkBusiness5-Legs1.jpeg',
        alt: 'Detail of stand legs'
      }
    ]
  },
  {
    id: 22,
    category: 'Commercial',
    title: 'Bronze Bar Tops',
    description: 'Custom bronze bar tops for commercial space',
    image: '/lovable-uploads/CustomBronzeBartops1.jpeg'
  },

  // Additional Railings, Fences, and Gates
  {
    id: 23,
    category: 'Railings, Fences, and Gates',
    title: 'Custom Bronze Rails',
    description: 'Elegant bronze railing installation',
    image: '/lovable-uploads/CustomBronzeRails1.jpeg'
  },
  {
    id: 24,
    category: 'Railings, Fences, and Gates',
    title: 'Custom Ranch Gate',
    description: 'Durable ranch entrance gate',
    image: '/lovable-uploads/CustomRanchGate1.jpeg'
  },
  {
    id: 25,
    category: 'Railings, Fences, and Gates',
    title: 'Beach Property Railing',
    description: 'Corrosion-resistant steel railing for beach property',
    image: '/lovable-uploads/CustomSteel-BeachRail1.jpeg',
    childImages: [
      {
        url: '/lovable-uploads/CustomSteel-BeachRail2.jpeg',
        alt: 'Additional view of beach railing'
      }
    ]
  },
  {
    id: 26,
    category: 'Railings, Fences, and Gates',
    title: 'Custom Fencing System',
    description: 'Modern metal fencing installation',
    image: '/lovable-uploads/CustomFencing1.JPG',
    childImages: [
      {
        url: '/lovable-uploads/CustomFencing1-2.JPG',
        alt: 'Detail of fencing connection'
      },
      {
        url: '/lovable-uploads/CustomFencing1-3.JPG',
        alt: 'Corner view of fencing'
      }
    ]
  },
  {
    id: 27,
    category: 'Railings, Fences, and Gates',
    title: 'Indoor Railing Project',
    description: 'Custom interior railing system',
    image: '/lovable-uploads/CustomIndoorRailing1-2.JPG',
    childImages: [
      {
        url: '/lovable-uploads/CustomIndoorRailing1-3.JPG',
        alt: 'Detail of indoor railing'
      }
    ]
  },

  // Additional Custom Furniture
  {
    id: 28,
    category: 'Custom Furniture',
    title: 'Custom Bench Design',
    description: 'Modern metal and wood bench',
    image: '/lovable-uploads/CustomBench1.jpeg',
    childImages: [
      {
        url: '/lovable-uploads/CustomBench1-1.jpeg',
        alt: 'Side view of custom bench'
      }
    ]
  },
  {
    id: 29,
    category: 'Custom Furniture',
    title: 'Steel Barn Storage',
    description: 'Custom steel storage solution for barn',
    image: '/lovable-uploads/CustomSteelBarnRack.jpeg'
  },
  {
    id: 30,
    category: 'Custom Furniture',
    title: 'Indoor Counter Top',
    description: 'Custom metal counter top installation',
    image: '/lovable-uploads/CustomIndoor-CounterTop.jpeg'
  },

  // Additional Art and Decor
  {
    id: 31,
    category: 'Art and Decor',
    title: 'Custom Candle Holder',
    description: 'Artistic metal candle holder',
    image: '/lovable-uploads/Custom-CandleHolder.jpeg'
  },
  {
    id: 32,
    category: 'Art and Decor',
    title: 'Decorative Metal Hook',
    description: 'Custom designed metal hook',
    image: '/lovable-uploads/Custom-MetalHook.jpeg',
    childImages: [
      {
        url: '/lovable-uploads/Custom-MetalHook2.jpeg',
        alt: 'Alternative view of metal hook'
      }
    ]
  },
  {
    id: 33,
    category: 'Art and Decor',
    title: 'Custom Metal Bowl',
    description: 'Handcrafted metal dish bowl',
    image: '/lovable-uploads/Custom-MetalDishbowl.jpeg'
  },
  {
    id: 34,
    category: 'Art and Decor',
    title: 'Metal Utensil Set',
    description: 'Custom designed metal utensils',
    image: '/lovable-uploads/CustomMetal-Utensils1.jpeg',
    childImages: [
      {
        url: '/lovable-uploads/CustomMetal-Utensils2.jpeg',
        alt: 'Detail of utensil set'
      }
    ]
  },
  {
    id: 35,
    category: 'Art and Decor',
    title: 'Custom Metal Artwork',
    description: 'Unique metal wall artwork',
    image: '/lovable-uploads/CustomMetalArtwork1.jpeg'
  },

  {
    id: 36,
    category: 'Art and Decor',
    title: 'Custom Fire Safety Box',
    description: 'Decorative fire safety solution with custom metalwork',
    image: '/lovable-uploads/Custom-FireSafetyBox1.jpeg',
    childImages: [
      {
        url: '/lovable-uploads/Custom-FireSafetyBox2.jpeg',
        alt: 'Detail view of fire safety box'
      }
    ]
  },

  {
    id: 37,
    category: 'Custom Indoor Projects',
    title: 'Indoor Barn Door Project',
    description: 'Complete indoor barn door installation with custom metalwork',
    image: '/lovable-uploads/IndoorBarnBuild-rail1.jpeg',
    childImages: [
      {
        url: '/lovable-uploads/IndoorBarnBuild-rail2.jpeg',
        alt: 'Installation progress'
      },
      {
        url: '/lovable-uploads/IndoorBarnBuild-rail3.jpeg',
        alt: 'Detail of rail system'
      },
      {
        url: '/lovable-uploads/IndoorBarnBuild-rail4.jpeg',
        alt: 'Close-up of hardware'
      },
      {
        url: '/lovable-uploads/IndoorBarnBuild-rail5.jpeg',
        alt: 'Final installation view'
      }
    ]
  },

  {
    id: 38,
    category: 'Custom Indoor Projects',
    title: 'Custom Stove Hood',
    description: 'Elegant custom stove hood installation',
    image: '/lovable-uploads/CustomStovehood1.jpeg',
    childImages: [
      {
        url: '/lovable-uploads/CustomStovehood3.jpeg',
        alt: 'Alternative view of stove hood'
      }
    ]
  },

  {
    id: 39,
    category: 'Railings, Fences, and Gates',
    title: 'Custom Masonry Gate',
    description: 'Elegant masonry gate with integrated metalwork',
    image: '/lovable-uploads/CustomMasonaryGate2.jpeg',
    childImages: [
      {
        url: '/lovable-uploads/CustomMasonaryGate3.jpeg',
        alt: 'Side view of masonry gate'
      },
      {
        url: '/lovable-uploads/CustomMasonaryGate4.jpeg',
        alt: 'Detail of gate installation'
      }
    ]
  },

  {
    id: 40,
    category: 'Railings, Fences, and Gates',
    title: 'Modern Metal Railing',
    description: 'Contemporary metal railing design',
    image: '/lovable-uploads/CustomMetalRailing2.jpeg',
    childImages: [
      {
        url: '/lovable-uploads/CustomMetalRailing2-1.jpeg',
        alt: 'Detail view of metal railing'
      }
    ]
  },

  {
    id: 41,
    category: 'Railings, Fences, and Gates',
    title: 'Exterior Metal Railing',
    description: 'Durable outdoor metal railing system',
    image: '/lovable-uploads/CustomMetalRailing4.JPG',
    childImages: [
      {
        url: '/lovable-uploads/CustomMetalRailing4-1.JPG',
        alt: 'Progress view of metal railing installation'
      },
      {
        url: '/lovable-uploads/CustomMetalRailing4-2.jpg',
        alt: 'Additional view of metal railing installation'
      }
    ]
  },
  {
    id: 42,
    category: 'Railings, Fences, and Gates',
    title: 'Custom Metal Railing',
    description: 'Modern metal railing design',
    image: '/lovable-uploads/CustomMetalRailing1.jpeg',
    childImages: [
      {
        url: '/lovable-uploads/CustomMetalRailing1-1.jpeg',
        alt: 'Detail view of metal railing'
      }
    ]
  },
  {
    id: 43,
    category: 'Railings, Fences, and Gates',
    title: 'Custom Metal Railing Series 3',
    description: 'Elegant custom metal railing installation with multiple views',
    image: '/lovable-uploads/metalrailing3-1.jpg',
    childImages: [
      {
        url: '/lovable-uploads/metalrailing3-2.jpg',
        alt: 'Custom metal railing view 2'
      },
      {
        url: '/lovable-uploads/metalrailing3-3.jpg',
        alt: 'Custom metal railing view 3'
      },
      {
        url: '/lovable-uploads/metalrailing3-4.jpg',
        alt: 'Custom metal railing view 4'
      },
      {
        url: '/lovable-uploads/metalrailing3-5.jpg',
        alt: 'Custom metal railing view 5'
      }
    ]
  },
  {
    id: 44,
    category: 'Railings, Fences, and Gates',
    title: 'Floral Metal Gate Design',
    description: 'Custom floral-inspired metal gate with intricate details',
    image: '/lovable-uploads/floralmetalgatecustom1.jpg',
    childImages: [
      {
        url: '/lovable-uploads/floralmetalgatecustom2.jpg',
        alt: 'Floral metal gate view 2'
      },
      {
        url: '/lovable-uploads/floralmetalgatecustom3.jpg',
        alt: 'Floral metal gate view 3'
      },
      {
        url: '/lovable-uploads/floralmetalgatecustom5.jpg',
        alt: 'Floral metal gate view 5'
      },
      {
        url: '/lovable-uploads/floralmetalgatecustom6.jpg',
        alt: 'Floral metal gate view 6'
      }
    ]
  },
  {
    id: 45,
    category: 'Railings, Fences, and Gates',
    title: 'Floral Metal Guardrail',
    description: 'Elegant outdoor metal guardrail with floral pattern details',
    image: '/lovable-uploads/outdoormetalguardrailfloral1.jpg',
    childImages: [
      {
        url: '/lovable-uploads/outdoormetalguardrailfloral1-1.jpg',
        alt: 'Side view of floral guardrail'
      },
      {
        url: '/lovable-uploads/outdoormetalguardrailfloral1-2.jpg',
        alt: 'Detail view of floral pattern'
      },
      {
        url: '/lovable-uploads/outdoormetalguardrailfloral1-3.jpg',
        alt: 'Installation view of guardrail'
      },
      {
        url: '/lovable-uploads/outdoormetalguardrailfloral1-4.jpg',
        alt: 'Complete guardrail installation'
      }
    ]
  },
  {
    id: 46,
    category: 'Custom Furniture',
    title: 'Custom Accented Table',
    description: 'Elegant table design with custom metal accents',
    image: '/lovable-uploads/customaccentedtable1.jpg',
    childImages: [
      {
        url: '/lovable-uploads/customaccentedtable1-1.jpg',
        alt: 'Detail view of table accents'
      }
    ]
  },
  {
    id: 47,
    category: 'Behind the Scenes',
    title: 'Custom Sheet Pattern Process',
    description: 'Behind the scenes of our custom sheet metal pattern creation process',
    image: '/lovable-uploads/customsheetpatternprocess1.jpg',
    childImages: [
      {
        url: '/lovable-uploads/customsheetpatternprocess1-1.jpg',
        alt: 'Pattern design process'
      },
      {
        url: '/lovable-uploads/customsheetpatternprocess1-2.jpg',
        alt: 'Sheet metal fabrication'
      }
    ]
  }
];