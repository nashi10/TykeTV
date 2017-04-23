$(function(){
  var url = window.location.pathname;
  var filename = url.substring(url.lastIndexOf('/')+1);
  if(localStorage.login=="false" && (filename != 'login.htm' || filename != 'signup.htm'))
    window.location.href = "/index.htm";
}) ;


$(function(){
  $('#BookEventsButton').on('click',function(){
    window.location.href="/BookEventsPg1.htm";
  })
})


$(function(){
  $('#checkActivityButton').on('click',function(){
    alert("here");
    var parentEmail=localStorage.getItem('login-email');
    window.location.href=`/history.htm/${parentEmail}`;
  })
})
