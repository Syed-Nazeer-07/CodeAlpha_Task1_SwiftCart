import { createContext, useState, useEffect, useContext } from 'react';
import api from '../api/axios';
import { AuthContext } from './AuthContext';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ products: [] });
  const { user } = useContext(AuthContext);

  const fetchCart = async () => {
    if (user) {
      try {
        const { data } = await api.get('/cart');
        setCart(data);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    } else {
      setCart({ products: [] });
    }
  };

  useEffect(() => {
    fetchCart();
  }, [user]);

  const addToCart = async (productId, quantity = 1) => {
    if (!user) return alert('Please login to add to cart');
    try {
      const { data } = await api.post('/cart/add', { productId, quantity });
      setCart(data);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const { data } = await api.delete(`/cart/remove/${productId}`);
      setCart(data);
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  const updateCartQuantity = async (productId, quantity) => {
    try {
      const { data } = await api.put(`/cart/update/${productId}`, { quantity });
      setCart(data);
    } catch (error) {
      console.error("Error updating cart quantity:", error);
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateCartQuantity, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
};
