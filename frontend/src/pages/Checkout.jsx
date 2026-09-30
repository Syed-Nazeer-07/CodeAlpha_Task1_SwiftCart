import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { CartContext } from '../context/CartContext';

const Checkout = () => {
  const { cart, fetchCart } = useContext(CartContext);
  const navigate = useNavigate();
  
  const [shippingAddress, setShippingAddress] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: ''
  });
  const [loading, setLoading] = useState(false);

  const cartItems = cart?.products || [];
  const itemsPrice = cartItems.reduce((acc, item) => acc + (item.productId?.price * item.quantity), 0);
  const taxPrice = itemsPrice * 0.1;
  const totalPrice = itemsPrice + taxPrice;

  const handleChange = (e) => {
    setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
  };

  const placeOrder = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const orderData = {
        products: cartItems.map(item => ({
          productId: item.productId._id,
          quantity: item.quantity,
          price: item.productId.price
        })),
        shippingAddress,
        totalPrice
      };
      
      await api.post('/orders', orderData);
      
      // clear cart in backend
      for (const item of cartItems) {
         await api.delete(`/cart/remove/${item.productId._id}`);
      }
      await fetchCart();
      
      navigate('/orders');
    } catch (error) {
      console.error("Error placing order:", error);
      alert('Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 sm:mt-8">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-dark mb-6 sm:mb-10">Checkout</h1>
      
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        <div className="w-full lg:w-2/3 bg-white p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl shadow-sm border border-slate-100">
          <h2 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-dark">Shipping Details</h2>
          <form id="checkout-form" onSubmit={placeOrder} className="space-y-5 sm:space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Street Address</label>
              <input required type="text" name="address" value={shippingAddress.address} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 p-3 sm:p-4 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-sm sm:text-base text-dark" placeholder="123 Main St" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">City</label>
                <input required type="text" name="city" value={shippingAddress.city} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 p-3 sm:p-4 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-sm sm:text-base text-dark" placeholder="New York" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Postal Code</label>
                <input required type="text" name="postalCode" value={shippingAddress.postalCode} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 p-3 sm:p-4 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-sm sm:text-base text-dark" placeholder="10001" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Country</label>
              <input required type="text" name="country" value={shippingAddress.country} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 p-3 sm:p-4 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-sm sm:text-base text-dark" placeholder="United States" />
            </div>
          </form>
        </div>

        <div className="w-full lg:w-1/3">
          <div className="bg-white p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-sm border border-slate-100 sticky top-28">
            <h2 className="text-xl sm:text-2xl font-bold mb-6 text-dark">Order Summary</h2>
            
            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 mb-6 scrollbar-thin scrollbar-thumb-slate-200">
              {cartItems.map(item => (
                <div key={item.productId._id} className="flex justify-between items-center text-sm sm:text-base pb-4 border-b border-slate-50 last:border-0 last:pb-0">
                  <div className="flex items-center w-3/4 pr-4">
                    <span className="font-semibold text-dark mr-3">{item.quantity}×</span>
                    <span className="truncate text-slate-600">{item.productId.title}</span>
                  </div>
                  <span className="font-semibold text-dark">${(item.quantity * item.productId.price).toFixed(2)}</span>
                </div>
              ))}
            </div>
            
            <div className="space-y-3 sm:space-y-4 pt-6 border-t border-slate-100">
              <div className="flex justify-between text-sm sm:text-base text-slate-600"><span>Items subtotal</span><span className="font-medium">${itemsPrice.toFixed(2)}</span></div>
              <div className="flex justify-between text-sm sm:text-base text-slate-600"><span>Shipping</span><span className="font-medium text-green-600">Free</span></div>
              <div className="flex justify-between text-sm sm:text-base text-slate-600"><span>Taxes</span><span className="font-medium">${taxPrice.toFixed(2)}</span></div>
              <div className="flex justify-between items-center font-bold text-lg sm:text-xl pt-4 mt-2 border-t border-slate-100 text-dark">
                <span>Total</span>
                <span className="text-2xl sm:text-3xl">${totalPrice.toFixed(2)}</span>
              </div>
            </div>
            
            <button 
              type="submit" 
              form="checkout-form"
              disabled={loading}
              aria-label="Confirm and Place Order"
              className="w-full mt-8 bg-primary text-white py-4 rounded-full font-bold hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl disabled:bg-slate-300 disabled:cursor-not-allowed text-base sm:text-lg flex justify-center items-center"
            >
              {loading ? (
                <span className="flex items-center"><svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Processing...</span>
              ) : 'Place Order'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
