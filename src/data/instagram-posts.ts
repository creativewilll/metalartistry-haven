import { BUSINESS_INFO } from './site-images';

export interface InstagramPost {
  id: string;
  image: string;
  alt: string;
  caption: string;
  tags: string[];
  postUrl: string;
  /** 'square' (1:1) or 'portrait' (4:5) — drives aspect-ratio in the mosaic */
  aspect: 'square' | 'portrait';
}

const profileUrl = BUSINESS_INFO.social.instagram;

export const commissionPosts: InstagramPost[] = [
  {
    id: 'ig-comm-1',
    image: '/gallery-images/outdoormetalguardrailfloral1.jpeg',
    alt: 'Custom hand-forged floral steel railing on a Northern Michigan lakefront deck',
    caption: 'Floral scrollwork railing — forged for a lakefront estate in Leelanau County.',
    tags: ['railings', 'forged steel', 'Traverse City'],
    postUrl: profileUrl,
    aspect: 'portrait',
  },
  {
    id: 'ig-comm-2',
    image: '/gallery-images/CustomMetalDoor1-2.jpeg',
    alt: 'Bespoke steel entry door with hand-forged hardware, Traverse City',
    caption: 'Bespoke steel entry door — solid bar stock, mortise-and-tenon joinery.',
    tags: ['doors', 'architectural steel', 'custom hardware'],
    postUrl: profileUrl,
    aspect: 'square',
  },
  {
    id: 'ig-comm-3',
    image: '/gallery-images/SilverSpruceBrewingco1.jpeg',
    alt: 'Commercial steel installation at Silver Spruce Brewing, Traverse City MI',
    caption: 'Silver Spruce Brewing — custom steel bar build and structural accents.',
    tags: ['commercial', 'bar build', 'brewery'],
    postUrl: profileUrl,
    aspect: 'square',
  },
  {
    id: 'ig-comm-4',
    image: '/gallery-images/CustomDiningSet-WithBench.jpg',
    alt: 'Hand-forged steel and wood dining table with matching bench',
    caption: 'Heirloom dining set — forged steel base, reclaimed hardwood top.',
    tags: ['furniture', 'dining table', 'heirloom'],
    postUrl: profileUrl,
    aspect: 'portrait',
  },
  {
    id: 'ig-comm-5',
    image: '/gallery-images/CustomMetalSign-TheOaks1.jpg',
    alt: 'Custom cut steel signage for The Oaks estate, Northern Michigan',
    caption: 'The Oaks — plasma-cut steel estate sign with rust patina finish.',
    tags: ['signage', 'Cor-Ten steel', 'estate'],
    postUrl: profileUrl,
    aspect: 'square',
  },
  {
    id: 'ig-comm-6',
    image: '/gallery-images/VaultDoor1.jpeg',
    alt: 'Custom forged vault door with heavy steel frame and decorative hardware',
    caption: 'Full-scale vault door — 600 lbs of forged steel and bronze hardware.',
    tags: ['bespoke', 'vault door', 'heavy metal'],
    postUrl: profileUrl,
    aspect: 'square',
  },
  {
    id: 'ig-comm-7',
    image: '/gallery-images/CustomMetalArt3-GypseySoul.jpg',
    alt: 'Gypsy Soul custom metal wall art sculpture, architectural focal point',
    caption: 'Gypsy Soul — architectural wall sculpture, hand-cut and forge-welded.',
    tags: ['art', 'wall sculpture', 'focal point'],
    postUrl: profileUrl,
    aspect: 'portrait',
  },
  {
    id: 'ig-comm-8',
    image: '/gallery-images/CustomIndoorRailing1-2.jpeg',
    alt: 'Interior staircase railing with hand-forged balusters and bronze patina',
    caption: 'Interior stair railing — hand-forged balusters with oil-rubbed patina.',
    tags: ['railings', 'interior', 'patina'],
    postUrl: profileUrl,
    aspect: 'square',
  },
];

export const behindTheScenesPosts: InstagramPost[] = [
  {
    id: 'ig-bts-1',
    image: '/gallery-images/CustomSteelFireplace1-5-PROCESS.jpeg',
    alt: 'Steel fireplace surround being fabricated in the forge, sparks flying',
    caption: 'Sparks at 2,000°F — shaping a custom fireplace surround at the anvil.',
    tags: ['forge', 'process', 'fireplace'],
    postUrl: profileUrl,
    aspect: 'square',
  },
  {
    id: 'ig-bts-2',
    image: '/gallery-images/IndoorBarnBuildPROCESS1.jpeg',
    alt: 'In-progress barn build with riveted steel structural elements',
    caption: 'Hot-riveted structural framing — traditional joinery for a barn conversion.',
    tags: ['riveting', 'barn build', 'process'],
    postUrl: profileUrl,
    aspect: 'portrait',
  },
  {
    id: 'ig-bts-3',
    image: '/gallery-images/CustomStovehood-PROCESS1.jpeg',
    alt: 'Custom copper range hood being hand-formed on the workbench',
    caption: 'Forming a copper range hood — hand-planished one panel at a time.',
    tags: ['copper', 'range hood', 'hand forming'],
    postUrl: profileUrl,
    aspect: 'square',
  },
  {
    id: 'ig-bts-4',
    image: '/gallery-images/workshop1-2.jpeg',
    alt: 'Interior of the Matt Coffey Design forge workshop in Traverse City',
    caption: 'The workshop — anvils, power hammer, and 25 years of tooling.',
    tags: ['workshop', 'forge', 'Traverse City'],
    postUrl: profileUrl,
    aspect: 'portrait',
  },
  {
    id: 'ig-bts-5',
    image: '/gallery-images/customsheetpatternprocess1.jpeg',
    alt: 'Custom decorative steel sheet being cut and textured in the forge',
    caption: 'Pattern work — hand-cut decorative steel sheet before patina.',
    tags: ['pattern', 'steel sheet', 'texture'],
    postUrl: profileUrl,
    aspect: 'square',
  },
  {
    id: 'ig-bts-6',
    image: '/gallery-images/VaultDoor-PROCESS1.jpeg',
    alt: 'Vault door frame being welded and assembled in the forge',
    caption: 'Vault door assembly — 600 lbs of steel coming together piece by piece.',
    tags: ['vault door', 'welding', 'assembly'],
    postUrl: profileUrl,
    aspect: 'square',
  },
  {
    id: 'ig-bts-7',
    image: '/gallery-images/CustomMetalWallPanels-SleepingBearProcess1.jpg',
    alt: 'Sleeping Bear metal wall panels being finished with chemical patina',
    caption: 'Sleeping Bear panels — applying chemical patina for natural aging.',
    tags: ['patina', 'wall panels', 'finishing'],
    postUrl: profileUrl,
    aspect: 'portrait',
  },
  {
    id: 'ig-bts-8',
    image: '/gallery-images/CustomMetalSign-TheOaksProcess.jpg',
    alt: 'The Oaks estate sign during plasma cutting on the fabrication table',
    caption: 'Plasma cutting The Oaks sign — raw steel before the rust takes hold.',
    tags: ['plasma cut', 'signage', 'fabrication'],
    postUrl: profileUrl,
    aspect: 'square',
  },
];
