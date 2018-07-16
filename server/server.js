require('dotenv').config();
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database/db');


// SETUP
const app = express();
app.use(bodyParser.json());
const port = process.env.PORT || 1337;

// TASK ENDPOINTS
app.post('/task', (req, res) => {
  
});

app.get('/task', (req, res) => {

});

app.put('/task', (req, res) => {

});

// BLOCKER ENDPOINTS

app.post('/blocker', (req, res) => {

});

app.get('/blocker', (req, res) => {

});

app.put('/blocker', (req, res) => {

});


// USER ENDPOINTS

app.post('/user', (req, res) => {

});

app.get('/user', (req, res) => {

});

app.put('/user', (req, res) => {

});


// START SERVER


app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('*', (req, res) => {
  res.redirect('/')
});

app.listen(port, () => console.log(`Listening on port ${port}`));