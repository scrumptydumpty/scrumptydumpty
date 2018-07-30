const express = require('express');
const controller = require('../controller');

const router = express.Router();

router.post('/', (req, res) => {
  console.log('adding blocker');
  controller.addBlocker(req.body, req.user)
    .then((result) => { console.log('success'); return res.send(result); })
    .catch((err) => { console.log(err); return res.send(false); });
});

// unused
// router.get('/', (req, res) => {
//   console.log('fetching blockers');
//   controller.getBlockers(req.query.id)
//     .then((result) => { console.log('success'); return res.send(result); })
//     .catch((err) => { console.log(err); return res.send(false); });
// });

router.put('/', (req, res) => {
  console.log('updating blocker', req.body);
  controller.updateBlocker(req.body, req.user)
    .then((result) => { console.log('success'); return res.send(result); })
    .catch((err) => { console.log(err); return res.send(false); });
});

module.exports = router;
