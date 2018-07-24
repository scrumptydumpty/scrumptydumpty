const express = require('express');
const controller = require('../controller');
const passport = require('passport')

const router = express.Router();
const bcrypt = require('bcrypt');

router.post('/', (req, res) => {
    console.log('adding user')
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            controller.addUser({ username: req.body.username, password: hash })
                .then((result) => { 
                  console.log("success");
                  passport.authenticate('local', function (err, user, info) {
                    if (err) {
                      console.log(err);
                      res.send(false);
                      return
                    }
                    if (!user) {
                      console.log('user login failed')
                      return res.send(false);
                    }
                    req.logIn(user, function (err) {
                      if (err) {
                        console.log(err);
                        return next(err);
                      }
                      return res.send({ id: user.id, username: user.username });
                    });
                  })(req, res);
                  })
                .catch((err) => { console.log(err); return res.send(false) });
        });
});

router.get('/', (req, res) => {
  console.log('fetching users');
  controller
    .getUsers()
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
  console.log('updating user');
  controller.updateUser(req.body)
    .then((result) => { console.log('success'); return res.send(result); })
    .catch((err) => { console.log(err); return res.send(false); });
});

module.exports = router;
