const express = require('express');
const Cart = require('../models/Cart');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Get user cart
router.get('/', auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
    if (!cart) {
      return res.json({ items: [], totalAmount: 0 });
    }
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add to cart
router.post('/add', auth, async (req, res) => {
  try {
    const { productId, quantity, size, toppings, price } = req.body;

    let cart = await Cart.findOne({ user: req.user._id });
    
    if (!cart) {
      cart = new Cart({ user: req.user._id, items: [] });
    }

    const existingItem = cart.items.find(item => 
      item.product.toString() === productId && 
      item.size === size &&
      JSON.stringify(item.toppings) === JSON.stringify(toppings)
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({
        product: productId,
        quantity,
        size,
        toppings,
        price
      });
    }

    cart.totalAmount = cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    await cart.save();

    await cart.populate('items.product');
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update cart item
router.put('/update/:itemId', auth, async (req, res) => {
  try {
    const { quantity } = req.body;
    
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const item = cart.items.id(req.params.itemId);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    item.quantity = quantity;
    cart.totalAmount = cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    
    await cart.save();
    await cart.populate('items.product');
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Remove from cart
router.delete('/remove/:itemId', auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items.pull(req.params.itemId);
    cart.totalAmount = cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    
    await cart.save();
    await cart.populate('items.product');
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Clear cart
router.delete('/clear', auth, async (req, res) => {
  try {
    await Cart.findOneAndDelete({ user: req.user._id });
    res.json({ message: 'Cart cleared successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;