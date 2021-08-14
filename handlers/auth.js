//const db = require("../models");
const User = require('../models/user');
const passport = require("passport");

exports.signin = (req, res, next) => {
    try {
        passport.authenticate("local", {
            failureFlash: true,
            failureRedirect: "/signin",
        }),
        (req, res) => {
            console.log("On the res.redirect")
            res.redirect('/')
        }
    } catch(err){
        //handle mongoose errors
        if(err.code === 11000){
            err.message = "Sorry, that username and/or email is incorrect"
        }
        return next({
            message: err.message
        })
    }
    
}


exports.register = async (req, res, next) => {
    try {
        console.log("This is the register function")
        const { email, username, password, adminCode, profileImageUrl } = req.body;
        const user = new User({ email, username });
        console.log("THis is user")
        console.log(user);
        if (adminCode === process.env.ADMIN_CODE) {
          user.isAdmin = true;
        }
        // register is passport method that checks if username is unique and registers new user instance with password
        const registeredUser = await User.register(user, password);
        console.log("this is registeredUser")
        console.log(registeredUser);
        req.login(registeredUser, (err) => {
          if (err) return next(err);
          console.log("SUCCESS! New user registered!")
          return res.status(200).json({
              username,
              email
          })
        });
    } catch(err){
        //handle mongoose errors
        if(err.code === 11000){
            err.message = "Sorry, that username and/or email is taken"
        }
        return next({
            message: err.message
        })
    }
}