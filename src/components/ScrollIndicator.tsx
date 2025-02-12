import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const ScrollIndicator: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <motion.div className="fixed top-0 left-0 right-0 h-2 bg-gray-200 z-50">
      <motion.div className="h-full bg-blue-600" style={{ scaleX }} />
    </motion.div>
  );
};

export default ScrollIndicator; 