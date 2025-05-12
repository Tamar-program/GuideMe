const express = require('express');
const router = express.Router();
const userTourController = require('../controllers/userTourController');

router.get('/', userTourController.getAllUserTours);
router.get('/:id', userTourController.getUserToursByUserId);
router.post('/', userTourController.createUserTour);
router.put('/:id', userTourController.updateUserTour);
router.delete('/:id', userTourController.deleteUserTours);

module.exports = router;