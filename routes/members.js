const express = require('express')
const router = express.Router()

const membersController = require('../controllers/membersController.js')
const membersValidator = require('../middlewares/membersValidator')
//DELETE member by :id
router.delete("/:id", membersController.destroy)

//POST member by name
router.post("/", membersValidator, membersController.createMember)
module.exports = router
