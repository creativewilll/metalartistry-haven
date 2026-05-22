import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Maximize2, X, MessageCircle } from 'lucide-react';
import { GalleryItem } from '@/src/data/gallery-items';
import { cn } from '@/src/lib/utils';

// Generate slug from title
const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

const useReducedMotion = (): boolean => {
  const [reduced, setReduced] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false
  );
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
};

/**
 * DetailView Component Props
 */
interface DetailViewProps {
  /** Gallery item to display details for */
  item: GalleryItem;
  /** Optional callback when view is closed */
  onClose?: () => void;
  /** All gallery items for prev/next navigation */
  allItems?: GalleryItem[];
  /** Callback when navigating to a different item */
  onNavigate?: (item: GalleryItem) => void;
}

/**
 * DetailView Component
 *
 * A dual-display view showing an image preview with thumbnail gallery on the left
 * and detailed information on the right. Features smooth transitions, keyboard navigation,
 * prev/next item navigation, and a metallic theme consistent with the application design.
 */
export const DetailView = ({ item, onClose, allItems, onNavigate }: DetailViewProps) => {
  // Track the currently selected image index
  const [selectedIndex, setSelectedIndex] = useState(0);
  // Track fullscreen state and device type
  const [isMobile, setIsMobile] = useState(false);
  // Add state for mobile fullscreen view
  const [isMobileFullscreen, setIsMobileFullscreen] = useState(false);
  // Touch gesture handling
  const touchStart = useRef<number | null>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const prefersReducedMotion = useReducedMotion();

  // Reset selected index when item changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [item.id]);

  // Calculate current position in gallery for prev/next navigation
  const { currentIndex, totalItems, hasPrev, hasNext } = useMemo(() => {
    if (!allItems || allItems.length === 0) {
      return { currentIndex: 0, totalItems: 0, hasPrev: false, hasNext: false };
    }
    const index = allItems.findIndex(i => i.id === item.id);
    return {
      currentIndex: index >= 0 ? index : 0,
      totalItems: allItems.length,
      hasPrev: index > 0,
      hasNext: index < allItems.length - 1
    };
  }, [allItems, item]);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Navigation to prev/next item
  const navigateToPrev = useCallback(() => {
    if (hasPrev && allItems && onNavigate) {
      onNavigate(allItems[currentIndex - 1]);
    }
  }, [hasPrev, allItems, currentIndex, onNavigate]);

  const navigateToNext = useCallback(() => {
    if (hasNext && allItems && onNavigate) {
      onNavigate(allItems[currentIndex + 1]);
    }
  }, [hasNext, allItems, currentIndex, onNavigate]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't handle if user is typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      switch (e.key) {
        case 'ArrowLeft':
          // Shift+ArrowLeft navigates to previous item, otherwise previous image
          if (e.shiftKey) {
            navigateToPrev();
          } else {
            prevImage();
          }
          break;
        case 'ArrowRight':
          // Shift+ArrowRight navigates to next item, otherwise next image
          if (e.shiftKey) {
            navigateToNext();
          } else {
            nextImage();
          }
          break;
        case 'Escape':
          if (isMobileFullscreen) {
            setIsMobileFullscreen(false);
          } else {
            onClose?.();
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, isMobileFullscreen, navigateToPrev, navigateToNext]);

  // Combine main images and child images for the gallery
  const allImages = [...item.images, ...(item.childImages || [])];

  // Navigation handlers
  const nextImage = () => setSelectedIndex((prev) => (prev + 1) % allImages.length);
  const prevImage = () => setSelectedIndex((prev) => (prev - 1 + allImages.length) % allImages.length);

  // Fullscreen handler
  const handleFullscreen = async () => {
    if (isMobile) {
      // Use custom fullscreen for mobile
      setIsMobileFullscreen(true);
    } else if (imageRef.current) {
      // Use browser API for desktop
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

  // Generate contact link with reference
  const contactLink = `/contact?ref=${generateSlug(item.title)}`;

  return (
    <>
      <motion.div
        className="w-full h-full max-w-7xl mx-auto bg-anthracite rounded-lg border border-brushed-bronze/30 shadow-2xl overflow-hidden"
        initial={prefersReducedMotion ? { opacity: 0 } : { scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={prefersReducedMotion ? { opacity: 0 } : { scale: 0.9, opacity: 0 }}
        transition={prefersReducedMotion ? { duration: 0.15 } : { type: "spring", duration: 0.5 }}
      >
        <div className="flex flex-col lg:flex-row h-full relative">
          {/* Close button for the detail view */}
          {onClose && (
            <button
              onClick={onClose}
              className="absolute top-2 right-2 z-50 p-2 rounded-full bg-forge-black/80 hover:bg-hammered-steel text-chalk/80 hover:text-white-hot transition-colors border border-brushed-bronze/30"
              aria-label="Close detail view"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          {/* Left side - Image display */}
          <div className="w-full lg:w-2/3 h-[60%] lg:h-full flex flex-col lg:border-r border-brushed-bronze/20">
            {/* Main image container */}
            <div
              className="relative flex-grow bg-forge-black/40 rounded-lg"
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
                  key={`${item.id}-${selectedIndex}`}
                  src={allImages[selectedIndex].url}
                  alt={allImages[selectedIndex].alt}
                  className="absolute inset-0 w-full h-full object-contain cursor-zoom-in"
                  onClick={handleFullscreen}
                  loading="eager"
                  decoding="async"
                  initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: -20 }}
                  transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.3 }}
                />
              </AnimatePresence>

              {/* Image navigation buttons */}
              <button
                onClick={prevImage}
                className="absolute left-2 lg:left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-forge-black/80 hover:bg-hammered-steel text-chalk/80 hover:text-ember-orange transition-colors border border-brushed-bronze/30"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 lg:right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-forge-black/80 hover:bg-hammered-steel text-chalk/80 hover:text-ember-orange transition-colors border border-brushed-bronze/30"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Image counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-forge-black/80 text-chalk/80 text-xs border border-brushed-bronze/30">
                {selectedIndex + 1} of {allImages.length}
              </div>

              {/* Fullscreen button */}
              <button
                onClick={handleFullscreen}
                className="absolute top-2 right-12 lg:right-2 p-2 rounded-full bg-forge-black/80 hover:bg-hammered-steel text-chalk/80 hover:text-ember-orange transition-colors border border-brushed-bronze/30"
                aria-label="Toggle fullscreen"
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
                    "hover:ring-2 hover:ring-brushed-bronze/60 transition-all",
                    selectedIndex === index && "ring-2 ring-ember-orange"
                  )}
                  aria-label={`View image ${index + 1} of ${allImages.length}`}
                  aria-pressed={selectedIndex === index}
                >
                  <img
                    src={image.url}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                    width={80}
                    height={80}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right side - Details display */}
          <div className="w-full lg:w-1/3 h-[40%] lg:h-full p-4 lg:p-6 flex flex-col">
            {/* Title */}
            <h2
              className="font-display text-2xl lg:text-3xl font-bold text-chalk mb-3 pr-12 leading-tight"
              id="detail-view-title"
            >
              {item.title}
            </h2>

            {/* Category */}
            <div className="inline-block px-3 py-1 mb-4 rounded-full border border-brushed-bronze/40 text-[10px] uppercase tracking-[0.18em] text-brushed-bronze bg-transparent">
              {item.category}
            </div>

            {/* Description */}
            <p className="text-sm lg:text-base text-chalk/80 mb-4 leading-relaxed">
              {item.description}
            </p>

            {/* Item counter */}
            {totalItems > 0 && (
              <div className="text-xs uppercase tracking-[0.18em] text-iron-grey mb-4">
                Piece {currentIndex + 1} of {totalItems}
              </div>
            )}

            {/* Spacer */}
            <div className="flex-grow" />

            {/* Inquire CTA */}
            <Link
              to={contactLink}
              className="inline-flex items-center justify-center gap-2 w-full px-4 py-3 text-sm uppercase tracking-[0.12em] text-forge-black bg-brushed-bronze hover:bg-ember-orange transition-colors rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-brushed-bronze focus-visible:ring-offset-2 focus-visible:ring-offset-forge-black mb-3"
              aria-label={`Inquire about ${item.title}`}
            >
              <MessageCircle className="w-4 h-4" />
              <span>Inquire about this piece</span>
            </Link>

            {/* Prev/Next navigation */}
            {totalItems > 1 && (
              <div className="flex gap-2">
                <button
                  onClick={navigateToPrev}
                  disabled={!hasPrev}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-1 px-3 py-2 text-xs uppercase tracking-[0.1em] border transition-colors rounded-sm",
                    hasPrev
                      ? "border-brushed-bronze/40 text-brushed-bronze hover:bg-brushed-bronze/10 hover:border-brushed-bronze"
                      : "border-iron-grey/30 text-iron-grey cursor-not-allowed opacity-50"
                  )}
                  aria-label="Previous piece in gallery"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Prev</span>
                </button>
                <button
                  onClick={navigateToNext}
                  disabled={!hasNext}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-1 px-3 py-2 text-xs uppercase tracking-[0.1em] border transition-colors rounded-sm",
                    hasNext
                      ? "border-brushed-bronze/40 text-brushed-bronze hover:bg-brushed-bronze/10 hover:border-brushed-bronze"
                      : "border-iron-grey/30 text-iron-grey cursor-not-allowed opacity-50"
                  )}
                  aria-label="Next piece in gallery"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Image count */}
            <div className="text-xs uppercase tracking-[0.18em] text-iron-grey mt-3">
              {allImages.length} images in gallery
            </div>
          </div>
        </div>
      </motion.div>

      {/* Mobile Fullscreen View */}
      <AnimatePresence>
        {isMobileFullscreen && (
          <motion.div
            className="fixed inset-0 z-[200] bg-black flex items-center justify-center"
            role="dialog"
            aria-modal="true"
            aria-label="Fullscreen image view"
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0 }}
            transition={prefersReducedMotion ? { duration: 0.1 } : { duration: 0.3 }}
          >
            {/* Close button */}
            <button
              onClick={() => setIsMobileFullscreen(false)}
              className="absolute top-4 right-4 z-50 p-3 rounded-full bg-forge-black/60 hover:bg-hammered-steel text-chalk hover:text-white-hot transition-colors border border-brushed-bronze/30"
              aria-label="Close fullscreen view"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Image counter */}
            <div className="absolute top-4 left-4 z-50 px-3 py-1 rounded-full bg-forge-black/60 text-chalk text-xs border border-brushed-bronze/30">
              {selectedIndex + 1} of {allImages.length}
            </div>

            {/* Fullscreen image */}
            <img
              src={allImages[selectedIndex].url}
              alt={allImages[selectedIndex].alt}
              className="max-w-full max-h-full object-contain"
            />

            {/* Navigation overlay for swipe gestures */}
            <div
              className="absolute inset-0 z-10"
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
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
