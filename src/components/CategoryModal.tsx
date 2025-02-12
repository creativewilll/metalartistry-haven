import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

interface ImageType {
  url: string;
  alt: string;
}

interface Category {
  id: string;
  category: string;
  description: string;
  primaryImage: string;
  childImages: ImageType[];
}

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: Category | null;
}

const CategoryModal: React.FC<CategoryModalProps> = ({ isOpen, onClose, category }) => {
  if (!isOpen || !category) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
        className="bg-white rounded-lg overflow-hidden shadow-lg max-w-3xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-end p-4">
          <button onClick={onClose} aria-label="Close modal">
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">{category.category}</h2>
          <p className="mb-4">{category.description}</p>
          <img src={category.primaryImage} alt={category.category} className="w-full h-auto mb-4" />
          <div className="grid grid-cols-2 gap-4">
            {category.childImages.map((img, index) => (
              <div key={index} className="overflow-hidden rounded-md shadow-md">
                <img src={img.url} alt={img.alt} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CategoryModal; 