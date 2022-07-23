const express = require('express');
const router = express.Router();
const ConcertsController = require('../controllers/concerts.controller');

router.get('/concerts', ConcertsController.getAll);
router.post('/concerts', ConcertsController.postConcert);

router.get('/concerts/:id', ConcertsController.getById);
router.put('/concerts/:id', ConcertsController.putById);
router.delete('/concerts/:id', ConcertsController.deleteById);

module.exports = router;