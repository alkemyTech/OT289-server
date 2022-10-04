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
            let token = signToken(newUser)
            return res.status(200).json({token})
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

    },

    //verifying through the user's email if 
    //the rolesId is administrator to show the list of all users.
    listAllUsers: async (req, res) => {
        const { email } = req.query;   
        const rolAdmin= 1; 
        const validAdmUser = await db.User.findOne({ where: { email: email, roleId:rolAdmin } });
        
        if (validAdmUser == null) {
        return res.status(500).json("Esta solicitud solo puede ser hecha por un Usuario Administrador");
        }  
        const user = await db.User.findAll();
        return res.json(user);  
    },
    delete: (req, res) => {
        db.User.destroy({ where: { id: req.params.id } })
            .then(() => {
                res.send(`User ${req.params.id} deleted`)
            })
            .catch(error => console.error(error))
    },
};

function signToken(payload){
    let token = jwt.sign({ payload }, JWT_SECRET, {
		algorithm: "HS256",
		expiresIn: '6h',
	})
    return token
}


module.exports = userControllers;
