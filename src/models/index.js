const sequelize = require('../config/db');
const User = require('./user');
const Movie = require('./movie');
const Showtime = require('./showtime');
const Reservation = require('./reservation');

// Initialize models (just load them so associations work)
async function initModels() {
  // No sync here — server.js will sync
  console.log('Models loaded');
}

module.exports = { sequelize, initModels, User, Movie, Showtime, Reservation };
