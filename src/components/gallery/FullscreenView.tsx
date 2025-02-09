import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

/**
 * FullscreenView Component Props
 */
interface FullscreenViewProps {
  /** Array of images to display */
  images: { url: string; alt: string; }[];
  /** Initial image index to display */
  initialIndex: number;
  /** Callback when view is closed */
  onClose: () => void;
}

/**
 * FullscreenView Component
 * 
 * A dedicated fullscreen image viewer with navigation controls and smooth transitions.
 * Automatically enters browser fullscreen mode when opened.
 */
export const FullscreenView = ({ images, initialIndex, onClose }: FullscreenViewProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  
  // Handle fullscreen mode
  useEffect(() => {
    // Enter fullscreen mode when component mounts
    document.documentElement.requestFullscreen();
    
    // Exit fullscreen mode when component unmounts
    return () => {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      }
    };
  }, []);

  // Navigation handlers
  const nextImage = useCallback(() => setCurrentIndex((prev) => (prev + 1) % images.length), [images.length]);
  const prevImage = useCallback(() => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length), [images.length]);

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
          onClose();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextImage, prevImage, onClose]);

  return (
    <div className="fixed inset-0 z-[60] bg-black">
      {/* Main image container */}
      <div className="relative w-full h-full">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={images[currentIndex].url}
            alt={images[currentIndex].alt}
            className="absolute inset-0 w-full h-full object-contain"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        </AnimatePresence>

        {/* Navigation controls */}
        <div className="absolute inset-0 flex items-center justify-between p-4">
          <button
            onClick={prevImage}
            className="p-2 rounded-full bg-slate-800/80 hover:bg-slate-700/80 text-white/80 transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextImage}
            className="p-2 rounded-full bg-slate-800/80 hover:bg-slate-700/80 text-white/80 transition-colors"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700/80 text-white/80 transition-colors"
          aria-label="Close fullscreen view"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Image counter */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-slate-800/80 text-white/80 text-sm">
          {currentIndex + 1} / {images.length}
        </div>
      </div>
    </div>
  );
};
