const db = require("../models");
const { validationResult } = require("express-validator");
const ejs = require('ejs')
const sendMail = require('../services/sendMail')
const path = require('path');

const contactsControllers = {
  add: async (req, res) => {
    //Check if there is any error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //Else Save in db
    const { name, phone, email, message } = req.body;

    const entryObj = {
      name,
      phone,
      email,
      message,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const newEntry = await (new db.contacts(entryObj).save()); 
    if(newEntry != null){ 
      //email to the NGO notifying that a user wants to contact.
      ejs.renderFile(path.resolve(__dirname, '../views/newContact.ejs'), {newEntry}, (err, newContactHTML) => {
          if (err) {
              console.log(err);
          } else { 
             sendMail(newEntry.email, 'Hola Somos Mas', undefined, newContactHTML)
          }
          
      })     
  }
  // email to user notifying that their information was sent and saved in the NGO. 
  ejs.renderFile(path.resolve(__dirname, '../views/newContact.ejs'), {newEntry}, (err, newContactHTML) => {
    if (err) {
        console.log(err);
    } else { 
       sendMail(newEntry.email, 'Hola Somos Mas', undefined, newContactHTML)
    }
    
})
    return res.json(newEntry);
  },
  
  getAll: async (req, res) => {
    const contacts = await db.contacts.findAll()
    res.json(contacts)
  },
};


module.exports = contactsControllers;
