const express = require('express');
const { getCart, addToCart, removeFromCart, updateCartQuantity, clearCart } = require('../controllers/cartController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
  .get(protect, getCart);

router.post('/add', protect, addToCart);
router.delete('/remove/:id', protect, removeFromCart);
router.put('/update/:id', protect, updateCartQuantity);
router.delete('/clear', protect, clearCart);

module.exports = router;
