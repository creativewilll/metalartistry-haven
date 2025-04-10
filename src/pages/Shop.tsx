import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Filter, CheckCircle, Info, ArrowRight } from 'lucide-react';
import { shopItems, ShopItem } from '@/data/shop-items';
import { useCart } from '@/contexts/CartContext';
import { PageTransition } from '@/components/PageTransition';
import { Button } from '@/components/ui/button';
import Cart from '@/components/shop/Cart';

// Category type for filter selection
type Category = 'All' | 'Railings' | 'Furniture' | 'Doors' | 'Art';

// Single ProductCard component with quick add functionality
const ProductCardCompact = ({ product }: { product: ShopItem }) => {
  const { addToCart, cart, buyNow } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [isBuying, setIsBuying] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const isInCart = cart.some(item => item.product.id === product.id);
  
  const handleQuickAdd = (e: React.MouseEvent) => {
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
    <div className="group relative h-full flex flex-col bg-zinc-900 rounded-lg overflow-hidden border border-zinc-800 hover:border-bronze/30 transition-all duration-300 shadow-md hover:shadow-xl">
      <div className="aspect-square bg-zinc-800 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Quick Buy Button - appears on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/60">
          <button
            onClick={handleBuyNow}
            disabled={isBuying}
            className="px-5 py-2.5 bg-bronze hover:bg-amber-600 text-white font-medium rounded-md transition-colors flex items-center justify-center gap-2"
          >
            {isBuying ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              <>
                Buy Now
                <ArrowRight className="h-3.5 w-3.5" />
              </>
            )}
          </button>
        </div>
      </div>
      
      {/* Info overlay */}
      <div className="p-4 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-1">
          <span className="text-xs text-bronze uppercase tracking-wider">{product.category}</span>
          <span className="text-lg font-semibold text-bronze">${product.price.toLocaleString()}</span>
        </div>
        
        <h3 className="text-silver font-medium mb-2 line-clamp-1">{product.title}</h3>
        
        <p className="text-gray-400 text-sm line-clamp-2 mb-4 flex-grow">{product.description}</p>
        
        <div className="mt-auto space-y-2">
          <Link 
            to={`/shop/product/${product.id}`}
            className="block w-full py-2 text-center text-silver bg-zinc-800 hover:bg-zinc-700 rounded transition-colors text-sm"
          >
            View Details
          </Link>
          
          <button
            onClick={handleQuickAdd}
            disabled={isAdding || isBuying}
            className={`relative w-full py-2 rounded transition-colors text-sm flex items-center justify-center gap-2
              ${isInCart 
                ? 'bg-green-900/30 text-green-300 hover:bg-green-800/40' 
                : 'bg-bronze/90 hover:bg-bronze text-white'}`}
          >
            {isAdding ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Adding...
              </span>
            ) : isInCart ? (
              <>
                <CheckCircle className="h-4 w-4" />
                Added to Cart
              </>
            ) : (
              <>
                <ShoppingBag className="h-4 w-4" />
                Add to Cart
              </>
            )}
          </button>
          
          <AnimatePresence>
            {showSuccess && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute bottom-full left-0 right-0 mb-2 mx-auto w-max bg-green-900/80 text-green-300 py-1 px-3 rounded text-sm flex items-center gap-1"
              >
                <CheckCircle className="h-3 w-3" />
                Added to cart!
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [filteredItems, setFilteredItems] = useState<ShopItem[]>(shopItems);
  const { getCartCount, setIsCartOpen } = useCart();
  
  // Filter items when category changes
  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredItems(shopItems);
    } else {
      setFilteredItems(shopItems.filter(item => item.category === selectedCategory));
    }
  }, [selectedCategory]);
  
  return (
    <PageTransition>
      <div className="min-h-screen bg-charcoal pt-8 pb-24">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold font-cinzel bg-gradient-to-r from-gray-100 via-white to-gray-300 bg-clip-text text-transparent">
              Handcrafted Metalwork
            </h1>
            
            <div className="flex items-center gap-4">
              <Link 
                to="/cart" 
                className="relative md:hidden bg-zinc-900 hover:bg-zinc-800 text-silver border border-zinc-800 h-10 px-4 rounded-md flex items-center justify-center"
              >
                <ShoppingBag className="h-5 w-5 text-bronze" />
                {getCartCount() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-bronze text-white rounded-full text-xs font-bold h-5 w-5 flex items-center justify-center">
                    {getCartCount()}
                  </span>
                )}
              </Link>
              
              <Button 
                onClick={() => setIsCartOpen(true)}
                className="relative bg-zinc-900 hover:bg-zinc-800 text-silver border border-zinc-800 h-10 px-4"
              >
                <ShoppingBag className="h-5 w-5 text-bronze" />
                {getCartCount() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-bronze text-white rounded-full text-xs font-bold h-5 w-5 flex items-center justify-center">
                    {getCartCount()}
                  </span>
                )}
              </Button>
            </div>
          </div>
          
          {/* Collection Description */}
          <div className="mb-8 max-w-2xl">
            <p className="text-gray-300">
              Meticulously crafted furniture, railings, doors and art pieces that blend form 
              and function. Each piece is handmade to order with premium materials.
            </p>
          </div>
          
          {/* Categories */}
          <div className="mb-8 sticky top-0 z-10 bg-charcoal/90 backdrop-blur-sm py-3 -mx-4 px-4">
            <div className="flex flex-wrap gap-3">
              {(['All', 'Furniture', 'Railings', 'Doors', 'Art'] as Category[]).map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors 
                    ${selectedCategory === category 
                      ? 'bg-bronze text-white' 
                      : 'bg-zinc-800 text-silver hover:bg-zinc-700'}`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          
          {/* Products Grid */}
          <AnimatePresence mode="wait">
            {filteredItems.length > 0 ? (
              <motion.div
                key={selectedCategory}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {filteredItems.map(item => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="h-full"
                  >
                    <Link to={`/shop/product/${item.id}`} className="h-full block">
                      <ProductCardCompact product={item} />
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="rounded-lg bg-zinc-900/50 border border-zinc-800 p-8 text-center"
              >
                <div className="flex flex-col items-center justify-center gap-3">
                  <div className="p-4 bg-zinc-800 rounded-full">
                    <Info className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-medium text-silver">No products found</h3>
                  <p className="text-gray-400 max-w-md mx-auto">
                    We couldn't find any products in this category. Try selecting a different category or check back later.
                  </p>
                  <Button 
                    onClick={() => setSelectedCategory('All')}
                    className="mt-4 bg-bronze hover:bg-amber-600 text-white"
                  >
                    View All Products
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Custom Work CTA */}
          <div className="mt-20 bg-gradient-to-r from-zinc-900 via-zinc-800 to-bronze/20 p-8 rounded-lg border border-zinc-800">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-bold font-cinzel text-white mb-4">
                Need Something Custom?
              </h2>
              <p className="text-gray-300 mb-6">
                We specialize in bespoke metalwork designed specifically for your space.
                Schedule a consultation to discuss your custom project requirements.
              </p>
              <Link to="/contact">
                <Button className="bg-bronze hover:bg-amber-600 text-white">
                  Request Custom Work
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Shopping Cart */}
        <Cart />
      </div>
    </PageTransition>
  );
};

export default Shop; 