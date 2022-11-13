const knex = require("knex")({
  client: "pg",
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
    ssl: {
      rejectUnauthorized: true,
    },
  },
  pool: {
    min: 0,
    max: 10,
    idleTimeoutMillis: 60000,
    reapIntervalMillis: 5000,
  },
});

module.exports = knex;
