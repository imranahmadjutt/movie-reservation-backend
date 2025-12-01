const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user');
const Showtime = require('./showtime');

const Reservation = sequelize.define('Reservation', {
  seatsBooked: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  }
}, {
  tableName: 'reservations',
  timestamps: true
});

// Associations
User.hasMany(Reservation, { foreignKey: 'userId' });
Reservation.belongsTo(User, { foreignKey: 'userId' });

Showtime.hasMany(Reservation, { foreignKey: 'showtimeId' });
Reservation.belongsTo(Showtime, { foreignKey: 'showtimeId' });

module.exports = Reservation;
