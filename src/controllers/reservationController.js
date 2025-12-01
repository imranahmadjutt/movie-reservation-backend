const { Reservation, Showtime, sequelize } = require('../models/index');

exports.bookSeat = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const userId = req.user.id;
    const { showtimeId, seat } = req.body;
    if (!showtimeId || !seat) return res.status(400).json({ message: 'showtimeId & seat required' });

    // 1) Check showtime exists
    const showtime = await Showtime.findByPk(showtimeId, { transaction: t });
    if (!showtime) {
      await t.rollback();
      return res.status(404).json({ message: 'Showtime not found' });
    }

    // 2) Try to create reservation (unique constraint prevents duplicates)
    const reservation = await Reservation.create({
      userId, showtimeId, seat
    }, { transaction: t });

    // optional: update available seats if you store a counter
    // await showtime.decrement('availableSeats', { by: 1, transaction: t });

    await t.commit();
    res.status(201).json({ reservation });
  } catch (err) {
    await t.rollback();
    // handle unique constraint (seat already reserved)
    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ message: 'Seat already booked' });
    }
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getUserReservations = async (req, res) => {
  const userId = req.user.id;
  const reservations = await Reservation.findAll({ where: { userId }, include: ['Showtime'] });
  res.json(reservations);
};

exports.cancelReservation = async (req, res) => {
  const userId = req.user.id;
  const reservationId = req.params.id;
  const reservation = await Reservation.findOne({ where: { id: reservationId, userId }});
  if (!reservation) return res.status(404).json({ message: 'Not found' });
  await reservation.destroy();
  res.json({ message: 'Cancelled' });
};
