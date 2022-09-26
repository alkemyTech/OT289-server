const jwt = require ('jsonwebtoken')

function isAdmin(req,res,next){
    const secret = process.env.SECRET
    let bearerToken;
    const bearerHeader = req.headers['authorization'] 

   if(typeof bearerHeader !== 'undefined') {
    bearerToken = bearerHeader?.split(' ')[1]
   } else {
    return res.sendStatus(403)
   } // Si no manda authorization en headers da 403

   if (!bearerToken) {
    return res.sendStatus(404)
   } // si no existe el token da 404

   const decodedData = jwt.verify(bearerToken, secret, (error) => {
        if (error) {
           return res.send(error)
        } // si el token es invalido da el resultado de error
   })

   const admin = decodedData.data.roleId // el admin va a ser el numero que este en el campo de roleId

   if (admin === 1) {
    next(); // si es 1 pasa el middle, si es otro numero da un 403   
   } else {
    return res.sendStatus(403)
   }
}

module.exports = isAdmin