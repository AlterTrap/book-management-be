const { User } = require('../models/user');
const bcrypt = require('bcrypt');
const passport = require('passport');

const {
  checkLength,
  isOneUpscalePass,
} = require('../utils/validation/validation');

const register = async (req, res) => {
  const { username, password, passwordCfm } = req.body;
  const checkUsername = checkLength(username);
  const checkPassword = checkLength(password);
  const checkPasswordCfm = checkLength(passwordCfm);
  const checkUps = isOneUpscalePass(password);

  if (!checkUsername) {
    return res.status(400).json('Username Not enough 6 letters');
  }

  if (!checkPassword) {
    return res.status(400).json('Passsword Not enough 6 letters');
  }

  if (!checkPasswordCfm) {
    return res.status(400).json('Passsword Comfirm Not enough 6 letters');
  }

  if (checkUps) {
    return res.status(400).json('Password require 1 upscale letter');
  }

  // Check password and password comfirm
  if (password == passwordCfm) {
    const foundUser = await User.findOne({ where: { username } });
    if (foundUser) return res.status(409).json(`${username} already exist`);
    const user = await User.create({
      username,
      password: await bcrypt.hash(password, 10),
    });
    passport.authenticate('local')(req, res, function () {
      return res.status(201).json(req.isAuthenticated());
    });
  } else {
    return res.status(400).json('Password and Password Comfirm not match');
  }
};

const login = (req, res, next) => {
  const { username, password } = req.body;
  const checkUsername = checkLength(username);
  const CheckPassword = checkLength(password);
  const checkUps = isOneUpscalePass(password);

  if (!checkUsername) {
    return res.render('login', {
      usernameholder: username,
      msg: 'Username not enough 6 letters',
    });
  }

  if (!CheckPassword) {
    return res.render('login', {
      usernameholder: username,
      msg: 'Password not enough 6 letters',
    });
  }

  if (checkUps) {
    return res.render('login', {
      usernameholder: username,
      msg: 'Password require 1 upscale letter',
    });
  }

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
      return res.status(201).json(req.isAuthenticated());
    });
  })(req, res, next);
};

module.exports = {
  register,
  login,
};
