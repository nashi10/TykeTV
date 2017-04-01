var express = require('express');
var router = express.Router();
var {UserParent,UserKid} = require('../models/test_models');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET Signup page. */
router.get('/Signup.htm', function(req, res, next) {
  res.render('Signup');
});

/* GET Success page. */
router.get('/success.htm', function(req, res, next) {
  res.render('success');
});

/* GET error page. */
router.get('/error.htm', function(req, res, next) {
  res.render('error');
});

/*Posting info from signup page to db*/
router.post('/Signup.htm', function(req, res){
    var loginInfo = req.body; //Get the parsed information

    if(!loginInfo.email || !loginInfo.pwd){
         return console.error('Email or pwd missing');
    }
    else{
        var newUser = new UserParent({
            email: loginInfo.email,
            pwd: loginInfo.pwd,
        });
        newUser.save(function(err, det){
            if(err)
                return console.error(err);
            else
               res.render('index.htm');
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
              res.redirect('/error.htm');
            }
            else if(det.pwd==loginInfo.pwd)
            {
              console.log("success");
              res.redirect('/success.htm');
            }
            else {
              console.log("incorrect password");
              console.log(det);
            }
        });

    }
});

module.exports = router;
