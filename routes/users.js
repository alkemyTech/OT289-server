const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const validator = require('../middlewares/expressValidator');
const userControllers = require('../controllers/userControllers');
//GET list of all users.
router.get('/', userController.listAllUsers);

/* POST route to authenticate user to login */
router.post('/auth/login', validator.login , userController.login);
router.post('/auth/register', validator.register ,userController.register);

router.post('/auth/checkEmail' , userController.checkEmail);
router.post('/auth/checkPassword' , userController.checkPassword);

/* DELETE route to soft-delete a user */
router.delete('/:id', userController.delete);









module.exports = router;
