const express = require('express');
const router = express.Router();

const {
  getMainPage,
  postMainPage,
} = require('../controllers/mainPageController');

router.route('/').get(getMainPage).post(postMainPage);

module.exports = router;
