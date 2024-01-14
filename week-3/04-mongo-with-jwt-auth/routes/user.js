const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { JWT_Secret } = require('../jwt.config.js');
const {User, Course} = require("../db/index.js")
const jwt = require('jsonwebtoken');
const { errorMonitor } = require("supertest/lib/test.js");

// User Routes
router.post('/signup', async(req, res) => {
    // Implement user signup logic

    const newUser = ({
        username: req.body.username,
        password: req.body.password
    });

    const user = await User.findOne(newUser) 
    if (user) {
        res.status(401).json({ msg: 'user already exist' })
    }
    else {
        User.create(newUser);
        res.status(200).json({ msg: "User created succesfully" });
    }
});

router.post('/signin', async(req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;

    if (!username || ! password){
        return res.status(401).json({
            error: "Username or password is missing"
        })
    }
    try{
        const findUser = await User.findOne({
            username: username,
            password: password
        });
        if(findUser?.username === username){
            const token  = jwt.sign({
                username
            }, JWT_Secret)

            res.status(200).json({
                msg: "User signin successfully",
                Token: token
            })
        }
        else{
            res.status(401).json({
                msg: "User not found"
            })
        }
    } catch(err){
        console.log(err);
        res.status(500).json({
            err: "Internal error"
        })
    }

    
});

router.get('/courses', async(req, res) => {
    // Implement listing all courses logic
    const data = await Course.find({});

    res.json({
        course: data
    })
});

router.post('/courses/:courseId', userMiddleware, async(req, res) => {
    // Implement course purchase logic
   try{
    const user = req.user;
    const id = req.params.courseId;

    const course = await Course.findById(id);

    if(course){
        
        const foundUser = await User.findOne({username: user})

        if(foundUser){
            foundUser.purchasedCourse.push(course);
            await foundUser.save();
            res.status(200).json({
                message: "Course purchased successfully"
            });
        }
        else{
            res.status(401).json({
                message: "Course not found"
            })
        }
    } 
    else{
        res.json({
            message: " Course not found"
        });
    }
   } catch (err){
    res.status(401).json({
        err: "Internal server error"
    })
   }

});

router.get('/purchasedCourses', userMiddleware, (req, res) => {
    // Implement fetching purchased courses logic
    const userAuth = req.headers.authorization;

});

module.exports = router