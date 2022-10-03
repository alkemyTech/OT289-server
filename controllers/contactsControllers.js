const db = require("../models");
const { validationResult } = require("express-validator");

const contactsControllers = {
  add: async (req, res) => {
    //Check if there is any error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //Else Save in db
    const { name, phone, email, message } = req.body;

    const entryObj = {
      name,
      phone,
      email,
      message,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const newEntry = new db.contacts(entryObj);
    return res.json(await newEntry.save());
  },
};

module.exports = contactsControllers;
