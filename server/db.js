const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'rsiot',
  password: '3002',
  port: 5432,
});

module.exports = pool;