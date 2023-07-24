const express = require('express');
const router = express.Router();
const Change = require('../models/change');

// Route to get all changes
router.get('/', async (req, res) => {
  try {
    const changes = await Change.find();
    res.json(changes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to add a change
router.post('/', async (req, res) => {
  const change = new Change({
    propertyA: req.body.propertyA,
    propertyB: req.body.propertyB,
    propertyC: req.body.propertyC
  });

  try {
    const newChange = await change.save();
    res.status(201).json(newChange);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Route to delete all changes
router.delete('/', async (req, res) => {
  try {
    await Change.deleteMany();
    res.json({ message: 'All changes deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const change = await Change.findById(req.params.id);
    if (!change) return res.status(404).send('No item found');
    await Change.deleteOne({ _id: req.params.id });
    res.json({ message: 'Change removed' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
