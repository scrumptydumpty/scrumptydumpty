const express = require('express');
const controller = require('../controller');

const router = express.Router();


router.post('/', (req, res) => {
  console.log('adding sprint');
  const title = req.body.title;
  const owner_id = req.user.id; 
  controller.addSprint(title,owner_id)
    .then((result) => { console.log('success'); return res.send(result); })
    .catch((err) => { console.log(err); return res.send(false); });
});

router.get('/', (req, res) => {
  console.log('fetching sprints a user has access to');
  const owner_id = req.user.id;
  controller.getSprints({owner_id})
    .then((result) => { console.log('success'); return res.send(result); })
    .catch((err) => { console.log(err); return res.send(false); });
});

router.put('/', (req, res) => {
  console.log('updating sprint');
  // check that user is allowed
  
  controller.updateSprint(req.body)
    .then((result) => { console.log('success'); return res.send(result); })
    .catch((err) => { console.log(err); return res.send(false); });
});

module.exports = router;
