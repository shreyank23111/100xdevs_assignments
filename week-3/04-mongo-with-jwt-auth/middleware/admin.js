const jwt = require("jsonwebtoken")
// const secret = require("../index")

const { JWT_Secret } = require('../jwt.config.js');
// const JWT_SECRET = "Fuck_you_CHAT-GPT"


// Middleware for handling auth
function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected

    const token = req.headers.authorization;
    const words = token.split(" ")
    const jwtToken = words[1];


   try{
    const decodedvalue = jwt.verify(jwtToken, JWT_Secret);
    if(decodedvalue.username){
        next();
    }
    else{
        res.status(405).json({
            msg: "You are not authenticated"
        })
    }
   }catch (err){
    res.json({
        mes: "Incorrect inputs", err
    })
   }
}

module.exports = adminMiddleware;