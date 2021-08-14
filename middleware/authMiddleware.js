const User = require("./models/user");
const Message = require("./models/message");

module.exports.isLoggedIn = (req, res, next) => {
   try{
    if(!req.isAuthenticated()){
        return next();
        //return res.redirect('/login');
    } else {
        return next({
            status: 401,
            message: "Please log in first"
        });
    }
   } catch (err){
       return next({
           status: 401,
           message:"You must be logged in first"
       })
   }
   
}

// check for author of park middleware
module.exports.isAuthor = async(req, res, next) => {
    try {
        const { id } = req.params;
        const message = await Message.findById(id);
        if(!message.author.equals(req.user._id)){
            console.log('You do not have permission to do that.');
            //return res.redirect(`/`);
        }
    
    } catch (err){
        return next({
            status: 401,
            message:"You must be logged in first"
        })
    }
}
