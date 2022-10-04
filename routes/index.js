
const express = require('express');
const router = express.Router();
const mainControllers = require("../controllers/mainControllers")

/* GET home page. */
router.get('/', mainControllers.index);

router.get('/organizations/:id/public', mainControllers.public)

module.exports = router;
