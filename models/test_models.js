var Promise = require('bluebird');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

 var userParentsSchema = mongoose.Schema({
    email: String,
    pwd: String,
    fname:String,
    lname:String,
    kids: Number,
    kidIDs: Array
},{ collection: 'userparents' });
var UserParent = mongoose.model("UserParent", userParentsSchema);

var userKidsSchema = mongoose.Schema({
   fname: String,
   lname: String,
   Age : Number,
   image: String,
   Parent_id:String,
   contentLinkIDs : Array
},{ collection: 'userkids' });
var UserKid = mongoose.model("UserKid", userKidsSchema);

var eventsSchema = mongoose.Schema({
   Description: String,
   Image: String,
   Name: String
},{ collection: 'Events' });
var EventDet = mongoose.model("EventDet", eventsSchema);

var bookingsSchema = mongoose.Schema({
   Event_ID: String,
   Parent_ID: String,
   Date: String,
   Time:String,
   Comments:String
},{ collection: 'Bookings' });
var Booking = mongoose.model("Booking", bookingsSchema);

var Content_linksSchema = mongoose.Schema({
   Link:String,
   Name:String,
   Description: String,
   Thumb:String,
   Views :Number,
   Category:String,
   Age_group:String,
   Game:String
},{ collection: 'Content_links' });
Content_linksSchema .index({Name: 'text'});
var Content_link = mongoose.model("Content_link", Content_linksSchema);

module.exports =  { UserParent, UserKid, Content_link, EventDet, Booking} ;
