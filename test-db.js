const sequelize = require('./src/config/db');

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected ');
  } catch (err) {
    console.error('Unable to connect to database:', err);
  }
})();
