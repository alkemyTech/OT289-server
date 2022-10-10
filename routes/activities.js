const express = require('express')
const router = express.Router()

const activitiesControllers = require('../controllers/activitiesControllers')
const activitiesValidator = require('../middlewares/activitiesValidator')


//PUT for update data Activities
router.put('/:id',  activitiesControllers.upActivities)



//POST add new entry to "Activities"
router.post('/', activitiesValidator, activitiesControllers.add)
router.get('/:id', activitiesControllers.detail)
router.get('/', activitiesControllers.getActivities)

module.exports = router
