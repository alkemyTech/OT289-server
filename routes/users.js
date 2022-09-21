var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.post('/auth/register', userController.addUser);









module.exports = router;
