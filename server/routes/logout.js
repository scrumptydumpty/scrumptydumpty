const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  console.log('logging out user');
  req.logout();
  res.redirect('/');
});

module.exports = router;
