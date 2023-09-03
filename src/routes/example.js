const express = require('express');
const router = express.Router();
const controller = require('../controllers/exampleController');

router.get('/', (req, res) => controller.find(req, res));
router.post('/', (req, res) => controller.create(req, res));
router.patch('/:id', (req, res) => controller.update(req, res));
router.delete('/:id', (req, res) => controller.destroy(req, res));

module.exports = router;
