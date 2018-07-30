const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  console.log('logging out user');
  if (req.user) {
    req.logout();
    res.send(true);
  } else {
    res.send(false);
  }
});

module.exports = router;
