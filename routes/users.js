var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');
const userControllers = require('../controllers/userControllers');
const validator = require('../middlewares/expressValidator');

const { loginProcess } = require('../controllers/userControllers');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});
/* POST route to authenticate user to login */
router.post('/auth/login', validator.login , userController.login);
router.post('/auth/register', validator.register ,userController.register);

//GET list of all users.
router.get('/users', userController.listAllUsers);
router.post('/auth/checkEmail' , userController.checkEmail);
router.post('/auth/checkPassword' , userController.checkPassword);

/* DELETE route to soft-delete a user */
router.delete('/:id', userControllers.delete);









module.exports = router;

