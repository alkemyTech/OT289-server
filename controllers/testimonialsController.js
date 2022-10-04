const db = require('../models');
const { validationResult } = require("express-validator");

const testimonialsController = {
    putTestimonials: (req, res) => {
        db.Testimonials.update({
            name: req.body.name,
            image: req.body.image,
            content: req.body.content
        },{
            where:{
                id: req.params.id
            }
        })
        .then((testimony) => {
            if(testimony === null){
                return res.status(400).json({errors:[{msg:"No pudimos encontrar este testimonio"}]})
            }
            return res.status(200).json({testimony})
        })
        .catch(error => {
            console.error(error)
            return res.status(400).json({errors:[{msg:"Estamos teniendo problemas en nuestras bases de datos, por favor intente mas tarde"}]})
        })
    },
    postTestimonials: (req, res) => {
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
    }
}

module.exports = testimonialsController;