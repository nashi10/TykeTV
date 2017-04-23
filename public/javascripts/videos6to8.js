//populate both sections on page load
//pass age category based on page
$(function(){
  console.log("Entering function");
  $.ajax({
    url: '/display6to8.htm',
    type: 'POST',
    data: {
      Game:"No"
    },
    dataType: 'json',
    success: function(data) {
      $('#FunVideos #vid-list li').remove();
      $('#LearnVideos #vid-list li').remove();
      var widthValueFun=(data.LinksFun.length)*188;
      var widthValueLearn=(data.Links.length)*188;
      $("#FunVideos #vid-list").css("width", widthValueFun);
      $("#LearnVideos #vid-list").css("width", widthValueLearn);
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
  $('#search').on('keypress',function(e){
     if(e.keyCode === 13) {
      console.log("Entering search function");
       var keywords = $('#search').val();
      $.ajax({
        url: '/displaySearchVideos6to8.htm',
        type: 'POST',
        data:{
            Game:"No",
          keyword:keywords
        },
        dataType: 'json',
        success: function(data) {
          $('#FunVideos #vid-list li').remove();
          $('#LearnVideos #vid-list li').remove();
          var widthValueFun=(data.LinksFun.length)*188;
          var widthValueLearn=(data.Links.length)*188;
          $("#FunVideos #vid-list").css("width", widthValueFun);
          $("#LearnVideos #vid-list").css("width", widthValueLearn);
          for(var i=0;i<data.LinksFun.length;i++){
          $('#FunVideos #vid-list').append('<li class="vid-item" onclick="startVideo(\''+data.LinksFun[i]+'\')"><div class="thumb"><img src="'+ data.ThumbFun[i]+'"></div><div class="desc">'+data.NameFun[i]+'</div></li>');
          }
          for(var i=0;i<data.Links.length;i++){
          $('#LearnVideos #vid-list').append('<li class="vid-item" onclick="startVideo(\''+data.Links[i]+'\')"><div class="thumb"><img src="'+ data.Thumb[i]+'"></div><div class="desc">'+data.Name[i]+'</div></li>');
        }
        }
      });
    }
  });
});
