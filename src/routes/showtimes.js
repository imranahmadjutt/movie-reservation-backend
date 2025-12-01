const express = require('express');
const router = express.Router();
const { Movie, Showtime } = require('../models');

// Get all showtimes for a movie
router.get('/:movieId/showtimes', async (req, res) => {
  try {
    const { movieId } = req.params;
    const showtimes = await Showtime.findAll({ where: { movieId } });
    res.json(showtimes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a showtime for a movie
router.post('/:movieId/showtimes', async (req, res) => {
  try {
    const { movieId } = req.params;
    const { time, availableSeats } = req.body;
    const showtime = await Showtime.create({ movieId, time, availableSeats });
    res.status(201).json(showtime);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
