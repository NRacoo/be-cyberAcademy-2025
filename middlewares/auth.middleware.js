const jwt = require('jsonwebtoken');

const validationToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization']

    if(typeof bearerHeader != "undefined"){
        const token = bearerHeader.split(' ')[1];

        jwt.verify(token, process.env.JWTTOKEN, (err, admin) => {
            if(err){
                console.error("message error: ", err)
                return res.status(403).json({message:"token tidak valid"});
            }else{
                req.user = admin;
                next()
            }
        });
    }else{
        return res.status(401).json({message:"token not provided"});
    }
}

module.exports = validationToken
