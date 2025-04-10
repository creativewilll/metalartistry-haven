import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { getCartCount, setIsCartOpen } = useCart();
  const cartCount = getCartCount();

  return (
    <nav className="fixed w-full z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo on the left */}
          <Link to="/" className="h-14">
            <img 
              src="/MattCoffeyDesignLOGO.jpg" 
              alt="Matt Coffey Design" 
              className="h-full invert"
            />
          </Link>
          
          {/* Centered Navigation */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2">
            <div className="flex items-center space-x-8">
              <Link to="/" className="text-silver hover:text-cream transition-colors">
                Home
              </Link>
              <Link to="/discover" className="text-silver hover:text-cream transition-colors">
                Discover Me
              </Link>
              <Link to="/contact" className="text-silver hover:text-cream transition-colors">
                Contact
              </Link>
              <Link to="/galleries" className="text-silver hover:text-cream transition-colors">
                Galleries
              </Link>
              <Link to="/shop" className="text-silver hover:text-cream transition-colors">
                Shop
              </Link>
            </div>
          </div>

          {/* Right side - Cart */}
          <div className="flex items-center">
            <div className="hidden md:flex items-center">
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative text-silver hover:text-cream p-2 transition-colors"
                aria-label="Shopping cart"
              >
                <ShoppingBag size={22} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-bronze text-white rounded-full text-xs font-bold h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative text-silver hover:text-cream p-2 transition-colors mr-2"
                aria-label="Shopping cart"
              >
                <ShoppingBag size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-bronze text-white rounded-full text-xs font-bold h-4 w-4 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
              
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-silver hover:text-cream"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden animate-fadeIn">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-background border-b border-border">
            <Link
              to="/"
              className="block px-3 py-2 text-silver hover:text-cream"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/discover"
              className="block px-3 py-2 text-silver hover:text-cream"
              onClick={() => setIsOpen(false)}
            >
              Discover Me
            </Link>
            <Link
              to="/contact"
              className="block px-3 py-2 text-silver hover:text-cream"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
            <Link
              to="/galleries"
              className="block px-3 py-2 text-silver hover:text-cream"
              onClick={() => setIsOpen(false)}
            >
              Galleries
            </Link>
            <Link
              to="/shop"
              className="block px-3 py-2 text-silver hover:text-cream"
              onClick={() => setIsOpen(false)}
            >
              Shop
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
