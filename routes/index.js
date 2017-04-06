var express = require('express');
var router = express.Router();
var {ObjectId} = require('mongodb');
var {UserParent,UserKid, Content_link} = require('../models/test_models');

/* GET landing page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/* GET landing page. */
router.get('/index.htm', function(req, res, next) {
  res.render('index');
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
  console.log("Inside signup post");
  console.log(typeof req.body);
  console.log(req.body);
    var loginInfo = req.body; //Get the parsed information
    var newUserParent = new UserParent({
      email: loginInfo.email,
      pwd: loginInfo.pwd,
      fname: loginInfo.fname,
      lname: loginInfo.lname,
      kids: loginInfo.numberOfKids
    });
    var childfnamefor=JSON.parse(loginInfo.childfname);
    var childlnamefor=JSON.parse(loginInfo.childlname);
    var childagefor=JSON.parse(loginInfo.childage);
    var inputimagefor=JSON.parse(loginInfo.inputimage);
    console.log("Formatted childfname: "+childfnamefor );
    console.log("To be added Parent values:"+ newUserParent);
    newUserParent.save(function(err, det){
      if(err)
        res.send("error: "+err);
      else{
        console.log("Inside else of parent insertion");
        for(var i=0;i<loginInfo.numberOfKids;i++){
          console.log("Inside for of kid insertion");
          console.log("Id of inserted parent"+det._id);
          var newUserKid = new UserKid({
            fname: childfnamefor[i],
            lname: childlnamefor[i],
            DOB : childagefor[i],
            image: inputimagefor[i],
            Parent_id:ObjectId(det._id).toString()
          });
          console.log("To be added kid values:"+ newUserKid);
          newUserKid.save(function(err1, det1){
            if(err1)
              res.send("Error in newUserKid insertion:"+err1);
            else
              {
                console.log("Id of inserted kid"+det1._id);
                UserParent.findOneAndUpdate({_id: det._id}, {$push:{kidIDs:ObjectId(det1._id).toString()}},function(err2, det2){
                  if(err2){
                    console.log("Something wrong when updating data!");
                  }
                  console.log("loading index.htm");
                  res.send({redirect: '/index.htm'});
                });   //end of USerParent updation
              } // end of else of userKid insertion
            }); // end of userKid insertion
          } //end of for loop
        }//end of else of userParent insertion
    });//end of userParent insertion
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
