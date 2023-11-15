const { User } = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const register = async (req, res) => {
  const { username, password } = req.body;

  // Check password and password comfirm
  const foundUser = await User.findOne({ where: { username } });
  if (foundUser) return res.status(409).json(`${username} already exist`);

  const user = await User.create({
    username,
    password: await bcrypt.hash(password, 10),
  });

  const userData = { ...user.get() };
  delete userData.password;

  const token = jwt.sign(
    { id: userData.id, username: userData.username },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.TIME_EXPIRE,
    }
  );

  userData.token = token;

  return res.status(201).json(userData);
};

const login = async (req, res, next) => {
  const { username, password } = req.body;

  // Check password and password comfirm
  const foundUser = await User.findOne({ where: { username } });
  if (!foundUser) return res.status(409).json(`${username} not exist`);

  if (foundUser && (await bcrypt.compare(password, foundUser.password))) {
    const userData = { ...foundUser.get() };
    delete userData.password;

    const token = jwt.sign(
      { id: userData.id, username: userData.username },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.TIME_EXPIRE,
      }
    );

    userData.token = token;

    return res.status(200).json(userData);
  } else {
    return res.status(409).send('Username or password is incorrect.');
  }
};

module.exports = {
  register,
  login,
};
