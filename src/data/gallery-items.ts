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
    title: 'Custom Spiral Railing',
    description: 'Hand-forged spiral staircase railing with intricate scrollwork',
    image: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?ixlib=rb-4.0.3'
  },
  {
    id: 2,
    category: 'Windows & Doors',
    title: 'Ornate Door Frame',
    description: 'Custom metalwork door frame with detailed patterns',
    image: 'https://images.unsplash.com/photo-1506377295352-e3154d43ea9e?ixlib=rb-4.0.3'
  },
  {
    id: 3,
    category: 'Furniture',
    title: 'Metal Coffee Table',
    description: 'Industrial-style coffee table with custom base',
    image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?ixlib=rb-4.0.3'
  },
  {
    id: 4,
    category: 'Custom Art',
    title: 'Metal Wall Sculpture',
    description: 'Abstract wall piece with mixed metal finishes',
    image: 'https://images.unsplash.com/photo-1544867885-2333f61544ad?ixlib=rb-4.0.3'
  },
  {
    id: 5,
    category: 'Process',
    title: 'Workshop Process',
    description: 'Behind the scenes of our metalworking process',
    image: 'https://images.unsplash.com/photo-1605117882932-f9e32b03fea9?ixlib=rb-4.0.3'
  },
  {
    id: 6,
    category: 'Railings',
    title: 'Modern Balcony Railing',
    description: 'Contemporary design with clean lines',
    image: 'https://images.unsplash.com/photo-1614149162883-504ce4d13909?ixlib=rb-4.0.3'
  },
  {
    id: 7,
    category: 'Furniture',
    title: 'Dining Table Base',
    description: 'Custom metal base for glass top dining table',
    image: 'https://images.unsplash.com/photo-1493934558415-9d19f0b2b4d2?ixlib=rb-4.0.3'
  },
  {
    id: 8,
    category: 'Custom Art',
    title: 'Garden Sculpture',
    description: 'Large-scale outdoor metal artwork',
    image: 'https://images.unsplash.com/photo-1561059488-916d69792237?ixlib=rb-4.0.3'
  },
  {
    id: 9,
    category: 'Process',
    title: 'Metalworking Tools',
    description: 'Essential tools of the trade',
    image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?ixlib=rb-4.0.3'
  }
];
