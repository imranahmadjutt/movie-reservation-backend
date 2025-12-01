require('dotenv').config();
const express = require('express');
const sequelize = require('./config/db');
const { initModels } = require('./models');
const authRoutes = require('./routes/auth');
const movieRoutes = require('./routes/movies');
const reservationRoutes = require('./routes/reservations');

const app = express();

//  THIS MUST COME FIRST
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/reservations', reservationRoutes);

app.get('/', (req, res) => res.send('Movie Reservation Backend is running'));

const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected');

    await initModels();
    console.log('Models initialized');

    await sequelize.sync({ alter: true });
    console.log('Sequelize sync complete');

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error('Unable to start server:', err);
  }
  const showtimeRoutes = require('./routes/showtimes');
app.use('/api/movies', showtimeRoutes);

const reservationRoutes = require('./routes/reservations');
app.use('/api/reservations', reservationRoutes);

})();
