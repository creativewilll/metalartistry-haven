import { useState, useEffect, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { DetailView } from "./DetailView";
import { GalleryItem } from "@/data/gallery-items";

// -------------------------
// Constants for spacing and card size
// -------------------------
// Spacing configuration (in pixels)
const cardSpacing = {
  horizontal: 24, // spacing between columns
  vertical: 80    // spacing between images in each column
};
const cardWidth = 400;  // fixed width for each card; height will be 2/3 of this (~267px)

// -------------------------
// Animation Keyframes (only vertical animations are needed)
// -------------------------
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
if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.textContent = animations;
  document.head.appendChild(style);
}

// -------------------------
// Helper functions for device detection and configuration
// -------------------------
const getDeviceType = (): "mobile" | "tablet" | "desktop" => {
  if (typeof window === "undefined") return "desktop";
  if (window.innerWidth < 768) return "mobile";
  if (window.innerWidth < 1024) return "tablet";
  return "desktop";
};

const getNumColumns = (device: "mobile" | "tablet" | "desktop") => {
  // For mobile and tablet, we want 2 columns; for desktop, 3.
  return device === "desktop" ? 3 : 2;
};

const getScrollSpeed = (device: "mobile" | "tablet" | "desktop") => {
  // Slightly faster scrolling on mobile/tablet.
  return device === "desktop" ? 1.5 : 1;
};

/**
 * GalleryGrid Component
 */
export const GalleryGrid = ({ items }: { items: GalleryItem[] }) => {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [deviceType, setDeviceType] = useState<"mobile" | "tablet" | "desktop">(getDeviceType());
  const [numColumns, setNumColumns] = useState<number>(getNumColumns(getDeviceType()));
  const [scrollSpeed, setScrollSpeed] = useState<number>(getScrollSpeed(getDeviceType()));
  // Manage pause state per column
  const [pausedColumns, setPausedColumns] = useState<{ [key: number]: boolean }>({});

  // Update device type and related values on resize.
  const handleResize = useCallback(() => {
    const newDevice = getDeviceType();
    setDeviceType(newDevice);
    setNumColumns(getNumColumns(newDevice));
    setScrollSpeed(getScrollSpeed(newDevice));
    const newPaused: { [key: number]: boolean } = {};
    for (let i = 0; i < getNumColumns(newDevice); i++) {
      newPaused[i] = false;
    }
    setPausedColumns(newPaused);
  }, []);

  useEffect(() => {
    const initialPaused: { [key: number]: boolean } = {};
    for (let i = 0; i < numColumns; i++) {
      initialPaused[i] = false;
    }
    setPausedColumns(initialPaused);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize, numColumns]);

  // Evenly distribute items into columns and duplicate them for seamless infinite scroll.
  const columns = useMemo(() => {
    const cols: GalleryItem[][] = Array(numColumns).fill(null).map(() => []);
    items.forEach((item, index) => {
      const colIndex = index % numColumns;
      cols[colIndex].push(item);
    });
    return cols.map((col) => [...col, ...col]);
  }, [items, numColumns]);

  // Background style for the gallery.
  const backgroundStyle = {
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
        rgba(119, 136, 153, 0.2)
      )
    `,
    backgroundSize: "500% 500%",
    animation: "gradientFlow 40s cubic-bezier(0.4, 0, 0.2, 1) infinite",
  };

  return (
    <>
      <div className="w-full h-screen overflow-hidden" style={backgroundStyle}>
        <div
          className="grid h-full"
          style={{
            gridTemplateColumns: deviceType === "desktop" ? "repeat(3, 1fr)" : "repeat(2, 1fr)",
            gap: `${cardSpacing.horizontal}px`,
            padding: "16px",
          }}
        >
          {columns.map((column, colIndex) => (
            <div
              key={colIndex}
              className="relative overflow-hidden h-full"
              onMouseEnter={() =>
                setPausedColumns((prev) => ({ ...prev, [colIndex]: true }))
              }
              onMouseLeave={() =>
                setPausedColumns((prev) => ({ ...prev, [colIndex]: false }))
              }
            >
              <div
                className="flex flex-col items-center absolute top-0 left-0 right-0"
                style={{
                  minHeight: "100vh",
                  transformOrigin: "50% 0%",
                  gap: `${cardSpacing.vertical}px`,
                  // On desktop, alternate the scroll direction on the middle column.
                  animation:
                    deviceType === "desktop" && colIndex === 1
                      ? `infiniteScrollDown ${60 / scrollSpeed}s linear infinite`
                      : `infiniteScroll ${60 / scrollSpeed}s linear infinite`,
                  animationPlayState: pausedColumns[colIndex] ? "paused" : "running",
                  willChange: "transform",
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                }}
              >
                {column.map((item, itemIndex) => (
                  <motion.div
                    key={`${item.id}-${itemIndex}`}
                    className="w-full flex justify-center"
                    onClick={() => setSelectedItem(item)}
                    whileHover={{ scale: 1.2, zIndex: 10 }}
                    style={{
                      transform:
                        deviceType === "desktop" && colIndex === 1
                          ? `translateX(${itemIndex % 2 === 0 ? "-20px" : "20px"})`
                          : "none",
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                    }}
                  >
                    <div
                      className="relative group cursor-pointer overflow-hidden rounded-lg"
                      style={{ width: `${cardWidth}px` }}
                    >
                      <div
                        style={{
                          position: "relative",
                          width: "100%",
                          paddingTop: "66.67%",
                        }}
                      >
                        <motion.img
                          src={item.images[0].url}
                          alt={item.title}
                          className="absolute inset-0 w-full h-full object-cover rounded-lg"
                          loading="lazy"
                        />
                      </div>
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 rounded-lg" />
                      <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/70 via-black/30 to-transparent rounded-b-lg">
                        <h3 className="text-white text-sm font-light leading-tight">
                          {item.title}
                        </h3>
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
