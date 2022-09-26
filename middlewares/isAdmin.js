const jwt = require ('jsonwebtoken')

function isAdmin(req,res,next){
    const secret = process.env.SECRET
    let bearerToken;
    const bearerHeader = req.headers['authorization'] 

   if(typeof bearerHeader !== 'undefined') {
    bearerToken = bearerHeader?.split(' ')[1]
   } else {
    return res.sendStatus(403)
   }

   if (!bearerToken) {
    return res.sendStatus(404)
   }

   const decodedData = jwt.verify(bearerToken, secret, (error) => {
        if (error) {
           return res.sendStatus(403)
        }
   })

   const admin = decodedData.roleId // saber en que campo del token estaria el roleId

   if (admin === 1) {
    next();
   } else {
    return res.sendStatus(403)
   }

}

module.exports = isAdmin