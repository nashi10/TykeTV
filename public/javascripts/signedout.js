//on signout, reset localStorage elements
$(function() {
  localStorage.removeItem('login-email');
  localStorage.setItem('login', 'false');
});

//On click of log in again button, redirect to login page
$(function() {
  $("#signedout").on('click', function() {
    window.location.href = "/index.htm";
  })
});
