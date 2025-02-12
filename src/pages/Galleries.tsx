import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';
import CategoryCard from '@/components/CategoryCard';
import CategoryModal from '@/components/CategoryModal';
import { specialtyCategories } from '@/data/specialty-categories';

const Galleries = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleCardClick = (category) => {
    setSelectedCategory(category);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="min-h-screen pt-8 pb-16 px-4">
      {/* Floating Home Button */}
      <div className="fixed top-8 left-8 z-50">
        <Link to="/">
          <Button variant="outline" className="flex items-center gap-2">
            <Home className="h-4 w-4" />
            Home
          </Button>
        </Link>
      </div>
      <h1 className="text-3xl font-bold mb-8 text-center">Specialty Product Categories</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {specialtyCategories.map((cat) => (
          <CategoryCard
            key={cat.id}
            category={cat.category}
            thumbnail={cat.primaryImage}
            onClick={() => handleCardClick(cat)}
          />
        ))}
      </div>
      <CategoryModal 
         isOpen={modalOpen} 
         onClose={closeModal} 
         category={selectedCategory} 
      />
    </div>
  );
};

export default Galleries; 