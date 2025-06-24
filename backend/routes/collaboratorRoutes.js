const express = require('express');
const { requireAuth } = require('../middlewares/authMiddleware');
const {
  addCollaborator,
  removeCollaborator,
} = require('../controllers/collaboratorController');

const router = express.Router({ mergeParams: true });

router.use(requireAuth);

router.post('/', addCollaborator);
router.delete('/:userId', removeCollaborator);

module.exports = router;
