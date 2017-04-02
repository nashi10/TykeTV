var express = require('express');
var router = express.Router();
var {UserParent,UserKid} = require('../models/test_models');

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
  var images=[];
  var names=[];
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
        for(var i=0;i<numberOfKids;i++){
          UserKid.findOne({_id:kidList[i]},function(err1,det1){
            console.log(det1);
            if(err)
              res.send({redirect: '/error.htm'});
            else
            {
              images[i-1]=det1.image;
              names[i-1]=det1.fname;
            }
          });
        }
        res.render('history',{images:images,names:names}); // sending a local object to history page
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
            if(err)
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

module.exports = router;
