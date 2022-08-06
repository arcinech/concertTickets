const express = require('express');
const router = express.Router();
const SeatsController = require('../controllers/seats.controller');

router.get('/seats', SeatsController.getAllSeats);
router.post('/seats', SeatsController.postSeat);
router.get('/seats/:id', SeatsController.getById);
router.put('/seats/:id', SeatsController.putById);
router.delete('/seats/:id', SeatsController.deleteById);

module.exports = router;
