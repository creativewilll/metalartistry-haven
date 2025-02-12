import React from 'react';
import { galleryItems } from '@/data/gallery-items';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';

const categories = [
  'Railings, Fences, and Gates',
  'Custom Furniture',
  'Commercial',
  'Art and Decor',
  'Doors and Windows',
  'Behind the Scenes',
  'Custom Projects'
];

const CategoryShowcase = () => {
  return (
    <div className="min-h-screen relative">
      {/* Floating Home Button */}
      <div className="fixed top-8 left-8 z-50">
        <Link to="/">
          <Button variant="outline" className="flex items-center gap-2">
            <Home className="h-4 w-4" />
            Home
          </Button>
        </Link>
      </div>

      <div className="pt-20 pb-10">
        {categories.map((category) => {
          const items = galleryItems.filter(item => item.category === category).slice(0, 5); // select up to 5 projects per category
          if (items.length === 0) return null;
          return (
            <section key={category} className="my-12 px-4">
              <h2 className="text-2xl font-bold mb-4">{category}</h2>
              <div className="overflow-hidden">
                <div className="marquee-container">
                  <div className="marquee-content flex space-x-8">
                    {items.map(item => (
                      <div key={item.id} className="min-w-[16rem] relative">
                        {/* Project Image */}
                        <img 
                          src={item.images[0].url} 
                          alt={item.images[0].alt} 
                          className="w-full h-auto object-cover rounded-md shadow-md"
                        />
                        {/* Overlay project title on the image for enhanced UX/UI */}
                        <p className="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold drop-shadow-lg">
                          {item.title}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryShowcase; 