const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const {User, Course} = require("../db/index")

// User Routes
router.post('/signup', async(req, res) => {
    // Implement user signup logic

    const username = req.body.username;
    const password = req.body.password;

    await User.create({
        username,
        password
       // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXJTaHJleWFuazUiLCJpYXQiOjE3MDQxOTE2NDl9.ijoHX7pj_zJAEn7C1giuwbGfFFPZhIEOjSn57wKjB3k
    })

    res.json({
        message: "User created successfully"
    })
});

router.get('/courses', async(req, res) => {
    // Implement listing all courses logic
    const data = await Course.find({})

    res.json({
  //      course: data 659122e1a1e2d363e66ea9ea
    })

});

router.post('/courses/:courseId', userMiddleware, async(req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId;
    const username = req.headers.username;

    await User.updateOne({
        username: username
    },{
        "$push": {
            purchasedCourse: courseId
        }
    });
    res.json({
        message: "Course purchased successfully"
    })
});

router.get('/purchasedCourses', userMiddleware, async(req, res) => {
    // Implement fetching purchased courses logic
    const user = await User.findOne({
        username: req.headers.username
    });

    const courses = await Course.find({
        _id: {
            "$in": user.purchasedCourse
        }
    })

    res.json({
        courses: courses
    })
});

module.exports = router