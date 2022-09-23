const db = require('../models'); 

const getNews = async (req, res) => {
  try {
    const news = await db.Entries.findAll({
      where: {
        type: 'news'
      },
      attributes: ['name', 'image', 'createdAt']
    })
    news.length? res.status(200).send(news) : res.status(200).send('Not found') 
  } catch (error) {
    res.status(400).send(error.message)
  }
}

module.exports = getNews;