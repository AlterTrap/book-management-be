const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const {
  validateUserRegistration,
  validateUserLogin,
} = require('../utils/validation/validaMiddleware');

router.post('/register', validateUserRegistration, (req, res) =>
  authController.register(req, res)
);

router.post('/login', validateUserLogin, (req, res) =>
  authController.login(req, res)
);
module.exports = router;
