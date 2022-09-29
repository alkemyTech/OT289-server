const express = require('express')
const router = express.Router()

const { newsController, getNews } = require('../controllers/newsController.js')
const newsValidator = require('../middlewares/newsValidator')

//POST add new entry to "Entries" with type "news"
router.post('/', newsValidator, newsController.add)

//GET return the list of entries where the type field is "news"
router.get('/', getNews)

module.exports = router
