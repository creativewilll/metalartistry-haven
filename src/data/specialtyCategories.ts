export interface SpecialtyCategory {
  name: string;
  description: string;
  primaryImage: { url: string; alt: string };
  childImages: { url: string; alt: string }[];
}

export const specialtyCategories: SpecialtyCategory[] = [
  {
    name: "Railings, Fences, and Gates",
    description: "Handcrafted railings, fences, and gates with intricate details and timeless design.",
    primaryImage: {
      url: "/gallery-images/metalrailing3-1.jpeg",
      alt: "Handcrafted metal railing"
    },
    childImages: [
      { url: "/gallery-images/metalrailing3-2.jpeg", alt: "Custom safety rails around staircase" },
      { url: "/gallery-images/metalrailing3-3.jpeg", alt: "Looking up from the first floor" }
    ]
  },
  {
    name: "Custom Furniture",
    description: "Bespoke furniture crafted from metal and wood, merging functionality with art.",
    primaryImage: {
      url: "/gallery-images/custom-table-woodblocks1.jpeg",
      alt: "Wood Block Table"
    },
    childImages: [
      { url: "/gallery-images/custom-table-woodblocks1-1.jpeg", alt: "Hand-forged, solid steel legs and accents" }
    ]
  },
  {
    name: "Commercial",
    description: "Innovative metalwork solutions for commercial spaces with a focus on modern aesthetics.",
    primaryImage: {
      url: "/gallery-images/GypsyFarms_CustomBarBuild7 2.jpeg",
      alt: "Custom commercial metal work"
    },
    childImages: [
      { url: "/gallery-images/GypsyFarms_CustomBarBuild3.jpeg", alt: "Commercial interior view" },
      { url: "/gallery-images/GypsyFarms_CustomLightFixtures1 2.jpeg", alt: "Light fixtures detail" }
    ]
  }
]; 