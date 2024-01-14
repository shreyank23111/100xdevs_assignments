const jwt = require("jsonwebtoken");
const { JWT_Secret } = require('../jwt.config.js');
const { User } = require("../db/index.js");
async function adminMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const data = req.headers['authorization']

    try {
        if (!data) {
            res.status(400).json({ msg: "Authorization token is missing" })
        }
        if (!(data.split(' ')[0].toLowerCase().includes('bearer'))) {
            res.status(400).json({ msg: "invalid token" })

        } else {
            try {
                const token = data.split(' ')[1];
                const user = jwt.verify(token, JWT_Secret)
                req.user = user.username;
                req.pass = user.password;

                const foundAdmin = await User.findOne({ username: req.user, password: req.pass });
                if (foundAdmin.username === req.user) {
                    next()
                } else {
                    res.status(404).json({ error: "token is invalid" })
                }
            } catch (error) {
                res.status(404).json({ err: 'internal server error' })
            }
        }



    } catch (err) {
        res.status(400).json({ err: "error" })
    }


}

module.exports = adminMiddleware;