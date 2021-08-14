const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    profileImageUrl: {
        type: String
    },
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message"
    }]
});

// passportLocalMongoose automatically takes care of salt & hashing of password
UserSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", UserSchema);

module.exports = User;