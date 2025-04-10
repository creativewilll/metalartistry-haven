import { motion } from "framer-motion";
import { ShopItem } from "@/data/shop-items";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  product: ShopItem;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { id, title, description, price, image, category } = product;

  // Format price with commas
  const formattedPrice = price.toLocaleString();

  return (
    <motion.div 
      className="relative bg-zinc-900 rounded-lg overflow-hidden shadow-lg"
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      {/* Product Image */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute top-2 right-2 bg-bronze text-white text-xs px-2 py-1 rounded">
          {category}
        </div>
      </div>
      
      {/* Product Info */}
      <div className="p-4">
        <h3 className="text-lg font-bold font-cinzel mb-2 bg-gradient-to-r from-gray-100 via-white to-gray-300 bg-clip-text text-transparent">
          {title}
        </h3>
        <p className="text-sm text-gray-400 mb-3 line-clamp-2">{description}</p>
        
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">
            ${formattedPrice}
          </span>
          
          <button className="flex items-center gap-1 px-3 py-1 rounded-full bg-bronze hover:bg-amber-600 text-white text-sm font-medium transition-colors">
            <ShoppingCart className="h-3 w-3" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard; 