const passport = require('passport');
const { User } = require('../models/user');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  new JwtStrategy(opts, async function (jwtPayload, done) {
    const user = await User.findOne({ id: jwtPayload.sub });

    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  })
);

module.exports = passport;
