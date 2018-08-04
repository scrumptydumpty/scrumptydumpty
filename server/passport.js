const passport = require('passport');
const { Strategy } = require('passport-local');
const FacebookStrategy = require('passport-facebook').Strategy;
const bcrypt = require('bcrypt');
const controller = require('./controller');

passport.use(
  new Strategy((username, password, done) => {
    controller.getUserByName(username)
      .then((user) => {
        if (!user) {
          return done('User does not exist', null);
        }
        if (bcrypt.compareSync(password, user.password)) {
          return done(null, user);
        }
        return done('Invalid Credentials', null);
      })
      .catch(err => console.log(err));
  })
);

fbStrategy = (passport) => {
  passport.use(new FacebookStrategy({
    clientID: process.env.FBAPPID,
    clientSecret: process.env.FBAPPSECRET,
    callbackURL: '/auth/facebook/callback',
    profileFields: ['id', 'displayName'],
    enableProof: true
  }, (accessToken, refreshToken, profile, done) => {
    process.nextTick(() => {
      //check database for user matching the fbid
      controller.getUserByFbId(profile.id)
        .then((user) => {
          console.log(`user: ${JSON.stringify(user)}`);
          if (user) {
            return done(null, user);
          } else {
            //if user does not exist in database, add them to the database
            controller.addFbUser({ username: profile.displayName, fbId: profile.id })
              .then((result) => {
                console.log('success - signed up user via facebook');
                //after adding to the database, search it for this fb user
                controller.getUserByFbId(result['fb_id'])
                  .then((user) => {
                    console.log('user inside getuserbyfbid');
                    console.log(user);
                    //if the user is found, send callback to serializeUser
                    if (user) {
                      console.log('user is defined');
                      return done(null, user);
                    } else {
                      console.log('user is not defined');
                      return done(null, false);
                    }
                  })
                  .catch((err) => {
                    console.error(err);
                    return done(null, false);
                  });
                  
                const title = result.username;
                const owner_id = result.id;
                const username = result.username;
                //add sprint to user (for local strategy, this part is done client-side)
                controller.addSprint(title, owner_id, username)
                  .then((result) => { 
                    console.log('successfully added sprint'); 
                    return res.send(result); 
                  })
                  .catch((err) => { 
                    console.log(err); 
                    return res.send(false); 
                  });
              })
              .catch((err) => {
                console.error(err);
                return done(null, false);
              });
          }
        })
        .catch((err) => {
          console.error(err);
          return done(null, false);
        });
    });
  }));
};

passport.serializeUser((user, cb) => {
  console.log('serializing user');
  console.log(user);
  cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
  controller.getUserById(id).then((user) => {
    if (!user) {
      controller.getUserByFbId(id).then((fbUser) => {
        if (!fbUser) {
          cb('Err During Deserialization - FB');
        } else {
          cb(null, fbUser);
        }
      })
        .catch((err) => {
          cb('Err During Deserialization - Local');
        });
    } else {
      cb(null, user);
    }
  });
});

module.exports = { passport, fbStrategy };
