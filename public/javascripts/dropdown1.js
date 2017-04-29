//var popUpResult;
//JS for logout popup functionality
function cancellogout() {
    document.getElementById('popup3').style.display ='none';
 }


/* Javascript for dropdown functionality
When the user clicks on the button,
toggle between hiding and showing the dropdown content */

$(function(){
  $('#menu_img').on('click',function() {
      //document.getElementById("myDropdown").style="display:block";
      $('#myDropdown').show();
  })
});

  // Close the dropdown if the user clicks outside of it
$(function(){
  $(window).on('click',function(event) {
    if (!(event.target.matches('#myDropdown') || event.target.matches('#menu_img') )) {
      $('#myDropdown').is(":visible"); {
          $('#myDropdown').hide();
      }
      /*var dropdowns = document.getElementsByClassName("dropdown-content");
      var j;
      for (j = 0; j < dropdowns.length; j++) {
        var openDropdown = dropdowns[j];
        if (openDropdown.style="display:block") {
          openDropdown.style="display:none";
        }
      }*/
    }
  })
});


$(function(){
  $('#Edprof').click(function(){
    /*var url = window.location.pathname;
    var filename = url.substring(url.lastIndexOf('/')+1);
    if(filename == 'games6to8.htm' ||'videos6to8.htm' || filename != 'kids6to8.htm'|| filename != 'kidsAge3to5.htm')){
        showPasswordPopup();
    }
    if(popUpResult){*/
        window.location.href="/editaccount.htm";
    /*}
    else{
      return false;
    }*/
  });
});

//on click of link get delete account page by passing location storage email
//'/delete.htm/:loginEmail'
$(function(){
  $('#Deprof').click(function(){
       var parentEmail=localStorage.getItem('login-email');
      window.location.href=`/delete.htm/${parentEmail}`;
  });
});

$(function(){
  $('#Chistory').click(function(){
       var parentEmail=localStorage.getItem('login-email');
      window.location.href=`/history.htm/${parentEmail}`;
  });
});

//Book events tab switch
$(function(){
  $('#Bevents').click(function(){
      window.location.href="/BookEventsPg1.htm";
  });
});

//logout popup
$(function(){
  $('#Getout').on('click',function(){
       document.getElementById('popup3').style.display ='block';
  });
});

//logout popup button click
$(function(){
  $('#yes-button').on('click',function(){
       window.location.href="/signedout.htm";
  });
});

/*
function showPasswordPopup(){
  document.getElementById('pwdpopup').style.display ='block';
}


function hidePasswordPopup() {
    document.getElementById("pwdpopup").style.display = "none";
    //var password = document.getElementById("pass").value;
    popUpResult=checkUser();
};

var checkUser = function(p) {
  var email = localStorage.getItem('login-email');;
  var pwd = $('#pass').val();
  if(pwd!=''){
    $.ajax({
      url: '/index.htm',
      type: 'POST',
      data: {
        email:email,
        pwd:pwd
      },
      dataType: 'json',
      success: function(data) {
        if(data.result==null)
          return(true);
        else if(data.result=="nopwd")
          return(false);
      }
    });
  }
  else{
    alert("No password entered");
  }
};*/
