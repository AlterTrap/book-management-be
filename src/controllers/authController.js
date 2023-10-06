const { User } = require('../models/user');
const bcrypt = require('bcrypt');
const passport = require('passport');

const register = async (req, res) => {
  const { username, password } = req.body;

  // Check password and password comfirm
  const foundUser = await User.findOne({ where: { username } });
  if (foundUser) return res.status(409).json(`${username} already exist`);

  await User.create({
    username,
    password: await bcrypt.hash(password, 10),
  });

  passport.authenticate('local')(req, res, async () => {
    const getUser = await User.findOne({ where: { username } });
    return res.status(201).json(getUser);
  });
};

const login = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      // Display message
      msg = info.message;
      return res.status(500).json(msg);
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      return res.status(201).json(user);
    });
  })(req, res, next);
};

module.exports = {
  register,
  login,
};
