//if user is already logged in, redirect to selectaccount.htm
$(function() {
  if (localStorage.login == "true") {
    window.location.href = "/selectaccount.htm";
  }
});

/*
--Ajax POST call to db from login page
--checkimg email and pwd with values in db
*/
$(function() {
  $('#login-button').on('click', checkUser);
});
var checkUser = function() {
  var email = $('#login-email').val();
  var pwd = $('#login-pwd').val();
  if (email != '' && pwd != '') {
    $.ajax({
      url: '/index.htm',
      type: 'POST',
      data: {
        email: email,
        pwd: pwd
      },
      dataType: 'json',
      success: function(data) {
        if (data.result == null) {
          localStorage.setItem('login-email', $('#login-email').val());
          localStorage.setItem('login', 'true');
          window.location.href = data.redirect;
        } else if (data.result == "nopwd") {
          alert("Invalid password. Retry")
        } else if (data.result == "noaccount") {
          alert("No account exists for this email . Please check again or Sign up");
        }
      }
    });
  } else {
    alert("Email or password missing. Please check");
  }

};

//Validity check for email as soon as it's entered
$("#login-email").change(function() {
  // Check input( $( this ).val() ) for validity here
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  var result = re.test($("#login-email").val());
  if (!result) {
    alert("Email does not appear to be valid. Please re-check before login");
  }
});
