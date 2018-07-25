const passport = require('passport');
const { Strategy } = require("passport-local");
const controller = require("./controller");
const bcrypt = require('bcrypt');

passport.use(
  new Strategy((username, password, done) => {
    controller.getUserByName(username)
      .then(user => {
        if (bcrypt.compareSync(password, user.password)) {
          return done(null, user);
        } else {
          return done("Invalid Credentials", null)
        }
      })
      .catch(err => console.log(err));
  })
);

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
  controller.getUserById(id).then((user) => {
    if (!user) {
      cb('Err During Deserialization');
    } else {
      cb(null, user);
    }
  });
});
module.exports = { passport };
