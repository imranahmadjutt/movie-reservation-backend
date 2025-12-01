const { Movie, Showtime } = require('../models/index');

exports.getMovies = async (req, res) => {
  const movies = await Movie.findAll();
  res.json(movies);
};

exports.getMovie = async (req, res) => {
  const movie = await Movie.findByPk(req.params.id, { include: [Showtime] });
  if (!movie) return res.status(404).json({ message: 'Not found' });
  res.json(movie);
};
