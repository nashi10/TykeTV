//JS to check if user is logged in //need to find some other event is needed to do check
/*code here*/
$(function(){
  var url = window.location.pathname;
  var filename = url.substring(url.lastIndexOf('/')+1);
  if(localStorage.login=="false" && (filename != 'login.htm' || filename != 'signup.htm'))
    window.location.href = "/index.htm";
}) ;

//Ajax POST call to db from history page- retrieving history
$(function() {
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
      $('#div-id-to-insert-video-after li').remove();
      document.getElementById("kid-name").innerHTML="";
      document.getElementById("kid-name").innerHTML=kidName+"'s ";
      for(var i=0;i<data.Links.length;i++){
      $('#div-id-to-insert-video-after').append('<li class="carousel-cell"><iframe class="myframe" src="'+ data.Links[i]+'" ></iframe></li>');
      }
    }
  });
};
