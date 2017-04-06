//JS to check if user is logged in //need to find some other event is needed to do check
$(function(){
/*code here*/
  var url = window.location.pathname;
  var filename = url.substring(url.lastIndexOf('/')+1);
  if(localStorage.login=="false" && (filename != 'login.htm' || filename != 'signup.htm'))
    window.location.href = "/index.htm";
}) ;

//Ajax POST call to db from login page
$(function() {
  $('#login-button').on('click', checkUser);
});
var checkUser = function() {
  var email = $('#login-email').val();
  var pwd = $('#login-pwd').val();
  $.ajax({
    url: '/index.htm',
    type: 'POST',
    data: {
      email:email,
      pwd:pwd
    },
    dataType: 'json',
    success: function(data) {
      localStorage.setItem('login-email',$('#login-email').val());
      localStorage.setItem('login','true');
      window.location.href = data.redirect;
    }
  });
};


//Cloudinary image uploads
var inputimage=[];
$(function(){
  $('#inputimage1').append($.cloudinary.unsigned_upload_tag("ptpupbzx",
    { cloud_name: 'dqn5eqmwt' }));

    $('#inputimage1').bind('cloudinarydone', function(e, data) {
      inputimage[0]=data.result.url;
    });

    $('#inputimage2').append($.cloudinary.unsigned_upload_tag("ptpupbzx",
      { cloud_name: 'dqn5eqmwt' }));

      $('#inputimage2').bind('cloudinarydone', function(e, data) {
        inputimage[1]=data.result.url;
      });

      $('#inputimage3').append($.cloudinary.unsigned_upload_tag("ptpupbzx",
        { cloud_name: 'dqn5eqmwt' }));

        $('#inputimage3').bind('cloudinarydone', function(e, data) {
          inputimage[2]=data.result.url;
        });

        $('#inputimage4').append($.cloudinary.unsigned_upload_tag("ptpupbzx",
          { cloud_name: 'dqn5eqmwt' }));

          $('#inputimage4').bind('cloudinarydone', function(e, data) {
            inputimage[3]=data.result.url;
          });
});

//Ajax POST call to db from signup page
$(function() {
  $('#signup-button').on('click', addUser);
});
var addUser = function() {
  console.log("enetrign addUser function");
  var childfname=[];
  var childlname=[];
  var childage=[];
  //var inputimage=[];
  var email = $('#txtaccemail').val();
  var pwd = $('#txtaccpassword').val();
  var fname = $('#txtaccfname').val();
  var lname = $('#txtacclname').val();
  var numberOfKids= $('#NumChildren').val();
  for(var i=0;i<numberOfKids;i++){
    var j=i+1;
     childfname[i] = $('#txtchildfname'+j).val();
     childlname[i] = $('#txtchildlname'+j).val();
     childage[i] = $('#txtchildage'+j).val();
     //inputimage[i] = $('#inputimage'+j).val();
  }
  console.log(inputimage[0]);
  $.ajax({
    url: '/signup.htm',
    type: 'POST',
    data: {
      email:email,
      pwd:pwd,
      fname:fname,
      lname:lname,
      numberOfKids: numberOfKids,
      childfname: JSON.stringify(childfname),
      childlname: JSON.stringify(childlname),
      childage: JSON.stringify(childage),
      inputimage: JSON.stringify(inputimage)
    },
    dataType: 'json',
    success: function(data) {
      console.log("success -return to ajax");
      window.location.href = data.redirect;
      }
  });
};

//Ajax POST call to db from history page- retrieving history
$(function() {
  $('.childInfo').on('click', getHistory);
});
var getHistory = function() {
  var kidName =$(this).attr("alt");
  var parentEmail=localStorage.getItem('login-email');
  $.ajax({
    url: '/kidhistory.htm',
    type: 'POST',
    data: {
      email: parentEmail,
      fname: kidName
    },
    dataType: 'json',
    success: function(data) {
      $('#div-id-to-insert-video-after div').remove(); // remove previous videos
      for(var i=0;i<data.Links.length;i++){
      $('#div-id-to-insert-video-after').append('<div class="carousel-cell"><iframe class="videos" src="'+ data.Links[i]+'" ></iframe></div>');
    } //for all links viewed, loop to display in iframe
    }
  });
};
