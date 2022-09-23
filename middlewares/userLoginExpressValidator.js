const { body } = require('express-validator');
const validator = [
    body("email")
        .isEmail().withMessage("Por favor escribe un email válido"),
    body("password")
        .isLength({ min: 4 }).withMessage("Su contraseña debe tener al menos 4 caracteres")
];

module.exports = validator;