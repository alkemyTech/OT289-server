let mockDataJson = require('./MOCK_DATA.json')
let mockData = JSON.parse(JSON.stringify(mockDataJson))
const db = require('../models');
const { validationResult } = require("express-validator");


const mainControllers = {
    index: (req, res) => {
        res.render('index', { title: 'Express' })
    },
    public: (req, res) => {
        let response = mockData.find((item) => { return item.id == req.params.id })
        if (response) {
            return res.status(200).json(response)
        } else {
            return res.status(400).json({ errors: [{ msg: "No organization found" }] })
        }
    },
    testimonials: (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.json({errors: errors.mapped()});
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

module.exports = mainControllers