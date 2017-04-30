//JS for logout popup functionality
function cancellogout() {
  document.getElementById('popup3').style.display = 'none';
}


/*
--Javascript for dropdown functionality
--When the user clicks on the image,show the dropdown content
*/
$(function() {
  $('#menu_img').on('click', function() {
    $('#myDropdown').show();
  })
});

// Close the dropdown if the user clicks outside of it
$(function() {
  $(window).on('click', function(event) {
    if (!(event.target.matches('#myDropdown') || event.target.matches('#menu_img'))) {
      $('#myDropdown').is(":visible"); {
        $('#myDropdown').hide();
      }
    }
  })
});

//on click of edit profile , redirect to that page
$(function() {
  $('#Edprof').click(function() {
    window.location.href = "/editaccount.htm";
  });
});

//on click of link get delete account page by passing location storage email
//'/delete.htm/:loginEmail'
$(function() {
  $('#Deprof').click(function() {
    var parentEmail = localStorage.getItem('login-email');
    window.location.href = `/delete.htm/${parentEmail}`;
  });
});

//on click of check history, redirect to that page
$(function() {
  $('#Chistory').click(function() {
    var parentEmail = localStorage.getItem('login-email');
    window.location.href = `/history.htm/${parentEmail}`;
  });
});

////on click of book events , redirect to that page
$(function() {
  $('#Bevents').click(function() {
    window.location.href = "/BookEventsPg1.htm";
  });
});

//on click of logout, show popup
$(function() {
  $('#Getout').on('click', function() {
    document.getElementById('popup3').style.display = 'block';
  });
});

//on click of logout popup-yes button , redirect to that page
$(function() {
  $('#yes-button').on('click', function() {
    window.location.href = "/signedout.htm";
  });
});
