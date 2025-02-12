import React, { useState, useEffect } from 'react';
import { galleryItems, GalleryItem } from '@/data/gallery-items';
import { Link, useLocation } from 'react-router-dom';
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
  // Create a URL-friendly ID from the category name
  const sectionId = category.toLowerCase().replace(/[,\s]+/g, '-');
  
  return (
    <motion.div
      id={sectionId}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "w-full py-12 md:py-24",
        isEven ? "bg-neutral-950" : "bg-black"
      )}
    >
      <div className="container px-4 mx-auto">
        <motion.div 
          initial={{ opacity: 0, x: isEven ? 50 : -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{category}</h2>
          <p className="text-neutral-400 max-w-2xl">
            {categoryDescriptions[category as keyof typeof categoryDescriptions]}
          </p>
        </motion.div>
        <ImageCarousel images={items} />
      </div>
    </motion.div>
  );
};

const Galleries = () => {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    window.history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    // Simulate loading of resources
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoading && location.hash) {
      const timer = setTimeout(() => {
        const sectionId = decodeURIComponent(location.hash.slice(1));
        const element = document.getElementById(sectionId);
        if (element) {
          const offset = 80; // adjust to your header height
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      }, 800); // delay to allow animations to finish
      return () => clearTimeout(timer);
    }
  }, [isLoading, location.hash]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-black"
    >
      <AnimatePresence>
        {isLoading ? (
          <motion.div
            key="loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black flex items-center justify-center z-50"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [1, 0.8, 1]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-12 h-12 rounded-full border-2 border-neutral-800 border-t-white animate-spin"
            />
          </motion.div>
        ) : (
          <>
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {categories.map((category, index) => {
                const categoryItems = galleryItems.filter(
                  (item) => item.category === category
                );
                return (
                  <CategorySection
                    key={category}
                    category={category}
                    items={categoryItems}
                    isEven={index % 2 === 0}
                  />
                );
              })}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Galleries; 