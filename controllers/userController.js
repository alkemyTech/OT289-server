const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.SECRET
const db = require('../models');
const User = db.User
const sendMail = require('../services/sendMail')
const path = require('path');
const { validationResult, check } = require("express-validator");
const ejs = require('ejs')
const aws = require('../services/aws')


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
            password: passHash,
            image:"/images/default-user.jpg"
        })
        .then((newUser)=>{
            ejs.renderFile(path.resolve(__dirname, '../views/welcomeNewUser.ejs'), {newUser}, (err, welcomeHTML) => {
                if (err) {
                    console.log(err);
                } else {
                   sendMail(newUser.email, 'Bienvenido a Somos Mas', undefined, welcomeHTML)
                }
            })
            delete (newUser.password)
            let token = signToken(newUser)
            return res.status(200).json({token})
        })
        .catch((error)=>{
            return res.status(400).json({errors:[{msg:"Estamos teniendo problemas en nuestras bases de datos, por favor intente mas tarde"}]});
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
        /* const { email } = req.query;   
        const rolAdmin= 1; 
        const validAdmUser = await db.User.findOne({ where: { email: email, roleId:rolAdmin } });
        
        if (validAdmUser == null) {
        return res.status(500).json("Esta solicitud solo puede ser hecha por un Usuario Administrador");
        }   */
        const user = await db.User.findAll();
        return res.json(user);  
    },
    delete: (req, res) => {
        console.log('el id es' + req.params.id)
        User.destroy({ where: { id: req.params.id }, force:true })
            .then(() => {
                res.send(`User ${req.params.id} deleted`)
            })
            .catch(error => console.error(error))
    },
    update: async(req, res) => {
        let id = req.params.id;
        let imageUrl;
        let image;
        const {firstName, lastName, email, password, newPassword} = req.body;

        if (req.files?.image) {
            image = req.files.image
            const imageValidation = /^$|\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(image.name)
            if(!imageValidation) {
                return res.status(400).json({errors: 'Imagen invalida'})
            }
            imageUrl = await aws.uploadFile(image.name, image.data)
        }

        const oldData = await User.findOne({where: {id}})

        if(!firstName && !lastName && !email && !image && !password && !newPassword) {
            return res.status(404).json({errors: 'No se envio datos'})
        }


        if(oldData === null) {
            return res.status(404).json({errors: 'ID no encontrada'})
        }

        if(firstName) {
            const nameValidation = /^$|^[A-Za-z\s]+$/.test(firstName)
            if(!nameValidation) {
                return res.status(400).json({errors: 'Nombre invalido'})
            }
        }

        if(lastName) {
            const nameValidation = /^$|^[A-Za-z\s]+$/.test(lastName)
            if(!nameValidation) {
                return res.status(400).json({errors: 'Apellido invalido'})
            }
        }

        if(image){

            
        }
        
        if(password && newPassword) {

        }

        

        let updatedUser = {
            id,
            firstName: firstName ? firstName : oldData.dataValues.firstName,
            lastName: lastName ? lastName : oldData.dataValues.lastName,
            email: email ? email : oldData.dataValues.email,
            image: image ? imageUrl : oldData.dataValues.image,
            roleId: oldData.dataValues.roleId,
            createdAt: oldData.dataValues.createdAt,
            updatedAt: new Date(),
        }

        let token = signToken(updatedUser)
        
        User.update(updatedUser,{where:{id}})
            .then(data => res.status(200).json({token, user: updatedUser}))
            .catch(error => res.status(503).json({errors: 'Base de datos no disponible'}))
    }
};

function signToken(payload){
    let token = jwt.sign({ payload }, JWT_SECRET, {
		algorithm: "HS256",
		expiresIn: '6h',
	})
    return token
}


module.exports = userControllers;
