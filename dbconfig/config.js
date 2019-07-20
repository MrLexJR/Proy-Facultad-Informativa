const { Pool } = require('pg');
require('dotenv').config();

// const pool = new Pool({
//   connectionString: process.env.DBHOST
// });

const pool = new Pool({
  host: process.env.DBHOST,
  port: process.env.DBPORT,
  user: process.env.DBUSER,
  password: process.env.DBPASSWORD,
  database: process.env.DBNAME
})

module.exports = pool