const express = require('express');
const router = express.Router();
const userToursController = require('../controllers/userToursController');

router.get('/', userToursController.getAllUserTours);
router.get('/:id', userToursController.getUserToursByUserId);
router.post('/', userToursController.createUserTour);
router.put('/:id', userToursController.updateUserTour);
router.delete('/:id', userToursController.deleteUserTours);

module.exports = router;