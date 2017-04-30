var mongoose = require('mongoose');
mongoose.Promise = Promise;
async = require("async");
var express = require('express');
var router = express.Router();
var {
  ObjectId
} = require('mongodb');

//retrieving schema models from test_models.js
var {
  UserParent, UserKid, Content_link, EventDet, Booking
} = require('../models/test_models');

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

/*GET signeout page*/
router.get('/signedout.htm', function(req, res, next) {
  res.render('signedout');
});

/* GET edit account page. */
router.get('/editaccount.htm', function(req, res, next) {
  res.render('editaccount');
});

/* GET select account/home page. */
router.get('/selectaccount.htm', function(req, res, next) {
  res.render('selectaccount');
});

/* GET main page for 6-8. */
router.get('/kids6to8.htm', function(req, res, next) {
  res.render('kids6to8');
});

/* GET videos  page for 6-8. */
router.get('/videos6to8.htm', function(req, res, next) {
  res.render('videos6to8');
});

/* GET games page for 6-8. */
router.get('/games6to8.htm', function(req, res, next) {
  res.render('games6to8');
});

/* GET  page for 3-5   */
router.get('/kidsAge3to5.htm', function(req, res, next) {
  res.render('kidsAge3to5');
});

/* GET first page of book events */
router.get('/BookEventsPg1.htm', function(req, res, next) {
  res.render('BookEventsPg1');
});

/* GET second page of book events */
router.get('/BookEventsPg2.htm', function(req, res, next) {
  res.render('BookEventsPg2');
});

/* GET third page of book events */
router.get('/BookEventsPg3.htm', function(req, res, next) {
  res.render('BookEventsPg3');
});

/* GET history page by passing user email */
router.get('/history.htm/:loginEmail', function(req, res, next) {
  var email = req.params.loginEmail;
  UserParent.findOne({
    email: email
  }, function(err, det) {
    if (err || !det) {
      res.render('error');
    } else {
      var numberOfKids = det.kids;
      var kidList = det.kidIDs;
      UserKid.find({
        _id: {
          $in: kidList
        }
      }, function(err1, det1) {
        console.log(typeof det1);
        var images = [];
        var names = [];
        if (err1 || !det1)
          res.render('error');
        else {
          console.log(det1[i]);
          for (var i = 0; i < numberOfKids; i++) {
            if (!det1[i].image) {
              images.push("https://res.cloudinary.com/dqn5eqmwt/image/upload/v1492759791/dragon_baby_1_uet7it.png");
            } else {
              images.push(det1[i].image);
            }
            names.push(det1[i].fname);
          }
          res.render('history', {
            images: images,
            names: names
          }); // sending a local object to history page
        }
      });
    }
  });
});

/* GET delete page by passing user email */
router.get('/delete.htm/:loginEmail', function(req, res, next) {
  var email = req.params.loginEmail;
  UserParent.findOne({
    email: email
  }, function(err, det) {
    if (err || !det) {
      res.render('error');
    } else {
      var numberOfKids = det.kids;
      var kidList = det.kidIDs;
      UserKid.find({
        _id: {
          $in: kidList
        }
      }, function(err1, det1) {
        console.log(typeof det1);
        var images = [];
        var names = [];
        if (err1 || !det1)
          res.render('error');
        else {
          for (var i = 0; i < numberOfKids; i++) {
            console.log(det1[i]);
            if (!det1[i].image) {
              images.push("https://res.cloudinary.com/dqn5eqmwt/image/upload/v1492759791/dragon_baby_1_uet7it.png");
            } else {
              images.push(det1[i].image);
            }
            names.push(det1[i].fname);
          }
          res.render('delete', {
            images: images,
            names: names
          }); // sending a local object to delete page
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
  UserParent.find({
    email: req.body.email
  }, '_id', {
    limit: 1
  }, function(err, det) {
    if (det.length >= 1) {
      res.send(true);
    } else {
      res.send(false);
    } //end of else
  }); //end of find
}); //end of post


/*
--Posting info from signup page to db
--creating new record in parent
--creating new record in kids with generated Parent_id
--Updating parent record with created kidIDs
*/
router.post('/signup.htm', function(req, res) {
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
  var childfnamefor = JSON.parse(loginInfo.childfname);
  var childlnamefor = JSON.parse(loginInfo.childlname);
  var childagefor = JSON.parse(loginInfo.childage);
  var inputimagefor = JSON.parse(loginInfo.inputimage);
  console.log("Formatted childfname: " + childfnamefor);
  console.log("To be added Parent values:" + newUserParent);
  newUserParent.save(function(err, det) {
    if (err)
      res.send("error: " + err);
    else {
      console.log("Inside else of parent insertion");
      for (var i = 0; i < loginInfo.numberOfKids; i++) {
        console.log("Inside for of kid insertion");
        console.log("Id of inserted parent" + det._id);
        var newUserKid = new UserKid({
          fname: childfnamefor[i],
          lname: childlnamefor[i],
          Age: childagefor[i],
          image: inputimagefor[i],
          Parent_id: ObjectId(det._id).toString()
        });
        console.log("To be added kid values:" + newUserKid);
        newUserKid.save(function(err1, det1) {
          if (err1)
            res.send("Error in newUserKid insertion:" + err1);
          else {
            console.log("Id of inserted kid" + det1._id);
            UserParent.findOneAndUpdate({
              _id: det._id
            }, {
              $push: {
                kidIDs: ObjectId(det1._id).toString()
              }
            }, function(err2, det2) {
              if (err2) {
                console.log("Something wrong when updating data!");
              }
              console.log("loading index.htm");
              res.send({
                redirect: '/index.htm'
              });
            }); //end of USerParent updation
          } // end of else of userKid insertion
        }); // end of userKid insertion
      } //end of for loop
    } //end of else of userParent insertion
  }); //end of userParent insertion
});

/*checking info from login page with db*/
router.post('/index.htm*', function(req, res) {
  var loginInfo = req.body; //Get the parsed information
  UserParent.findOne({
    email: loginInfo.email
  }, 'pwd', function(err, det) {
    if (err) {
      res.send({
        result: "error"
      });
    }
    //if no account exists
    else if (det == null) {
      console.log(det);
      res.send({
        result: "noaccount"
      });
    }
    //if passwords match
    else if (det.pwd == loginInfo.pwd) {
      console.log(det);
      console.log("successful login-correct password");
      res.send({
        result: null,
        redirect: '/selectaccount.htm'
      });
    }
    //if passwords don't match
    else if (det.pwd != loginInfo.pwd) {
      console.log(det);
      res.send({
        result: "nopwd"
      });
    }
  });
});

/*  Account selection page
--Find Parent_id
--retrieve kidsIDs for parent_id
--retrieve and return images and names of kids
*/
router.post('/selectaccount-load.htm', function(req, res) {
  var parentEmail = req.body.email;
  UserParent.findOne({
    email: parentEmail
  }, '_id', function(err, det) {
    if (err || !det) {
      res.render('error');
    } else {
      var Links = [];
      var fName = [];
      UserKid.find({
        Parent_id: ObjectId(det._id).toString()
      }, function(err1, det1) {
        if (err1) {
          res.render('error');
        } else {
          var kids = det1.length;
          for (var i = 0; i < kids; i++) {
            Links.push(det1[i].image);
            fName.push(det1[i].fname);
          }
          res.send({
            kids: kids,
            link: Links,
            name: fName
          });
        }
      })
    }
  })
});

//Retrieve age of kids and choose page to render based on that
router.post('/kidAge.htm', function(req, res, next) {
  var parentEmail = req.body.email;
  var fname = req.body.fname;
  UserParent.findOne({
    email: parentEmail
  }, '_id', function(err, det) {
    if (err || !det) {
      res.render('error');
    } else {
      console.log("Det: " + det._id);
      UserKid.findOne({
        Parent_id: ObjectId(det._id).toString(),
        fname: fname
      }, 'Age', function(err1, det1) {
        console.log(typeof det1);
        if (err1) {
          res.render('error');
        } else {
          var age = det1.Age;
          console.log("In user kid table" + det1.Age);
          if (age >= 3 && age <= 5) {
            res.send({
              redirect: '/kidsAge3to5.htm'
            });
          } else {
            res.send({
              redirect: '/kids6to8.htm'
            });
          }
        }
      });
    }
  })
});

/* Retrieve kidHistory from db
--Find parent_id from UserParent
--For kid with sent fname and reteved parent_id, get list of links viewed
--Get data for links and return  */
router.post('/kidhistory.htm', function(req, res, next) {
  var parentEmail = req.body.email;
  var fname = req.body.fname;
  UserParent.findOne({
    email: parentEmail
  }, '_id', function(err, det) {
    if (err || !det) {
      res.render('error');
    } else {
      console.log("Det: " + det._id);
      UserKid.findOne({
        Parent_id: ObjectId(det._id).toString(),
        fname: fname
      }, 'contentLinkIDs', function(err1, det1) {
        console.log(typeof det1);
        if (err1) {
          res.render('error');
        } else {
          console.log("In user kid table");
          console.log("Det1: " + det1);
          console.log("DET1 id:" + det1._id);
          console.log("contentLinkIDs: " + det1.contentLinkIDs);
          var contentLinkIDs = det1.contentLinkIDs;
          Content_link.find({
            _id: {
              $in: contentLinkIDs
            }
          }, function(err2, det2) {
            console.log("entering contentLink table");
            var contentLinks = [];
            var contentLinksName = [];
            var contentLinksDescr = [];
            var contentLinksThumb = [];
            if (err2) {
              res.render('error');
            } else {
              console.log(det2);
              for (var i = 0; i < det2.length; i++) {
                contentLinks.push(det2[i].Link);
                contentLinksName.push(det2[i].Name);
                contentLinksDescr.push(det2[i].Description);
                contentLinksThumb.push(det2[i].Thumb);
              }
              console.log(contentLinks);
              res.send({
                Links: contentLinks,
                Name: contentLinksName,
                Descr: contentLinksDescr,
                Thumb: contentLinksThumb
              });
            } //closing else of Contetn_Link
          }); //closing Content_Link
        } //closing else of UserKid
      }); //closing UserKid
    } //closing else of userParent
  }); //closing USerParent Find
}); //closing router.post

//Retrieve parent and kids account details from db
router.post('/editaccountRetrieve.htm', function(req, res, next) {
  var email = req.body.email;
  UserParent.findOne({
    email: email
  }, function(err, det) {
    if (err || !det) {
      res.render('error');
    } else {
      var numberOfKids = det.kids;
      var kidList = det.kidIDs;
      UserKid.find({
        _id: {
          $in: kidList
        }
      }, function(err1, det1) {
        console.log("Parent:" + det);
        console.log("Kids:" + det1[0]);
        res.send({
          parent: det,
          kid: det1
        });
      });
    }
  });
});

//Update edited details in db in 4 steps
router.post('/editaccount.htm', function(req, res) {
  console.log("Inside edit account");
  console.log(typeof req.body);
  console.log(req.body);
  var loginInfo = req.body;
  async.series(
    [
      function(callback) {
        //update any parent changes
        console.log("updateParent");
        updateParent(loginInfo, callback);
      },
      function(callback) {
        //update current kid changes-except image
        console.log("updateExistingKids");
        updateExistingKids(loginInfo, callback);
      },
      function(callback) {
        //update image only if it is not null
        console.log("checkInputImage");
        checkInputImage(loginInfo, callback);
      },
      function(callback) {
        //for new added kids, create kids account and link to parent
        console.log("createNewKids");
        createNewKids(loginInfo, callback);
      }
    ],
    function(err, results) {
      console.log('edit done');
      res.send({
        redirect: '/selectaccount.htm'
      });
    }
  );
});

//STEP 1: update any parent changes
function updateParent(loginInfo, callback) {
  var emailOld = loginInfo.emailOld;
  var email = loginInfo.email;
  var pwd = loginInfo.pwd;
  var fname = loginInfo.fname;
  var lname = loginInfo.lname;
  var kids = loginInfo.numberOfKids;
  UserParent.findOneAndUpdate({
      email: emailOld
    }, {
      $set: {
        email: email,
        pwd: pwd,
        fname: fname,
        lname: lname,
        kids: kids
      }
    },
    function(err1, det1) {
      if (!err1) {
        console.log(det1);
        callback(null, 1);
      }
    })
};

//STEP 2: update current kid changes-except image
function updateExistingKids(loginInfo, callback) {
  var email = loginInfo.email;
  var kidsOld = loginInfo.numberOfkidsOld;
  var childfnameforOld = JSON.parse(loginInfo.childfnameOld);
  var childfnamefor = JSON.parse(loginInfo.childfname);
  var childlnamefor = JSON.parse(loginInfo.childlname);
  var childagefor = JSON.parse(loginInfo.childage);
  UserParent.findOne({
    email: loginInfo.email
  }, '_id', function(err1, det1) {
    for (var i = 0; i < kidsOld; i++) {
      UserKid.findOneAndUpdate({
          Parent_id: ObjectId(det1._id).toString(),
          fname: childfnameforOld[i]
        }, {
          $set: {
            fname: childfnamefor[i],
            lname: childlnamefor[i],
            Age: childagefor[i]
          }
        },
        function(err, det) {
          if (!err) {
            console.log("updateexisitng kids" + det);
            if (det.fname == childfnameforOld[kidsOld - 1]) {
              console.log("inside callback checker" + i);
              callback(null, 1);
            }
          }

        })
    }
  });
};

//STEP 3: update image only if it is not null
function checkInputImage(loginInfo, callback) {
  //console.log("input image det1: "+det1);
  var email = loginInfo.email;
  var kidsOld = loginInfo.numberOfkidsOld;
  var childfnameforOld = JSON.parse(loginInfo.childfnameOld);
  var inputimagefor = JSON.parse(loginInfo.inputimage);
  UserParent.findOne({
    email: loginInfo.email
  }, '_id', function(err1, det1) {
    for (var k = 0; k < kidsOld; k++) {
      console.log(k);
      console.log(inputimagefor[k]);
      if (inputimagefor[k] != null) {
        console.log("Input image link-not null" + inputimagefor[k]);
        UserKid.findOneAndUpdate({
          Parent_id: ObjectId(det1._id).toString(),
          fname: childfnameforOld[k]
        }, {
          $set: {
            image: inputimagefor[k]
          }
        }, function(err2, det2) {
          console.log("inputimage" + det2);
          if (det2.fname == childfnameforOld[kidsOld - 1]) {
            callback(null, 1);
          }
        });
      } else {
        if (k == kidsOld - 1) {
          callback(null, 1);
        }
      }
    }
  });
};

//STEP 4: if there are new added kids, create kids account and link to parent
function createNewKids(loginInfo, callback) {
  var email = loginInfo.email;
  var pwd = loginInfo.pwd;
  var kids = loginInfo.numberOfKids;
  var kidsOld = loginInfo.numberOfkidsOld;
  var childfnameforOld = JSON.parse(loginInfo.childfnameOld);
  var childfnamefor = JSON.parse(loginInfo.childfname);
  var childlnamefor = JSON.parse(loginInfo.childlname);
  var childagefor = JSON.parse(loginInfo.childage);
  var inputimagefor = JSON.parse(loginInfo.inputimage);
  if (kids > kidsOld) {
    UserParent.findOne({
      email: loginInfo.email
    }, '_id', function(err1, det1) {
      console.log("Inside if statement");
      for (var j = kidsOld; j < kids; j++) {
        console.log("Inside for of kid insertion");
        console.log("Id of inserted parent" + det1._id);
        var newUserKid = new UserKid({
          fname: childfnamefor[j],
          lname: childlnamefor[j],
          Age: childagefor[j],
          image: inputimagefor[j],
          Parent_id: ObjectId(det1._id).toString()
        });
        console.log("To be added kid values:" + newUserKid);
        newUserKid.save(function(err4, det4) {
          if (err4)
            res.send("Error in newUserKid insertion in editAccount:" + err4);
          else {
            console.log("Id of inserted kid" + det4._id);
            UserParent.findOneAndUpdate({
              _id: det1._id
            }, {
              $push: {
                kidIDs: ObjectId(det4._id).toString()
              }
            }, {
              new: true
            }, function(err5, det5) {
              if (err5) {
                console.log("Something wrong when updating parent account after inserting kids!");
              } else {
                console.log(det5);
                if (det5.kidIDs.length == kids) {
                  callback(null, 1);
                }
              }
            }); //end of USerParent updation
          } // end of else of userKid insertion
        }); // end of userKid insertion
      } //end of for loop
    });
  } //end of new kids if statement
  else {
    callback(null, 1);
  }
}

/*
--For 6 to 8 kids, retrieve games/videos according to value passed
--In two categories
*/
router.post('/display6to8.htm', function(req, res, next) {
  var Game = req.body.Game;
  Content_link.find({
    Age_group: "2",
    Game: Game,
    Category: "Learn"
  }, function(err, det) {
    if (err) {
      console.log("first find error");
      res.render('error');
    } else {
      var contentLinks = [];
      var contentLinksName = [];
      var contentLinksDescr = [];
      var contentLinksThumb = [];
      var contentLinksFun = [];
      var contentLinksNameFun = [];
      var contentLinksDescrFun = [];
      var contentLinksThumbFun = [];
      Content_link.find({
        Age_group: "2",
        Game: Game,
        Category: {
          $in: ["Cartoon", "Fun"]
        }
      }, function(err1, det1) {
        if (err1) {
          console.log("second find error");
          res.render(error);
        } else {
          for (var i = 0; i < det1.length; i++) {
            contentLinksFun.push(det1[i].Link);
            contentLinksNameFun.push(det1[i].Name);
            contentLinksDescrFun.push(det1[i].Description);
            contentLinksThumbFun.push(det1[i].Thumb);
          }
          for (var i = 0; i < det.length; i++) {
            contentLinks.push(det[i].Link);
            contentLinksName.push(det[i].Name);
            contentLinksDescr.push(det[i].Description);
            contentLinksThumb.push(det[i].Thumb);
          }
          console.log(contentLinks);
          res.send({
            LinksFun: contentLinksFun,
            NameFun: contentLinksNameFun,
            DescrFun: contentLinksDescrFun,
            ThumbFun: contentLinksThumbFun,
            Links: contentLinks,
            Name: contentLinksName,
            Descr: contentLinksDescr,
            Thumb: contentLinksThumb
          });
        } //end of else of learn videos find
      }); ////end of learn videos find
    } ////end of else of fun videos find
  }); ////end of  fun videos find
}); //end of post

/*
--For 6 to 8 kids, retrieve games/videos according to keywords passed
--Matches categorues as well as keyword with title
*/
router.post('/displaySearchVideos6to8.htm', function(req, res, next) {
  var keyword = req.body.keyword;
  var Game = req.body.Game;
  console.log("keyword: " + keyword);
  Content_link.find({
    $text: {
      $search: keyword
    },
    Age_group: "2",
    Game: Game,
    Category: "Learn"
  }, function(err, det) {
    if (err) {
      console.log("first find error");
      res.render('error');
    } else {
      console.log(det);
      var contentLinks = [];
      var contentLinksName = [];
      var contentLinksDescr = [];
      var contentLinksThumb = [];
      var contentLinksFun = [];
      var contentLinksNameFun = [];
      var contentLinksDescrFun = [];
      var contentLinksThumbFun = [];
      Content_link.find({
        $text: {
          $search: keyword
        },
        Age_group: "2",
        Game: Game,
        Category: {
          $in: ["Cartoon", "Fun"]
        }
      }, function(err1, det1) {
        if (err1) {
          console.log("second find error");
          res.render(error);
        } else {
          for (var i = 0; i < det1.length; i++) {
            contentLinksFun.push(det1[i].Link);
            contentLinksNameFun.push(det1[i].Name);
            contentLinksDescrFun.push(det1[i].Description);
            contentLinksThumbFun.push(det1[i].Thumb);
          }
          for (var i = 0; i < det.length; i++) {
            contentLinks.push(det[i].Link);
            contentLinksName.push(det[i].Name);
            contentLinksDescr.push(det[i].Description);
            contentLinksThumb.push(det[i].Thumb);
          }
          console.log(contentLinks);
          res.send({
            LinksFun: contentLinksFun,
            NameFun: contentLinksNameFun,
            DescrFun: contentLinksDescrFun,
            ThumbFun: contentLinksThumbFun,
            Links: contentLinks,
            Name: contentLinksName,
            Descr: contentLinksDescr,
            Thumb: contentLinksThumb
          });
        } //end of else of learn videos find
      }); ////end of learn videos find
    } ////end of else of fun videos find
  }); ////end of  fun videos find
}); //end of get


/*
--For 3 to 5 kids, retrieve games/videos according to keywords passed
*/
router.post('/display3to5.htm', function(req, res, next) {
  var Game = req.body.Game;
  Content_link.find({
    Age_group: "1",
    Game: Game
  }, function(err, det) {
    if (err) {
      console.log("first find error");
      res.render('error');
    } else {
      var contentLinks = [];
      var contentLinksName = [];
      var contentLinksDescr = [];
      var contentLinksThumb = [];
      for (var i = 0; i < det.length; i++) {
        contentLinks.push(det[i].Link);
        contentLinksName.push(det[i].Name);
        contentLinksDescr.push(det[i].Description);
        contentLinksThumb.push(det[i].Thumb);
      }
      console.log(contentLinks);
      res.send({
        Links: contentLinks,
        Name: contentLinksName,
        Descr: contentLinksDescr,
        Thumb: contentLinksThumb
      });
    } ////end of else of fun videos find
  }); ////end of  fun videos find
}); //end of post

/*
--For 3 to 5 kids, retrieve games and videos
--Filter titles according to keywords passed
*/
router.post('/displaySearch3to5.htm', function(req, res, next) {
  var keyword = req.body.keyword;
  console.log("keyword: " + keyword);
  Content_link.find({
    $text: {
      $search: keyword
    },
    Age_group: "1",
    Game: "No"
  }, function(err, det) {
    if (err) {
      console.log("first find error");
      res.render('error');
    } else {
      //console.log("Videos: "+det);
      var contentLinks = [];
      var contentLinksName = [];
      var contentLinksDescr = [];
      var contentLinksThumb = [];
      var contentLinksFun = [];
      var contentLinksNameFun = [];
      var contentLinksDescrFun = [];
      var contentLinksThumbFun = [];
      Content_link.find({
        $text: {
          $search: keyword
        },
        Age_group: "1",
        Game: "Yes"
      }, function(err1, det1) {
        if (err1) {
          console.log("second find error");
          res.render(error);
        } else {
          for (var i = 0; i < det1.length; i++) {
            contentLinksFun.push(det1[i].Link);
            contentLinksNameFun.push(det1[i].Name);
            contentLinksDescrFun.push(det1[i].Description);
            contentLinksThumbFun.push(det1[i].Thumb);
          }
          for (var i = 0; i < det.length; i++) {
            contentLinks.push(det[i].Link);
            contentLinksName.push(det[i].Name);
            contentLinksDescr.push(det[i].Description);
            contentLinksThumb.push(det[i].Thumb);
          }
          console.log(contentLinks);
          console.log(contentLinksFun);
          res.send({
            LinksGames: contentLinksFun,
            NameGames: contentLinksNameFun,
            DescrGames: contentLinksDescrFun,
            ThumbGames: contentLinksThumbFun,
            Links: contentLinks,
            Name: contentLinksName,
            Descr: contentLinksDescr,
            Thumb: contentLinksThumb
          });
        } //end of else of learn videos find
      }); ////end of learn videos find
    } ////end of else of fun videos find
  }); ////end of  fun videos find
}); //end of get

//Updating userKid table's history on view of a video/game
router.post('/updateHistory.htm', function(req, res, next) {
  var email = req.body.email;
  var fname = req.body.fname;
  var Link = req.body.Link;
  Content_link.findOne({
    Link: Link
  }, '_id', function(err1, det1) {
    if (err1 || !det1) {
      res.render('error');
    } else {
      console.log("Det1: " + det1._id);
      UserParent.findOne({
        email: email
      }, '_id', function(err, det) {
        if (err || !det) {
          res.render('error');
        } else {
          console.log("Det: " + det._id);
          UserKid.findOneAndUpdate({
            Parent_id: ObjectId(det._id).toString(),
            fname: fname
          }, {
            $push: {
              contentLinkIDs: ObjectId(det1._id).toString()
            }
          }, function(err2, det2) {
            if (err2) {
              res.render('error');
            } else {
              console.log("Det2" + det2);
              res.send("Updated");
            }
          })
        }
      })
    }
  })
});

/*Delete a kid's account
--get parent_id, remove kid record using parent_id and fname
--update parent record's kidIDs
*/
router.post('/deletekid.htm', function(req, res, next) {
  var parentEmail = req.body.email;
  var fname = req.body.fname;
  UserParent.findOne({
      email: parentEmail
    }, '_id', function(err, det) {
      if (err || !det) {
        res.render('error');
      } else {
        console.log("Det: " + det._id);
        UserKid.findOneAndRemove({
            Parent_id: ObjectId(det._id).toString(),
            fname: fname
          }, function(err1, det1) {
            if (err1) {
              res.render('error');
            } else {
              console.log("Det1" + det1);
              console.log("kidid1:" + det1._id);
              UserParent.findOneAndUpdate({
                _id: det._id
              }, {
                $inc: {
                  kids: -1
                },
                $pull: {
                  kidIDs: ObjectId(det1._id).toString()
                }
              }, function(err3, data) {
                if (err) {
                  return res.status(500).json({
                    'error': 'error in deleting kid'
                  });
                } else {
                  if (data.kids == 0) {
                    UserParent.findOneAndRemove({
                      _id: det._id
                    }, function(err4, data2) {
                      if (err4) {
                        res.render('error');
                      }
                    }); //end of userParent remove
                  } // end of if data.kids
                  res.send(true);
                  console.log(data);
                } //end of else of findOneandUpdate
              }); //end of findOne and Update
            } //end of findOneAndRemove else
          }) //end of findOneAndRemove
      } //end of userParent findONe else
    }) //end of userParent
}); //end of post

/*
--Delete entire account (parent record and corresonding kid records)
--send back new page as well as true
*/
router.post('/deleteAccount.htm', function(req, res, next) {
  var email = req.body.email;
  UserParent.findOne({
      email: email
    }, function(err, det) {
      if (err || !det) {
        res.render('error');
      } else {
        console.log("ParentID:" + det);
        var numberOfKids = det.kids;
        console.log("kids:" + det.kids);
        var kidList = det.kidIDs;
        UserKid.remove({
            _id: {
              $in: kidList
            }
          }, function(err1) {
            if (err1) {
              res.render('error');
            } else {
              UserParent.findOneAndRemove({
                _id: det._id
              }, function(err2, det2) {
                if (!err2) {
                  res.send({
                    result: true,
                    redirect: `/index.htm`
                  });
                } //end of if userParent findOneAndRemove
              }); //end of userParent findOneAndRemove
            } //end of findOneAndRemove else
          }) //end of findOneAndRemove
      } //end of userParent findONe else
    }) //end of userParent
}); //end of post

/*
--Add event booking
--Create record in Booking table
*/
router.post('/eventBooking.htm', function(req, res) {
  var email = req.body.email;
  var eventName = req.body.eventName;
  var eventDate = req.body.eventDate;
  var timeRange = req.body.timeRange;
  var comments = req.body.comments;
  UserParent.findOne({
      email: email
    }, '_id', function(err, det) {
      if (err || !det) {
        res.send(false);
      } else {
        console.log("Parent ID" + det._id);
        console.log("Event anme" + eventName + "blah");
        EventDet.findOne({
            Name: eventName
          }, '_id', function(err1, det1) {
            if (err1) {
              res.send(false);
            } else if (!det1) {
              console.log("No values in db");
              res.send(false);
            } else {
              console.log("Event ID" + det1._id);
              var newBooking = new Booking({
                Event_ID: ObjectId(det1._id).toString(),
                Parent_ID: ObjectId(det._id).toString(),
                Date: eventDate,
                Time: timeRange,
                Comments: comments
              });
              console.log("To be added booking values:" + newBooking);
              newBooking.save(function(err2, det2) {
                if (err2)
                  res.send("false");
                else {
                  res.send(true);
                }
              }); //insertion
            } //event find ONe else
          }) //event findOne
      } //userParent find one   else
    }) //userParent find one
})

module.exports = router;
