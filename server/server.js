require('dotenv').config();
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const {passport} = require('./passport');
const tasks = require('./routes/tasks')
const blockers = require('./routes/blockers');
const users = require('./routes/users');
const login = require('./routes/login');
const logout = require('./routes/logout');
const port = process.env.PORT || 1337;



// SETUP
const app = express();
app.use(bodyParser.json());
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

app.use(passport.initialize());
app.use(passport.session());

// ENDPOINTS
app.use('/tasks', tasks);
app.use('/blockers', blockers);
app.use('/users', users);
app.use('/login', login);
app.use('/logout', logout);


app.get('/test', (req, res) => {
  console.log(req);
  res.send();
});


// START SERVER


app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('*', (req, res) => {
  res.redirect('/');
});

app.listen(port, () => console.log(`Listening on port ${port}`));
