//function to check if user is signed in, if not: reroute to index.htm
$(function() {
  var url = window.location.pathname;
  var filename = url.substring(url.lastIndexOf('/') + 1);
  if (localStorage.login == "false" && (filename != 'login.htm' || filename != 'signup.htm'))
    window.location.href = "/index.htm";
});

//Function to handle the tab button click: Events
$(function() {
  $('#BookEventsButton').on('click', function() {
    window.location.href = "/BookEventsPg1.htm";
  })
});

//Function to handle the tab button cick: History
$(function() {
  $('#checkActivityButton').on('click', function() {
    var parentEmail = localStorage.getItem('login-email');
    window.location.href = `/history.htm/${parentEmail}`;
  })
});

//AJAX call to send all data to db on click of submit button
$(function() {
  $('#submit-page3Button').on('click', function() {
    var parentEmail = localStorage.getItem('login-email');
    var eventName = localStorage.getItem('eventName');
    var eventDate = localStorage.getItem('eventDate');
    var timeRange = localStorage.getItem('timeRange');
    var comments = $('#Text').val();
    $.ajax({
      url: '/eventBooking.htm',
      type: 'POST',
      data: {
        email: parentEmail,
        eventName: eventName,
        eventDate: eventDate,
        timeRange: timeRange,
        comments: comments
      },
      dataType: 'json',
      success: function(data) {
        if (data) {
          alert("Yay...Event boooked!!!!!");
          //hide image, replace right section with a message, replace current image with new image
          localStorage.removeItem('eventName');
          localStorage.removeItem('eventDate');
          localStorage.removeItem('timeRange');
          window.location.href = "/BookEventsPg1.htm"
        } else {
          alert("Encountered error while booking. Please try again");
        }
      }
    });
  });
});
