require('dotenv').config();
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const controller = require('./controller')


// SETUP
const app = express();
app.use(bodyParser.json());
const port = process.env.PORT || 1337;

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


// START SERVER


app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('*', (req, res) => {
  res.redirect('/')
});

app.listen(port, () => console.log(`Listening on port ${port}`));