//function to check if user is signed in, if not: reroute to index.htm
$(function() {
  var url = window.location.pathname;
  var filename = url.substring(url.lastIndexOf('/') + 1);
  if (localStorage.login == "false" && (filename != 'login.htm' || filename != 'signup.htm'))
    window.location.href = "/index.htm";
});


/*
--AJAX POST call to db from history page- retrieving history
--display retrieved video links within container
*/
$(function() {
  $('.img-circle').on('click', getHistory);
});
var getHistory = function() {
  console.log("Entering function");
  var kidName = $(this).attr("alt");
  var parentEmail = localStorage.getItem('login-email');
  $.ajax({
    url: '/kidhistory.htm',
    type: 'POST',
    data: {
      email: parentEmail,
      fname: kidName
    },
    dataType: 'json',
    success: function(data) {
      console.log(kidName);
      $('#vid-list li').remove();
      document.getElementById("kid-name").innerHTML = "";
      document.getElementById("kid-name").innerHTML = kidName + "'s ";
      var widthValueLearn = (data.Links.length) * 188;
      $("#vid-list").css("width", widthValueLearn);
      for (var i = 0; i < data.Links.length; i++) {
        $('#vid-list').append('<li class="vid-item" onclick="startVideo(\'' + data.Links[i] + '\')"><div class="thumb"><img src="' + data.Thumb[i] + '"></div><div class="desc">' + data.Name[i] + '</div></li>');
      }
    }
  });
};

//Function to handle the tab button click: Events
$(function() {
  $('#BookEventsButton').on('click', function() {
    window.location.href = "/BookEventsPg1.htm";
  })
})

//Function to handle the tab button cick: History
$(function() {
  $('#checkActivityButton').on('click', function() {
    var parentEmail = localStorage.getItem('login-email');
    window.location.href = `/history.htm/${parentEmail}`;
  })
})
