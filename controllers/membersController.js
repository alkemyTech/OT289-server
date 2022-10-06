const db = require('../models')

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
    }
}

module.exports = membersController
