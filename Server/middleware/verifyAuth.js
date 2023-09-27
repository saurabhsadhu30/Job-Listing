const Jwt = require('jsonwebtoken')

const verifyAuth = (req, res, next) => {

    try {
        const token = req.headers.token;
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorization'
            })
        }
        const decoded = Jwt.verify(token, process.env.JWT_SECRET,);
        if (!decoded) {
            return res.status(401).json({
                success: false,
                message: 'Invalid token'
            })
        }
        next();
    } catch (error) {

        console.log(error)
        res.status(500).json({
            success: false,
            errormessage: 'Internal server error'
        })
    }
}


module.exports = verifyAuth;