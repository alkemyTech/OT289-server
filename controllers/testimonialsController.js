const db = require('../models');
const { validationResult } = require("express-validator");

const testimonialsController = {
    testimonials: (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.json({ errors: errors.mapped() });
        } else {
            db.Testimonials.create({
                name: req.body.name,
                content: req.body.content
            })
                .then((testimony) => {
                    return res.status(200).send(testimony)
                })
                .catch(error => {
                    console.error(error)
                })
        }
    },
}

module.exports = testimonialsController;