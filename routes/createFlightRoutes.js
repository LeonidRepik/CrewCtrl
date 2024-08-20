const express = require('express');
const router = express.Router();

const {
  getFlights,
  createFLight,
  getOneFlight,
  updateFlight,
  deleteFlight,
} = require('../controllers/flightControllers');

router.route('/').get(getFlights).post(createFLight);
router.route('/:id').get(getOneFlight).patch(updateFlight).delete(deleteFlight);

module.exports = router;
