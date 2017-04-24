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
  $('#submit-page3Button').on('click',function(){
    var parentEmail=localStorage.getItem('login-email');
    var eventName=localStorage.getItem('eventName');
    var eventDate=localStorage.getItem('eventDate');
    var timeRange=localStorage.getItem('timeRange');
    var comments=$('#comments').val();
    $.ajax({
      url: '/eventBooking.htm',
      type: 'POST',
      data: {
        email: parentEmail,
        eventName:eventName,
        eventDate:eventDate,
        timeRange:timeRange,
        comments:comments
      },
      dataType: 'json',
      success: function(data) {
        if(data){
          //hide image, replace right section with a message, replaace current image with new image
          localStorage.removeItem('eventName');
          localStorage.removeItem('eventDate');
          localStorage.removeItem('timeRange');
            alert("Booking complete");
        }
        else {
          alert("Encountered error while booking. Please try again");
        }

      }
    });
  });
});
