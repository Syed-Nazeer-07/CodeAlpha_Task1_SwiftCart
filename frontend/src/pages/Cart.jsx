import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { Trash2, ArrowRight, ShoppingBag, ShieldCheck, Minus, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

const Cart = () => {
  const { cart, removeFromCart, updateCartQuantity } = useContext(CartContext);
  const navigate = useNavigate();

  const cartItems = cart?.products || [];
  
  const totalPrice = cartItems.reduce((acc, item) => {
    return acc + (item.productId?.price * item.quantity);
  }, 0);

  const handleDecrease = (item) => {
    if (item.quantity <= 1) {
      removeFromCart(item.productId._id);
    } else {
      updateCartQuantity(item.productId._id, item.quantity - 1);
    }
  };

  const handleIncrease = (item) => {
    updateCartQuantity(item.productId._id, item.quantity + 1);
  };

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 sm:py-32 bg-white rounded-3xl shadow-sm border border-slate-100 max-w-4xl mx-auto mt-4 sm:mt-10">
        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6 sm:mb-8 text-slate-300">
          <ShoppingBag className="w-10 h-10 sm:w-12 sm:h-12" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-dark text-center">Your Cart is Empty</h2>
        <p className="text-sm sm:text-base text-slate-500 mb-8 sm:mb-10 text-center max-w-md">Looks like you haven't added anything to your cart yet. Discover our premium collections.</p>
        <Link to="/" className="bg-dark text-white px-8 py-3 sm:py-4 rounded-full font-semibold hover:bg-black transition-colors shadow-lg text-sm sm:text-base w-full sm:w-auto text-center">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 sm:mt-8 mb-20">
      <button aria-label="Back to products" onClick={() => navigate(-1)} className="flex items-center text-dark font-semibold text-sm hover:underline mb-6">
        <ArrowRight className="w-4 h-4 mr-2 rotate-180" /> Continue Shopping
      </button>
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-dark mb-6 sm:mb-10">Shopping Cart</h1>
      
      <div className="flex flex-col xl:flex-row gap-8 lg:gap-12">
        <div className="w-full xl:w-2/3">
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="hidden sm:grid grid-cols-12 gap-4 p-6 border-b border-slate-100 bg-slate-50/50 text-sm font-semibold text-slate-500 uppercase tracking-wider">
              <div className="col-span-6">Product</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-right">Price</div>
              <div className="col-span-2 text-right">Total</div>
            </div>
            
            <div className="divide-y divide-slate-100">
              {cartItems.map((item, index) => (
                item.productId && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    key={item.productId._id} 
                    className="p-4 sm:p-6 flex flex-col sm:grid sm:grid-cols-12 gap-4 items-start sm:items-center group"
                  >
                    <div className="col-span-6 flex flex-row items-center space-x-4 sm:space-x-6 w-full">
                      <div className="w-20 h-20 sm:w-24 sm:h-24 bg-slate-50 rounded-xl flex-shrink-0 flex items-center justify-center overflow-hidden border border-slate-100">
                        <img src={item.productId.image} alt={item.productId.title} className="w-full h-full object-contain p-2" />
                      </div>
                      <div className="flex-grow">
                        <Link to={`/product/${item.productId._id}`} className="text-sm sm:text-base font-bold text-dark hover:text-black transition-colors line-clamp-2">
                          {item.productId.title}
                        </Link>
                        <div className="text-xs text-slate-500 mt-1 uppercase tracking-wider font-semibold">
                          {item.productId.brand ? `${item.productId.brand} • ${item.productId.category}` : item.productId.category}
                        </div>
                        {/* Mobile Only: Price & Controls */}
                        <div className="flex sm:hidden justify-between items-center mt-4">
                          <span className="font-bold text-dark">${(item.productId.price * item.quantity).toFixed(2)}</span>
                          
                          <div className="flex items-center space-x-2 bg-slate-50 border border-slate-200 rounded-full p-1">
                            <button onClick={() => handleDecrease(item)} className="w-6 h-6 flex items-center justify-center bg-white rounded-full shadow-sm text-dark hover:bg-slate-100">
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                            <button onClick={() => handleIncrease(item)} className="w-6 h-6 flex items-center justify-center bg-white rounded-full shadow-sm text-dark hover:bg-slate-100">
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="col-span-2 hidden sm:flex justify-center items-center">
                      <div className="flex items-center space-x-3 bg-slate-50 border border-slate-200 rounded-full p-1">
                        <button onClick={() => handleDecrease(item)} className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-sm text-dark hover:bg-slate-100 transition-colors">
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                        <button onClick={() => handleIncrease(item)} className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-sm text-dark hover:bg-slate-100 transition-colors">
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="col-span-2 hidden sm:block text-right text-slate-500 text-sm">
                      ${item.productId.price.toFixed(2)}
                    </div>
                    
                    <div className="col-span-2 hidden sm:flex items-center justify-end space-x-4">
                      <div className="font-bold text-dark">
                        ${(item.productId.price * item.quantity).toFixed(2)}
                      </div>
                      <button 
                        aria-label="Remove item"
                        onClick={() => removeFromCart(item.productId._id)}
                        className="text-slate-300 hover:text-red-500 transition-colors p-2"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                )
              ))}
            </div>
          </div>
        </div>
        
        <div className="w-full xl:w-1/3">
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-slate-100 p-6 sm:p-8 sticky top-28">
            <h3 className="text-lg sm:text-xl font-bold text-dark mb-6">Order Summary</h3>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-sm sm:text-base text-slate-600">
                <span>Subtotal ({cartItems.length} items)</span>
                <span className="font-medium">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm sm:text-base text-slate-600">
                <span>Shipping</span>
                <span className="font-medium text-green-600">Free</span>
              </div>
              <div className="flex justify-between text-sm sm:text-base text-slate-600">
                <span>Tax (estimated)</span>
                <span className="font-medium">${(totalPrice * 0.1).toFixed(2)}</span>
              </div>
              
              <div className="border-t border-slate-100 pt-4 mt-4">
                <div className="flex justify-between items-end">
                  <span className="text-base sm:text-lg font-semibold text-dark">Total</span>
                  <div className="text-right">
                    <span className="text-xs text-slate-500 block mb-1">Including $ {(totalPrice * 0.1).toFixed(2)} in taxes</span>
                    <span className="text-2xl sm:text-3xl font-bold text-dark">${(totalPrice * 1.1).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <button 
              onClick={() => navigate('/checkout')}
              className="w-full bg-dark text-white px-6 py-4 rounded-full hover:bg-black transition-all shadow-lg hover:shadow-xl flex justify-center items-center font-bold text-base sm:text-lg"
            >
              Proceed to Checkout <ArrowRight className="w-5 h-5 ml-2" />
            </button>
            
            <div className="mt-6 flex justify-center items-center space-x-4 text-slate-400">
              <ShieldCheck className="w-5 h-5" />
              <span className="text-xs sm:text-sm">Secure Checkout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
