let mockDataJson = require('./MOCK_DATA.json')
let mockData = JSON.parse(JSON.stringify(mockDataJson))


const mainControllers = {
    index:(req, res)=>{
        res.render('index', { title: 'Express' })
    },
    public:(req, res)=>{
        let response =  mockData.find((item)=>{return item.id == req.params.id})
        res.json(response)
    }
}

module.exports = mainControllers