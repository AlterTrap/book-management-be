const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });

router.get('/', requireAuth, (req, res) => bookController.find(req, res));
router.post('/', requireAuth, (req, res) => bookController.create(req, res));
router.patch('/:id', requireAuth, (req, res) =>
  bookController.update(req, res)
);
router.delete('/:id', requireAuth, (req, res) =>
  bookController.destroy(req, res)
);

module.exports = router;
