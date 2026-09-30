import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import { CartContext } from '../context/CartContext';
import { ShoppingBag, ArrowLeft, Star, ShieldCheck, Truck, RefreshCw, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useContext(CartContext);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await api.get(`/products/${id}`);
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product._id, quantity);
    navigate('/cart');
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <div className="relative w-12 h-12 sm:w-20 sm:h-20">
        <div className="absolute inset-0 rounded-full border-4 border-slate-100"></div>
        <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
      </div>
    </div>
  );

  if (!product) return (
    <div className="text-center mt-32 min-h-[50vh] px-4">
      <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-4">Product Not Found</h2>
      <Link to="/" className="text-primary hover:underline flex items-center justify-center">
        <ArrowLeft className="w-5 h-5 mr-2" /> Back to Home
      </Link>
    </div>
  );

  const rating = product.rating || 4.5;
  const reviewCount = Math.floor(Math.random() * 500) + 50;

  return (
    <div className="bg-slate-50 min-h-screen pt-4 sm:pt-10 lg:pt-24 pb-8 sm:pb-16">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <button aria-label="Back to products" onClick={() => navigate(-1)} className="flex items-center text-slate-500 hover:text-dark transition-colors mb-4 sm:mb-8 font-medium text-sm sm:text-base">
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" /> Back to products
        </button>
        
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            
            {/* Image Gallery */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:w-1/2 p-4 sm:p-8 lg:p-16 flex items-center justify-center bg-slate-50/50"
            >
              <div className="relative w-full aspect-square max-w-sm lg:max-w-md mx-auto">
                <img 
                  src={product.image} 
                  alt={product.title} 
                  loading="eager"
                  className="w-full h-full object-contain filter drop-shadow-xl" 
                />
                <button 
                  aria-label="Add to Wishlist"
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className="absolute top-2 right-2 sm:top-0 sm:right-0 p-2 sm:p-3 bg-white rounded-full shadow-md text-slate-400 hover:text-red-500 transition-colors"
                >
                  <Heart className={`w-5 h-5 sm:w-6 sm:h-6 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
                </button>
              </div>
            </motion.div>
            
            {/* Product Info */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:w-1/2 p-5 sm:p-8 lg:p-16 flex flex-col"
            >
              <div className="mb-3 sm:mb-4 flex flex-wrap items-center gap-3">
                <span className="bg-slate-100 text-slate-600 text-[10px] sm:text-xs font-bold uppercase tracking-widest px-2 sm:px-3 py-1 rounded-full">
                  {product.category}
                </span>
                <div className="flex items-center text-xs sm:text-sm">
                  <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400 mr-1" />
                  <span className="font-semibold text-slate-700 mr-1">{rating}</span>
                  <span className="text-slate-400 underline cursor-pointer hover:text-slate-600">({reviewCount} reviews)</span>
                </div>
              </div>
              
              <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-dark mb-4 sm:mb-6 leading-tight tracking-tight">
                {product.title}
              </h1>
              
              <div className="flex flex-wrap items-end gap-3 sm:gap-4 mb-6 sm:mb-8">
                <p className="text-3xl sm:text-4xl text-dark font-bold tracking-tight">${product.price.toFixed(2)}</p>
                <p className="text-base sm:text-lg text-slate-400 line-through mb-1">${(product.price * 1.25).toFixed(2)}</p>
                <span className="bg-red-100 text-red-600 text-[10px] sm:text-xs font-bold px-2 py-1 rounded mb-1 sm:mb-2">Save 20%</span>
              </div>
              
              <div className="prose prose-slate text-slate-600 mb-8 sm:mb-10 text-sm sm:text-lg leading-relaxed">
                <p>{product.description}</p>
              </div>
              
              <div className="mt-auto border-t border-slate-100 pt-6 sm:pt-8">
                <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mb-6 sm:mb-8">
                  {product.stock > 0 ? (
                    <>
                      <div className="flex items-center border-2 border-slate-200 rounded-full bg-white h-12 sm:h-14 overflow-hidden w-full sm:w-auto">
                        <button 
                          aria-label="Decrease quantity"
                          onClick={() => setQuantity(q => Math.max(1, q - 1))}
                          className="px-4 sm:px-6 h-full text-slate-500 hover:bg-slate-50 hover:text-primary font-medium text-lg transition-colors"
                        >-</button>
                        <input 
                          type="number" 
                          aria-label="Quantity"
                          value={quantity} 
                          readOnly 
                          className="w-10 sm:w-12 text-center font-bold text-slate-800 bg-transparent focus:outline-none text-sm sm:text-base"
                        />
                        <button 
                          aria-label="Increase quantity"
                          onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
                          className="px-4 sm:px-6 h-full text-slate-500 hover:bg-slate-50 hover:text-primary font-medium text-lg transition-colors"
                        >+</button>
                      </div>
                      
                      <button 
                        aria-label="Add to cart"
                        onClick={handleAddToCart}
                        className="flex-1 w-full bg-primary text-white h-12 sm:h-14 rounded-full hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl flex items-center justify-center font-semibold text-base sm:text-lg"
                      >
                        <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" />
                        Add to Cart
                      </button>
                    </>
                  ) : (
                    <div className="w-full bg-slate-100 text-slate-500 h-12 sm:h-14 rounded-full flex items-center justify-center font-semibold text-base sm:text-lg cursor-not-allowed">
                      Out of Stock
                    </div>
                  )}
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 min-[400px]:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm text-slate-600">
                  <div className="flex items-center">
                    <Truck className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-primary flex-shrink-0" />
                    <span>Free shipping over $150</span>
                  </div>
                  <div className="flex items-center">
                    <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-primary flex-shrink-0" />
                    <span>30-day return policy</span>
                  </div>
                  <div className="flex items-center">
                    <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-primary flex-shrink-0" />
                    <span>2 Year Extended Warranty</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 flex items-center justify-center flex-shrink-0">
                      <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-500"></span>
                    </div>
                    <span>{product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
