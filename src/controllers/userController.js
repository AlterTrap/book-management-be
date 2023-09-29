const { User } = require('../models/user');
const bcrypt = require('bcrypt');

const {
  checkLength,
  oneUpscalePass,
} = require('../utils/validation/validation');

const create = async (req, res) => {
  const { username, password, passwordCfm } = req.body;
  const checkUsername = checkLength(username);
  const checkPassword = checkLength(password);
  const checkPasswordCfm = checkLength(passwordCfm);
  const checkUps = oneUpscalePass(password);

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
    return res.status(201).json(user);
  } else {
    return res.status(400).json('Password and Password Comfirm not match');
  }
};

module.exports = {
  create,
};
