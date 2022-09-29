
const express = require('express')
const router = express.Router()

const newsController = require('../controllers/newsController.js')
const newsValidator = require('../middlewares/newsValidator')

//POST add new entry to "Entries" with type "news"
router.post('/', newsValidator, newsController.add)

//GET find news by id.
router.get('/:id', newsController.findNewsId);

module.exports = router

