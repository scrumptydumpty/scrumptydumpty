require('mysql2');

const host = process.env.DBHOST || 'localhost';
const user = process.env.DBUSERNAME || 'root';
const password = process.env.DBPASSWORD || '';
const db = process.env.DBNAME || 'sprints';


const knex = require('knex')({
  client: 'mysql2',
  connection: {
    host,
    user,
    password,
    database: db,
  },
});


knex('users').select().then(() => console.log('Database Connected!'));

module.exports = { knex };
