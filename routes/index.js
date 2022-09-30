let express = require('express');
let router = express.Router();
let mainControllers = require("../controllers/mainControllers")
let testimonialsValidator = require("../middlewares/testimonialsValidator");


/* GET home page. */
router.get('/', mainControllers.index);

/* POST ROUTE FOR TESTIMONIALS */
router.post('/testimonials', testimonialsValidator,mainControllers.testimonials);

router.get('/organizations/:id/public', mainControllers.public)

module.exports = router;
