import React, { useState } from "react";
import { motion } from "framer-motion";
import { specialtyCategories, SpecialtyCategory } from "@/data/specialtyCategories";
import { SpecialtyCategoryCard } from "@/components/SpecialtyCategoryCard";
import { SpecialtyCategoryModal } from "@/components/SpecialtyCategoryModal";

const SpecialtyCategories: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<SpecialtyCategory | null>(null);

  // Handle modal open/close
  const handleCardClick = (category: SpecialtyCategory) => {
    setSelectedCategory(category);
  };

  const handleCloseModal = () => {
    setSelectedCategory(null);
  };

  return (
    <div>
      {/* Section 1: Hero Section */}
      <section className="min-h-screen flex flex-col md:flex-row items-center px-6 py-12 bg-gray-900 text-white">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Specialty Product Categories</h1>
          <p className="text-lg md:text-xl">
            Explore our range of exclusive, hand-crafted metalwork solutions. Each category is designed with precision and creativity.
          </p>
        </div>
        <div className="md:w-1/2 overflow-hidden">
          {/* Horizontal auto-scrolling carousel */}
          <motion.div
            className="flex space-x-6"
            animate={{ x: [0, -200, 0] }}
            transition={{ duration: 20, ease: "linear", repeat: Infinity }}
          >
            {specialtyCategories.map((cat, index) => (
              <div key={index} className="min-w-[300px]">
                <img
                  src={cat.primaryImage.url}
                  alt={cat.primaryImage.alt}
                  className="w-full h-48 object-cover rounded-lg shadow-md"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Section 2: Main Content Section with grid of category cards */}
      <section className="py-12 px-6 bg-gray-100">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {specialtyCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <SpecialtyCategoryCard category={category} onClick={() => handleCardClick(category)} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Section 3: Dynamic Reveal Section */}
      <motion.section
        className="py-12 px-6 bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
      >
        <h2 className="text-3xl font-bold text-center mb-6">More About Our Craft</h2>
        <p className="max-w-2xl mx-auto text-center text-gray-700">
          As you scroll, discover the passion and workmanship behind each piece. Our designs are built on years of expertise and attention to detail.
        </p>
      </motion.section>

      {/* Modal for detailed view */}
      {selectedCategory && (
        <SpecialtyCategoryModal category={selectedCategory} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default SpecialtyCategories; 