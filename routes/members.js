const express = require('express')
const router = express.Router()

const membersController = require('../controllers/membersController.js')
const membersValidator = require('../middlewares/membersValidator')
//DELETE member by :id
router.delete("/:id", membersController.destroy)

//GET all members
router.get("/", membersController.findAllMembers)
//POST member by name
router.post("/", membersValidator, membersController.createMember)
module.exports = router
