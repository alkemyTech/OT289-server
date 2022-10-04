const express = require('express')
const router = express.Router()

const contactsControllers = require('../controllers/contactsControllers')
const contactsValidator = require('../middlewares/contactsValidator')
const adminValidator =  require('../middlewares/isAdmin')

//POST add new entry to "Activities"
router.post('/', contactsValidator, contactsControllers.add)
//GET all contacts, only available for admin
router.get('/', adminValidator, contactsControllers.getAll)

module.exports = router
