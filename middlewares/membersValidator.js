const expressValidator = require("express-validator");
const { body } = expressValidator;

const membersValidator = [
  body("name")    
    .not().isEmpty()
    .withMessage("Por favor escribe un nombre ")
    .isAlpha()
    .withMessage('El nombre solo debe contener Letras'),
  
];

module.exports = membersValidator;