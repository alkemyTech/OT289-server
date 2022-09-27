const db = require('../models')

const newsController = {
    update: (req,res) => {
        const id = req.params.id
        const name = req.body.name
        const image = req.body.image
        const categoryId = req.body.categoryId
        const type = req.body.type

        db.Entry.update({
            id,
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
    }
}

module.exports = newsController