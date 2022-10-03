const express = require('express')
const router = express.Router()

const contactsController = require('../controllers/contactsControllers')
const adminValidator =  require('../middlewares/isAdmin')

//GET all contacts, only available for admin
router.get('/', adminValidator, contactsController.getAll)

module.exports = router
