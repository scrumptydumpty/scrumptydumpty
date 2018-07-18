const passport = require('passport');
const { Strategy } = require("passport-local");
const controller = require("./controller");

passport.use(
  new Strategy((username, password, done) => {
    controller.loginCorrect({ username, password }).then(valid => {
      if (!valid) {
        done("Invalid Credentials", null);
      } else {
        controller.getUserByName(username).then(user => done(null, user));
      }
    });
  })
);

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
  controller.getUserById(id).then(user => {
    if (!user) {
      cb("Err During Deserialization");
    } else {
      cb(null, user);
    }
  });
});
module.exports = {passport}