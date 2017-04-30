// Javascript for video popup generation
//add URL to source of iframe and display it
function startVideo(srcUrl) {
  document.getElementById('popup2').style.display = 'block';
  document.getElementById('vid_frame').src = srcUrl;
  updateHistory(srcUrl);
}

//reset source of iframe and hide it
function toggleVideo(state) {
  var url = document.getElementById("vid_frame").src;
  document.getElementById("vid_frame").src = url;
  document.getElementById('popup2').style.display = 'none';
}

//On start video, update viewing history of kid via AJAX call
var updateHistory = function(srcUrl) {
  var email = localStorage.getItem('login-email');
  var kidname = localStorage.getItem('kid-name');
  $.ajax({
    url: '/updateHistory.htm',
    type: 'POST',
    data: {
      email: email,
      fname: kidname,
      Link: srcUrl
    },
    dataType: 'json',
    success: function(data) {
      console.log(data);
    }
  })
};
