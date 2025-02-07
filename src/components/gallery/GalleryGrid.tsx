import { useState, useEffect, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { DetailView } from "./DetailView";
import { GalleryItem } from "@/data/gallery-items";

// Updated keyframes with horizontal animations added.
const animations = `
  @keyframes infiniteScroll {
    0% { transform: translate3d(0, 0, 0); }
    100% { transform: translate3d(0, calc(-50% + 1px), 0); }
  }

  @keyframes infiniteScrollDown {
    0% { transform: translate3d(0, calc(-50% + 1px), 0); }
    100% { transform: translate3d(0, 0, 0); }
  }
  
  @keyframes infiniteScrollHorizontal {
    0% { transform: translate3d(0, 0, 0); }
    100% { transform: translate3d(calc(-50% + 1px), 0, 0); }
  }
  
  @keyframes infiniteScrollHorizontalReverse {
    0% { transform: translate3d(calc(-50% + 1px), 0, 0); }
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
if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.textContent = animations;
  document.head.appendChild(style);
}

// Helper functions for device detection and configuration.
const getDeviceType = (): "mobile" | "tablet" | "desktop" => {
  if (typeof window === "undefined") return "desktop";
  if (window.innerWidth < 768) return "mobile";
  if (window.innerWidth < 1024) return "tablet";
  return "desktop";
};

const getNumColumns = (device: "mobile" | "tablet" | "desktop") => {
  // For mobile we want two horizontal marquees (rows).
  if (device === "mobile") return 2;
  if (device === "tablet") return 2;
  return 3;
};

const getScrollSpeed = (device: "mobile" | "tablet" | "desktop") => {
  // You can tweak these values as needed.
  if (device === "mobile") return 1;
  return 1.5;
};

/**
 * GalleryGrid Component
 */
export const GalleryGrid = ({ items }: { items: GalleryItem[] }) => {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const [deviceType, setDeviceType] = useState<"mobile" | "tablet" | "desktop">(getDeviceType());
  const [numColumns, setNumColumns] = useState<number>(getNumColumns(getDeviceType()));
  const [scrollSpeed, setScrollSpeed] = useState<number>(getScrollSpeed(getDeviceType()));
  // Manage pause state per column (or marquee row)
  const [pausedColumns, setPausedColumns] = useState<{ [key: number]: boolean }>({});

  // Update device type and related values on resize.
  const handleResize = useCallback(() => {
    const newDevice = getDeviceType();
    const newNumCols = getNumColumns(newDevice);
    const newScrollSpeed = getScrollSpeed(newDevice);

    setDeviceType(newDevice);
    setNumColumns(newNumCols);
    setScrollSpeed(newScrollSpeed);

    // Reset paused columns state
    const newPaused: { [key: number]: boolean } = {};
    for (let i = 0; i < newNumCols; i++) {
      newPaused[i] = false;
    }
    setPausedColumns(newPaused);
  }, []);

  useEffect(() => {
    // initialize paused columns
    const initialPaused: { [key: number]: boolean } = {};
    for (let i = 0; i < numColumns; i++) {
      initialPaused[i] = false;
    }
    setPausedColumns(initialPaused);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize, numColumns]);

  // Prepare duplicated “columns” (or rows on mobile) for infinite scroll.
  // The items are evenly distributed based on numColumns.
  const columns = useMemo(() => {
    const cols: GalleryItem[][] = Array(numColumns)
      .fill(null)
      .map(() => []);
    items.forEach((item, index) => {
      const colIndex = index % numColumns;
      cols[colIndex].push(item);
    });
    // Duplicate each column/row for seamless scrolling.
    return cols.map((col) => [...col, ...col]);
  }, [items, numColumns]);

  // Background style (same for all devices)
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
      {/* For mobile devices: Two horizontal marquees */}
      {deviceType === "mobile" ? (
        <div className="w-full h-screen overflow-hidden" style={backgroundStyle}>
          <div className="flex flex-col h-full" style={{ marginTop: "12vh" }}>
            {columns.map((column, colIndex) => (
              <div
                key={colIndex}
                className="relative overflow-hidden flex-1"
                onMouseEnter={() =>
                  setPausedColumns((prev) => ({ ...prev, [colIndex]: true }))
                }
                onMouseLeave={() =>
                  setPausedColumns((prev) => ({ ...prev, [colIndex]: false }))
                }
              >
                <div
                  className="flex flex-row items-center absolute left-0 top-0"
                  style={{
                    // For horizontal scrolling, set a minimum width.
                    minWidth: "100%",
                    transformOrigin: "0 center",
                    animation:
                      colIndex === 1
                        ? `infiniteScrollHorizontalReverse ${60 / scrollSpeed}s linear infinite`
                        : `infiniteScrollHorizontal ${60 / scrollSpeed}s linear infinite`,
                    animationPlayState: pausedColumns[colIndex] ? "paused" : "running",
                    willChange: "transform",
                  }}
                >
                  {column.map((item, itemIndex) => (
                    <motion.div
                      key={`${item.id}-${itemIndex}`}
                      className="flex-shrink-0 mr-6"
                      onClick={() => setSelectedItem(item)}
                      whileHover={{ scale: 1.2, zIndex: 10 }}
                      // Remove extra transform on mobile
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}
                    >
                      <div className="relative group cursor-pointer w-[210px]">
                        <motion.img
                          src={item.images[0].url}
                          alt={item.title}
                          className="w-full h-auto object-cover rounded-lg"
                          loading="lazy"
                        />
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
      ) : (
        // For tablet and desktop: Vertical scrolling columns.
        <div className="w-full h-screen overflow-hidden" style={backgroundStyle}>
          {/* Use Tailwind’s responsive grid. (tablet: 2 cols, desktop: 3 cols) */}
          <div className="grid grid-cols-2 lg:grid-cols-3 h-full gap-6 md:gap-[100px] px-4 md:px-[100px]">
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
                  className="flex flex-col items-center space-y-6 md:space-y-[100px] absolute top-0 left-0 right-0"
                  style={{
                    minHeight: "100vh",
                    transformOrigin: "50% 0%",
                    // On tablet, both columns scroll upward.
                    // On desktop, alternate: col index 1 scrolls downward, others upward.
                    animation:
                      deviceType === "desktop" && colIndex === 1
                        ? `infiniteScrollDown ${60 / scrollSpeed}s linear infinite`
                        : `infiniteScroll ${60 / scrollSpeed}s linear infinite`,
                    animationPlayState: pausedColumns[colIndex] ? "paused" : "running",
                    willChange: "transform",
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    transform: "translate3d(0, 0, 0)",
                  }}
                >
                  {column.map((item, itemIndex) => (
                    <motion.div
                      key={`${item.id}-${itemIndex}`}
                      className="w-full flex justify-center"
                      onClick={() => setSelectedItem(item)}
                      whileHover={{ scale: 1.2, zIndex: 10 }}
                      style={{
                        // Only on desktop (vertical) add alternating horizontal offsets on column 1.
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
                      <div className="relative group cursor-pointer w-[300px]">
                        <motion.img
                          src={item.images[0].url}
                          alt={item.title}
                          className="w-full h-auto object-cover rounded-lg"
                          loading="lazy"
                        />
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
      )}

      {selectedItem && (
        <DetailView item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </>
  );
};
