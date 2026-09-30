const Cart = require('../models/Cart');

const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: req.user._id }).populate('products.productId');
    if (!cart) {
      cart = await Cart.create({ userId: req.user._id, products: [] });
    }
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    let cart = await Cart.findOne({ userId: req.user._id });
    
    if (!cart) {
      cart = new Cart({ userId: req.user._id, products: [] });
    }
    
    const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);
    if (productIndex > -1) {
      cart.products[productIndex].quantity += quantity;
    } else {
      cart.products.push({ productId, quantity });
    }
    
    await cart.save();
    const updatedCart = await Cart.findById(cart._id).populate('products.productId');
    res.status(201).json(updatedCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id });
    if (cart) {
      cart.products = cart.products.filter(p => p.productId.toString() !== req.params.id);
      await cart.save();
      const updatedCart = await Cart.findById(cart._id).populate('products.productId');
      res.json(updatedCart);
    } else {
      res.status(404).json({ message: 'Cart not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateCartQuantity = async (req, res) => {
  try {
    const { quantity } = req.body;
    const cart = await Cart.findOne({ userId: req.user._id });
    if (cart) {
      const productIndex = cart.products.findIndex(p => p.productId.toString() === req.params.id);
      if (productIndex > -1) {
        if (quantity <= 0) {
          cart.products.splice(productIndex, 1);
        } else {
          cart.products[productIndex].quantity = quantity;
        }
        await cart.save();
        const updatedCart = await Cart.findById(cart._id).populate('products.productId');
        return res.json(updatedCart);
      }
    }
    res.status(404).json({ message: 'Cart or product not found' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id });
    if (cart) {
      cart.products = [];
      await cart.save();
      const updatedCart = await Cart.findById(cart._id).populate('products.productId');
      res.json(updatedCart);
    } else {
      res.status(404).json({ message: 'Cart not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getCart, addToCart, removeFromCart, updateCartQuantity, clearCart };
