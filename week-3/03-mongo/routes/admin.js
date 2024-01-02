const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const {Admin, Course} = require("../db")

// Admin Routes
router.post('/signup', async(req, res) => {

    const username = req.body.username;
    const password = req.body.password;
    await Admin.create({
        username: username,
        password: password
    })

    res.json({
        message: "Admin created successfully"
    })
});

router.post('/courses', adminMiddleware, async(req, res) => {
    // Implement course creation logic
    const title = req.body.title;
    const description = req.body.description;
    const imageLink = req.body.imageLink;
    const price = req.body.price;

    const newCourse = await Course.create({
       title:title,
       description:description,
       imageLink:imageLink,
       price:price,
    })

    res.json({
        message: 'Course created successfully',
        courseId: newCourse._id
    })

});

router.get('/courses', adminMiddleware, async(req, res) => {
    // Implement fetching all courses logic
    const data = await Course.find({});
    res.json({
        courses: data
    })

});

module.exports = router;