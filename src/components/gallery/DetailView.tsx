import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { GalleryItem } from '@/data/gallery-items';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { FullscreenView } from './FullscreenView';

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
  // Track fullscreen state
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // Combine main images and child images for the gallery
  const allImages = [...item.images, ...(item.childImages || [])];
  
  // Navigation handlers
  const nextImage = () => setSelectedIndex((prev) => (prev + 1) % allImages.length);
  const prevImage = () => setSelectedIndex((prev) => (prev - 1 + allImages.length) % allImages.length);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      {/* Main container with metallic theme */}
      <div className="w-[95vw] h-[90vh] bg-gradient-to-br from-slate-700 via-zinc-700 to-stone-700 rounded-lg overflow-hidden border border-white/10">
        <div className="flex h-full">
          {/* Left side - Image display */}
          <div className="w-2/3 h-full flex flex-col p-4 border-r border-white/10">
            {/* Main image container */}
            <div className="relative flex-grow bg-black/20 rounded-lg overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedIndex}
                  src={allImages[selectedIndex].url}
                  alt={allImages[selectedIndex].alt}
                  className="absolute inset-0 w-full h-full object-contain"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </AnimatePresence>
              
              {/* Navigation buttons */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700/80 text-white/80"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700/80 text-white/80"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
              
              {/* Fullscreen button */}
              <button
                onClick={() => setIsFullscreen(true)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700/80 text-white/80"
                aria-label="View fullscreen"
              >
                <Maximize2 className="w-6 h-6" />
              </button>
            </div>
            
            {/* Thumbnail gallery */}
            <div className="h-24 mt-4 flex gap-2 overflow-x-auto">
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
          <div className="w-1/3 h-full p-6 overflow-y-auto">
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white/80 hover:text-white"
            >
              ×
            </button>
            
            {/* Title */}
            <h2 className="text-2xl font-bold text-white mb-2">
              {item.title}
            </h2>
            
            {/* Category */}
            <div className="inline-block px-3 py-1 mb-4 rounded-full bg-white/10 text-sm text-white/80">
              {item.category}
            </div>
            
            {/* Date */}
            <div className="text-sm text-white/60 mb-4">
              {format(new Date(), 'MMMM d, yyyy')}
            </div>
            
            {/* Description */}
            <p className="text-white/80 mb-6 leading-relaxed">
              {item.description}
            </p>
            
            {/* Image count */}
            <div className="text-sm text-white/60">
              {allImages.length} images in gallery
            </div>
          </div>
        </div>
      </div>
      
      {/* Fullscreen view */}
      {isFullscreen && (
        <FullscreenView
          images={allImages}
          initialIndex={selectedIndex}
          onClose={() => setIsFullscreen(false)}
        />
      )}
    </div>
  );
};
