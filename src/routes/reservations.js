const express = require('express');
const router = express.Router();
const { Reservation, Showtime } = require('../models');
const authMiddleware = require('../middlewares/authMiddleware'); // JWT protection

// Book seats for a showtime (protected)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { showtimeId, seatsBooked } = req.body;
    const userId = req.user.id; // from JWT token

    const showtime = await Showtime.findByPk(showtimeId);
    if (!showtime) return res.status(404).json({ message: 'Showtime not found' });

    if (showtime.availableSeats < seatsBooked) {
      return res.status(400).json({ message: 'Not enough available seats' });
    }

    // Create reservation
    const reservation = await Reservation.create({ userId, showtimeId, seatsBooked });

    // Decrease available seats
    showtime.availableSeats -= seatsBooked;
    await showtime.save();

    res.status(201).json(reservation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all reservations for logged-in user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const reservations = await Reservation.findAll({ where: { userId }, include: 'Showtime' });
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
