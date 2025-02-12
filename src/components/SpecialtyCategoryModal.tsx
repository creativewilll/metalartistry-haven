import React from "react";
import { motion } from "framer-motion";
import { SpecialtyCategory } from "@/data/specialtyCategories";
import { X } from "lucide-react";

interface SpecialtyCategoryModalProps {
  category: SpecialtyCategory;
  onClose: () => void;
}

export const SpecialtyCategoryModal: React.FC<SpecialtyCategoryModalProps> = ({ category, onClose }) => {
  return (
    // Backdrop overlay
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <motion.div
        className="bg-white rounded-lg overflow-hidden max-w-3xl w-full relative p-6"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-2 text-gray-700 hover:text-gray-900"
          aria-label="Close Modal"
        >
          <X size={24} />
        </button>
        <h2 id="modal-title" className="text-2xl font-bold mb-4">
          {category.name}
        </h2>
        <p className="mb-4 text-gray-700">{category.description}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {category.childImages.map((img, idx) => (
            <img
              key={idx}
              src={img.url}
              alt={img.alt}
              className="w-full h-48 object-cover rounded-md shadow-md"
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}; 