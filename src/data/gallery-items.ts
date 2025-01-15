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
    category: 'Windows & Doors',
    title: 'Modern Entrance Design',
    description: 'Contemporary door entrance with custom metalwork and brick detailing',
    image: '/lovable-uploads/74fe97ab-a99d-4952-b804-b8dd7a0dbf06.png'
  },
  {
    id: 2,
    category: 'Custom Art',
    title: 'Architectural Metal Screen',
    description: 'Custom fabricated metal screen with geometric pattern',
    image: '/lovable-uploads/3567461c-c855-40ab-8361-bc89b0489c6b.png'
  },
  {
    id: 3,
    category: 'Railings',
    title: 'Industrial Railing System',
    description: 'Modern railing installation in progress',
    image: '/lovable-uploads/2a6b9b35-41fc-4a8e-bb23-ec8613201563.png'
  },
  {
    id: 4,
    category: 'Custom Art',
    title: 'Architectural Metalwork',
    description: 'Custom metal trusses and railing system in historic renovation',
    image: '/lovable-uploads/fe9eba2e-74c4-4bca-9c1b-ab3393597b7b.png'
  },
  {
    id: 5,
    category: 'Process',
    title: 'Installation Process',
    description: 'Behind the scenes of our metalwork installation',
    image: '/lovable-uploads/35a46b27-2830-45ff-9fc7-d6023162a84d.png'
  },
  {
    id: 6,
    category: 'Railings',
    title: 'Modern Interior Railing',
    description: 'Contemporary black metal railing system with horizontal cables',
    image: '/lovable-uploads/ad1b3a45-0faa-4742-8769-0d02c28c6a54.png'
  },
  {
    id: 7,
    category: 'Custom Art',
    title: 'Custom Wall Display',
    description: 'Modern floating shelf system with rounded frame design',
    image: '/lovable-uploads/d1102b5c-e6da-45d5-a885-f4b50db7dd56.png'
  },
  {
    id: 8,
    category: 'Furniture',
    title: 'Kitchen Design Elements',
    description: 'Custom metalwork integrated into modern kitchen design',
    image: '/lovable-uploads/db5c7ec4-d9a0-4719-862b-c61cfeb077e9.png'
  },
  {
    id: 9,
    category: 'Custom Art',
    title: 'Architectural Fireplace',
    description: 'Floor-to-ceiling fireplace featuring metal and brick',
    image: '/lovable-uploads/242a25c8-6306-408c-9f53-6405f69320cb.png'
  },
  {
    id: 10,
    category: 'Custom Art',
    title: 'Fireplace Detail',
    description: 'Custom metal fireplace surround with brick accents',
    image: '/lovable-uploads/804dd1f4-1cb8-4754-ae20-10d357e4eb7a.png'
  }
];
