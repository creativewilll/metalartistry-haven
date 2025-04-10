import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Info, Shield, Loader2, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { PageTransition } from '@/components/PageTransition';
import { shopItems } from '@/data/shop-items';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, cart, buyNow } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [isBuying, setIsBuying] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Find the product by ID
  const product = shopItems.find(item => item.id === id);
  
  // Check if product is already in cart
  const isInCart = cart.some(item => item.product.id === id);

  // If product not found
  if (!product) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-charcoal py-16">
          <div className="container mx-auto px-4 text-center">
            <div className="flex justify-center mb-6">
              <Info className="h-16 w-16 text-gray-500" />
            </div>
            <h1 className="text-3xl font-bold text-silver mb-6">Product Not Found</h1>
            <p className="text-gray-400 mb-8">The product you're looking for doesn't exist or has been removed.</p>
            <Link 
              to="/shop" 
              className="inline-flex items-center px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-silver rounded-lg transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Shop
            </Link>
          </div>
        </div>
      </PageTransition>
    );
  }

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  };

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };

  const handleAddToCart = () => {
    setIsAdding(true);
    // Simulate slight delay for better user feedback
    setTimeout(() => {
      addToCart(product, quantity);
      setIsAdding(false);
      setShowSuccess(true);
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    }, 600);
  };
  
  const handleBuyNow = () => {
    setIsBuying(true);
    // Simulate slight delay for better user feedback
    setTimeout(() => {
      buyNow(product, quantity);
      setIsBuying(false);
    }, 600);
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-charcoal py-12">
        <div className="container max-w-6xl mx-auto px-4">
          {/* Back Navigation */}
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center gap-2 text-silver hover:text-bronze transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Products
          </button>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Product Image */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="rounded-lg overflow-hidden bg-zinc-900 aspect-square lg:col-span-7"
            >
              <img 
                src={product.image} 
                alt={product.title} 
                className="w-full h-full object-cover"
              />
            </motion.div>
            
            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-5"
            >
              <div className="sticky top-8">
                <div className="mb-2">
                  <span className="text-bronze text-sm font-medium uppercase tracking-wider">
                    {product.category}
                  </span>
                </div>
                
                <h1 className="text-3xl font-bold font-cinzel mb-4 bg-gradient-to-r from-gray-100 via-white to-gray-300 bg-clip-text text-transparent">
                  {product.title}
                </h1>
                
                <p className="text-2xl text-bronze font-semibold mb-6">
                  ${product.price.toLocaleString()}
                </p>
                
                <div className="prose prose-invert prose-sm max-w-none mb-8">
                  <p className="text-gray-300">
                    {product.description}
                  </p>
                </div>
                
                {/* Secure Purchase Banner */}
                <div className="bg-zinc-900/60 p-3 rounded-md border border-zinc-800 flex items-center gap-3 mb-8">
                  <Shield className="h-4 w-4 text-bronze" />
                  <span className="text-sm text-silver">Secure Purchase • Satisfaction Guaranteed</span>
                </div>
                
                {/* Quantity Selector */}
                <div className="mb-6">
                  <label className="block text-silver font-medium mb-2">Quantity</label>
                  <div className="flex items-center w-full max-w-[180px]">
                    <button 
                      onClick={decrementQuantity}
                      className="bg-zinc-800 hover:bg-zinc-700 text-silver px-3 py-2 rounded-l-md border border-zinc-700"
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={handleQuantityChange}
                      className="w-16 text-center py-2 bg-zinc-900 border-y border-zinc-700 text-silver"
                      aria-label="Quantity"
                    />
                    <button 
                      onClick={incrementQuantity}
                      className="bg-zinc-800 hover:bg-zinc-700 text-silver px-3 py-2 rounded-r-md border border-zinc-700"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="space-y-3">
                  <AnimatePresence>
                    {showSuccess && (
                      <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="bg-green-900/30 text-green-300 p-3 rounded-md flex items-center gap-2"
                      >
                        <CheckCircle className="h-5 w-5" />
                        Added to cart successfully!
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  <Button 
                    onClick={handleBuyNow}
                    disabled={isBuying || isAdding}
                    className="w-full py-7 bg-bronze hover:bg-amber-600 text-white font-semibold rounded-md transition-colors flex items-center justify-center gap-2 text-lg"
                  >
                    {isBuying ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        Buy Now · ${(product.price * quantity).toLocaleString()}
                      </>
                    )}
                  </Button>
                  
                  <Button 
                    onClick={handleAddToCart}
                    disabled={isAdding || isBuying}
                    variant="outline"
                    className="w-full py-5 border-bronze/40 hover:border-bronze text-silver hover:text-bronze font-medium rounded-md transition-colors flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    {isInCart ? 'Add Another to Cart' : 'Add to Cart'}
                  </Button>
                </div>
                
                {/* Product Features */}
                <div className="mt-8 space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-zinc-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-amber-500 text-xs">✓</span>
                    </div>
                    <p className="text-sm text-silver">Handcrafted from premium materials</p>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-zinc-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-amber-500 text-xs">✓</span>
                    </div>
                    <p className="text-sm text-silver">Custom-made to your specifications</p>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-zinc-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-amber-500 text-xs">✓</span>
                    </div>
                    <p className="text-sm text-silver">Free shipping on orders over $1000</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default ProductDetail; 