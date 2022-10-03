const expressValidator = require("express-validator");
const { body } = expressValidator;

const contactsValidator = [
  body("name")
    .not()
    .isEmpty()
    .withMessage("Por favor escribe un nombre válido"),
  body("email")
    .isEmail()
    .withMessage("Por favor escribe un email válido"),
];

module.exports = contactsValidator;
