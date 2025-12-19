const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  role: { 
    type: String, 
    required: true,
    enum: ['baker', 'cashier', 'manager', 'delivery']
  },
  salary: { type: Number, required: true },
  joinDate: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Staff', staffSchema);