const db = require('../models')
const { validationResult, body } = require("express-validator");

const membersController = {
    destroy: async (req, res) => {
        const { id } = req.params
        try {
            const deleted = await db.Members.destroy({ where: {id} })

            if (deleted) {
                res.status(200).send('Miembro eliminado')
            } else {
                res.status(200).json({error: 'Miembro inexistente'})
            }
        } catch (error) {
            res.status(400).json(error)
        }
    },

    
    createMember: async (req, res) => {
          
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
          }
          //Else save in db
          const { name, image } = req.body; 
      
          const entryObj = {
            name,
            image            
          };
      
          const newEntry = new db.Members(entryObj);
          return res.json(await newEntry.save());


}
}
module.exports = membersController
