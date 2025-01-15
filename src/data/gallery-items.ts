export type GalleryItem = {
  id: number;
  category: 'Railings' | 'Windows & Doors' | 'Furniture' | 'Custom Art' | 'Process';
  title: string;
  description: string;
  image: string;
};

export const categories = [
  'All',
  'Railings',
  'Windows & Doors',
  'Furniture',
  'Custom Art',
  'Process'
] as const;

export const galleryItems: GalleryItem[] = [
  {
    id: 1,
    category: 'Railings',
    title: 'Modern Interior Railing',
    description: 'Contemporary black metal railing system with horizontal cables',
    image: '/lovable-uploads/ad1b3a45-0faa-4742-8769-0d02c28c6a54.png'
  },
  {
    id: 2,
    category: 'Custom Art',
    title: 'Custom Wall Display',
    description: 'Modern floating shelf system with rounded frame design',
    image: '/lovable-uploads/d1102b5c-e6da-45d5-a885-f4b50db7dd56.png'
  },
  {
    id: 3,
    category: 'Furniture',
    title: 'Kitchen Design Elements',
    description: 'Custom metalwork integrated into modern kitchen design',
    image: '/lovable-uploads/db5c7ec4-d9a0-4719-862b-c61cfeb077e9.png'
  },
  {
    id: 4,
    category: 'Custom Art',
    title: 'Architectural Fireplace',
    description: 'Floor-to-ceiling fireplace featuring metal and brick',
    image: '/lovable-uploads/242a25c8-6306-408c-9f53-6405f69320cb.png'
  },
  {
    id: 5,
    category: 'Custom Art',
    title: 'Fireplace Detail',
    description: 'Custom metal fireplace surround with brick accents',
    image: '/lovable-uploads/804dd1f4-1cb8-4754-ae20-10d357e4eb7a.png'
  }
];