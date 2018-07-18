const express = require('express');

const router = express.Router();
const passport = require('passport');


router.post('/', (req, res, next) => {
  console.log('logging in user');
  passport.authenticate('local', (err, user, info) => {
    console.log('err', err);
    if (err || !user) { console.log('failure to login'); res.status(400).send('Invalid Login'); return; }
    req.logIn(user, (err) => {
      if (err) { return next(err); }
      console.log('login successful');
      res.status(200).send(user);
    });
  })(req, res, next);
});

module.exports = router;
