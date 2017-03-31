var mongoose = require('mongoose');
var Schema = mongoose.Schema;

 var userSchema = mongoose.Schema({
    email: String,
    pwd: String   
});
var User = mongoose.model("User", userSchema);


module.exports = User;
