const express = require('express')
const router = express.Router()

const acivitiController = require('../controllers/activitiesController')


router.put('/:id',  acivitiController.upActivities)

module.exports = router