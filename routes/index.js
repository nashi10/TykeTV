var express = require('express');
var router = express.Router();
var User = require('../models/test_models');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/index.htm', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET Signup page. */
router.get('/Signup.htm', function(req, res, next) {
  res.render('Signup', { title: 'Express' });
});


/*In case of wrong URLs*/
router.get('*', function(req, res,next){
      res.render('error.htm', { title: 'Express' });
});

/*Posting login info from home page to db*/
router.post('/', function(req, res){
    var loginInfo = req.body; //Get the parsed information
    if(!loginInfo.email || !loginInfo.pwd){
         return console.error('Email or pwd missing');
    }
    else{
        var newUser = new User({
            email: loginInfo.email,
            pwd: loginInfo.pwd,
        });
        newUser.save(function(err, res){
            if(err)
                return console.error(err);
            //else
              // res.render('Signup.htm', { title: 'Express' });
        });
    }
});

router.post('/index.htm', function(req, res){
    var loginInfo = req.body; //Get the parsed information
    if(!loginInfo.email || !loginInfo.pwd){
        res.send('Email or pwd missing');
    }
    else{
        var newUser = new User({
            email: loginInfo.email,
            pwd: loginInfo.pwd,
        });
        newUser.save(function(err, res){
            if(err)
                return console.error(err);
            else
                res.send('Succesful');
        });
    }
});


module.exports = router;
