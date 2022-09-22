const { body, validationResult } = require('express-validator');
const db = require('../models/index'); 
const bcrypt = require('bcrypt')

exports.addUser = [
  body('username').isLength({min:2}).withMessage('El nombre es requerido y debe tener mas de dos caracteres'),
  body('lastname').isLength({min:2}).withMessage('El apellido es requerido y debe tener mas de dos caracteres'),  
  body('email').isEmail().withMessage('El formato de Email debe ser válido'),
   // password must be at least 6chars long
  body('password').isLength({ min: 6 }).withMessage('El password debe tener minimo 6 caracteres'),
  async (req, res) => {
     
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    
    const { username, lastname, email, password } = req.body; 
    if (await db.User.findOne({ where: { email: email } })) {
      return res.status(500).json('El usuario ingresado ya existe');
    }
    const salt= await bcrypt.genSalt(10);
    const passHash = await bcrypt.hash(password, salt );    

    const objUser= {
      firstName: username,
      lastName: lastname,
      email: email,
      password: passHash
    }
    const user = new db.User(objUser);    

    return res.json( await user.save() );

  }];