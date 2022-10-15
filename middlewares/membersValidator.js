const expressValidator = require("express-validator");
const { body } = expressValidator;

const membersValidator = [
  body("name")    
    .not().isEmpty()
    .withMessage("Por favor escribe un nombre ")
    .isAlpha('es-ES',{ignore: '\s'})
    .withMessage('El nombre solo debe contener Letras'),
  
];

module.exports = membersValidator;