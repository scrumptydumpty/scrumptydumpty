const express = require('express');
const controller = require('../controller');

const router = express.Router();


router.post('/', (req, res) => {
  const title = req.body.title;
  const owner_id = req.user.id;
  const username = req.user.username;
  controller.addSprint(title, owner_id, username)
    .then((result) => { return res.send(result); })
    .catch((err) => { console.log(err); return res.send(false); });
});

router.get('/', (req, res) => {
  if (req.user) {
    const user_id = req.user.id;
    controller.getSprints({ user_id })
      .then((result) => { return res.send(result); })
      .catch((err) => { console.log(err); return res.send(false); });
  }
});


router.get('/isOwner', (req, res) => {
  const owner_id = req.user.id;
  const { sprint_id } = req.query;
  controller
    .isOwner({ owner_id, sprint_id })
    .then((result) => {
      return res.send(result);
    })
    .catch((err) => {
      console.log(err);
      return res.send(false);
    });
});


// used to add a user to a sprint
router.put('/addUser', (req, res) => {
  // check that user is allowed to add people to the sprint
  const owner_id = req.user.id;
  const { username, sprint_id } = req.body;

  controller.addUserToSprint({ owner_id, username, sprint_id })
    .then((result) => { return res.send(result); })
    .catch((err) => { console.log(err); return res.send(false); });
});

// used to add a user to a sprint
router.put('/removeUser', (req, res) => {
  // check that user is allowed to add people to the sprint
  const owner_id = req.user.id;
  const { user_id, sprint_id } = req.body;

  controller.removeUserFromSprint({ owner_id, user_id, sprint_id })
    .then((result) => { return res.send(result); })
    .catch((err) => { console.log(err); return res.send(false); });
});

//adds a user to the reject pool
router.post('/reject', (req, res) => {
  const { user_id, sprint_id } = req.body;
  
  controller.addUserToRejectPool({ user_id, sprint_id })
    .then((result) => { return res.send(result); })
    .catch((err) => { console.log(err); return res.send(false); });
});

//get reject pool for logged in user
router.get('/reject', (req, res) => {
  const { sprint_id } = req.query;

  controller.getRejects(sprint_id)
    .then( result => {
      const ids = [];
      result.forEach( noShow => {
        ids.push(noShow.user_id);
      });
      return res.send(ids);
    })
    .catch((err) => { console.log(err); return res.send([]); });
})

module.exports = router;
