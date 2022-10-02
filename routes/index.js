
let express = require('express');
let router = express.Router();
let mainControllers = require("../controllers/mainControllers")

/* GET home page. */
router.get('/', mainControllers.index);

router.get('/organizations/:id/public', mainControllers.public)

module.exports = router;
