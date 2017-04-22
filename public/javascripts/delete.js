//Ajax POST call to db from delete page- remove kid account
$(function(){
  var url = window.location.pathname;
  var filename = url.substring(url.lastIndexOf('/')+1);
  if(localStorage.login=="false" && (filename != 'login.htm' || filename != 'signup.htm'))
    window.location.href = "/index.htm";
}) ;

$(function() {
  $('.img-circle').on('click', deleteKid);
});
var deleteKid = function() {
  console.log("Entering function");
  var count = $("ul .childInfo").length;
  var result=false, result1=false;
  if(count==1){
    /*swal({
    title: "Are you sure?",
    text: "If you delete the last child, the entire account will be deleted",
    type: "warning",
    showCancelButton: true,
    confirmButtonColor: "#DD6B55",
    confirmButtonText: "Yes, delete it!",
    closeOnConfirm: false
    },
    function(){
      result1=true;
    });
    //*/result1= confirm("If you delete the last child, the entire account will be delted. Are you sure?");
  }
  else {
    result= confirm("Are you sure?");
    /*swal({
    title: "Are you sure?",
    type: "warning",
    showCancelButton: true,
    confirmButtonColor: "#DD6B55",
    confirmButtonText: "Yes, delete it!",
    closeOnConfirm: false*
    },
    function(){
      result=true;
    });*/
  }
  if(result1==true){
    deleteParent();
  }
  else {
    if (result == true) {
    var kidName =$(this).attr("alt");
    var parentEmail=localStorage.getItem('login-email');
    $.ajax({
      url: '/deletekid.htm',
      type: 'POST',
      data: {
        email: parentEmail,
        fname: kidName
      },
      dataType: 'json',
      success: function(data) {
        if(data){
        console.log("kidName: "+ kidName);
        alert("kid deleted");
        window.location.href = `/delete.htm/${parentEmail}`;
        //display message to say kid has been deleted that fades out after some time
        }
      }
    });
  }
  else {
    return false;
  }
}
};

//AJAX POST call to delete entire account
$(function() {
  $('#delete-accountButton').on('click', deleteParent);
});
var deleteParent = function() {
  //alert("inside delete parent function");
  result= confirm("All kid accounts will be deleted as well. Do you want to continue?");
  if(result==true)
  {
    var parentEmail=localStorage.getItem('login-email');
    $.ajax({
      url: '/deleteAccount.htm',
      type: 'POST',
      data: {
        email: parentEmail
      },
      dataType: 'json',
      success: function(data) {
        if(data.result){
          window.location.href = data.redirect;
          localStorage.removeItem('login-email');
          localStorage.setItem('login','false');
        }
      }
    });
  }
  else {
    return false;
  }
};
