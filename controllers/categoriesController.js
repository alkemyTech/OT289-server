const db = require('../models');
const { validationResult } = require("express-validator");

const testimonialsController = {
    deleteCategory: (req, res) => {
        db.Categories.destroy({where:{id: req.params.id}})
        .then((category) => {
            if(category[0] === 0){
                return res.status(400).json({errors:[{msg:"No pudimos encontrar este testimonio"}]})
            }
            return res.status(200).json({category})
        })
        .catch(error => {
            console.error(error)
            return res.status(400).json({errors:[{msg:"Estamos teniendo problemas en nuestras bases de datos, por favor intente mas tarde"}]})
        })
    }

}

module.exports = testimonialsController;