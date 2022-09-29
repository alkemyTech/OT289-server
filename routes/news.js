const express = require('express')
const router = express.Router()

const newsController = require('../controllers/newsController.js')
const newsValidator = require('../middlewares/newsValidator')

//POST add new entry to "Entries" with type "news"
router.post('/', newsValidator, newsController.add)
//DELETE route to logically erase any entry given an :id
router.delete("/:id", newsController.destroy)

module.exports = router
