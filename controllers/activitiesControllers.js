const db = require("../models");
const { validationResult } = require("express-validator");

const activitiesControllers = {
  add: async (req, res) => {
    //Check if there is any error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //Else save in db
    const { name, content } = req.body;

    const entryObj = {
      name,
      content,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const newEntry = new db.Activities(entryObj);
    return res.json(await newEntry.save());
  },
};

module.exports = activitiesControllers;