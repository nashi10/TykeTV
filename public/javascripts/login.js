

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

$("#login-email").change(function() {
  // Check input( $( this ).val() ) for validity here
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  var result= re.test($("#login-email").val());
  if(!result){
    alert("Email does not appear to be valid. Please re-check before submission");
  }
});
