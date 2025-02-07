import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { GalleryItem } from "@/data/gallery-items";
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react";
import { useState, useEffect, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { DetailView } from './DetailView';

// Add keyframe animations
const animations = `
  @keyframes infiniteScroll {
    0% { transform: translate3d(0, 0, 0); }
    100% { transform: translate3d(0, calc(-50% + 1px), 0); }
  }

  @keyframes infiniteScrollDown {
    0% { transform: translate3d(0, calc(-50% + 1px), 0); }
    100% { transform: translate3d(0, 0, 0); }
  }

  @keyframes gradientFlow {
    0% { background-position: 0% 0%; }
    25% { background-position: 100% 0%; }
    50% { background-position: 100% 100%; }
    75% { background-position: 0% 100%; }
    100% { background-position: 0% 0%; }
  }
`;

// Append animations to the document head
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = animations;
  document.head.appendChild(style);
}

/**
 * GalleryGrid Component
 */
export const GalleryGrid = ({ items }: { items: GalleryItem[] }) => {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [numColumns, setNumColumns] = useState(() => 
    typeof window !== 'undefined' ? 
      window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 3 
    : 3
  );
  // Manage pause state per column:
  const [pausedColumns, setPausedColumns] = useState<{ [key: number]: boolean }>({});
  // Dynamic scroll speed based on viewport
  const [scrollSpeed, setScrollSpeed] = useState(() => 
    typeof window !== 'undefined' && window.innerWidth < 768 ? 1 : 1.5
  );

  // Update scroll speed and columns on resize
  const handleResize = useCallback(() => {
    const newNumColumns = window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 3;
    setNumColumns(newNumColumns);
    setScrollSpeed(window.innerWidth < 768 ? 1 : 1.5);
    
    // Reset paused columns state with the new number of columns
    const newPausedColumns: { [key: number]: boolean } = {};
    for (let i = 0; i < newNumColumns; i++) {
      newPausedColumns[i] = false;
    }
    setPausedColumns(newPausedColumns);
  }, []);

  useEffect(() => {
    // Initialize paused columns state
    const initialPausedColumns: { [key: number]: boolean } = {};
    for (let i = 0; i < numColumns; i++) {
      initialPausedColumns[i] = false;
    }
    setPausedColumns(initialPausedColumns);

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize, numColumns]);

  // Prepare duplicated items for infinite scroll
  const columns = useMemo(() => {
    const cols: GalleryItem[][] = Array(numColumns).fill([]).map(() => []);
    
    // Distribute items across columns based on screen size
    items.forEach((item, index) => {
      const colIndex = index % numColumns;
      cols[colIndex].push(item);
    });

    // Duplicate each column for seamless scrolling
    return cols.map((column, index) => [...column, ...column]);
  }, [items, numColumns]);

  return (
    <>
      <div className="w-full h-screen overflow-hidden" style={{
        background: `
          radial-gradient(circle at 30% 30%, rgba(176, 196, 222, 0.08), transparent 45%),
          radial-gradient(circle at 70% 70%, rgba(205, 127, 50, 0.08), transparent 45%),
          radial-gradient(circle at 50% 50%, rgba(144, 175, 144, 0.06), transparent 55%),
          linear-gradient(135deg,
            rgba(20, 20, 20, 0.99),
            rgba(176, 196, 222, 0.25),
            rgba(119, 136, 153, 0.2),
            rgba(205, 127, 50, 0.25),
            rgba(144, 175, 144, 0.25),
            rgba(119, 136, 153, 0.2),
          )
        `,
        backgroundSize: '500% 500%',
        animation: 'gradientFlow 40s cubic-bezier(0.4, 0, 0.2, 1) infinite'
      }}>
        {/* Main gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 h-full gap-6 md:gap-[100px] px-4 md:px-[100px]">
          {columns.map((column, columnIndex) => (
            <div 
              key={columnIndex} 
              className="relative overflow-hidden h-full"
              onMouseEnter={() => setPausedColumns(prev => ({ ...prev, [columnIndex]: true }))}
              onMouseLeave={() => setPausedColumns(prev => ({ ...prev, [columnIndex]: false }))}
            >
              <div
                className="flex flex-col items-center space-y-6 md:space-y-[100px] absolute top-0 left-0 right-0"
                style={{
                  minHeight: '100vh',
                  transformOrigin: '50% 0%',
                  animation: columnIndex === 1
                    ? `infiniteScrollDown ${60 / scrollSpeed}s linear infinite`
                    : `infiniteScroll ${60 / scrollSpeed}s linear infinite`,
                  animationPlayState: pausedColumns[columnIndex] ? 'paused' : 'running',
                  willChange: 'transform',
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  transform: 'translate3d(0, 0, 0)',
                  WebkitTransform: 'translate3d(0, 0, 0)',
                }}
              >
                {column.map((item, itemIndex) => (
                  <motion.div
                    key={`${item.id}-${itemIndex}`}
                    className="w-full flex justify-center"
                    onClick={() => setSelectedItem(item)}
                    whileHover={{ scale: 1.2, zIndex: 10 }}
                    style={{
                      transform: typeof window !== 'undefined' && window.innerWidth >= 768 && columnIndex === 1
                        ? `translateX(${itemIndex % 2 === 0 ? '-20px' : '20px'})` 
                        : 'none'
                    }}
                    transition={{ 
                      type: "spring",
                      stiffness: 300,
                      damping: 20
                    }}
                  >
                    <div className="relative group cursor-pointer w-[300px]">
                      <motion.img
                        src={item.images[0].url}
                        alt={item.title}
                        className="w-full h-auto object-cover rounded-lg"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 rounded-lg" />
                      <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/70 via-black/30 to-transparent rounded-b-lg">
                        <h3 className="text-white text-sm font-light leading-tight">{item.title}</h3>
                        {item.childImages && (
                          <div className="text-white/70 text-xs mt-1">
                            +{item.childImages.length} more images
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedItem && (
        <DetailView item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </>
  );
};
