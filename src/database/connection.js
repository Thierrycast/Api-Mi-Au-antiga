const knex = require("knex")({
  client: "pg",
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: "5035",
    database: process.env.DB_DATABASE,
    // ssl: {
    //   rejectUnauthorized: false,
    // },
  },
});

module.exports = knex;
