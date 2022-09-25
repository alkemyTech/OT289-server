var express = require('express');
var router = express.Router();
var newsController = require('../controllers/newsController')

router.put('/:id', newsController.update)

module.exports = router;