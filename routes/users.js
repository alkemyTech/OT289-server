var express = require('express');
var router = express.Router();
const userControllers = require('../controllers/userControllers');
const validator = require('../middlewares/userLoginExpressValidator');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});
/* POST route to authenticate user to login */
router.post('/auth/login', validator, userControllers.loginProcess);

module.exports = router;
