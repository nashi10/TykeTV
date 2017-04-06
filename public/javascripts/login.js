

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
