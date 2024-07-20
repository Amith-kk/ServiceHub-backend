const jwt = require('jsonwebtoken')

const jwtMiddleware = (req,res,next)=>{
    // console.log("inside jwtMiddleware fn");
    try {
        
        const token = req.headers['authorization'].split(" ")[1]
        if(!token){
            return res.status(401).json({error: 'please provide a token'})
        }
    // console.log(token)
    if(token){
        jwtResponse=jwt.verify(token,process.env.JWT_SECRET);
        // console.log(jwtResponse);
        if(jwtResponse.adminId){
            req.payload=jwtResponse.adminId
        } else if(jwtResponse.freelancerId){
            req.payload=jwtResponse.freelancerId
        } else if(jwtResponse.id){
            req.payload=jwtResponse.id
        }else{
            return res.status(401).json("Unauthorized")
        }
        next()
    }else{
        res.status(401).json("Please login")
    }
}catch{
    res.status(403).json("invalid token") 
}
}


module.exports = jwtMiddleware