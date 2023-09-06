const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

router.get('/', (req, res) => bookController.find(req, res));

router.get('/*', (req, res) => res.json('Invalid request'));

router.post('/', (req, res) => bookController.create(req, res));

router.patch('/', (req, res) => bookController.update(req, res));

router.patch('/:id', (req, res) => bookController.update(req, res));

router.delete('/', (req, res) => bookController.destroy(req, res));

router.delete('/:id', (req, res) => bookController.destroy(req, res));

module.exports = router;
