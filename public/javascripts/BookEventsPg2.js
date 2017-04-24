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
    var parentEmail=localStorage.getItem('login-email');
    window.location.href=`/history.htm/${parentEmail}`;
  })
})


$(function(){
  $('#continue-page2Button').on('click',function(){
    console.log("inside contine page 2 function");
    var date= $('#theInput').val();
    var timeRange=document.getElementById('timepick').value;
    if(date==null || timeRange=="Select a Time slot"){
      alert("Enter time and date before continuing");
      return false;
    }
    else{
      console.log(timeRange);
      console.log(date);
      localStorage.setItem('eventDate',date);
      localStorage.setItem('timeRange',timeRange);
      window.location.href="/BookEventsPg3.htm";
    }
  })
});
