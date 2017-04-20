var mongoose = require('mongoose');
mongoose.Promise=Promise;
async = require("async");
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

/* GET edit account page. */
router.get('/editaccount.htm', function(req, res, next) {
  res.render('editAccount');
});

/* GET history page + user email */
router.get('/history.htm/:loginEmail', function(req, res, next) {
  var email=req.params.loginEmail;
  UserParent.findOne({email:email}, function(err, det){
      if(err || !det)
      {
        res.render('error');
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
          if(err1 || !det1)
            res.render('error');
          else
          {
            console.log(det1[i]);
            for(var i=0;i<numberOfKids;i++){
              if(!det1[i].image)
              {
                images.push("../images/dragon_baby_happy.png");
              }
              else {
                 images.push(det1[i].image);
              }
              names.push(det1[i].fname);
            }
            res.render('history',{images:images,names:names}); // sending a local object to history page
          }
        });
      }
  });
});

/* GET delete page + user email */
router.get('/delete.htm/:loginEmail', function(req, res, next) {
  var email=req.params.loginEmail;
  UserParent.findOne({email:email}, function(err, det){
      if(err || !det)
      {
        res.render('error');
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
          if(err1 || !det1)
            res.render('error');
          else
          {
            for(var i=0;i<numberOfKids;i++){
              console.log(det1[i]);
              if(!det1[i].image)
              {
                images.push("../images/dragon_baby_happy.png");
              }
              else {
                 images.push(det1[i].image);
              }
              names.push(det1[i].fname);
            }
            res.render('delete',{images:images,names:names}); // sending a local object to delete page
          }
        });
      }
  });
});

/* GET error page. */
router.get('/error.htm', function(req, res, next) {
  res.render('error');
});


//Checking if signup email already exists in db
router.post('/signup-email.htm', function(req, res, next) {
  UserParent.find({ email: req.body.email},'_id',{limit:1} , function(err, det){
    if(det.length>=1){
      res.send(true);
    }
    else {
      res.send(false);
    } //end of else
  }); //end of find
}); //end of post


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
              res.render('error');
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
        res.render('error');
      }
      else
      {
        console.log("Det: "+ det._id);
        UserKid.findOne({Parent_id: ObjectId(det._id).toString(),fname:fname},'contentLinkIDs', function(err1, det1){
            console.log(typeof det1);
            if(err1)
            {
              res.render('error');
            }
            else
            {
              console.log("In user kid table");
              console.log("Det1: "+ det1);
              console.log("DET1 id:"+ det1._id);
              console.log("contentLinkIDs: "+ det1.contentLinkIDs);
              var contentLinkIDs=det1.contentLinkIDs;
              Content_link.find({_id:{$in:contentLinkIDs}}, function(err2, det2){
                  console.log("entering contentLink table");
                  var contentLinks=[];
                  var contentLinksName=[];
                  var contentLinksDescr=[];
                  var contentLinksThumb=[];
                  if(err2)
                  {
                    res.render('error');
                  }
                  else
                  {
                    console.log(det2);
                    for(var i=0;i<det2.length;i++){
                      contentLinks.push(det2[i].Link);
                      contentLinksName.push(det2[i].Name);
                      contentLinksDescr.push(det2[i].Description);
                      contentLinksThumb.push(det2[i].Thumb);
                    }
                    console.log(contentLinks);
                    res.send({Links:contentLinks,Name:contentLinksName, Descr:contentLinksDescr,Thumb:contentLinksThumb});
                  } //closing else of Contetn_Link
              }); //closing Content_Link
            } //closing else of UserKid
          }); //closing UserKid
        } //closing else of userParent
    }); //closing USerParent Find
}); //closing router.post

//Retrieve parent account details from db
router.post('/editaccountRetrieve.htm', function(req, res, next) {
  var email=req.body.email;
  UserParent.findOne({email:email}, function(err, det){
      if(err || !det)
      {
        res.render('error');
      }
      else
      {
        var numberOfKids= det.kids;
        var kidList=det.kidIDs;
        UserKid.find({_id:{$in:kidList}},function(err1,det1){
          console.log("Parent:"+det);
          console.log("Kids:"+det1[0]);
          res.send({parent:det, kid:det1});
        });
      }
    });
});


//Update edited details in db
router.post('/editaccount.htm', function(req, res){
  console.log("Inside edit account");
  console.log(typeof req.body);
  console.log(req.body);
  var loginInfo = req.body;
  async.series(
    [
        function(callback) {
            console.log("updateParent");
            updateParent(loginInfo,callback);
        },
        function(callback) {
            console.log("updateExistingKids");
            updateExistingKids(loginInfo,callback);
        },
        function(callback) {
          console.log("checkInputImage");
            checkInputImage(loginInfo,callback);
        },
        function(callback) {
          console.log("createNewKids");
            createNewKids(loginInfo,callback);
        }
    ], function(err, results) {
         console.log('edit done');
         res.send({redirect: '/index.htm'});
    }
);
});

  function updateParent(loginInfo,callback){
    var emailOld=loginInfo.emailOld;
    var email= loginInfo.email;
    var pwd= loginInfo.pwd;
    var fname= loginInfo.fname;
    var lname= loginInfo.lname;
    var kids= loginInfo.numberOfKids;
    UserParent.findOneAndUpdate({email:emailOld},
    {$set:{email:email, pwd:pwd,fname:fname,lname:lname,kids:kids}},
    function(err1,det1){
      if(!err1){
        console.log(det1);
        callback(null,1);
      }
    })
  };

    function updateExistingKids(loginInfo,callback){
      var email=loginInfo.email;
      var kidsOld=loginInfo.numberOfkidsOld;
      var childfnameforOld=JSON.parse(loginInfo.childfnameOld);
      var childfnamefor=JSON.parse(loginInfo.childfname);
      var childlnamefor=JSON.parse(loginInfo.childlname);
      var childagefor=JSON.parse(loginInfo.childage);
      UserParent.findOne({ email: loginInfo.email},'_id', function(err1, det1){
          for(var i=0;i<kidsOld;i++){
            UserKid.findOneAndUpdate({Parent_id: ObjectId(det1._id).toString(),fname:childfnameforOld[i]},
            {$set:{fname:childfnamefor[i], lname:childlnamefor[i],DOB:childagefor[i]}},
            function(err,det){
              if(!err){
                console.log("updateexisitng kids"+ det);
                if(det.fname==childfnameforOld[kidsOld-1]){
                  console.log("inside callback checker"+i);
                  callback(null,1);
                }
              }

            })
          }
        });
};

  function checkInputImage(loginInfo,callback){
      //console.log("input image det1: "+det1);
      var email=loginInfo.email;
      var kidsOld=loginInfo.numberOfkidsOld;
      var childfnameforOld=JSON.parse(loginInfo.childfnameOld);
      var inputimagefor=JSON.parse(loginInfo.inputimage);
      UserParent.findOne({ email: loginInfo.email},'_id', function(err1, det1){
        for(var k=0;k<kidsOld;k++){
          console.log(k);
          console.log(inputimagefor[k]);
          if(inputimagefor[k]!=null){
          console.log("Input image link-not null"+ inputimagefor[k]);
         UserKid.findOneAndUpdate({Parent_id: ObjectId(det1._id).toString(),fname:childfnameforOld[k]},
            {$set:{image:inputimagefor[k]}},function(err2,det2){
              console.log("inputimage"+det2);
              if(det2.fname==childfnameforOld[kidsOld-1]){
                callback(null,1);
              }
            });
        }
        else {
          if(k==kidsOld-1){
            callback(null,1);
          }
        }
      }
    });
};

    function createNewKids(loginInfo,callback){
      var email= loginInfo.email;
      var pwd= loginInfo.pwd;
      var kids= loginInfo.numberOfKids;
      var kidsOld=loginInfo.numberOfkidsOld;
      var childfnameforOld=JSON.parse(loginInfo.childfnameOld);
      var childfnamefor=JSON.parse(loginInfo.childfname);
      var childlnamefor=JSON.parse(loginInfo.childlname);
      var childagefor=JSON.parse(loginInfo.childage);
      var inputimagefor=JSON.parse(loginInfo.inputimage);
      if(kids>kidsOld){
        UserParent.findOne({ email: loginInfo.email},'_id', function(err1, det1){
          console.log("Inside if statement");
          for(var j=kidsOld;j<kids;j++){
            console.log("Inside for of kid insertion");
            console.log("Id of inserted parent"+det1._id);
            var newUserKid = new UserKid({
              fname: childfnamefor[j],
              lname: childlnamefor[j],
              DOB : childagefor[j],
              image: inputimagefor[j],
              Parent_id:ObjectId(det1._id).toString()
            });
            console.log("To be added kid values:"+ newUserKid);
            newUserKid.save(function(err4, det4){
              if(err4)
                res.send("Error in newUserKid insertion in editAccount:"+err4);
              else
                {
                  console.log("Id of inserted kid"+det4._id);
                  UserParent.findOneAndUpdate({_id: det1._id}, {$push:{kidIDs:ObjectId(det4._id).toString()}},{new: true},function(err5, det5){
                    if(err5){
                      console.log("Something wrong when updating parent account after inserting kids!");
                    }
                    else{
                      console.log(det5);
                      if(det5.kidIDs.length==kids){
                        callback(null,1);
                      }
                    }
                  });   //end of USerParent updation
                } // end of else of userKid insertion
              }); // end of userKid insertion
          }//end of for loop
      });
    }//end of new kids if statement
    else{
      callback(null,1);
    }
  }



//Delete a kid's account
router.post('/deletekid.htm', function(req, res, next) {
  var parentEmail = req.body.email;
  var fname= req.body.fname;
  UserParent.findOne({ email: parentEmail},'_id', function(err, det){
      if(err || !det)
      {
        res.render('error');
      }
      else
      {
        console.log("Det: "+ det._id);
        UserKid.findOneAndRemove({Parent_id: ObjectId(det._id).toString(),fname:fname}, function(err1, det1){
          if(err)
          {
            res.render('error');
          }
          else{
            console.log("Det1"+det1);
            console.log("kidid1:"+det1._id);
            UserParent.findOneAndUpdate({ _id: det._id }, { $inc: {kids: -1}, $pull: { kidIDs: ObjectId(det1._id).toString() } },function(err3, data){
              if(err) {
                return res.status(500).json({'error' : 'error in deleting kid'});
              }
              else{
                if(data.kids==0){
                  UserParent.findOneAndRemove({ _id: det._id },function(err4,data2){
                    if(err4)
                    {
                      res.render('error');
                    }
                  });//end of userParent remove
                }// end of if data.kids
                res.send(true);
                console.log(data);
              }//end of else of findOneandUpdate
            });//end of findOne and Update
          } //end of findOneAndRemove else
        })//end of findOneAndRemove
      } //end of userParent findONe else
    }) //end of userParent
}); //end of post

//POSt to delete entire account //send back new page as well as true
router.post('/deleteAccount.htm', function(req, res, next) {
  var email=req.body.email;
  UserParent.findOne({email:email}, function(err, det){
      if(err || !det)
      {
        res.render('error');
      }
      else
      {
        console.log("ParentID:"+det);
        var numberOfKids= det.kids;
        console.log("kids:"+det.kids);
        var kidList=det.kidIDs;
        UserKid.remove({_id:{$in:kidList}},function(err1){
          //console.log(typeof det1);
          if(err1)
          {
            res.render('error');
          }
          else{
            UserParent.findOneAndRemove({ _id: det._id }, function(err2,det2){
              if(!err2)
              {
                res.send({result: true, redirect: `/index.htm`});
              }//end of if userParent findOneAndRemove
            }); //end of userParent findOneAndRemove
          } //end of findOneAndRemove else
        })//end of findOneAndRemove
      } //end of userParent findONe else
    }) //end of userParent
}); //end of post

module.exports = router;
