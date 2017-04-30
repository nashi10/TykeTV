//function to check if user is signed in, if not: reroute to index.htm
$(function() {
  var url = window.location.pathname;
  var filename = url.substring(url.lastIndexOf('/') + 1);
  if (localStorage.login == "false" && (filename != 'login.htm' || filename != 'signup.htm'))
    window.location.href = "/index.htm";
});

/*
--pass category(games/video) to db
--populate fun and learn sections on page load
*/
$(function() {
  console.log("Entering function");
  $.ajax({
    url: '/display6to8.htm',
    type: 'POST',
    data: {
      Game: "No"
    },
    dataType: 'json',
    success: function(data) {
      $('#FunVideos #vid-list li').remove();
      $('#LearnVideos #vid-list li').remove();
      var widthValueFun = (data.LinksFun.length) * 188;
      var widthValueLearn = (data.Links.length) * 188;
      $("#FunVideos #vid-list").css("width", widthValueFun);
      $("#LearnVideos #vid-list").css("width", widthValueLearn);
      for (var i = 0; i < data.LinksFun.length; i++) {
        $('#FunVideos #vid-list').append('<li class="vid-item" onclick="startVideo(\'' + data.LinksFun[i] + '\')"><div class="thumb"><img src="' + data.ThumbFun[i] + '"></div><div class="desc">' + data.NameFun[i] + '</div></li>');
      }
      for (var i = 0; i < data.Links.length; i++) {
        $('#LearnVideos #vid-list').append('<li class="vid-item" onclick="startVideo(\'' + data.Links[i] + '\')"><div class="thumb"><img src="' + data.Thumb[i] + '"></div><div class="desc">' + data.Name[i] + '</div></li>');
      }
    }
  });
});

/*
--function to work on enter key of search bar
--pass search keywords
--pass category(games/video) to db
--populate fun and learn sections on page load
*/
$(function() {
  $('#search').on('keypress', function(e) {
    if (e.keyCode === 13) {
      console.log("Entering search function");
      var keywords = $('#search').val();
      $.ajax({
        url: '/displaySearchVideos6to8.htm',
        type: 'POST',
        data: {
          Game: "No",
          keyword: keywords
        },
        dataType: 'json',
        success: function(data) {
          $('#FunVideos #vid-list li').remove();
          $('#LearnVideos #vid-list li').remove();
          var widthValueFun = (data.LinksFun.length) * 188;
          var widthValueLearn = (data.Links.length) * 188;
          $("#FunVideos #vid-list").css("width", widthValueFun);
          $("#LearnVideos #vid-list").css("width", widthValueLearn);
          for (var i = 0; i < data.LinksFun.length; i++) {
            $('#FunVideos #vid-list').append('<li class="vid-item" onclick="startVideo(\'' + data.LinksFun[i] + '\')"><div class="thumb"><img src="' + data.ThumbFun[i] + '"></div><div class="desc">' + data.NameFun[i] + '</div></li>');
          }
          for (var i = 0; i < data.Links.length; i++) {
            $('#LearnVideos #vid-list').append('<li class="vid-item" onclick="startVideo(\'' + data.Links[i] + '\')"><div class="thumb"><img src="' + data.Thumb[i] + '"></div><div class="desc">' + data.Name[i] + '</div></li>');
          }
        }
      });
    }
  });
});
