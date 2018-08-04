const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return next(err);
    } else {
      req.logout();
      res.clearCookie('connect.sid');
      res.sendStatus(200);
    }
  });
});

module.exports = router;
