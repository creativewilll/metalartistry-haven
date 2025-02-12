import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

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
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-silver hover:text-cream"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
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
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
