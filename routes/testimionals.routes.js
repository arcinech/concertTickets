const express = require('express');
const router = express.Router();
const TestimonialsController = require('../controllers/testimonials.controller');

router.get('/testimonials', TestimonialsController.getAll)
router.post('/testimonials', TestimonialsController.postTestimonial);

router.get('/testimonials/random', TestimonialsController.getRandom);

router.get('/testimonials/:id', TestimonialsController.getById)
router.put('/testimonials/:id', TestimonialController.putById)
router.delete('/testimonials/:id', TestimonialController.deleteById);

module.exports = router;
