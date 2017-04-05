var express = require('express');
var router = express.Router();
var {ObjectId} = require('mongodb');
var {UserParent,UserKid, Content_link} = require('../models/test_models');

/* GET landing page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET Signup page. */
router.get('/signup.htm', function(req, res, next) {
  res.render('signup');
});

/* GET Success page. */
router.get('/success.htm', function(req, res, next) {
  res.render('success');
});

/* GET history page. */
router.get('/history.htm', function(req, res, next) {
  res.render('history');
});

/* GET history page + user email */
router.get('/history.htm/:loginEmail', function(req, res, next) {
  var email=req.params.loginEmail;
  UserParent.findOne({email:email}, function(err, det){
      if(err)
      {
        res.send({redirect: '/error.htm'});
      }
      else
      {
        var numberOfKids= det.kids;
        var kidList=det.kidIDs;
        UserKid.find({_id:{$in:kidList}},function(err1,det1){
          console.log(typeof det1);
          var images=[];
          var names=[];
          //console.log("inside for loop");
          //console.log(det1);
          if(err)
            res.send({redirect: '/error.htm'});
          else
          {
            for(var i=0;i<numberOfKids;i++){
              images.push(det1[i].image);
              names.push(det1[i].fname);
            }
            res.render('history',{images:images,names:names}); // sending a local object to history page
          }
        });
      }
  });
});

/* GET error page. */
router.get('/error.htm', function(req, res, next) {
  res.render('error');
});

/*Posting info from signup page to db*/
router.post('/signup.htm', function(req, res){
    var loginInfo = req.body; //Get the parsed information
    if(!loginInfo.email || !loginInfo.pwd){
         return console.error('Email or pwd missing');
    }
    else{
        var newUser = new UserParent({
            email: loginInfo.email,
            pwd: loginInfo.pwd,
            fname: loginInfo.fname,
            lname: loginInfo.lname
        });
        newUser.save(function(err, det){
            if(err)
                return console.error(err);
            else
            {
              res.send({redirect: '/index.htm'});
            }
        });
    }
});

/*checking info from login page with db*/
router.post('/index.htm*', function(req, res){

    var loginInfo = req.body; //Get the parsed information

    if(!loginInfo.email || !loginInfo.pwd){
        res.send('Email or pwd missing');
    }
    else{
        UserParent.findOne({ email: loginInfo.email},'pwd', function(err, det){
            if(err || !det)
            {
              res.send({redirect: '../error.htm'});
            }
            else if(det.pwd==loginInfo.pwd)
            {
              console.log("successful login-correct password");
              res.send({redirect: `/history.htm/${loginInfo.email}`});
            }
            else {
              console.log("incorrect password");
            }
        });

    }
});

/* Retrieve kidHistory from db. */
router.post('/kidhistory.htm', function(req, res, next) {
  var parentEmail = req.body.email;
  var fname= req.body.fname;
  UserParent.findOne({ email: parentEmail},'_id', function(err, det){
      if(err || !det)
      {
        res.send({redirect: '../error.htm'});
      }
      else
      {
        console.log("Det: "+ det._id);
        UserKid.findOne({Parent_id: ObjectId(det._id).toString(),fname:fname},'contentLinkIDs', function(err1, det1){
            console.log(typeof det1);
            if(err1)
            {
              res.send({redirect: '/error.htm'});
            }
            else
            {
              console.log("In user kid table");
              console.log("Det1: "+ det1);
              console.log("DET1 id:"+ det1._id);
              console.log("contentLinkIDs: "+ det1.contentLinkIDs);
              var contentLinkIDs=det1.contentLinkIDs;
              Content_link.find({_id:{$in:contentLinkIDs}},'Link', function(err2, det2){
                  console.log("entering contentLink table");
                  var contentLinks=[];
                  if(err2 || !det2)
                  {
                    res.send({redirect: '../error.htm'});
                  }
                  else
                  {
                    for(var i=0;i<det2.length;i++){
                      contentLinks.push(det2[i].Link);
                    }
                    console.log(contentLinks);
                    res.send({Links:contentLinks});
                  } //closing else of Contetn_Link
              }); //closing Content_Link
            } //closing else of UserKid
          }); //closing UserKid
        } //closing else of userParent
    }); //closing USerParent Find
}); //closing router.post

module.exports = router;
