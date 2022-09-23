const { body, validationResult } = require("express-validator");
const db = require("../models/index");
const bcrypt = require("bcrypt");

exports.addUser = [
  body("username").isLength({ min: 2 }).withMessage("El nombre es requerido y debe tener mas de dos caracteres"),
  body("lastname").isLength({ min: 2 }).withMessage("El apellido es requerido y debe tener mas de dos caracteres"),
  body("email").isEmail().withMessage("El formato de Email debe ser válido"),
  // password must be at least 4chars long
  body("password").isLength({ min: 4 }).withMessage("El password debe tener minimo 6 caracteres"),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, lastname, email, password } = req.body;
    if (await db.User.findOne({ where: { email: email } })) {
      return res.status(500).json("El usuario ingresado ya existe");
    }
    const salt = await bcrypt.genSalt(10);
    const passHash = await bcrypt.hash(password, salt);

    const objUser = {
      firstName: username,
      lastName: lastname,
      email: email,
      password: passHash,
    };
    const user = new db.User(objUser);

    return res.json(await user.save());
  },
];

//verifying through the user's email if 
//the rolesId is administrator to show the list of all users.
exports.listAllUsers = async (req, res) => {
  const { email } = req.query;
  const validAdmUser = await db.User.findOne({ where: { email: email } });

  if (validAdmUser == null) {
    return res.status(500).json("El usuario ingresado no existe");
  }
  if (validAdmUser.roleId !== 1) {
    return res.send("Esta solicitud solo puede ser hecha por un Usuario Administrador");
  } else {
    const user = await db.User.findAll();
    return res.json(user);
  }
};
