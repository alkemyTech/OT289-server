const express = require('express')
const router = express.Router()

const activitiesControllers = require('../controllers/activitiesControllers')
const activitiesValidator = require('../middlewares/activitiesValidator')

//POST add new entry to "Activities"
router.post('/', activitiesValidator, activitiesControllers.add)
router.get('/:id', activitiesControllers.detail)

module.exports = router
