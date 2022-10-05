const express = require('express');
const router = express.Router();
const testimonialsController = require("../controllers/testimonialsController");
const testimonialsValidator = require("../middlewares/testimonialsValidator");

/* POST ROUTE FOR TESTIMONIALS */
router.put('/:id', testimonialsValidator, testimonialsController.putTestimonials);
router.post('/add', testimonialsValidator, testimonialsController.postTestimonials);

module.exports = router;