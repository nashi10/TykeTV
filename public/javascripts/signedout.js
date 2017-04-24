$(function(){
  localStorage.removeItem('login-email');
  localStorage.setItem('login','false');
});

$(function(){
  $("#signedout").on('click',function(){
    window.location.href="/index.htm";
  })
});
