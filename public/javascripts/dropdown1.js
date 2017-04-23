
//JS for logout popup functionality
function cancellogout() {
    document.getElementById('popup3').style.display ='none';
 }


     /* Javascript for dropdown functionality
When the user clicks on the button,
toggle between hiding and showing the dropdown content */
$(function(){
  $('#menu_img').on('click',function() {
      document.getElementById("myDropdown").style="display:block";
  })
});

  // Close the dropdown if the user clicks outside of it
$(function(){
  window.onclick = function(event) {
    if (!event.target.matches('#menu_img')) {

      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.style="display:block") {
          openDropdown.style="display:none";
        }
      }
    }
  }

});


$(function(){
  $('#Edprof').click(function(){
      window.location.href="/editaccount.htm";
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
