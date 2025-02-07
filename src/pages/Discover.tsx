import { useMemo } from 'react';
import { GalleryGrid } from '@/components/gallery/GalleryGrid';
import { galleryItems } from '@/data/gallery-items';
import { motion } from 'framer-motion';
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

/**
 * Discover Page Component
 * 
 * Displays a full-screen gallery grid with infinite scrolling columns
 * and a background logo with floating home button.
 */
const Discover = () => {
  // No filtering, show all items
  const items = useMemo(() => galleryItems, []);

  return (
    <>
      {/* Centered Background Logo */}
      <div className="fixed top-8 left-1/2 -translate-x-1/2 z-0">
        <img 
          src="/MattCoffeyDesignLOGO.jpg" 
          alt="Matt Coffey Design" 
          className="w-48 h-auto opacity-30 brightness-[2] contrast-[1.2]"
        />
      </div>

      {/* Floating Home Button */}
      <motion.div 
        className="fixed top-[40px] left-8 z-50"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <motion.div
          whileHover={{ scale: 1.02, x: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          <Link to="/">
            <Button 
              variant="outline" 
              className="bg-zinc-900/90 backdrop-blur-sm border-zinc-800 hover:bg-zinc-800/90 text-zinc-200 flex items-center gap-2 pl-3 pr-4 text-sm font-light"
            >
              <Home className="h-4 w-4" />
              <span>Back to Home</span>
            </Button>
          </Link>
        </motion.div>
      </motion.div>

      {/* Gallery Grid */}
      {/* Using min-h-screen to let mobile browsers adjust the height as needed */}
      <div className="min-h-screen w-screen overflow-auto md:overflow-hidden">
        <GalleryGrid items={items} />
      </div>
    </>
  );
};

export default Discover;