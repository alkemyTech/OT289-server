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
//update activities
  upActivities : async (req, res) => {
    const { id } = req.params; 
    const { name, image, content } = req.body;
    const activities = {} 

        activities.id = id
        activities.name = name;
        activities.image = image;
        activities.content = content;

        await db.Activities.update(activities, {where: { id: id}})
        .then((response) => { 
          if (response[0] == 0) {          
            return res.status(404).json('La actividad no existe');
          }
          return res.status(200).json(activities);
        })
        .catch((err) =>{
          return res.status(500).json(err);
        })

  },
  getActivities: ( req, res ) => {
    db.Activities.findAll()
      .then(data => res.status(200).json(data))
        .catch(error => res.status(400).json(error))
  },
  detail: (req,res) => {
    const id = req.params.id;
    db.Activities.findOne({where: { id }})
      .then(data => res.json(data))
        .catch(error => res.send(error))
  }
};

module.exports = activitiesControllers;