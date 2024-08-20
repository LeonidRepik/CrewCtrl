const express = require('express');
const router = express.Router();

const {
  createCrewMember,
  getCrewMembers,
  getOneCrewMember,
  updateCrewMember,
  deleteCrewMember,
} = require('../controllers/crewControllers');

router.route('/').get(getCrewMembers).post(createCrewMember);
router
  .route('/:id')
  .get(getOneCrewMember)
  .patch(updateCrewMember)
  .delete(deleteCrewMember);

module.exports = router;
