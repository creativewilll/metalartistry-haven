// Import necessary dependencies and components
import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CategoryFilter } from '@/components/gallery/CategoryFilter';
import { GalleryGrid } from '@/components/gallery/GalleryGrid';
import { ProcessSection } from '@/components/gallery/ProcessSection';
import { galleryItems, categories } from '@/data/gallery-items';
import { motion } from 'framer-motion';

/**
 * Discover Page Component
 * 
 * Main gallery page that displays all metalwork items with category filtering
 * and smooth transitions. Features a responsive layout with a sticky category
 * filter and masonry grid display.
 */
const Discover = () => {
  // URL parameter handling for direct category access
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  const [activeCategory, setActiveCategory] = useState(categoryParam || 'All');

  // Update active category when URL parameter changes
  useEffect(() => {
    if (categoryParam) {
      setActiveCategory(categoryParam);
    }
  }, [categoryParam]);

  // Calculate and memoize item counts for each category
  const itemCounts = useMemo(() => {
    const counts: { [key: string]: number } = {
      'All': galleryItems.length
    };
    
    categories.forEach(category => {
      if (category !== 'All') {
        counts[category] = galleryItems.filter(item => item.category === category).length;
      }
    });
    
    return counts;
  }, []);

  // Filter items based on active category
  const filteredItems = useMemo(() => 
    activeCategory === 'All' 
      ? galleryItems 
      : galleryItems.filter(item => item.category === activeCategory),
    [activeCategory]
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-charcoal/80 to-charcoal/60">
      {/* Header Section with animated entrance */}
      <div className="bg-surface/50">
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-20">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative">
              <h1 className="text-4xl md:text-6xl font-bold text-center mb-6 bg-clip-text text-transparent bg-metal-gradient animate-ember-pulse relative z-10 py-2">
                Discover Our Craft
              </h1>
              {/* Remove all background effects */}
              <div aria-hidden="true" />
              <div aria-hidden="true" />
            </div>
            <p className="text-xl text-center text-text-body max-w-3xl mx-auto">
            From custom indoor furniture to commercial installations, explore my extensive collection of precision-crafted, highly-personalized metalworking projects.
              
            </p>
          </motion.div>
        </div>
      </div>

      {/* Category Filter Section with fade-in animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="border-b border-accent-secondary/20"
      >
        <CategoryFilter 
          activeCategory={activeCategory} 
          onCategoryChange={setActiveCategory}
          itemCount={itemCounts}
        />
      </motion.div>
      
      {/* Gallery Grid Section with fade-in animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <GalleryGrid items={filteredItems} />
      </motion.div>
      
      {/* Process Section with fade-in animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.4 }}
        className="bg-surface/50 border-t border-accent-secondary/20"
      >
        <ProcessSection />
      </motion.div>
    </div>
  );
};

export default Discover;