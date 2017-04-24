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
  $('.clickAction').on('click',function(){
    var eventTitle=document.getElementsByClassName('eventTitle');
    var eventName;
    if( $('#firstslide').css('display')=='block'){
      eventName=eventTitle[0].innerHTML;
    }
    else{
      var mySlides=document.getElementsByClassName('mySlides');
      for (var i = 1; i < mySlides.length; i ++) {
        if(mySlides[i].style.display=='block'){
          eventName=eventTitle[i].innerHTML;
        }
      }
    }
    console.log(eventName);
    localStorage.setItem('eventName',eventName.trim());
    //enable button
    document.getElementById('continue-page1Button').disabled = false;
  })
})

$(function(){
  $('#continue-page1Button').on('click',function(){
    window.location.href="/BookEventsPg2.htm";
  })
});
