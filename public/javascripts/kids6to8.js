//JS to check if user is logged in //need to find some other event is needed to do check
/*code here*/
$(function(){
  var url = window.location.pathname;
  var filename = url.substring(url.lastIndexOf('/')+1);
  if(localStorage.login=="false" && (filename != 'login.htm' || filename != 'signup.htm'))
    window.location.href = "/index.htm";
}) ;


//Ajax POST call to db from 6 to 8 page- retrieving history
$(function(){
  console.log("Entering function");
  var kidName =localStorage.getItem('kid-name');
  var parentEmail=localStorage.getItem('login-email');
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
      var widthValueLearn=(data.Links.length)*188;
      $("#vid-list").css("width", widthValueLearn);
      for(var i=0;i<data.Links.length;i++){
      $('#vid-list').append('<li class="vid-item" onclick="startVideo(\''+data.Links[i]+'\')"><div class="thumb"><img src="'+ data.Thumb[i]+'"></div><div class="desc">'+data.Name[i]+'</div></li>');
      }
    }
  });
});


$(function(){
  $('#btnVideos').on('click',function(){
    window.location.href="/videos6to8.htm";
  })
})


$(function(){
  $('#btnGames').on('click',function(){
    window.location.href="/games6to8.htm";
  })
})
