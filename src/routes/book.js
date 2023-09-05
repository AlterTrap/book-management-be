const express = require('express');
const bookController = require('../controllers/bookController');
const router = express.Router();

router.get('/', (req, res) => bookController.find(req, res));

router.post('/', (req, res) => bookController.create(req, res));

router.patch('/:id', (req, res) => bookController.update(req, res));

router.delete('/:id', (req, res) => bookController.destroy(req, res));

module.exports = router;
