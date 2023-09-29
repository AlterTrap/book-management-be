const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/register', (req, res) => userController.create(req, res));

module.exports = router;
