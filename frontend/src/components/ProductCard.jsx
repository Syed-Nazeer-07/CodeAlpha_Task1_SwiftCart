import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';

const ProductCard = ({ product }) => {
  const [imgSrc, setImgSrc] = useState(product.image);
  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const rating = product.rating || (Math.random() * (5 - 3.5) + 3.5).toFixed(1);
  const reviewCount = Math.floor(Math.random() * 200) + 15;

  const handleImageError = () => {
    setImgSrc('https://images.unsplash.com/photo-1560393464-5c69a73c5770?auto=format&fit=crop&q=80&w=600');
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      toast.error('Please login to add to cart');
      return;
    }
    addToCart(product._id, 1);
    toast.success('Added to cart');
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      className="group flex flex-col h-full bg-white relative transition-all duration-300"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-slate-50 mb-3">
        <Link to={`/product/${product._id}`} aria-label={`View ${product.title}`} className="block w-full h-full p-4">
          <img 
            src={imgSrc} 
            alt={product.title} 
            loading="lazy"
            onError={handleImageError}
            className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        </Link>
        <button aria-label="Add to Wishlist" className="absolute top-3 right-3 p-2 bg-white rounded-full text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors shadow-sm z-10 opacity-0 group-hover:opacity-100 focus:opacity-100">
          <Heart className="w-4 h-4" />
        </button>
        <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
          <span className="bg-dark text-white text-[10px] uppercase font-bold px-2 py-0.5 shadow-sm">
            Sale
          </span>
        </div>
      </div>
      
      <div className="flex flex-col flex-grow px-1">
        <div className="flex justify-between items-start mb-1">
          <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider line-clamp-1">
            {product.brand ? `${product.brand} • ${product.category}` : product.category}
          </span>
          <div className="flex items-center space-x-1 flex-shrink-0 ml-2">
            <Star className="w-3 h-3 fill-dark text-dark" />
            <span className="text-[11px] font-bold text-dark">{rating}</span>
            <span className="text-[10px] text-slate-400">({reviewCount})</span>
          </div>
        </div>
        
        <Link to={`/product/${product._id}`} aria-hidden="true" tabIndex="-1">
          <h3 className="text-sm font-semibold text-dark leading-tight mb-1 group-hover:underline line-clamp-2">
            {product.title}
          </h3>
        </Link>
        
        <div className="flex items-center justify-between mt-auto pt-2">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-bold text-dark">${product.price.toFixed(2)}</span>
            {(product.originalPrice && product.originalPrice > product.price) ? (
              <span className="text-[11px] text-slate-400 line-through font-medium">${product.originalPrice.toFixed(2)}</span>
            ) : (
              <span className="text-[11px] text-slate-400 line-through font-medium">${(product.price * 1.25).toFixed(2)}</span>
            )}
          </div>
          <button 
            onClick={handleAddToCart}
            aria-label={`Add ${product.title} to Cart`}
            className="p-2 text-white bg-dark hover:bg-slate-800 rounded-full transition-colors shadow-sm"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
