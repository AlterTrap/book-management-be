const { User } = require('../models/user');
const bcrypt = require('bcrypt');
const passport = require('../utils/passportJwtConfig');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

const register = async (req, res) => {
  const { username, password } = req.body;
  const existingUser = await User.findOne({ where: { username } });

  if (existingUser) {
    return res.status(409).json(`${username} already exist`);
  }

  const newUser = await User.create({
    username,
    password: await bcrypt.hash(password, 10),
  });

  const token = jwt.sign(
    { id: newUser.id, username: newUser.username },
    secret
  );

  return res.json({ token });
};

const login = async (req, res, next) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username } });

  bcrypt.compare(password, user.password, (err, isMatch) => {
    if (err) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    if (isMatch) {
      const token = jwt.sign({ id: user.id, username: user.username }, secret);
      return res.json({ token });
    } else {
      return res.status(401).json({ message: 'Authentication failed' });
    }
  });
};

module.exports = {
  register,
  login,
};
