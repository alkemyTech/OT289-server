const express = require('express')
const router = express.Router()

const contactsControllers = require('../controllers/contactsControllers')
const contactsValidator = require('../middlewares/contactsValidator')

//POST add new entry to "Activities"
router.post('/', contactsValidator, contactsControllers.add)

module.exports = router
