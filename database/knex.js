require('mysql2');

const host = process.env.DBHOST || 'us-cdbr-iron-east-01.cleardb.net';
const user = process.env.DBUSERNAME || 'b768685ccf7172';
const password = process.env.DBPASSWORD || '8268a2f9';
const db = process.env.DBNAME || 'heroku_7b21f428fffd31e';


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
