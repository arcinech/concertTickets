const express = require('express');
const router = express.Router();
const WorkshopsController = require('../controllers/workshops.controller');

router.get('/workshops', WorkshopsController.getAll);
router.post('/workshops', WorkshopsController.postWorkshop);
router.get('/workshops/:id', WorkshopsController.getById);
router.put('/workshops/:id', WorkshopsController.putById);
router.delete('/workshops/:id', WorkshopsController.deleteById);

module.exports = router;
