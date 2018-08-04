require('dotenv').config();
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const { passport, fbStrategy } = require('./passport');
const tasks = require('./routes/tasks');
const blockers = require('./routes/blockers');
const users = require('./routes/users');
const login = require('./routes/login');
const sprints = require('./routes/sprints');
const graphQLHTTP = require('express-graphql');
const schema = require('./graphql/graphqlSchema');
const logout = require('./routes/logout');
const db = require('../database/db')

const port = process.env.PORT || 1337;


// SETUP
const app = express();


app.use(bodyParser.json());
app.use(fileUpload());
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

app.use(passport.initialize());
app.use(passport.session());

// ENDPOINTS
app.use('/tasks', tasks);
app.use('/blockers', blockers);
app.use('/users', users);
app.use('/login', login);

app.use('/sprints', sprints);
app.use('/logout', logout);


app.get('/test', (req, res) => {
  res.send();
});

// sends a user object to the requester if one exists
app.get('/verify', (req, res) => {
  if (req.user) {
    res.send({ id: req.user.id, username: req.user.username, description: req.user.description, profilePicture: req.user["profile_image_url"] });
  } else {
    console.log('user is not verified');
    res.send(false);
  }
});

//FB authentication
fbStrategy(passport);
app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', {
    failureRedirect: '/'
  }));

//graphql
app.use('/graphql', graphQLHTTP({
  schema,
  graphiql: true
}));

app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('*', (req, res) => {
  res.redirect('/');
});

const server = app.listen(port, () => console.log(`Listening on port ${port}`));
const io = require('socket.io')(server);

io.on('connection', function (client) {
  console.log('SOCKET 2 ME BB')

  client.on('message', ({ user, target, message }) => {
    db.addMessage(user, target, message).then((history)=>{client.emit('chathistory', history)})
  })
  client.on('getChats', ({ user, target }) => {
    db.getChats(user, target).then((history)=>{console.log(history);client.emit('chathistory', history)})
  })
})

io.on('disconnect', (client)=>{
  console.log('disconnected')
})
