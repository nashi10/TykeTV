//function to check if user is signed in, if not: reroute to index.htm
$(function() {
  var url = window.location.pathname;
  var filename = url.substring(url.lastIndexOf('/') + 1);
  if (localStorage.login == "false" && (filename != 'login.htm' || filename != 'signup.htm'))
    window.location.href = "/index.htm";
});

/*
--AJAX call to delete child on click of child's respective image
--if last kid is to be deleted, redirect to function deleteParent() to delete entire account
*/
$(function() {
  $('.img-circle').on('click', deleteKid);
});
var deleteKid = function() {
  console.log("Entering function");
  var count = $("ul .childInfo").length;
  var result = false,
    result1 = false;
  if (count == 1) {
    result1 = confirm("If you delete the last child, the entire account will be delted. Are you sure?");
  } else {
    result = confirm("Are you sure?");
  }
  if (result1 == true) {
    deleteParent();
  } else {
    if (result == true) {
      var kidName = $(this).attr("alt");
      var parentEmail = localStorage.getItem('login-email');
      $.ajax({
        url: '/deletekid.htm',
        type: 'POST',
        data: {
          email: parentEmail,
          fname: kidName
        },
        dataType: 'json',
        success: function(data) {
          if (data) {
            console.log("kidName: " + kidName);
            alert("kid deleted");
            window.location.href = `/delete.htm/${parentEmail}`;
          }
        }
      });
    } else {
      return false;
    }
  }
};

//AJAX POST call to delete entire account along with any kids accounts left
$(function() {
  $('#delete-accountButton').on('click', deleteParent);
});
var deleteParent = function() {
  //alert("inside delete parent function");
  result = confirm("All kid accounts will be deleted as well. Do you want to continue?");
  if (result == true) {
    var parentEmail = localStorage.getItem('login-email');
    $.ajax({
      url: '/deleteAccount.htm',
      type: 'POST',
      data: {
        email: parentEmail
      },
      dataType: 'json',
      success: function(data) {
        if (data.result) {
          window.location.href = data.redirect;
          localStorage.removeItem('login-email');
          localStorage.setItem('login', 'false');
        }
      }
    });
  } else {
    return false;
  }
};
