var express = require('express');
var router = express.Router();
const userControllers = require('../controllers/userControllers');
const validator = require('../middlewares/userLoginExpressValidator');
const userController = require('../controllers/userController.js');

const { loginProcess } = require('../controllers/userControllers');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});
/* POST route to authenticate user to login */
router.post('/auth/login', validator, userControllers.loginProcess);

//POST add user.
router.post('/auth/register', userController.addUser);
//GET list of all users.
router.get('/a/users', userController.listAllUsers);









module.exports = router;
