const db = require('../models')

const newsController = {
    update: (req,res) => {
        db.news.update({
            
        },{
            where: {id: req.params.id}
        })
    }
}

module.exports = newsController