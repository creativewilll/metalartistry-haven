import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShopItem } from '@/data/shop-items';

// Define types for cart items and context
export interface CartItem {
  product: ShopItem;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: ShopItem, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  getCartTotal: () => number;
  getCartCount: () => number;
  clearCart: () => void;
  buyNow: (product: ShopItem, quantity?: number) => void;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
}

// Create the context with default values
const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  getCartTotal: () => 0,
  getCartCount: () => 0,
  clearCart: () => {},
  buyNow: () => {},
  isCartOpen: false,
  setIsCartOpen: () => {},
});

// Custom hook to use the cart context
export const useCart = () => useContext(CartContext);

// Key for cart storage
const CART_STORAGE_KEY = 'matt-coffey-cart';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Control cart sidebar visibility globally
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Initialize cart from localStorage or empty array
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        if (Array.isArray(parsedCart)) {
          // Validate cart items
          return parsedCart.filter(item => 
            item && 
            item.product && 
            item.product.id && 
            typeof item.quantity === 'number' &&
            item.quantity > 0
          );
        }
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
    }
    return [];
  });
  
  const navigate = useNavigate();

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }, [cart]);

  // Add a product to the cart
  const addToCart = (product: ShopItem, quantity = 1) => {
    if (!product || !product.id || quantity <= 0) {
      console.error('Invalid product or quantity');
      return;
    }
    
    setCart(prevCart => {
      try {
        // Check if the product is already in the cart
        const existingItemIndex = prevCart.findIndex(item => item.product.id === product.id);
        
        if (existingItemIndex !== -1) {
          // If product exists, update quantity
          const updatedCart = [...prevCart];
          updatedCart[existingItemIndex].quantity += quantity;
          return updatedCart;
        } else {
          // If product doesn't exist, add new item
          return [...prevCart, { product, quantity }];
        }
      } catch (error) {
        console.error('Error adding to cart:', error);
        return prevCart;
      }
    });
  };

  // Remove a product from the cart
  const removeFromCart = (productId: string) => {
    if (!productId) return;
    
    setCart(prevCart => {
      try {
        return prevCart.filter(item => item.product.id !== productId);
      } catch (error) {
        console.error('Error removing from cart:', error);
        return prevCart;
      }
    });
  };

  // Update the quantity of a product in the cart
  const updateQuantity = (productId: string, quantity: number) => {
    if (!productId) return;
    
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCart(prevCart => {
      try {
        return prevCart.map(item => 
          item.product.id === productId 
            ? { ...item, quantity } 
            : item
        );
      } catch (error) {
        console.error('Error updating quantity:', error);
        return prevCart;
      }
    });
  };

  // Calculate the total price of all items in the cart
  const getCartTotal = () => {
    try {
      return cart.reduce((total, item) => {
        const itemPrice = item.product.price * item.quantity;
        return isNaN(itemPrice) ? total : total + itemPrice;
      }, 0);
    } catch (error) {
      console.error('Error calculating cart total:', error);
      return 0;
    }
  };

  // Calculate the total number of items in the cart
  const getCartCount = () => {
    try {
      return cart.reduce((count, item) => {
        return isNaN(item.quantity) ? count : count + item.quantity;
      }, 0);
    } catch (error) {
      console.error('Error calculating cart count:', error);
      return 0;
    }
  };

  // Clear all items from the cart
  const clearCart = () => {
    setCart([]);
  };
  
  // Buy Now function - add to cart and go to checkout
  const buyNow = (product: ShopItem, quantity = 1) => {
    if (!product || !product.id || quantity <= 0) {
      console.error('Invalid product or quantity');
      return;
    }
    
    // First add the item to cart
    setCart([{ product, quantity }]);
    
    // Then navigate to checkout
    setTimeout(() => {
      navigate('/checkout');
    }, 100);
  };

  // Provide the cart context to children components
  return (
    <CartContext.Provider 
      value={{ 
        cart, 
        addToCart, 
        removeFromCart, 
        updateQuantity, 
        getCartTotal, 
        getCartCount,
        clearCart,
        buyNow,
        isCartOpen,
        setIsCartOpen
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider; 