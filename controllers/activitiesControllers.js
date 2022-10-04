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

  upActivities : async (req, res) => {
const { id } = req.params; 
const { name, image, content } = req.body;
const activities = await db.Activities.findOne({ where: { id:id } }) 

    if (activities == null) {
        return res.status(404).json('La actividad no existe');
    }    
    activities.name = name;
    activities.image = image;
    activities.content = content;

    return res.json(await activities.save());

  }
};

module.exports = activitiesControllers;