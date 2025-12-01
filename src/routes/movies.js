const express = require('express');
const router = express.Router();
const { Movie } = require('../models');

// Get all movies
router.get('/', async (req, res) => {
  try {
    const movies = await Movie.findAll();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new movie
router.post('/', async (req, res) => {
  try {
    const { title, description, duration } = req.body;
    const movie = await Movie.create({ title, description, duration });
    res.status(201).json(movie);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
