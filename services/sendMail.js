const nodemailer = require('nodemailer')

async function sendMail(to, subject, text, html) {
  const PASS_MAIL = process.env.MAILER_PASSWORD; console.log(PASS_MAIL)
   const config = { 
     host: 'smtp.gmail.com',
     port: '587',
     auth: {
       user: 'gervyprueba@gmail.com',
       pass: PASS_MAIL
     }
   }

   const transport = nodemailer.createTransport(config)

   const msg = {
    to,
    from:'gervyprueba@gmail.com',
    subject,
    text,
    html,
   }

   try {
    const result = await transport.sendMail(msg)
    return result
  } catch (error) {
    console.log(error.message)
    return null
  }
}

module.exports = sendMail