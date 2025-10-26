const jwt = require("jsonwebtoken");

const accesToken = (req, res, next) =>{
    const bearerHeader = req.headers['authorization'];

    if(typeof bearerHeader !== "undefined"){
        const token = bearerHeader.split(" ")[1]
        jwt.verify(token, process.env.JWTTOKEN, (err, user) => {
            if(err){
                console.log("error token: ", err);
                return res.status(403).json({message:"token invalid"})
            }else{
                req.user = user
                next()
            }
        })
    }else{
        return res.status(401).json({message:"token not provided"})
    }
}

module.exports = accesToken
