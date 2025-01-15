import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CategoryFilter } from '@/components/gallery/CategoryFilter';
import { GalleryGrid } from '@/components/gallery/GalleryGrid';
import { ProcessSection } from '@/components/gallery/ProcessSection';
import { galleryItems } from '@/data/gallery-items';

const Discover = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    if (categoryParam) {
      setActiveCategory(categoryParam);
    }
  }, [categoryParam]);

  const filteredItems = activeCategory === 'All' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeCategory);

  return (
    <div className="min-h-screen pt-16">
      {/* Header */}
      <div className="bg-muted py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
            Discover Our Craft
          </h1>
          <p className="text-xl text-center text-muted-foreground max-w-3xl mx-auto">
            Explore our collection of handcrafted metalwork, from elegant railings to custom furniture pieces.
          </p>
        </div>
      </div>

      <CategoryFilter 
        activeCategory={activeCategory} 
        onCategoryChange={setActiveCategory} 
      />
      
      <GalleryGrid items={filteredItems} />
      
      <ProcessSection />
    </div>
  );
};

export default Discover;