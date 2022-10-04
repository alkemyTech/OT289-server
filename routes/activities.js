const express = require('express')
const router = express.Router()

const activitiesControllers = require('../controllers/activitiesControllers')
const activitiesValidator = require('../middlewares/activitiesValidator')


//PUT for update data Activities
router.put('/:id',  activitiesControllers.upActivities)



//POST add new entry to "Activities"
router.post('/', activitiesValidator, activitiesControllers.add)

module.exports = router