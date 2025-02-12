import React from 'react';
import { motion } from 'framer-motion';

type CategoryCardProps = {
  category: string;
  thumbnail: string;
  onClick: () => void;
};

const CategoryCard: React.FC<CategoryCardProps> = ({ category, thumbnail, onClick }) => {
  return (
    <motion.div
      className="relative cursor-pointer overflow-hidden rounded-lg shadow-lg"
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <img src={thumbnail} alt={category} className="w-full h-48 object-cover" />
      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
        <h2 className="text-white text-xl font-bold">{category}</h2>
      </div>
    </motion.div>
  );
};

export default CategoryCard; 