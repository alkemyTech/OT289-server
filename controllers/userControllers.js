const bcrypt = require('bcrypt');
const db = require('../models');
const { validationResult } = require("express-validator");

const userControllers = {
    loginProcess: (req, res) => {
        const { email, password } = req.body
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.send("invalid credentials")
        } else {
            db.User.findOne({ where: { email } })
                .then(user => {
                    //following commented line 14 will replace actual line 15 once we have a populated database with encrypted password
                    if (bcrypt.compareSync(password, user.password) && (email == user.email)) {
                        return res.send(user)
                    } else {
                        return res.send({ ok: false })
                    }
                })
        }
    }
};

module.exports = userControllers;