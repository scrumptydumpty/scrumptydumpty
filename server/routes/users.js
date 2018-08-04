const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const aws = require('aws-sdk');
const controller = require('../controller');

const router = express.Router();
//const apiVersion = { apiVersion: '2006-03-01' };
const bucketName = 'node-sdk-sample-f69979b6-f2e2-4af3-aea6-40e160502a21';

router.post('/', (req, res) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => {
      controller.addUser({ username: req.body.username, password: hash })
        .then((result) => {
          passport.authenticate('local', (err, user, info) => {
            if (err) {
              console.log(err);
              res.send(false);
              return;
            }
            if (!user) {
              console.log('user login failed');
              return res.send(false);
            }
            req.logIn(user, (err) => {
              if (err) {
                console.log(err);
                return next(err);
              }
              return res.send({ id: user.id, username: user.username });
            });
          })(req, res);
        })
        .catch((err) => { console.log(err); return res.send(false); });
    });
});

// NOT NEEDED
router.get('/', (req, res) => {
  controller
    .getUsers()
    .then((result) => {
      return res.send(result);
    })
    .catch((err) => {
      console.log(err);
      return res.send(false);
    });
});

router.post('/pic', (req, res, next) => {
  const { name, data, mimetype } = req.files.file;
  const objectParams = {
    ACL: 'public-read',
    Bucket: bucketName,
    ContentType: mimetype,
    // Expires: 604800,
    Key: name,
    Body: data,
  };

  new aws.S3({
    accessKeyId: process.env.S3_KEY,
    secretAccessKey: process.env.S3_SECRET,
    apiVersion: '2006-03-01'
  }).putObject(objectParams).promise()
    .then((data) => {
      controller.updateUserProfilePic({ username: req.body.username, url: `https://s3.amazonaws.com/${bucketName}/${name}` });
      res.status(201).send();
    })
    .catch((err) => {
      console.error(err, err.stack);
      res.status(500).send();
    });
});

router.put('/pw', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.log(err);
      res.send(false);
      return;
    }
    if (!user) {
      console.log('user login failed');
      return res.send(false);
    }
    // username, password was correct. now update based on newpassword.
    bcrypt.hash(req.body.newpassword, 10)
      .then(hash => controller.updateUserPassword({ username: req.body.username, password: hash }))
      .then(user => res.send({ id: user.id, username: user.username }))
      .catch((err) => {
        console.log(err);
        res.send(false);
      });
  })(req, res, next);
});

router.put('/', (req, res) => {
  controller.updateUser(req.body)
    .then((result) => { return res.send(result); })
    .catch((err) => { console.log(err); return res.send(false); });
});

router.put('/name', (req, res) => {
  controller.updateUserName(req.body)
    .then((result) => { return res.send(result); })
    .catch((err) => { console.log(err); return res.send(false); });
});

router.put('/desc', (req, res) => {
  controller.updateUserDesc(req.body)
    .then((result) => { return res.send(result); })
    .catch((err) => { console.log(err); return res.send(false); });
});

router.get('/sprint', (req, res) => {
// needs AUTH
  controller
    .getUsersInSprint(req.query.sprint_id, req.user)
    .then((result) => {
      return res.send(result);
    })
    .catch((err) => {
      console.log(err);
      return res.send(false);
    });
});

module.exports = router;
