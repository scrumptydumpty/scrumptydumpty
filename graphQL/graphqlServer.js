require('dotenv').config();
const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./graphqlSchema');
const { knex } = require ('../database/knex');

const port = /*process.env.PORT ||*/ 4000;

const app = express();
app.use(express.static(__dirname));
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

app.listen(port, () => console.log(`Listening on port ${port}`));