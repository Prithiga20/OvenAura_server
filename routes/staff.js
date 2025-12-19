const express = require('express');
const Staff = require('../models/Staff');
const { adminAuth } = require('../middleware/auth');

const router = express.Router();

// Get all staff (Admin only)
router.get('/', adminAuth, async (req, res) => {
  try {
    const staff = await Staff.find().sort({ createdAt: -1 });
    res.json(staff);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create staff (Admin only)
router.post('/', adminAuth, async (req, res) => {
  try {
    const staff = new Staff(req.body);
    await staff.save();
    res.status(201).json(staff);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update staff (Admin only)
router.put('/:id', adminAuth, async (req, res) => {
  try {
    const staff = await Staff.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!staff) {
      return res.status(404).json({ message: 'Staff not found' });
    }
    res.json(staff);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete staff (Admin only)
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const staff = await Staff.findByIdAndDelete(req.params.id);
    if (!staff) {
      return res.status(404).json({ message: 'Staff not found' });
    }
    res.json({ message: 'Staff deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;