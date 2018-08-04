const express = require('express');
const controller = require('../controller');

const router = express.Router();

router.post('/', (req, res) => {
  controller.addBlocker(req.body, req.user)
    .then((result) => { return res.send(result); })
    .catch((err) => { console.log(err); return res.send(false); });
});

router.get('/', (req, res) => {
  controller.getBlockers(req.query.id)
    .then((result) => { return res.send(result); })
    .catch((err) => { console.log(err); return res.send(false); });
});

router.put('/', (req, res) => {
  controller.updateBlocker(req.body, req.user)
    .then((result) => { return res.send(result); })
    .catch((err) => { console.log(err); return res.send(false); });
});

module.exports = router;
