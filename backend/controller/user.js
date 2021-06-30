const User = require('../models/User');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken')

exports.register = async (req, res, next) => {
    
    const { email, username, password } = req.body;

    try {
        const verifyUser = await User.findOne({email});
        
        verifyUser && res.json({success: false, message: "email already exists"});

        if(!verifyUser){
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            const newUser = new User({
                email,
                username,
                password: hashedPassword
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
        
        const verifyUser = await User.findOne({email});
        !verifyUser && res.json({success: false, isAuth: false, message: "unvalid email"});

        const verifyPassword = await bcrypt.compare(password, verifyUser.password);

        if(verifyPassword){
            
            const token = await jwt.sign({_id: verifyUser._id}, 'secret');

            verifyUser.token = token;
            verifyUser.save();

            res.cookie('x_auth', token).json({success: true, isAuth: true});

        } else {
            res.json({
                success: false, isAuth: false, message: "unvalid password"
            });
        }


    } catch (err) {
        next(err);
    }

}


exports.logout = async (req, res, next) => {
    
    try {
        const userId = req.params.id;
        const setTokenBlank = await User.findOneAndUpdate({_id: userId}, {token: ""});
        setTokenBlank && res.json({success: true, isAuth: false});
    } catch (err) {
        next(err);
    }
    
}


exports.auth = async (req, res, next) => {
    const user = req.user;
    res.json({user});
}