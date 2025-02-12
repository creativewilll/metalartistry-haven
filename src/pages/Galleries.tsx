import React, { useState, useEffect } from 'react';
import { galleryItems, GalleryItem } from '@/data/gallery-items';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { DetailView } from '@/components/gallery/DetailView';
import { cn } from '@/lib/utils';

const categories = [
  'Railings, Fences, and Gates',
  'Custom Furniture',
  'Commercial',
  'Art and Decor',
  'Doors and Windows',
  'Behind the Scenes',
  'Custom Projects'
];

// Category descriptions - you may want to move these to a data file
const categoryDescriptions = {
  'Railings, Fences, and Gates': 'Explore our collection of meticulously crafted metal railings, fences, and gates. Each piece combines safety with stunning artistry.',
  'Custom Furniture': 'Discover unique furniture pieces that blend form and function, crafted with precision and artistic vision.',
  'Commercial': 'View our commercial projects where functionality meets innovative design for businesses.',
  'Art and Decor': 'Browse our artistic metalwork and decorative pieces that add character to any space.',
  'Doors and Windows': 'See our custom doors and windows that provide both security and aesthetic appeal.',
  'Behind the Scenes': 'Get a glimpse into our workshop and see how we bring these pieces to life.',
  'Custom Projects': 'Explore our diverse range of custom projects tailored to unique client needs.'
};

const ImageCarousel = ({ images }: { images: GalleryItem[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Add effect to handle body scroll lock
  useEffect(() => {
    if (selectedItem) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.height = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.height = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.height = '';
    };
  }, [selectedItem]);

  // Handle escape key for exiting fullscreen and modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isFullscreen) {
          setIsFullscreen(false);
        } else if (selectedItem) {
          setSelectedItem(null);
        }
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isFullscreen, selectedItem]);

  if (!images.length) {
    return (
      <div className="w-full h-[300px] md:h-[400px] flex items-center justify-center">
        <p className="text-gray-400">No images available</p>
      </div>
    );
  }

  if (images.length === 1) {
    return (
      <div className="w-full h-[300px] md:h-[400px] flex items-center justify-center">
        <div 
          className="w-full max-w-[500px] h-[300px] md:h-[400px] rounded-lg overflow-hidden shadow-2xl cursor-pointer"
          onClick={() => setSelectedItem(images[0])}
        >
          <img
            src={images[0].images[0].url}
            alt={images[0].images[0].alt}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    );
  }

  const previousIndex = (currentIndex - 1 + images.length) % images.length;
  const nextIndex = (currentIndex + 1) % images.length;

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 500 : -500,
      opacity: 0,
      scale: 0.9,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => (newDirection > 0 ? nextIndex : previousIndex));
  };

  return (
    <>
      <div className="relative w-full h-[300px] md:h-[400px] flex items-center justify-center">
        {/* Previous Image - Hide on mobile */}
        <motion.div 
          className="absolute left-4 z-0 hidden md:block"
          animate={{ opacity: 0.5, scale: 0.75 }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-[200px] md:w-[300px] h-[200px] md:h-[300px] rounded-lg overflow-hidden">
            <img
              src={images[previousIndex].images[0].url}
              alt={images[previousIndex].images[0].alt}
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        {/* Current Image */}
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
              scale: { duration: 0.2 }
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);
              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
            className="z-10 px-4 md:px-0"
          >
            <motion.div 
              className="w-full md:w-[500px] h-[300px] md:h-[400px] rounded-lg overflow-hidden shadow-2xl cursor-pointer"
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedItem(images[currentIndex])}
            >
              <img
                src={images[currentIndex].images[0].url}
                alt={images[currentIndex].images[0].alt}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Next Image - Hide on mobile */}
        <motion.div 
          className="absolute right-4 z-0 hidden md:block"
          animate={{ opacity: 0.5, scale: 0.75 }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-[200px] md:w-[300px] h-[200px] md:h-[300px] rounded-lg overflow-hidden">
            <img
              src={images[nextIndex].images[0].url}
              alt={images[nextIndex].images[0].alt}
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        {/* Navigation Buttons */}
        <motion.button
          className="absolute left-2 md:left-8 z-20 bg-white/10 hover:bg-white/20 rounded-full p-2 backdrop-blur-sm"
          onClick={() => paginate(-1)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronLeft className="w-4 h-4 md:w-6 md:h-6 text-white" />
        </motion.button>
        <motion.button
          className="absolute right-2 md:right-8 z-20 bg-white/10 hover:bg-white/20 rounded-full p-2 backdrop-blur-sm"
          onClick={() => paginate(1)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronRight className="w-4 h-4 md:w-6 md:h-6 text-white" />
        </motion.button>
      </div>

      {/* Detail View Modal */}
      {selectedItem && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: 0.3,
              ease: "easeInOut"
            }}
            className={cn(
              "fixed z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm",
              isFullscreen ? "inset-0" : "inset-4"
            )}
            style={{ 
              position: 'fixed',
              overflow: 'hidden'
            }}
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                if (isFullscreen) {
                  setIsFullscreen(false);
                } else {
                  setSelectedItem(null);
                }
              }
            }}
          >
            <motion.div 
              className={cn(
                "relative",
                isFullscreen ? "w-screen h-screen" : "w-[550px] h-[440px] md:w-[660px] md:h-[550px]"
              )}
              initial={isFullscreen ? { scale: 0.8 } : { scale: 0.9, y: 20 }}
              animate={isFullscreen ? { scale: 1 } : { scale: 1, y: 0 }}
              exit={isFullscreen ? { scale: 0.8 } : { scale: 0.9, y: 20 }}
              transition={{
                type: "spring",
                stiffness: 250,
                damping: 25,
                mass: 0.5
              }}
              layout
            >
              <DetailView 
                item={selectedItem}
                isFullscreen={isFullscreen}
                onFullscreenToggle={() => setIsFullscreen(!isFullscreen)}
                onClose={() => {
                  if (isFullscreen) {
                    setIsFullscreen(false);
                  } else {
                    setSelectedItem(null);
                  }
                }}
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>
      )}
    </>
  );
};

const CategorySection = ({ category, items, isEven }: { category: string; items: GalleryItem[]; isEven: boolean }) => {
  // Only apply order classes on desktop (md and up)
  const contentOrder = isEven ? 'md:order-1' : 'md:order-2';
  const carouselOrder = isEven ? 'md:order-2' : 'md:order-1';

  // Create a URL-friendly ID from the category name
  const sectionId = category.toLowerCase().replace(/[, ]/g, '-');

  return (
    <section 
      id={sectionId}
      className="min-h-[300px] md:min-h-[400px] flex items-center px-4 md:px-6 py-8 md:py-16 bg-[#1a1a1a] border-b border-gray-800"
    >
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12">
          {/* Text content - always first on mobile */}
          <div className={`w-full md:w-1/2 ${contentOrder} mb-6 md:mb-0 order-1`}>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4 text-white">{category}</h2>
              <p className="text-base md:text-lg text-gray-300 mb-4 md:mb-6">
                {categoryDescriptions[category]}
              </p>
            </div>
          </div>
          {/* Carousel - always second on mobile */}
          <div className={`w-full md:w-1/2 overflow-hidden ${carouselOrder} order-2`}>
            <ImageCarousel images={items} />
          </div>
        </div>
      </div>
    </section>
  );
};

const Galleries = () => {
  return (
    <div className="min-h-screen bg-[#121212] pt-24 md:pt-32">
      {/* Category Sections */}
      {categories.map((category, index) => {
        const items = galleryItems.filter(item => item.category === category);
        if (items.length === 0) return null;
        
        // For the last section (Custom Projects), force image to left by setting isEven to false
        const isLastSection = category === 'Custom Projects';
        const isEven = isLastSection ? false : index % 2 === 0;
        
        return (
          <CategorySection
            key={category}
            category={category}
            items={items}
            isEven={isEven}
          />
        );
      })}
    </div>
  );
};

export default Galleries; 