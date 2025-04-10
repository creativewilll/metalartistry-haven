export type ShopItem = {
  id: string;
  category: 'Railings' | 'Furniture' | 'Doors' | 'Art';
  title: string;
  description: string;
  price: number;
  image: string;
  featured: boolean;
};

// Featured shop items to display on homepage
export const featuredShopItems: ShopItem[] = [
  {
    id: 'furniture-1',
    category: 'Furniture',
    title: 'Industrial Steel & Wood Table',
    description: 'A handcrafted steel-reinforced wooden table with a riveted metal edge for a bold industrial touch.',
    price: 2800,
    image: '/gallery-images/Custom-Steel-Table2 2.jpeg',
    featured: true
  },
  {
    id: 'railing-1',
    category: 'Railings',
    title: 'Custom Metal Stair Railing',
    description: 'A meticulously crafted metal stair railing featuring elegant scrollwork and twisted balusters.',
    price: 3200,
    image: '/gallery-images/CustomIndoorRailing1 2.jpeg',
    featured: true
  },
  {
    id: 'door-1',
    category: 'Doors',
    title: 'Steel and Glass Pocket Door',
    description: 'A space-saving steel and glass pocket door that slides seamlessly into the wall.',
    price: 4200,
    image: '/gallery-images/custom-metal-door5.jpg',
    featured: true
  },
  {
    id: 'art-1',
    category: 'Art',
    title: 'Handcrafted Metal Candle Holder',
    description: 'An elegant wall-mounted candle holder with hand-formed scrolling metal leaves.',
    price: 850,
    image: '/gallery-images/Custom-CandleHolder 2.jpeg',
    featured: true
  }
];

// Complete shop items collection
export const shopItems: ShopItem[] = [
  ...featuredShopItems,
  {
    id: 'furniture-2',
    category: 'Furniture',
    title: 'Metal Frame Coffee Table',
    description: 'A minimalist coffee table with a geometric metal frame and solid wood top.',
    price: 1850,
    image: '/gallery-images/CustomCoffeeTable.jpeg',
    featured: false
  },
  {
    id: 'furniture-3',
    category: 'Furniture',
    title: 'Industrial Dining Set',
    description: 'A complete dining set with a steel table and matching chairs, perfect for modern industrial interiors.',
    price: 4200,
    image: '/gallery-images/Custom-Steel-Table1.jpeg',
    featured: false
  },
  {
    id: 'furniture-4',
    category: 'Furniture',
    title: 'Floating Steel Shelves',
    description: 'Minimalist steel shelving units that appear to float on your wall, perfect for displaying art or books.',
    price: 980,
    image: '/gallery-images/CustomMetalShelf1.jpeg',
    featured: false
  },
  {
    id: 'railing-2',
    category: 'Railings',
    title: 'Outdoor Wrought Iron Railing',
    description: 'Weather-resistant wrought iron railing with intricate patterns, perfect for outdoor balconies.',
    price: 2600,
    image: '/gallery-images/CustomRailing1.jpeg',
    featured: false
  },
  {
    id: 'railing-3',
    category: 'Railings',
    title: 'Modern Cable Railing System',
    description: 'A sleek, contemporary cable railing system with stainless steel components and minimal visual obstruction.',
    price: 3800,
    image: '/gallery-images/CustomMetalRailing2.jpeg',
    featured: false
  },
  {
    id: 'railing-4',
    category: 'Railings',
    title: 'Art Deco Inspired Handrail',
    description: 'A decorative handrail inspired by Art Deco patterns and geometry, bringing vintage elegance to your staircase.',
    price: 2900,
    image: '/gallery-images/CustomIndoorRailing2.jpeg',
    featured: false
  },
  {
    id: 'door-2',
    category: 'Doors',
    title: 'Custom Pivot Entry Door',
    description: 'A statement-making pivot entry door with metal frame and custom handle design.',
    price: 5600,
    image: '/gallery-images/custom-metal-door1.jpg',
    featured: false
  },
  {
    id: 'door-3',
    category: 'Doors',
    title: 'Industrial Barn Door',
    description: 'A sliding barn door with industrial hardware and custom metalwork, perfect for loft spaces.',
    price: 3900,
    image: '/gallery-images/custom-metal-door3.jpg',
    featured: false
  },
  {
    id: 'door-4',
    category: 'Doors',
    title: 'Decorative Steel Gate',
    description: 'A decorative exterior gate with artistic metalwork, providing both security and curb appeal.',
    price: 4800,
    image: '/gallery-images/custom-metal-door4.jpg',
    featured: false
  },
  {
    id: 'art-2',
    category: 'Art',
    title: 'Wall-Mounted Metal Sculpture',
    description: 'An abstract wall-mounted metal sculpture that creates dynamic shadows and visual interest.',
    price: 1200,
    image: '/gallery-images/CustomMetalArt1.jpeg',
    featured: false
  },
  {
    id: 'art-3',
    category: 'Art',
    title: 'Freestanding Metal Room Divider',
    description: 'A functional art piece that serves as both a room divider and a sculptural statement.',
    price: 3400,
    image: '/gallery-images/CustomMetalPanels1.jpeg',
    featured: false
  },
  {
    id: 'art-4',
    category: 'Art',
    title: 'Custom Metal Fire Pit',
    description: 'A hand-cut metal fire pit featuring custom designs that cast beautiful shadows when lit.',
    price: 1850,
    image: '/gallery-images/Custom-FirePit.jpeg',
    featured: false
  }
]; 