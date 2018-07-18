require('dotenv').config();
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const controller = require('./controller');
const passport = require('passport');
var Strategy = require("passport-local").Strategy;
const port = process.env.PORT || 1337;


passport.use(new Strategy(
  function (username, password, done) {

    controller.loginCorrect({username, password})
    .then(valid=>{
      if(!valid){
        done('Invalid Credentials', null);
      }else{
        controller.getUserByName(username)
          .then(user => done(null,user) );
      }
    });
  }));


passport.serializeUser(function (user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function (id, cb) {
  controller.getUserById(id)
  .then(user=>{
    if(!user){
      cb('Err During Deserialization')
    }else{
      cb(null,user);
    }


  })
});


// SETUP
const app = express();
app.use(bodyParser.json());
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
// TASK ENDPOINTS
app.post('/task', (req, res) => {
  console.log('adding task')
  controller.addTask(req.body)
  .then((result)=>{console.log('success'); return res.send(result)})
  .catch((err)=>{console.log(err); return res.send(false)});

});

app.get('/tasks', (req, res) => {
  console.log('fetching tasks')
  controller.getTasks()
    .then((result) => { console.log('success'); return res.send(result) })
    .catch((err) => { console.log(err); return res.send(false) });
});

app.put('/task', (req, res) => {
  console.log('updating task')
  controller.updateTask(req.body)
    .then((result) => { console.log("success"); return res.send(result) })
    .catch((err) => { console.log(err); return res.send(false) });
});

// BLOCKER ENDPOINTS

app.post('/blocker', (req, res) => {
  console.log('adding blocker')
  controller.addBlocker(req.body)
    .then((result) => { console.log("success"); return res.send(result) })
    .catch((err) => { console.log(err); return res.send(false) });
});

app.get('/blockers', (req, res) => {
  console.log('fetching blockers')
  controller.getBlockers(req.query.id)
    .then((result) => { console.log("success"); return res.send(result) })
    .catch((err) => { console.log(err); return res.send(false) });
});

app.put('/blocker', (req, res) => {
  console.log('updating blocker')
  controller.updateBlocker(req.body)
    .then((result) => { console.log("success"); return res.send(result) })
    .catch((err) => { console.log(err); return res.send(false) });
});


// USER ENDPOINTS

app.post('/user', (req, res) => {
  console.log('adding user')
  controller.addUser(req.body)
    .then((result) => { console.log("success"); return res.send(result) })
    .catch((err) => { console.log(err); return res.send(false) });
});


app.put('/user', (req, res) => {
  console.log('updating user')
  controller.updateUser(req.body)
    .then((result) => { console.log("success"); return res.send(result) })
    .catch((err) => { console.log(err); return res.send(false) });
});

app.get("/users", (req, res) => {
  console.log('fetching users')
  controller
    .getUsers()
    .then(result => {
      console.log("success");
      return res.send(result);
    })
    .catch(err => {
      console.log(err);
      return res.send(false);
    });
});

app.post('/login',
  function (req, res, next) {
    console.log('logging in user')
    passport.authenticate('local', function (err, user, info) {
      if (err || !user ) { console.log('failure to login'); res.status(400).send('Invalid Login'); return;}
      req.logIn(user, function (err) {
        if (err) { return next(err); }
        console.log('login successful')
        res.status(200).send(user);
        return
      });
      
    })(req, res, next);
  });

app.get('/logout',
  function (req, res) {
    console.log('logging out user');
    req.logout();
    res.redirect('/');
  });

app.get('/test',(req,res)=>{
  console.log(req);
  res.send();
});


// START SERVER


app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('*', (req, res) => {
  res.redirect('/')
});

app.listen(port, () => console.log(`Listening on port ${port}`));