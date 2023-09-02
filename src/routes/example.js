const express = require('express');
const router = express.Router();
const controller = require('../controllers/exampleController');

router.get('/', (req, res) => controller.find(req, res));
router.post('/', (req, res) => controller.create(req, res));

module.exports = router;
