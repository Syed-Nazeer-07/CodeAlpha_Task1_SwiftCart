import { Link } from 'react-router-dom';
import { Heart, Star, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';

const ProductCard = ({ product }) => {
  const rating = product.rating || (Math.random() * (5 - 3.5) + 3.5).toFixed(1);
  const reviewCount = Math.floor(Math.random() * 200) + 15;
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      className="group bg-white rounded-[1.25rem] overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 border border-slate-100 flex flex-col h-full relative"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-50 flex items-center justify-center">
        <Link to={`/product/${product._id}`} aria-label={`View ${product.title}`} className="block w-full h-full p-6">
          <img 
            src={product.image} 
            alt={product.title} 
            loading="lazy"
            className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700 ease-out"
          />
        </Link>
        <button aria-label="Add to Wishlist" className="absolute top-4 right-4 p-2.5 bg-white rounded-full text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors shadow-sm z-10 hover:scale-110 active:scale-95">
          <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
        <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
          <span className="bg-accent text-white text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-md shadow-sm">
            20% OFF
          </span>
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-md uppercase tracking-wider">
            {product.category}
          </span>
          <div className="flex items-center space-x-1">
            <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-accent text-accent" />
            <span className="text-xs sm:text-sm font-bold text-dark">{rating}</span>
            <span className="text-[10px] sm:text-xs text-slate-400">({reviewCount})</span>
          </div>
        </div>
        
        <Link to={`/product/${product._id}`} aria-hidden="true" tabIndex="-1">
          <h3 className="text-base sm:text-lg font-bold text-dark leading-tight mb-2 group-hover:text-primary transition-colors line-clamp-2">
            {product.title}
          </h3>
        </Link>
        
        <p className="text-xs sm:text-sm text-slate-500 line-clamp-2 mb-4 flex-grow font-medium">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
          <div className="flex flex-col">
            <span className="text-[10px] sm:text-xs text-slate-400 line-through font-medium">${(product.price * 1.2).toFixed(2)}</span>
            <span className="text-xl font-black text-dark">${product.price.toFixed(2)}</span>
          </div>
          <Link 
            to={`/product/${product._id}`}
            aria-label={`Add ${product.title} to Cart`}
            className="flex items-center space-x-2 bg-dark text-white px-4 py-2.5 rounded-xl hover:bg-primary transition-colors shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 duration-200"
          >
            <ShoppingCart className="w-4 h-4" />
            <span className="text-sm font-bold hidden sm:inline">Add</span>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
