const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.register = async (req, res, next) => {
    
    const { email, username, password } = req.body;

    try {
        const verifyUser = await User.findOne({email});
        
        verifyUser && res.json({success: false, message: "email already exists"});
        if(!verifyUser){
            const newUser = new User({
                email,
                username,
                password
            });
    
            await newUser.save();
            res.json({success: true})
        }
        
    } catch (err) {
        next(err);
    }
}



exports.login = async (req, res, next) => {

    const { email, password } = req.body;

    try {
        
    } catch (err) {
        
    }

}