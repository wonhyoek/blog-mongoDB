const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
    
    const token = req.cookies.x_auth;
    !token && res.json({success: false, isAuth: false, message: "you need token"});

    try {
        const decoded = await jwt.verify(token, 'secret');
        const verifyUser = await User.findOne({_id: decoded._id, token});
        
        if(verifyUser){
            req.user = verifyUser;
            next();
        } else {
            res.json({success: false, isAuth: false, message: "unvalid token"});
        }


    } catch (err) {
        next(err);
    }
}