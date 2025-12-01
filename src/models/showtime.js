const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Movie = require('./movie');

const Showtime = sequelize.define('Showtime', {
  time: {
    type: DataTypes.DATE,
    allowNull: false
  },
  availableSeats: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 50
  }
}, {
  tableName: 'showtimes',
  timestamps: true
});

// Association
Movie.hasMany(Showtime, { foreignKey: 'movieId' });
Showtime.belongsTo(Movie, { foreignKey: 'movieId' });

module.exports = Showtime;
