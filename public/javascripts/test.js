//JS to check if user is logged in //need to find some other event is needed to do check
$(function(){
/*code here*/
  var url = window.location.pathname;
  var filename = url.substring(url.lastIndexOf('/')+1);
  if(localStorage.login=="false" && (filename != 'login.htm' || filename != 'signup.htm'))
    window.location.href = "/index.htm";
}) ;

//Ajax POST call to db from signup page
$(function() {
  $('#signup-button').on('click', addUser);
});
var addUser = function() {
  var email = $('#email').val();
  var pwd = $('#pwd').val();
  var fname = $('#fname').val();
  var lname = $('#lname').val();
  $.ajax({
    url: '/signup.htm',
    type: 'POST',
    data: {
      email:email,
      pwd:pwd,
      fname:fname,
      lname:lname
    },
    dataType: 'json',
    success: function(data) {
      console.log("success -return to ajax");
      window.location.href = data.redirect;
      }
  });
};

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
