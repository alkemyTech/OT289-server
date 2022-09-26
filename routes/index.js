const express = require('express');
const router = express.Router();
const jwtValidator = require('../middlewares/jwtValidator') 

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/welcome', jwtValidator ,function(req, res) {
    return res.status(200).json({data:{msg:"Bienvenido de vuelta"}})
});

module.exports = router;
