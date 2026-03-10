const jwt = require("jsonwebtoken")

const verifyToken = (req,res,next)=>{

    const token = req.headers["authorization"]

    if(!token){
        return res.json({message:"No token"})
    }

    try{

        const decoded = jwt.verify(token,"SECRET_KEY")

        req.userId = decoded.id

        next()

    }catch(err){

        res.json({message:"Invalid token"})
    }

}

module.exports = verifyToken