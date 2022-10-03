
const express = require('express')
const router = express.Router()

const newsControllers = require('../controllers/newsController.js')
const newsValidator = require('../middlewares/newsValidator')

//POST add new entry to "Entries" with type "news"
router.post('/', newsValidator, newsControllers.add)

//GET return the list of entries where the type field is "news"
router.get('/', newsControllers.getNews)

//GET find news by id.
router.get('/:id', newsController.findNewsId);

module.exports = router

