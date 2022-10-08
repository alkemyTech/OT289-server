const express = require('express')
const router = express.Router()

const membersController = require('../controllers/membersController.js')

//DELETE member by :id
router.delete("/:id", membersController.destroy)

//GET all members
router.get("/", membersController.findAllMembers)
module.exports = router
