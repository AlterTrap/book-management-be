const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { User } = require('../models/user');

passport.use(
  new LocalStrategy({ usernameField: 'username' }, async function (
    username,
    password,
    done
  ) {
    //match user
    const userData = await User.findOne({ where: { username } });
    if (!userData) {
      return done(null, false, { message: 'User not exist' });
    }
    //match pass
    bcrypt.compare(password, userData.password, (err, isMatch) => {
      if (err) return done(null, false, { message: err });

      if (isMatch) {
        return done(null, userData);
      } else {
        return done(null, false, {
          message: 'Password incorrect',
        });
      }
    });
  })
);

passport.serializeUser((user, done) => {
  return done(null, {
    id: user._id,
    username: user.username,
  });
});

passport.deserializeUser(async (user, done) => {
  await User.findOne({ where: { username: user.username } }, (err, user) => {
    return done(err, user);
  });
});

module.exports = passport;
