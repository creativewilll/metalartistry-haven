// Centralized image map for the entire site
// All paths are from the public/ directory

export const SITE_IMAGES = {
  home: {
    hero: "/gallery-images/MattCoffeyHero.jpeg",
    closingCta: "/gallery-images/CustomSteelFireplace1.jpeg",
    philosophySteel: "/gallery-images/customsheetpatternprocess1.jpeg",
    mattPortrait: "/gallery-images/MattCoffey.webp",
    joineryRivet: "/gallery-images/IndoorBarnBuildPROCESS1.jpeg",
    joineryMortise: "/gallery-images/CustomStovehood-PROCESS1.jpeg",
  },
  specialties: {
    railings: "/gallery-images/outdoormetalguardrailfloral1.jpeg",
    furniture: "/gallery-images/CustomDiningSet-WithBench.jpg",
    commercial: "/gallery-images/SilverSpruceBrewingco1.jpeg",
    art: "/gallery-images/CustomMetalArt3-GypseySoul.jpg",
    doors: "/gallery-images/CustomMetalDoor1-2.jpeg",
    bespoke: "/gallery-images/VaultDoor1.jpeg",
    signage: "/gallery-images/CustomMetalSign-TheOaks1.jpg",
    supports: "/gallery-images/CustomSteelBarnRack-2.jpeg",
  },
  services: {
    railings: "/gallery-images/outdoormetalguardrailfloral1.jpeg",
    furniture: "/gallery-images/CustomDiningSet-WithBench.jpg",
    commercial: "/gallery-images/SilverSpruceBrewingco1.jpeg",
    art: "/gallery-images/CustomMetalArt3-GypseySoul.jpg",
    doors: "/gallery-images/CustomMetalDoor1-2.jpeg",
    bespoke: "/gallery-images/VaultDoor1.jpeg",
    signage: "/gallery-images/CustomMetalSign-TheOaks1.jpg",
    supports: "/gallery-images/CustomSteelBarnRack-2.jpeg",
  },
  process: {
    discovery: "/gallery-images/customsheetpatternprocess1-1.jpeg",
    consultation: "/gallery-images/IndoorBarnBuildPROCESS1-2.jpeg",
    sketch: "/gallery-images/CustomMetalSign-TheOaksProcess.jpg",
    material: "/gallery-images/CustomMetalWallPanels-SleepingBearProcess1.jpg",
    fabrication: "/gallery-images/CustomSteelFireplace1-5-PROCESS.jpeg",
    installation: "/gallery-images/VaultDoor-PROCESS1.jpeg",
  },
  about: {
    heroPortrait: "/gallery-images/MattCoffey.webp",
    hands: "/gallery-images/workshop1-2.jpeg",
    hammer: "/gallery-images/MattCoffeyHero.jpeg",
    beginnings: "/gallery-images/IndoorBarnBuildPROCESS1.jpeg",
    apprenticeship: "/gallery-images/CustomStovehood-PROCESS1.jpeg",
    philosophy: "/gallery-images/CustomSteelFireplace1-5-PROCESS.jpeg",
    northernMichigan: "/gallery-images/CustomSecurity_NaturesGate1.jpeg",
  },
  contact: {
    serviceArea: "/gallery-images/CustomSecurity_NaturesGate1.jpeg",
  },
  journal: {
    featured: "/gallery-images/CustomSteelFireplace1.jpeg",
    posts: {
      powderCoatVsPatina: "/gallery-images/CustomIndoor-KitchenBuild-2.jpeg",
      spiralStaircase: "/gallery-images/CustomIndoorRailing1-2.jpeg",
      anatomyAnvil: "/gallery-images/workshop1-2.jpeg",
      steelTypes: "/gallery-images/customsheetpatternprocess1.jpeg",
      structuralRiveting: "/gallery-images/IndoorBarnBuildPROCESS1.jpeg",
    },
  },
  brand: {
    logo: "/MattCoffeyDesignLOGO.jpg",
    og: "/gallery-images/MattCoffeyHero.jpeg",
  },
  notFound: {
    bg: "/gallery-images/CustomSteelFireplace1-5-PROCESS.jpeg",
  },
} as const;

// Business constants for reuse across SiteHead and components
export const BUSINESS_INFO = {
  name: "Matt Coffey Design",
  tagline: "Master Blacksmith | Traverse City",
  description: "25+ years of master metalworking. Specializes in custom railings, furniture, and architectural art in Northern Michigan.",
  url: "https://mattcoffeydesign.com",
  email: "info@mattcoffeydesign.com",
  phone: "+12316450622",
  phoneDisplay: "(231) 645-0622",
  phoneSms: "+12316450622",
  location: {
    city: "Traverse City",
    state: "MI",
    zip: "49684",
    country: "US",
  },
  hours: "By Appointment",
  yearEstablished: 1999,
  piecesCompleted: 1500,
  social: {
    instagram: "https://instagram.com/mattcoffeydesign",
    facebook: "https://facebook.com/mattcoffeydesign",
  },
  sameAs: [
    "https://instagram.com/mattcoffeydesign",
    "https://facebook.com/mattcoffeydesign",
    "https://en.wikipedia.org/wiki/Blacksmith",
    "https://www.wikidata.org/wiki/Q183319",
    "https://abana.org",
  ],
  additionalType: [
    "https://en.wikipedia.org/wiki/Blacksmith",
    "https://www.wikidata.org/wiki/Q183319",
  ],
  founder: {
    name: "Matt Coffey",
    id: "https://mattcoffeydesign.com/about#matt-coffey",
    jobTitle: "Master Blacksmith",
    hasOccupation: {
      name: "Blacksmith",
      occupationLocation: "Traverse City, Michigan",
      sameAs: "https://www.wikidata.org/wiki/Q183319",
    },
    memberOf: [
      { name: "Artist Blacksmith's Association of North America (ABANA)", url: "https://abana.org" },
      { name: "Michigan Artist Blacksmith Association" },
    ],
    knowsAbout: [
      "Blacksmithing", "Custom Metal Fabrication", "Architectural Ironwork",
      "Bronze Forging", "TIG Welding", "Structural Steel", "Patina Finishes",
      "Traditional Joinery", "Hot Riveting"
    ],
    award: ["AWS Certified Welder (GTAW, SMAW)", "ABANA Member"],
  },
} as const;

// Type helpers
export type SiteImageKey = keyof typeof SITE_IMAGES;
export type HomeImages = keyof typeof SITE_IMAGES.home;
export type SpecialtyImages = keyof typeof SITE_IMAGES.specialties;
export type ServiceImages = keyof typeof SITE_IMAGES.services;
export type ProcessImages = keyof typeof SITE_IMAGES.process;
export type AboutImages = keyof typeof SITE_IMAGES.about;
export type JournalPostImages = keyof typeof SITE_IMAGES.journal.posts;
