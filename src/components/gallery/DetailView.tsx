import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';
import { GalleryItem } from '@/data/gallery-items';
import { cn } from '@/lib/utils';

/**
 * DetailView Component Props
 */
interface DetailViewProps {
  /** Gallery item to display details for */
  item: GalleryItem;
  /** Optional callback when view is closed */
  onClose?: () => void;
}

/**
 * DetailView Component
 * 
 * A dual-display view showing an image preview with thumbnail gallery on the left
 * and detailed information on the right. Features smooth transitions and a metallic
 * theme consistent with the application design.
 */
export const DetailView = ({ item, onClose }: DetailViewProps) => {
  // Track the currently selected image index
  const [selectedIndex, setSelectedIndex] = useState(0);
  // Track fullscreen state and device type
  const [isMobile, setIsMobile] = useState(false);
  // Touch gesture handling
  const touchStart = useRef<number | null>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  
  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
          prevImage();
          break;
        case 'ArrowRight':
          nextImage();
          break;
        case 'Escape':
          onClose?.();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);
  
  // Combine main images and child images for the gallery
  const allImages = [...item.images, ...(item.childImages || [])];
  
  // Navigation handlers
  const nextImage = () => setSelectedIndex((prev) => (prev + 1) % allImages.length);
  const prevImage = () => setSelectedIndex((prev) => (prev - 1 + allImages.length) % allImages.length);

  // Fullscreen handler
  const handleFullscreen = async () => {
    if (imageRef.current) {
      try {
        if (document.fullscreenElement) {
          await document.exitFullscreen();
        } else {
          await imageRef.current.requestFullscreen();
        }
      } catch (err) {
        console.error('Error attempting to enable fullscreen:', err);
      }
    }
  };

  return (
    <motion.div 
      className="w-full h-full max-w-7xl mx-auto bg-gradient-to-br from-slate-700 via-zinc-700 to-stone-700 rounded-lg border border-white/10 shadow-2xl overflow-hidden"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      transition={{ type: "spring", duration: 0.5 }}
    >
      <div className="flex flex-col lg:flex-row h-full relative">
        {/* Left side - Image display */}
        <div className="w-full lg:w-2/3 h-[60%] lg:h-full flex flex-col lg:border-r border-white/10">
          {/* Main image container */}
          <div 
            className="relative flex-grow bg-black/20 rounded-lg"
            onTouchStart={(e) => {
              const touch = e.touches[0];
              touchStart.current = touch.clientX;
            }}
            onTouchMove={(e) => {
              if (!touchStart.current) return;
              const touch = e.touches[0];
              const diff = touchStart.current - touch.clientX;
              if (Math.abs(diff) > 50) {
                if (diff > 0) {
                  nextImage();
                } else {
                  prevImage();
                }
                touchStart.current = null;
              }
            }}
            onTouchEnd={() => {
              touchStart.current = null;
            }}
          >
            <AnimatePresence mode="wait">
              <motion.img
                ref={imageRef}
                key={selectedIndex}
                src={allImages[selectedIndex].url}
                alt={allImages[selectedIndex].alt}
                className="absolute inset-0 w-full h-full object-contain cursor-zoom-in"
                onClick={handleFullscreen}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
            </AnimatePresence>
            
            {/* Navigation buttons */}
            <button
              onClick={prevImage}
              className="absolute left-2 lg:left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700/80 text-white/80 hover:text-white transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 lg:right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700/80 text-white/80 hover:text-white transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Fullscreen button */}
            <button
              onClick={handleFullscreen}
              className="absolute top-2 right-12 lg:right-2 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700/80 text-white/80 hover:text-white transition-colors"
            >
              <Maximize2 className="w-5 h-5" />
            </button>
          </div>
          
          {/* Thumbnail gallery */}
          <div className="h-20 mt-3 flex gap-2 px-2 overflow-x-auto">
            {allImages.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedIndex(index)}
                className={cn(
                  "relative flex-shrink-0 h-full aspect-square rounded-md overflow-hidden",
                  "hover:ring-2 hover:ring-white/30 transition-all",
                  selectedIndex === index && "ring-2 ring-white/50"
                )}
              >
                <img
                  src={image.url}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
        
        {/* Right side - Details display */}
        <div className="w-full lg:w-1/3 h-[40%] lg:h-full p-4 lg:p-6">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-full bg-black/20 text-white/80 hover:text-white hover:bg-black/30 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          {/* Title */}
          <h2 className="text-xl lg:text-2xl font-bold text-white mb-2 pr-12">
            {item.title}
          </h2>
          
          {/* Category */}
          <div className="inline-block px-3 py-1 mb-3 rounded-full bg-white/10 text-sm text-white/80">
            {item.category}
          </div>
          
          {/* Description */}
          <p className="text-sm lg:text-base text-white/80 mb-4 leading-relaxed">
            {item.description}
          </p>
          
          {/* Image count */}
          <div className="text-sm text-white/60">
            {allImages.length} images in gallery
          </div>
        </div>
      </div>
    </motion.div>
  );
};
