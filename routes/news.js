var express = require('express');
var router = express.Router();
const getNews = require('../controllers/newsController');

router.get('/news', getNews)

module.exports = router;