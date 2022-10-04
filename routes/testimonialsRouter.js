const express = require('express');
const router = express.Router();
const testimonialsController = require("../controllers/testimonialsController");
const testimonialsValidator = require("../middlewares/testimonialsValidator");

/* POST ROUTE FOR TESTIMONIALS */
router.post('/', testimonialsValidator, testimonialsController.postTestimonials);

module.exports = router;