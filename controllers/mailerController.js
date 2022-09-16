const sgMail = require('../services/sendgrid')
const { validationResult } = require('express-validator')

const mailerController = {

    home: (req,res,next) => {
      res.render('apimail')
    },


    send: async (req, res) => {
       let errors = validationResult(req)
       const {to, subject, text, html} = req.body

      if(!errors.isEmpty()) {
        return res.render('apimail', {errors: errors.mapped(), oldBody: req.body})
      }

       const msg = {
        to,
        from: 'ignacio.maldonado96@gmail.com',
        subject,
        text,
        html,
       }

       try {
         await sgMail.send(msg)
       } catch (error) {
         res.status(error.code).send(error.message)
       }

       res.send('Email enviado')
        
    }
}

module.exports = mailerController