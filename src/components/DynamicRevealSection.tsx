import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const DynamicRevealSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  const x = useTransform(scrollYProgress, [0, 1], [-100, 0]);

  return (
    <section ref={sectionRef} className="py-12 px-6 bg-white overflow-hidden">
      <motion.h2 style={{ x }} className="text-3xl font-bold text-center mb-6">
        More About Our Craft
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="max-w-2xl mx-auto text-center text-gray-700"
      >
        As you scroll, discover the passion and workmanship behind each piece. Our designs are built on years of expertise and attention to detail.
      </motion.p>
    </section>
  );
};

export default DynamicRevealSection; 