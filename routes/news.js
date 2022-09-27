var express = require('express');
var router = express.Router();
const newsController = require('../controllers/newsController');



router.get('/news/:id', newsController.findNewsId);

module.exports = router;