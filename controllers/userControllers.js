const bcrypt = require('bcrypt');
const db = require('../models');
const { validationResult } = require("express-validator");

const userControllers = {
    loginProcess: (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.send("invalid credentials")
        } else {
            db.User.findOne({ where: { email: "test@test.com" } })
                .then(user => {
                    //following commented line 14 will replace actual line 15 once we have a populated database with encrypted password
                    //if (bcrypt.compareSync(req.body.password, "user.password") && (req.body.email == user.email)) {
                    if ((req.body.password == user.password) && (req.body.email == user.email)) {
                        return res.send(user)
                    } else {
                        return res.send({ ok: false })
                    }
                })
        }
    },
    delete: (req, res) => {
        db.User.destroy({ where: { id: req.params.id } })
            .then(() => {
                res.send(`User ${req.params.id} deleted`)
            })
            .catch(error => console.error(error))
    },
};

module.exports = userControllers;