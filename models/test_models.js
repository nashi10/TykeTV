var mongoose = require('mongoose');
var Schema = mongoose.Schema;

 var userParentsSchema = mongoose.Schema({
    email: String,
    pwd: String,
    fname:String,
    lname:String,
    kids: Number,
    kidIDs: Array
});
var UserParent = mongoose.model("UserParent", userParentsSchema);

var userKidsSchema = mongoose.Schema({
   fname: String,
   lname: String,
   age : Number,
   image: String,
   contentLinkIDs : Array
});
var UserKid = mongoose.model("UserKid", userKidsSchema);

module.exports =  { UserParent, UserKid} ;
