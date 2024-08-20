const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
} = require('../controllers/userController');

// Aidar's modifications:
// - Importing validation middleware:
const { validateLoginInput } = require('../middleware/validationMiddleware.js');

// - Importing auth controller methods:
const { singUp, login, logout } = require('../controllers/authController');

router.post('/signup', singUp);
// Aidar's modifications:
// - Creating login route and using the validation middleware
router.post('/login', validateLoginInput, login);
// - Creating logout route
router.get('/logout', logout);

router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
