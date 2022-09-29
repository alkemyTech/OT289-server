var express = require('express');
var router = express.Router();
const getNews = require('../controllers/newsController');

router.get('/', getNews)

module.exports = router;