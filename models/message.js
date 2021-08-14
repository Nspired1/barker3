const mongoose = require("mongoose");
const User = require("./user");

const MessageSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        maxLength: 280
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

MessageSchema.pre('remove', async function(next){
  try {
      let user = await User.findById(this.user);
      user.messages.remove(this.id);
      await user.save();
      return next();
  } catch(err){
      return next(err);
  }
})

const Message = mongoose.model("Message", MessageSchema);

module.exports = Message;
