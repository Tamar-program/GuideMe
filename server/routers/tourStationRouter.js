const express = require('express');
const router = express.Router();
const tourStationController = require('../controllers/tourStationController');

router.get('/', tourStationController.getAllStations);
router.get('/:id', tourStationController.getStationById);
router.post('/', tourStationController.createStation);
router.put('/:id', tourStationController.updateStation);
router.delete('/:id', tourStationController.deleteStation);

module.exports = router;