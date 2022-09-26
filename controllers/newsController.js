const db = require('../models/index'); 

exports.findNewsId = 
  
    async (req, res) => {                  
      
      const {id} = req.params; 
      const activity = await db.Activities.findOne({ where: { id:id } })

      if (activity == null) {
        return res.status(404).json('El id no existe');
      }                 
      return res.status(200).json(activity);
  
    };