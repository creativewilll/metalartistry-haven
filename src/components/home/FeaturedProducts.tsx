import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, ArrowRight, CheckCircle } from 'lucide-react';
import { featuredShopItems } from '@/data/shop-items';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';

const FeaturedProducts = () => {
  return (
    <section className="py-20 bg-zinc-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-cinzel mb-3 bg-gradient-to-r from-gray-100 via-white to-gray-300 bg-clip-text text-transparent">
            Featured Metalwork
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Explore our most popular custom metalwork pieces. Each item is meticulously handcrafted 
            with premium materials and can be customized to your specifications.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredShopItems.map((product) => (
            <FeaturedProductCard key={product.id} product={product} />
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link to="/shop">
            <Button className="bg-bronze hover:bg-amber-600 text-white">
              View All Products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

const FeaturedProductCard = ({ product }: { product: typeof featuredShopItems[0] }) => {
  const { addToCart, buyNow } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [isBuying, setIsBuying] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsAdding(true);
    setTimeout(() => {
      addToCart(product, 1);
      setIsAdding(false);
      setShowSuccess(true);
      
      setTimeout(() => {
        setShowSuccess(false);
      }, 2000);
    }, 500);
  };
  
  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsBuying(true);
    setTimeout(() => {
      buyNow(product, 1);
    }, 500);
  };
  
  return (
    <Link to={`/shop/product/${product.id}`} className="block group relative h-full">
      <div className="relative overflow-hidden rounded-lg aspect-square">
        <img 
          src={product.image} 
          alt={product.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-80" />
        
        <div className="absolute inset-0 p-4 flex flex-col justify-end">
          <div className="mb-2">
            <span className="text-xs text-bronze uppercase tracking-wider">
              {product.category}
            </span>
          </div>
          <h3 className="text-white font-medium mb-2 text-lg">
            {product.title}
          </h3>
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold text-white">
              ${product.price.toLocaleString()}
            </span>
            
            <div className="flex gap-2">
              <button
                onClick={handleAddToCart}
                disabled={isAdding || isBuying}
                className="p-2 rounded-full bg-zinc-800/80 hover:bg-zinc-700/90 text-white transition-colors"
                aria-label="Add to cart"
              >
                {isAdding ? (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <ShoppingBag className="h-5 w-5" />
                )}
              </button>
              
              <button
                onClick={handleBuyNow}
                disabled={isBuying || isAdding}
                className="p-2 rounded-full bg-bronze/90 hover:bg-bronze text-white transition-colors"
                aria-label="Buy now"
              >
                {isBuying ? (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <ArrowRight className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <AnimatePresence>
        {showSuccess && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute -bottom-6 left-0 right-0 mx-auto w-max bg-green-900/80 text-green-300 py-1 px-3 rounded text-sm flex items-center gap-1"
          >
            <CheckCircle className="h-3 w-3" />
            Added to cart!
          </motion.div>
        )}
      </AnimatePresence>
    </Link>
  );
};

export default FeaturedProducts; 