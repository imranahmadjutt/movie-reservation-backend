const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Movie = sequelize.define('Movie', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
  },
  duration: {
    type: DataTypes.INTEGER, // in minutes
    allowNull: false
  }
}, {
  tableName: 'movies',
  timestamps: true
});

module.exports = Movie;
