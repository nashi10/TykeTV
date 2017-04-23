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
      $('#viewHistory .vid-list li').remove();
      var widthValueLearn=(data.Links.length)*188;
      $("#viewHistory .vid-list").css("width", widthValueLearn);
      for(var i=0;i<data.Links.length;i++){
      $('#viewHistory .vid-list').append('<li class="vid-item" onclick="startVideo(\''+data.Links[i]+'\')"><div class="thumb"><img src="'+ data.Thumb[i]+'"></div><div class="desc">'+data.Name[i]+'</div></li>');
      }
    }
  });


  $.ajax({
    url: '/display3to5.htm',
    type: 'POST',
    data: {
      Game:"No"
    },
    dataType: 'json',
    success: function(data) {
      $('.video-section .vertical-list li').remove();
      for(var i=0;i<data.Links.length;i++){
      $('.video-section .vertical-list').append('<li class="vert-vid-item" onclick="startVideo(\''+data.Links[i]+'\')"><div class="vert-thumb"><img src="'+ data.Thumb[i]+'"></div><div class="vert-desc"><p>'+data.Name[i]+'</p></div></li>');
      }
      $('.horizontal-video-section .vid-list li').remove();
      var widthValue=(data.Links.length)*188;
      $(".horizontal-video-section .vid-list").css("width", widthValue);
      for(var i=0;i<data.Links.length;i++){
      $('.horizontal-video-section .vid-list').append('<li class="vid-item" onclick="startVideo(\''+data.Links[i]+'\')"><div class="thumb"><img src="'+ data.Thumb[i]+'"></div><div class="desc"><p>'+data.Name[i]+'</p></div></li>');
      }
    }
  });

  $.ajax({
    url: '/display3to5.htm',
    type: 'POST',
    data: {
      Game:"Yes"
    },
    dataType: 'json',
    success: function(data) {
      $('.games-section .vertical-list li').remove();
      for(var i=0;i<data.Links.length;i++){
      $('.games-section .vertical-list').append('<li class="vert-vid-item" onclick="startVideo(\''+data.Links[i]+'\')"><div class="vert-thumb"><img src="'+ data.Thumb[i]+'"></div><div class="vert-desc"><p>'+data.Name[i]+'</p></div></li>');
      }
      $('.horizontal-games-section .vid-list li').remove();
      var widthValue=(data.Links.length)*188;
      $(".horizontal-games-section .vid-list").css("width", widthValue);
      for(var i=0;i<data.Links.length;i++){
      $('.horizontal-games-section .vid-list').append('<li class="vid-item" onclick="startVideo(\''+data.Links[i]+'\')"><div class="thumb"><img src="'+ data.Thumb[i]+'"></div><div class="desc"><p>'+data.Name[i]+'</p></div></li>');
      }
    }
  });
});

//populate both divs on search action
//return videos and games in same call
$(function(){
  $('#search').on('keypress',function(e){
     if(e.keyCode === 13) {
      console.log("Entering search function");
       var keywords = $('#search').val();
      $.ajax({
        url: '/displaySearch3to5.htm',
        type: 'POST',
        data:{
          keyword:keywords
        },
        dataType: 'json',
        success: function(data) {
          console.log(data.Links.length);
          $('.video-section .vertical-list li').remove();
          for(var i=0;i<data.Links.length;i++){
          $('.video-section .vertical-list').append('<li class="vert-vid-item" onclick="startVideo(\''+data.Links[i]+'\')"><div class="vert-thumb"><img src="'+ data.Thumb[i]+'"></div><div class="vert-desc"><p>'+data.Name[i]+'</p></div></li>');
          }
          $('.horizontal-video-section .vid-list li').remove();
          var widthValue=(data.Links.length)*188;
          $(".horizontal-video-section .vid-list").css("width", widthValue);
          for(var i=0;i<data.Links.length;i++){
          $('.horizontal-video-section .vid-list').append('<li class="vid-item" onclick="startVideo(\''+data.Links[i]+'\')"><div class="thumb"><img src="'+ data.Thumb[i]+'"></div><div class="desc"><p>'+data.Name[i]+'</p></div></li>');
          }


          $('.games-section .vertical-list li').remove();
          for(var i=0;i<data.LinksGames.length;i++){
          $('.games-section .vertical-list').append('<li class="vert-vid-item" onclick="startVideo(\''+data.LinksGames[i]+'\')"><div class="vert-thumb"><img src="'+ data.ThumbGames[i]+'"></div><div class="vert-desc"><p>'+data.NameGames[i]+'</p></div></li>');
          }
          $('.horizontal-games-section .vid-list li').remove();
          var widthValue=(data.LinksGames.length)*188;
          $(".horizontal-games-section .vid-list").css("width", widthValue);
          for(var i=0;i<data.LinksGames.length;i++){
          $('.horizontal-games-section .vid-list').append('<li class="vid-item" onclick="startVideo(\''+data.LinksGames[i]+'\')"><div class="thumb"><img src="'+ data.ThumbGames[i]+'"></div><div class="desc"><p>'+data.NameGames[i]+'</p></div></li>');
          }
        }
      });
    }
  });
});
