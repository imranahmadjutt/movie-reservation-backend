const { Client } = require('pg');
require('dotenv').config();

(async () => {
  const client = new Client({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  });

  try {
    await client.connect();
    await client.query('CREATE DATABASE movie_reservation_dev');
    console.log('Database created ');
    await client.end();
  } catch (err) {
    console.error(err);
  }
})();
