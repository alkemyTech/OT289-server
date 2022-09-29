const db = require('../models/index'); 


exports.upActivities =
 async (req, res) => {
const { id } = req.params; 
const { name, image, content } = req.body; 
const activities = await db.Activities.findOne({ where: { id:id } })


    if (activities == null) {
        return res.status(404).json('La actividad no existe');
    }    

    const objActiviti= {
      name: name,
      image: image,
      content: content
    }  

    return res.json( 
        await db.Activities.update(objActiviti, {where: {id:id}})
        .then(() =>  db.Activities.findOne({ where: { id:id } }))    
        );

 
};