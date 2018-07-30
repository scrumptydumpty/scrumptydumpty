const express = require('express');
const controller = require('../controller');

const router = express.Router();


router.post('/', (req, res) => {
  console.log('adding task');
  console.log(req.body, 'body of add request');
  controller.addTask(req.body, req.user)
    .then((result) => { console.log('success'); return res.send(result); })
    .catch((err) => { console.log(err); return res.send(false); });
});

router.get('/', (req, res) => {
  console.log('fetching tasks');
  console.log(req.query);
  controller
    .getTasks(req.query.sprint_id, req.user)
    .then((result) => {
      console.log('success');
      return res.send(result);
    })
    .catch((err) => {
      console.log(err);
      return res.send(false);
    });
});

router.put('/', (req, res) => {
  console.log('updating task');
  controller.updateTask(req.body, req.user)
    .then((result) => { console.log('success'); return res.send(result); })
    .catch((err) => { console.log(err); return res.send(false); });
});

module.exports = router;
