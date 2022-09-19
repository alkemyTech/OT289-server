var express = require('express')
var router = express.Router()
const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.SECRET

//GET user data from token
router.get('/me', (req, res) => {
    //get token from header
    const authHeader = req.headers['authorization']
    const token = authHeader?.split(' ')[1]

    //If no token, send error 404 (No found)
    if (!token) {
        return res.status(404).send('No token found')
    }

    //verify token, if valid send user data from it
    try {
        const decoded = jwt.verify(token, JWT_SECRET)
        res.send(decoded)
      } catch(err) {
        res.status(401).send('Invalid token')
    }
})

module.exports = router
