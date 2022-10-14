const db = require('../models')
const { validationResult, body } = require("express-validator");

const membersController = {
    destroy: async (req, res) => {
        const { id } = req.params
        try {
            const deleted = await db.Members.destroy({ where: { id } })

            if (deleted) {
                res.status(200).send('Miembro eliminado')
            } else {
                res.status(200).json({ error: 'Miembro inexistente' })
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


    },

    update: async (req, res) => {
        try {
            let updated = await db.Members.update({
                name: req.body.name,
                image: req.body.image
            },
                {
                    where: { id: req.params.id }
                }
            );
            if (updated) {
                res.status(200).send("Información actualizada")
            } else {
                res.status(503).send("No se ha podido actualizar la información")
            };
        }
        catch (error) {
            console.error(error)
        }
    },
    getMembers: (req, res) => {
        db.Members.findAll()
            .then(data => res.status(200).json(data))
                .catch(error => res.status(400).send('Error en la base de datos'))
    }
}
module.exports = membersController
