const express = require('express');
const router = express.Router();
const User = require('../models/users');
const Jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');



router.post('/register', async (req, res) => {

    try {

        const { name, email, password, mobile, checkbox } = req.body;

        if (!name || !email || !password || !mobile || !checkbox) {
            return res.status(400).json({
                success: false,
                errormessage: 'All fields is required'
            })
        }
        const user = await User.findOne({ email })
        if (user) {
            res.status(400).json({
                success: false,
                errormessage: 'email address already exists. Please login!'
            })
        }
        const encryptedPassword = await bcrypt.hash(password, 10)
        const newuser = {
            name,
            email,
            password: encryptedPassword,
            mobile,
            checkbox
        }
        await User.create(newuser)
        const jwToken = Jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: 60 })
        res.status(200).json({
            success: true,
            message: 'user created successfully',
            recruiterName: name,
            user: email,
            jwToken
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            errormessage: "Something went wrong"
        })
    }

})

router.post('/login', async (req, res) => {

    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                errormessage: 'Email and password are required'
            })
        }

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({
                success: false,
                errormessage: 'Invalid Email and password'
            })
        }
        const passwordMatch = await bcrypt.compare(password, user.password)

        if (!passwordMatch) {
            return res.status(400).json({
                success: false,
                errormessage: 'Invalid Email and password'
            })
        }
        const jwToken = Jwt.sign({ userId: user._id }, process.env.JWT_SECRET)

        res.status(200).json({
            success: true,
            user: email,
            recruiterName: user.name,
            message: " your are login successfully",
            jwToken
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            errormessage: 'Something went wrong'
        })
    }
}
)

module.exports = router;

