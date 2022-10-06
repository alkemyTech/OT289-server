const express = require('express')
const router = express.Router()

const membersController = require('../controllers/membersController.js')

//DELETE member by :id
router.delete("/:id", membersController.destroy)

module.exports = router
