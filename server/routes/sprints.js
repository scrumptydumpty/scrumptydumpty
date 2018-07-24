const express = require('express');
const controller = require('../controller');

const router = express.Router();


router.post('/', (req, res) => {
  console.log('adding sprint');
  const title = req.body.title;
  const owner_id = req.user.id; 
  const username = req.user.username;
  controller.addSprint(title,owner_id,username)
    .then((result) => { console.log('success'); return res.send(result); })
    .catch((err) => { console.log(err); return res.send(false); });
});

router.get('/', (req, res) => {
  console.log('fetching sprints a user has access to');
  const user_id = req.user.id;
  controller.getSprints({ user_id})
    .then((result) => { console.log('success', result); return res.send(result); })
    .catch((err) => { console.log(err); return res.send(false); });
});

// used to add a user to a sprint
router.put('/', (req, res) => {
  console.log('updating sprint');
  // check that user is allowed to add people to the sprint
  const owner_id = req.user.id;
  const {username, sprint_id } = req.body;
  
  controller.addUserToSprint({owner_id, username, sprint_id})
    .then((result) => { console.log('success'); return res.send(result); })
    .catch((err) => { console.log(err); return res.send(false); });
});

module.exports = router;
