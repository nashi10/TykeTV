$(function(){
  var url = window.location.pathname;
  var filename = url.substring(url.lastIndexOf('/')+1);
  if(localStorage.login=="false" && (filename != 'login.htm' || filename != 'signup.htm'))
    window.location.href = "/index.htm";
}) ;

//AJAX post function to load images on page
$(function(){
  var email=localStorage.getItem('login-email');
  localStorage.removeItem('kid-name');
  $.ajax({
    url: '/selectaccount-load.htm',
    type: 'POST',
    data: {
      email:email
    },
    dataType: 'json',
    success: function(data) {
    //data needs to have number of kids, sources of images and first names of kids
    //call function and pass data
    putImage(data);
  }
})
});

//function to be called on AJAX success
var putImage=function(data){
  var numberOfKids=data.kids;
  if(numberOfKids==1){
    if(data.link[0]==null){
      document.getElementById('kid1-img').src="https://res.cloudinary.com/dqn5eqmwt/image/upload/v1492759791/dragon_baby_2_in2kqz.png";
    }
    else{
        document.getElementById('kid1-img').src=data.link[0];
    }
    document.getElementById('kid1-img').alt=data.name[0];
    document.getElementById('kid1-name').innerHTML=data.name[0];
    $(".img-circle:eq(0)").hover(function(){
      $(this).css("border", "5px white solid");
      }, function(){
      $(this).css("border", "5px #c43396 solid");
    });
  }
  else if(numberOfKids==2){
    if(data.link[0]==null){
      document.getElementById('kid1-img').src="https://res.cloudinary.com/dqn5eqmwt/image/upload/v1492759791/dragon_baby_2_in2kqz.png";
    }
    else{
        document.getElementById('kid1-img').src=data.link[0];
    }
    document.getElementById('kid1-img').alt=data.name[0];
    document.getElementById('kid1-name').innerHTML=data.name[0];
    if(data.link[1]==null){
      document.getElementById('kid2-img').src="https://res.cloudinary.com/dqn5eqmwt/image/upload/v1492759791/dragon_baby_2_in2kqz.png";
    }
    else{
        document.getElementById('kid2-img').src=data.link[1];
    }
    document.getElementById('kid2-img').alt=data.name[1];
    document.getElementById('kid2-name').innerHTML=data.name[1];
    $(".img-circle:eq(0)").hover(function(){
      $(this).css("border", "5px white solid");
      }, function(){
      $(this).css("border", "5px #c43396 solid");
    });
    $(".img-circle:eq(1)").hover(function(){
      $(this).css("border", "5px white solid");
      }, function(){
      $(this).css("border", "5px #c43396 solid");
    });
  }
  else if(numberOfKids==3){
    if(data.link[0]==null){
      document.getElementById('kid1-img').src="https://res.cloudinary.com/dqn5eqmwt/image/upload/v1492759791/dragon_baby_2_in2kqz.png";
    }
    else{
        document.getElementById('kid1-img').src=data.link[0];
    }
    document.getElementById('kid1-img').alt=data.name[0];
    document.getElementById('kid1-name').innerHTML=data.name[0];
    if(data.link[1]==null){
      document.getElementById('kid2-img').src="https://res.cloudinary.com/dqn5eqmwt/image/upload/v1492759791/dragon_baby_2_in2kqz.png";
    }
    else{
        document.getElementById('kid2-img').src=data.link[1];
    }
    document.getElementById('kid2-img').alt=data.name[1];
    document.getElementById('kid2-name').innerHTML=data.name[1];
    if(data.link[2]==null){
      document.getElementById('kid3-img').src="https://res.cloudinary.com/dqn5eqmwt/image/upload/v1492759791/dragon_baby_2_in2kqz.png";
    }
    else{
        document.getElementById('kid3-img').src=data.link[2];
    }
    document.getElementById('kid3-img').alt=data.name[2];
    document.getElementById('kid3-name').innerHTML=data.name[2];
    $(".img-circle:eq(0)").hover(function(){
      $(this).css("border", "5px white solid");
      }, function(){
      $(this).css("border", "5px #c43396 solid");
    });
    $(".img-circle:eq(1)").hover(function(){
      $(this).css("border", "5px white solid");
      }, function(){
      $(this).css("border", "5px #c43396 solid");
    });
    $(".img-circle:eq(2)").hover(function(){
      $(this).css("border", "5px white solid");
      }, function(){
      $(this).css("border", "5px #c43396 solid");
    });
  }
  else if(numberOfKids==4){
    if(data.link[0]==null){
      document.getElementById('kid1-img').src="https://res.cloudinary.com/dqn5eqmwt/image/upload/v1492759791/dragon_baby_2_in2kqz.png";
    }
    else{
        document.getElementById('kid1-img').src=data.link[0];
    }
    document.getElementById('kid1-img').alt=data.name[0];
    document.getElementById('kid1-name').innerHTML=data.name[0];
    if(data.link[1]==null){
      document.getElementById('kid2-img').src="https://res.cloudinary.com/dqn5eqmwt/image/upload/v1492759791/dragon_baby_2_in2kqz.png";
    }
    else{
        document.getElementById('kid2-img').src=data.link[1];
    }
    document.getElementById('kid2-img').alt=data.name[1];
    document.getElementById('kid2-name').innerHTML=data.name[1];
    if(data.link[2]==null){
      document.getElementById('kid3-img').src="https://res.cloudinary.com/dqn5eqmwt/image/upload/v1492759791/dragon_baby_2_in2kqz.png";
    }
    else{
        document.getElementById('kid3-img').src=data.link[2];
    }
    document.getElementById('kid3-img').alt=data.name[2];
    document.getElementById('kid3-name').innerHTML=data.name[2];
    if(data.link[3]==null){
      document.getElementById('kid4-img').src="https://res.cloudinary.com/dqn5eqmwt/image/upload/v1492759791/dragon_baby_2_in2kqz.png";
    }
    else{
        document.getElementById('kid4-img').src=data.link[3];
    }
    document.getElementById('kid4-img').alt=data.name[3];
    document.getElementById('kid4-name').innerHTML=data.name[3];
    $(".img-circle").hover(function(){
      $(this).css("border", "5px white solid");
      }, function(){
      $(this).css("border", "5px #c43396 solid");
    });
  }
}


//function to execute on click of parent image
$(function(){
  $('#parents-img').on('click', function(){
    var parentEmail=localStorage.getItem('login-email');
    window.location.href=`/history.htm/${parentEmail}`;
  })
});

//function to execute on click of child image
$(function(){
  $('.img-circle').on('click', function(){
    var email=localStorage.getItem('login-email');
    var kidName =$(this).attr("alt");
    if(kidName!=null){
      localStorage.setItem('kid-name',kidName);
      $.ajax({
        url: '/kidAge.htm',
        type: 'POST',
        data: {
          email: email,
          fname: kidName
        },
        dataType: 'json',
        success: function(data) {
          window.location.href=data.redirect;
        }
      })
    }
  })
});
