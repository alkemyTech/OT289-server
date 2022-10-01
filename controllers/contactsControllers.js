const db = require('../models')

const contactsControllers = {
    getAll: async (req, res) => {
        const contacts = await db.contacts.findAll()
        res.json(contacts)
    }
}

module.exports = contactsControllers
