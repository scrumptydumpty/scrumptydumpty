require('mysql2');
const host = process.env.DBHOST || "localhost";
const user = process.env.DBUSERNAME || 'student';
const password = process.env.DBPASSWORD || 'student';
const db = process.env.DBNAME || 'db';

const knex = require('knex')({
  client: 'mysql2',
  connection: {
    host: host,
    user: user,
    password: password,
    database: db
  }
});

console.log('Database Connected!')

module.exports = { knex }