const mockDataJson = require('./MOCK_DATA.json')
const mockData = JSON.parse(JSON.stringify(mockDataJson))

const mainControllers = {
    index: (req, res) => {
        res.render('index', { title: 'Express' })
    },
    public: (req, res) => {
        let response = mockData.find((item) => { return item.id == req.params.id })
        if (response) {
            return res.status(200).json(response)
        } else {
            return res.status(400).json({ errors: [{ msg: "No organization found" }] })
        }
    },
}

module.exports = mainControllers