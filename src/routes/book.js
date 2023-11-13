const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const passport = require('passport');

const authMiddleware = passport.authenticate('jwt', { session: false });

router.get('/', authMiddleware, (req, res) => bookController.find(req, res));
router.post('/', authMiddleware, (req, res) => bookController.create(req, res));
router.patch('/:id', authMiddleware, (req, res) =>
  bookController.update(req, res)
);
router.delete('/:id', authMiddleware, (req, res) =>
  bookController.destroy(req, res)
);

module.exports = router;
