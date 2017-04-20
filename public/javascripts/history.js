//JS to check if user is logged in //need to find some other event is needed to do check
/*code here*/
$(function(){
  var url = window.location.pathname;
  var filename = url.substring(url.lastIndexOf('/')+1);
  if(localStorage.login=="false" && (filename != 'login.htm' || filename != 'signup.htm'))
    window.location.href = "/index.htm";
}) ;


//Ajax POST call to db from history page- retrieving history
$(function(){
  $('.img-circle').on('click', getHistory);
});
var getHistory = function() {
  console.log("Entering function");
  var kidName =$(this).attr("alt");
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
     console.log(kidName);
      //document.getElementById("kid-name").style.display=inline;
      $('#vid-list li').remove();
      document.getElementById("kid-name").innerHTML="";
      document.getElementById("kid-name").innerHTML=kidName+"'s ";
      console.log(data.Links[0]);
       console.log(data.Name[0]);
       console.log(data.Descr[0]);
       console.log(data.Thumb[0]);
      for(var i=0;i<data.Links.length;i++){
      $('#vid-list').append('<li class="vid-item" onclick="startVideo(\''+data.Links[i]+'\')"><div class="thumb"><img src="'+ data.Thumb[i]+'"></div><div class="desc">'+data.Name[i]+'</div></li>');
      }
    }
  });
};
