const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.SECRET
const db = require('../models');
const User = db.User
const { validationResult, check } = require("express-validator");


const userControllers = {
    login: (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()})
        }

        User.findOne({where: { email: req.body.email }})
        .then(user => {
            if (user  === null) {
                return res.status(400).json({errors:[{
                    msg:"El usuario ingresado no existe",
                }]})
            }else if(bcrypt.compareSync(req.body.password, user.password)){
                delete user.password
                let token = signToken(user)
                return res.status(200).json({token})
            }else{
                return res.status(400).json({errors:[{
                    msg:"El usuario y contraseña no coincide",
                }]})
            }
        })
        .catch((error)=>{
            return res.status(400).json({errors:[{
                msg:"Estamos teniendo problemas para autenticar tu usuario, intente mas tarde",
            }]})
        })
    },
    register: (req, res) => {
        const errors = validationResult(req);
        
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        const { firstName,lastName, email, password } = req.body; 
        const passHash = bcrypt.hashSync(password, 10);    
    
        User.create({
            firstName: firstName,
            lastName:lastName,
            email: email,
            password: passHash
        })
        .then((newUser)=>{
            delete (newUser.password)
            return res.status(200).json({newUser});
        })
        .catch((error)=>{
            return res.status(400).json({errors:{msg:"Estamos teniendo problemas en nuestras bases de datos, por favor intente mas tarde"}});
        })
    },
    checkEmail: (req, res) => {

        User.findOne({ where: { email: req.body.email } })
        .then(user => {return user ? res.status(200).json({emailExist:true}) : res.status(200).json({emailExist:false}) })
        .catch(error => {return res.status(400).json({errors:[{msg:"Estamos teniendo problemas en nuestras bases de datos, por favor intente mas tarde"}]})})
    },
    checkPassword: (req, res) => {
        User.findOne({where: { email : req.body.email }})
        .then(user => {
            if(!user){
                return res.status(200).json({passwordCorrect:false})
            }
            if(bcrypt.compareSync(req.body.password, user.dataValues.password)){
                return res.status(200).json({passwordCorrect:true})
            }else{
                return res.status(200).json({passwordCorrect:false})
            }
        })
        .catch(error => {
            return res.status(400).json({errors:[{msg:"Estamos teniendo problemas en nuestras bases de datos, por favor intente mas tarde"}]})
        })

    }
};

    const objUser= {
      firstName: username,
      lastName: lastname,
      email: email,
      password: passHash,
      image // despues cuando tengamos imagen para usar
    }
    const user = new db.User(objUser);    
function signToken(payload){
    let token = jwt.sign({ payload }, JWT_SECRET, {
		algorithm: "HS256",
		expiresIn: '6h',
	})
    return token
}

module.exports = userControllers;