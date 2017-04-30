//function to check if user is signed in, if not: reroute to index.htm
$(function() {
  var url = window.location.pathname;
  var filename = url.substring(url.lastIndexOf('/') + 1);
  if (localStorage.login == "false" && (filename != 'login.htm' || filename != 'signup.htm'))
    window.location.href = "/index.htm";
});

/*
--AJAX POST call to db from kids6to8 page - retrieving history
--display retrieved video links within container
*/
$(function() {
  console.log("Entering function");
  var kidName = localStorage.getItem('kid-name');
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
      console.log(data.Links);
      console.log(kidName);
      $('#vid-list li').remove();
      var widthValueLearn = (data.Links.length) * 188;
      $("#vid-list").css("width", widthValueLearn);
      for (var i = 0; i < data.Links.length; i++) {
        $('#vid-list').append('<li class="vid-item" onclick="startVideo(\'' + data.Links[i] + '\')"><div class="thumb"><img src="' + data.Thumb[i] + '"></div><div class="desc">' + data.Name[i] + '</div></li>');
      }
    }
  });
});

//Function to move to videos6to8 page on click of videos button
$(function() {
  $('#btnVideos').on('click', function() {
    window.location.href = "/videos6to8.htm";
  })
})

//Function to move to games6to8 page on click of games button
$(function() {
  $('#btnGames').on('click', function() {
    window.location.href = "/games6to8.htm";
  })
})
