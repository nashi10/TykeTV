<!-- Javascript for video popup generation -->

  function startVideo(srcUrl){
  document.getElementById('popup2').style.display ='block';
  document.getElementById('vid_frame').src=srcUrl;
  }



  function toggleVideo(state) {
      var url=document.getElementById("vid_frame").src;
      document.getElementById("vid_frame").src=url;
      document.getElementById('popup2').style.display ='none';
     }
