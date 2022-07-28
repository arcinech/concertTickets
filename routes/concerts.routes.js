const express = require('express');
const router = express.Router();
const ConcertsController = require('../controllers/concerts.controller');

router.get('/concerts', ConcertsController.getAll);
router.post('/concerts', ConcertsController.postConcert);

//Routes for more advence search of concerts
router.get('/concerts/performer/:performer', ConcertsController.getByPerformer);
router.get('/concerts/genre/:genre', ConcertsController.getByGenre);
router.get('/concerts/price/:price_min/:price_max', ConcertsController.getByPrice);
router.get('/concerts/day/:day', ConcertsController.getByDay);
//Routes by id of concert
router.get('/concerts/:id', ConcertsController.getById);
router.put('/concerts/:id', ConcertsController.putById);
router.delete('/concerts/:id', ConcertsController.deleteById);


module.exports = router;