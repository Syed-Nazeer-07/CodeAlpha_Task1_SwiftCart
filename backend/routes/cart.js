const express = require('express');
const { getCart, addToCart, removeFromCart } = require('../controllers/cartController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
  .get(protect, getCart);

router.post('/add', protect, addToCart);
router.delete('/remove/:id', protect, removeFromCart);

module.exports = router;
