const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { 
    type: String, 
    required: true,
    enum: ['cupcakes', 'cookies', 'pastries', 'burgers', 'pizzas', 'breads']
  },
  subcategory: { type: String },
  description: { type: String, required: true },
  image: { type: String, required: true },
  sizes: [{
    size: String,
    price: Number
  }],
  toppings: [{
    name: String,
    price: Number,
    category: { type: String, enum: ['veg', 'non-veg'] }
  }],
  stock: { type: Number, default: 100 },
  isAvailable: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);