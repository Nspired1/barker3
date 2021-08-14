const mongoose = require("mongoose");

mongoose.set("debug", true);
mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/barker", {
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
});

module.exports.User = require("./user");
module.exports.Message = require("./message");

