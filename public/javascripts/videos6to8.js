//populate both sections on page load
//pass age category based on page
$(function(){
  console.log("Entering function");
  $.ajax({
    url: '/displayVideos6to8.htm',
    type: 'POST',
    dataType: 'json',
    success: function(data) {
      $('#FunVideos #vid-list li').remove();
      $('#LearnVideos #vid-list li').remove();
      console.log(data.Links[0]);
       console.log(data.Name[0]);
       console.log(data.Descr[0]);
       console.log(data.Thumb[0]);
      for(var i=0;i<data.LinksFun.length;i++){
      $('#FunVideos #vid-list').append('<li class="vid-item" onclick="startVideo(\''+data.LinksFun[i]+'\')"><div class="thumb"><img src="'+ data.ThumbFun[i]+'"></div><div class="desc">'+data.NameFun[i]+'</div></li>');
      }
      for(var i=0;i<data.Links.length;i++){
      $('#LearnVideos #vid-list').append('<li class="vid-item" onclick="startVideo(\''+data.Links[i]+'\')"><div class="thumb"><img src="'+ data.Thumb[i]+'"></div><div class="desc">'+data.Name[i]+'</div></li>');
    }
    }
  });
});

//populate both divs on search action
$(function(){
  console.log("Entering function");
  $.ajax({
    url: '/displaySearchVideos6to8.htm',
    type: 'POST',
    data:{

    },
    dataType: 'json',
    success: function(data) {
      $('#FunVideos #vid-list li').remove();
      $('#LearnVideos #vid-list li').remove();
      for(var i=0;i<data.LinksFun.length;i++){
      $('#FunVideos #vid-list').append('<li class="vid-item" onclick="startVideo(\''+data.LinksFun[i]+'\')"><div class="thumb"><img src="'+ data.ThumbFun[i]+'"></div><div class="desc">'+data.NameFun[i]+'</div></li>');
      }
      for(var i=0;i<data.Links.length;i++){
      $('#LearnVideos #vid-list').append('<li class="vid-item" onclick="startVideo(\''+data.Links[i]+'\')"><div class="thumb"><img src="'+ data.Thumb[i]+'"></div><div class="desc">'+data.Name[i]+'</div></li>');
    }
    }
  });
});
