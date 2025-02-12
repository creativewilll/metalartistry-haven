import React from "react";
import { motion } from "framer-motion";
import { SpecialtyCategory } from "@/data/specialtyCategories";

interface SpecialtyCategoryCardProps {
  category: SpecialtyCategory;
  onClick: () => void;
}

export const SpecialtyCategoryCard: React.FC<SpecialtyCategoryCardProps> = ({ category, onClick }) => {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      className="relative cursor-pointer rounded-lg overflow-hidden shadow-lg"
    >
      <img
        src={category.primaryImage.url}
        alt={category.primaryImage.alt}
        className="w-full h-64 object-cover transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
        <h3 className="text-xl md:text-2xl font-bold text-white">{category.name}</h3>
      </div>
    </motion.div>
  );
}; 