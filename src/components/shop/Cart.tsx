import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal, getCartCount, isCartOpen, setIsCartOpen } = useCart();
  const navigate = useNavigate();
  
  // Animation to show cart sliding in from right
  const slideIn = {
    hidden: { x: '100%', opacity: 0 },
    visible: { 
      x: '0%', 
      opacity: 1,
      transition: { 
        type: 'spring',
        stiffness: 300,
        damping: 30
      }
    },
    exit: { 
      x: '100%', 
      opacity: 0,
      transition: { 
        ease: 'easeInOut',
        duration: 0.3
      }
    }
  };
  
  // Stop propagation to prevent closing when clicking inside cart
  const handleCartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };
  
  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div 
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex justify-end"
          onClick={() => setIsCartOpen(false)}
        >
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={slideIn}
            className="w-full max-w-md bg-zinc-900 h-full shadow-xl"
            onClick={handleCartClick}
          >
            <div className="flex flex-col h-full">
              {/* Cart Header */}
              <div className="p-4 border-b border-zinc-800 flex justify-between items-center">
                <h2 className="text-xl font-semibold text-silver flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5 text-bronze" />
                  My Cart
                  {getCartCount() > 0 && (
                    <span className="ml-2 bg-bronze/20 text-bronze text-sm py-0.5 px-2 rounded-full">
                      {getCartCount()}
                    </span>
                  )}
                </h2>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 text-gray-400 hover:text-silver transition-colors rounded-full hover:bg-zinc-800"
                  aria-label="Close cart"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              {/* Cart Content */}
              <div className="flex-1 overflow-y-auto py-2">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-4">
                    <div className="bg-zinc-800/50 p-6 rounded-full mb-4">
                      <ShoppingBag className="h-12 w-12 text-gray-500" />
                    </div>
                    <h3 className="text-lg font-medium text-silver mb-2">Your cart is empty</h3>
                    <p className="text-gray-400 mb-6 max-w-xs">
                      Add some custom furniture pieces to get started with your collection.
                    </p>
                    <Button 
                      onClick={() => setIsCartOpen(false)}
                      className="bg-bronze hover:bg-amber-600 text-white"
                    >
                      Continue Shopping
                    </Button>
                  </div>
                ) : (
                  <ul>
                    {cart.map(item => (
                      <motion.li 
                        key={item.product.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                        className="p-4 border-b border-zinc-800/50"
                      >
                        <div className="flex gap-3">
                          {/* Product Image */}
                          <div className="w-20 h-20 bg-zinc-800 rounded-md overflow-hidden flex-shrink-0">
                            <img 
                              src={item.product.image} 
                              alt={item.product.title} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          
                          {/* Product Details */}
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                              <h3 className="text-silver font-medium text-sm truncate pr-2">{item.product.title}</h3>
                              <button 
                                onClick={() => removeFromCart(item.product.id)}
                                className="text-gray-400 hover:text-silver p-1 -m-1"
                                aria-label="Remove item"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                            
                            <p className="text-xs text-gray-400 mb-2">{item.product.category}</p>
                            
                            <div className="flex justify-between items-center">
                              <div className="flex items-center border border-zinc-700 rounded-md">
                                <button 
                                  onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                                  className="px-1 py-0.5 text-gray-400 hover:text-silver"
                                  aria-label="Decrease quantity"
                                >
                                  <Minus className="h-3 w-3" />
                                </button>
                                
                                <span className="px-2 py-0.5 text-silver text-sm">{item.quantity}</span>
                                
                                <button 
                                  onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                  className="px-1 py-0.5 text-gray-400 hover:text-silver"
                                  aria-label="Increase quantity"
                                >
                                  <Plus className="h-3 w-3" />
                                </button>
                              </div>
                              
                              <span className="text-bronze font-medium text-sm">
                                ${(item.product.price * item.quantity).toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </ul>
                )}
              </div>
              
              {/* Cart Footer */}
              {cart.length > 0 && (
                <div className="p-4 border-t border-zinc-800 bg-zinc-900/90 backdrop-blur-sm sticky bottom-0">
                  <div className="mb-4 space-y-2">
                    <div className="flex justify-between text-silver mb-1">
                      <span className="text-gray-400">Subtotal</span>
                      <span>${getCartTotal().toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-silver mb-1">
                      <span className="text-gray-400">Shipping</span>
                      <span>Free</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold text-amber-500 mt-2 pt-2 border-t border-zinc-800">
                      <span>Total</span>
                      <span>${getCartTotal().toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <Button
                      onClick={handleCheckout}
                      className="w-full py-6 bg-bronze hover:bg-amber-600 text-white font-medium rounded-md transition-colors flex items-center justify-center gap-1"
                    >
                      <span>Checkout</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                    
                    <Link
                      to="/cart"
                      onClick={() => setIsCartOpen(false)}
                      className="block w-full py-2 text-center text-sm text-silver hover:text-white transition-colors underline"
                    >
                      View Cart
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Cart; 