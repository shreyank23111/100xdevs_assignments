const {User} = require("../db/index")

function userMiddleware(req, res, next) {
    const username = req.headers.username;
    const password = req.headers.password

    User.findOne({
        username: username,
        password: password
    })
    .then((value)=>{
        if(value){
            next();
        }else{
            res.status(404).json({
                msg: "User doesn't exist"
            })
        }
    })
}

module.exports = userMiddleware;