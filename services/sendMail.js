const nodemailer = require('nodemailer')

async function sendMail(to, subject, text, html) {
  const PASS_MAIL = process.env.MAILER_PASSWORD; console.log(PASS_MAIL)
   const config = { 
     host: 'smtp.gmail.com',
     port: '587',
     auth: {
       user: 'somosmas2022ong@gmail.com',
       pass: PASS_MAIL
     }
   }

   const transport = nodemailer.createTransport(config)

   const msg = {
    to,
    from:'somosmas2022ong@gmail.com',
    subject,
    text,
    html,
   }

   try {
    const result = await transport.sendMail(msg)
    return result
  } catch (error) {
    return null
  }
}

module.exports = sendMail