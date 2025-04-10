import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingBag, Minus, Plus, Trash2, Loader2, ArrowRight } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { PageTransition } from '@/components/PageTransition';
import { motion, AnimatePresence } from 'framer-motion';

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal, getCartCount, clearCart } = useCart();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  
  const handleCheckout = () => {
    setIsProcessing(true);
    // Navigate to checkout after brief loading indication
    setTimeout(() => {
      setIsProcessing(false);
      navigate('/checkout');
    }, 300);
  };
  
  return (
    <PageTransition>
      <div className="min-h-screen bg-charcoal py-12">
        <div className="container max-w-4xl mx-auto px-4">
          {/* Back Navigation */}
          <div className="mb-8">
            <Link 
              to="/shop" 
              className="flex items-center gap-2 text-silver hover:text-bronze transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Continue Shopping
            </Link>
          </div>
          
          <h1 className="text-3xl font-bold font-cinzel mb-8 bg-gradient-to-r from-gray-100 via-white to-gray-300 bg-clip-text text-transparent flex items-center gap-3">
            <ShoppingBag className="h-7 w-7 text-bronze" />
            Your Cart
            {getCartCount() > 0 && (
              <span className="text-lg text-bronze">({getCartCount()} {getCartCount() === 1 ? 'item' : 'items'})</span>
            )}
          </h1>
          
          {cart.length === 0 ? (
            <div className="bg-zinc-900 rounded-lg border border-zinc-800 p-10 text-center">
              <div className="flex flex-col items-center justify-center gap-4">
                <div className="bg-zinc-800/50 p-6 rounded-full mb-2">
                  <ShoppingBag className="h-12 w-12 text-gray-500" />
                </div>
                <h2 className="text-xl font-medium text-silver mb-2">Your cart is empty</h2>
                <p className="text-gray-400 mb-6 max-w-md mx-auto">
                  Looks like you haven't added any items to your cart yet. 
                  Browse our collection to discover handcrafted custom metalwork.
                </p>
                <Link to="/shop">
                  <Button className="bg-bronze hover:bg-amber-600 text-white px-6">
                    Browse Products
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items List */}
              <div className="lg:col-span-2">
                <div className="bg-zinc-900 rounded-lg border border-zinc-800 overflow-hidden">
                  <div className="p-4 bg-zinc-800/50 flex justify-between">
                    <h2 className="font-medium text-silver">Product</h2>
                    <div className="flex gap-8">
                      <span className="hidden sm:block text-silver">Quantity</span>
                      <span className="text-silver">Total</span>
                    </div>
                  </div>
                  
                  <ul className="divide-y divide-zinc-800/70">
                    <AnimatePresence initial={false}>
                      {cart.map(item => (
                        <motion.li 
                          key={item.product.id}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="p-4 sm:p-6"
                        >
                          <div className="flex flex-col sm:flex-row gap-4">
                            {/* Product Info */}
                            <div className="flex gap-4 flex-1">
                              {/* Product Image */}
                              <Link 
                                to={`/shop/product/${item.product.id}`}
                                className="w-20 h-20 bg-zinc-800 rounded-md overflow-hidden flex-shrink-0"
                              >
                                <img 
                                  src={item.product.image} 
                                  alt={item.product.title} 
                                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                                />
                              </Link>
                              
                              {/* Product Details */}
                              <div className="flex-1">
                                <Link 
                                  to={`/shop/product/${item.product.id}`}
                                  className="text-silver font-medium hover:text-bronze transition-colors"
                                >
                                  {item.product.title}
                                </Link>
                                <p className="text-sm text-gray-400 mt-1">{item.product.category}</p>
                                <p className="text-bronze mt-1">${item.product.price.toLocaleString()}</p>
                                
                                {/* Mobile Quantity Controls */}
                                <div className="sm:hidden mt-3 flex items-center justify-between">
                                  <div className="flex items-center border border-zinc-700 rounded-md">
                                    <button 
                                      onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                                      className="px-2 py-1 text-gray-400 hover:text-silver"
                                      aria-label="Decrease quantity"
                                    >
                                      <Minus className="h-3 w-3" />
                                    </button>
                                    
                                    <span className="px-3 py-1 text-silver text-sm min-w-[30px] text-center">
                                      {item.quantity}
                                    </span>
                                    
                                    <button 
                                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                      className="px-2 py-1 text-gray-400 hover:text-silver"
                                      aria-label="Increase quantity"
                                    >
                                      <Plus className="h-3 w-3" />
                                    </button>
                                  </div>
                                  
                                  <button 
                                    onClick={() => removeFromCart(item.product.id)}
                                    className="text-gray-400 hover:text-red-400 transition-colors"
                                    aria-label="Remove item"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </button>
                                </div>
                              </div>
                            </div>
                            
                            {/* Quantity and Total - Desktop */}
                            <div className="hidden sm:flex items-center gap-8">
                              <div className="flex items-center border border-zinc-700 rounded-md">
                                <button 
                                  onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                                  className="px-2 py-1 text-gray-400 hover:text-silver"
                                  aria-label="Decrease quantity"
                                >
                                  <Minus className="h-3 w-3" />
                                </button>
                                
                                <span className="px-3 py-1 text-silver text-sm min-w-[30px] text-center">
                                  {item.quantity}
                                </span>
                                
                                <button 
                                  onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                  className="px-2 py-1 text-gray-400 hover:text-silver"
                                  aria-label="Increase quantity"
                                >
                                  <Plus className="h-3 w-3" />
                                </button>
                              </div>
                              
                              <div className="flex items-center gap-4 min-w-[80px]">
                                <span className="text-amber-500 font-medium">
                                  ${(item.product.price * item.quantity).toLocaleString()}
                                </span>
                                
                                <button 
                                  onClick={() => removeFromCart(item.product.id)}
                                  className="text-gray-400 hover:text-red-400 transition-colors"
                                  aria-label="Remove item"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </motion.li>
                      ))}
                    </AnimatePresence>
                  </ul>
                  
                  {/* Cart Actions - Mobile */}
                  <div className="p-4 border-t border-zinc-800 sm:flex lg:hidden justify-between items-center">
                    <button
                      onClick={() => clearCart()}
                      className="text-sm text-gray-400 hover:text-red-400 transition-colors flex items-center gap-1"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      Clear Cart
                    </button>
                  </div>
                </div>
                
                {/* Continue Shopping - Desktop */}
                <div className="mt-6 hidden lg:block">
                  <Link 
                    to="/shop" 
                    className="text-silver hover:text-bronze transition-colors flex items-center gap-2"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Continue Shopping
                  </Link>
                </div>
              </div>
              
              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-zinc-900 rounded-lg border border-zinc-800 p-6 sticky top-4">
                  <h2 className="text-xl font-semibold text-silver mb-4">Order Summary</h2>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between text-silver">
                      <span className="text-gray-400">Subtotal</span>
                      <span>${getCartTotal().toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-silver">
                      <span className="text-gray-400">Shipping</span>
                      <span>Free</span>
                    </div>
                  </div>
                  
                  <div className="border-t border-zinc-800 pt-4 mb-6">
                    <div className="flex justify-between text-lg font-bold text-amber-500">
                      <span>Total</span>
                      <span>${getCartTotal().toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <Button
                      onClick={handleCheckout}
                      disabled={isProcessing}
                      className="w-full py-6 bg-bronze hover:bg-amber-600 text-white font-medium rounded-md transition-colors flex items-center justify-center gap-2"
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <span>Proceed to Checkout</span>
                          <ArrowRight className="h-4 w-4" />
                        </>
                      )}
                    </Button>
                    
                    {/* Clear Cart - Desktop */}
                    <button
                      onClick={() => clearCart()}
                      className="w-full py-2 text-sm text-gray-400 hover:text-red-400 transition-colors hidden sm:flex items-center justify-center gap-1"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      Clear Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
};

export default CartPage; 