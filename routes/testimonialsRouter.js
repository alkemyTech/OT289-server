let express = require('express');
let router = express.Router();
let testimonialsController = require("../controllers/testimonialsController");
let testimonialsValidator = require("../middlewares/testimonialsValidator");

/* POST ROUTE FOR TESTIMONIALS */
router.post('/', testimonialsValidator, testimonialsController.testimonials);

module.exports = router;