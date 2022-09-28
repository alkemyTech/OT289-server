const db = require('../models')
const { validationResult } = require("express-validator")

const newsController = {
    update: (req,res) => {
        const id = req.params.id
        const name = req.body.name
        const image = req.body.image
        const categoryId = req.body.categoryId
        const type = req.body.type

        db.Entry.update({
            name,
            image,
            categoryId,
            type

        },{
            where: {id}
        })
            .then(( confirm => {
                let answer;
                if(confirm) {
                    answer = {
                        meta: {
                            status: 200,
                            total: confirm.length,
                            url: `/news/${id}`
                        },
                        data:confirm
                    }
                } else {
                    answer = {
                        meta: {
                            status: 204, 
                            total: confirm.length,
                            url: `/news/${id}`
                        },
                        data: confirm
                    }
                }
                res.json(answer)
            }))
            .catch(error => res.send(error))
    },
    add: async (req, res) => {
        //Check if there is any error
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            let errorMessages = ''

            //List of errors
            errors.array().map(error => {
                errorMessages += error.msg + '. '
            })

            return res.status(401).send(errorMessages)
        }
        
        //Else Save in db
        const { name, content, image, categoryId } = req.body

        const entryObj = {
            name,
            content,
            image,
            categoryId,
            type: 'news',
            createdAt: new Date,
            updatedAt: new Date
        }

        const newEntry = new db.Entries(entryObj)
        return res.json( await newEntry.save() )
    }
}

module.exports = newsController
