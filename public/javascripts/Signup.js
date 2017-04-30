//on page load, hide all child input boxes
window.onload = pre_loader;

function pre_loader() {
  document.getElementById('childInfoHeader').style.display = 'none';
  document.getElementById('child2InfoHeader').style.display = 'none';
  document.getElementById('child3InfoHeader').style.display = 'none';
  document.getElementById('child4InfoHeader').style.display = 'none';
  document.getElementById('one').style.display = 'none';
  document.getElementById('two').style.display = 'none';
  document.getElementById('three').style.display = 'none';
  document.getElementById('four').style.display = 'none';
  document.getElementById('five').style.display = 'none';
  document.getElementById('six').style.display = 'none';
  document.getElementById('seven').style.display = 'none';
  document.getElementById('eight').style.display = 'none';
  document.getElementById('nine').style.display = 'none';
  document.getElementById('ten').style.display = 'none';
  document.getElementById('eleven').style.display = 'none';
  document.getElementById('twelve').style.display = 'none';
  document.getElementById('thirteen').style.display = 'none';
  document.getElementById('fourteen').style.display = 'none';
  document.getElementById('fifteen').style.display = 'none';
  document.getElementById('sixteen').style.display = 'none';
}

//function to redirect to login page on click of cancel button
$(function() {
  $("#btnCancel").on('click', function() {
    window.location.href = "/index.htm";
  })
})

//Show and hide placeholders on window resize
$(window).on('resize', function(event) {
  if ($(window).width() < 739) {
    labels = document.getElementsByClassName('label')
    for (var i = 0; i < labels.length; i++) {
      labels[i].style.display = 'none';
    }
    $('#txtaccfname').attr('placeholder', 'First Name');
    $('#txtacclname').attr('placeholder', 'Last Name');
    $('#txtaccemail').attr('placeholder', 'Email');
    $('#txtaccpassword').attr('placeholder', 'Password');
    $('#txtchildfname1').attr('placeholder', 'First Name');
    $('#txtchildlname1').attr('placeholder', 'Last Name');
    $('#txtchildage1').attr('placeholder', 'Age');
    $('#txtchildfname2').attr('placeholder', 'First Name');
    $('#txtchildlname2').attr('placeholder', 'Last Name');
    $('#txtchildage2').attr('placeholder', 'Age');
    $('#txtchildfname3').attr('placeholder', 'First Name');
    $('#txtchildlname3').attr('placeholder', 'Last Name');
    $('#txtchildage3').attr('placeholder', 'Age');
    $('#txtchildfname4').attr('placeholder', 'First Name');
    $('#txtchildlname4').attr('placeholder', 'Last Name');
    $('#txtchildage4').attr('placeholder', 'Age');
  } else {
    labels = document.getElementsByClassName('label')
    for (var i = 0; i < labels.length; i++) {
      labels[i].style.display = 'table-cell';
    }
    $('#txtaccfname').attr('placeholder', '');
    $('#txtacclname').attr('placeholder', '');
    $('#txtaccemail').attr('placeholder', '');
    $('#txtaccpassword').attr('placeholder', '');
    $('#txtchildfname1').attr('placeholder', '');
    $('#txtchildlname1').attr('placeholder', '');
    $('#txtchildage1').attr('placeholder', '');
    $('#txtchildfname2').attr('placeholder', '');
    $('#txtchildlname2').attr('placeholder', '');
    $('#txtchildage2').attr('placeholder', '');
    $('#txtchildfname3').attr('placeholder', '');
    $('#txtchildlname3').attr('placeholder', '');
    $('#txtchildage3').attr('placeholder', '');
    $('#txtchildfname4').attr('placeholder', '');
    $('#txtchildlname4').attr('placeholder', '');
    $('#txtchildage4').attr('placeholder', '');
  }
});

//Show and hide placeholders when windiw size is amller than 739
$(function(){
  if ($(window).width() < 739) {
    labels = document.getElementsByClassName('label')
    for (var i = 0; i < labels.length; i++) {
      labels[i].style.display = 'none';
    }
    $('#txtaccfname').attr('placeholder', 'First Name');
    $('#txtacclname').attr('placeholder', 'Last Name');
    $('#txtaccemail').attr('placeholder', 'Email');
    $('#txtaccpassword').attr('placeholder', 'Password');
    $('#txtchildfname1').attr('placeholder', 'First Name');
    $('#txtchildlname1').attr('placeholder', 'Last Name');
    $('#txtchildage1').attr('placeholder', 'Age');
    $('#txtchildfname2').attr('placeholder', 'First Name');
    $('#txtchildlname2').attr('placeholder', 'Last Name');
    $('#txtchildage2').attr('placeholder', 'Age');
    $('#txtchildfname3').attr('placeholder', 'First Name');
    $('#txtchildlname3').attr('placeholder', 'Last Name');
    $('#txtchildage3').attr('placeholder', 'Age');
    $('#txtchildfname4').attr('placeholder', 'First Name');
    $('#txtchildlname4').attr('placeholder', 'Last Name');
    $('#txtchildage4').attr('placeholder', 'Age');
  } else {
    labels = document.getElementsByClassName('label')
    for (var i = 0; i < labels.length; i++) {
      labels[i].style.display = 'table-cell';
    }
    $('#txtaccfname').attr('placeholder', '');
    $('#txtacclname').attr('placeholder', '');
    $('#txtaccemail').attr('placeholder', '');
    $('#txtaccpassword').attr('placeholder', '');
    $('#txtchildfname1').attr('placeholder', '');
    $('#txtchildlname1').attr('placeholder', '');
    $('#txtchildage1').attr('placeholder', '');
    $('#txtchildfname2').attr('placeholder', '');
    $('#txtchildlname2').attr('placeholder', '');
    $('#txtchildage2').attr('placeholder', '');
    $('#txtchildfname3').attr('placeholder', '');
    $('#txtchildlname3').attr('placeholder', '');
    $('#txtchildage3').attr('placeholder', '');
    $('#txtchildfname4').attr('placeholder', '');
    $('#txtchildlname4').attr('placeholder', '');
    $('#txtchildage4').attr('placeholder', '');
  }
});



//show and hide child text boxes based on drop down selection
function showChildrenInfo() {
  var display = document.getElementById('NumChildren').value;
  if (document.getElementById('NumChildren').value == "1") {
    pre_loader();
    document.getElementById('childInfoHeader').style.display = 'table-row';
    document.getElementById('one').style.display = 'table-row';
    document.getElementById('two').style.display = 'table-row';
    document.getElementById('three').style.display = 'table-row';
    document.getElementById('four').style.display = 'table-row';
  } else if (document.getElementById('NumChildren').value == "2") {
    pre_loader();
    document.getElementById('childInfoHeader').style.display = 'table-row';
    document.getElementById('one').style.display = 'table-row';
    document.getElementById('two').style.display = 'table-row';
    document.getElementById('three').style.display = 'table-row';
    document.getElementById('four').style.display = 'table-row';
    document.getElementById('five').style.display = 'table-row';
    document.getElementById('six').style.display = 'table-row';
    document.getElementById('seven').style.display = 'table-row';
    document.getElementById('eight').style.display = 'table-row';
    document.getElementById('child2InfoHeader').style.display = 'table-row';
  } else if (document.getElementById('NumChildren').value == "3") {
    pre_loader();
    document.getElementById('childInfoHeader').style.display = 'table-row';
    document.getElementById('one').style.display = 'table-row';
    document.getElementById('two').style.display = 'table-row';
    document.getElementById('three').style.display = 'table-row';
    document.getElementById('four').style.display = 'table-row';
    document.getElementById('five').style.display = 'table-row';
    document.getElementById('six').style.display = 'table-row';
    document.getElementById('seven').style.display = 'table-row';
    document.getElementById('eight').style.display = 'table-row';
    document.getElementById('child2InfoHeader').style.display = 'table-row';
    document.getElementById('child3InfoHeader').style.display = 'table-row';
    document.getElementById('nine').style.display = 'table-row';
    document.getElementById('ten').style.display = 'table-row';
    document.getElementById('eleven').style.display = 'table-row';
    document.getElementById('twelve').style.display = 'table-row';
  } else if (document.getElementById('NumChildren').value == "4") {
    pre_loader();
    document.getElementById('childInfoHeader').style.display = 'table-row';
    document.getElementById('one').style.display = 'table-row';
    document.getElementById('two').style.display = 'table-row';
    document.getElementById('three').style.display = 'table-row';
    document.getElementById('four').style.display = 'table-row';
    document.getElementById('five').style.display = 'table-row';
    document.getElementById('six').style.display = 'table-row';
    document.getElementById('seven').style.display = 'table-row';
    document.getElementById('eight').style.display = 'table-row';
    document.getElementById('child2InfoHeader').style.display = 'table-row';
    document.getElementById('child3InfoHeader').style.display = 'table-row';
    document.getElementById('nine').style.display = 'table-row';
    document.getElementById('ten').style.display = 'table-row';
    document.getElementById('eleven').style.display = 'table-row';
    document.getElementById('twelve').style.display = 'table-row';
    document.getElementById('child4InfoHeader').style.display = 'table-row';
    document.getElementById('thirteen').style.display = 'table-row';
    document.getElementById('fourteen').style.display = 'table-row';
    document.getElementById('fifteen').style.display = 'table-row';
    document.getElementById('sixteen').style.display = 'table-row';
  }
}

//Upload the images to Cloudinary and store their URLs in inputimage array
var inputimage = [];
$(function() {
  $('#inputimage1').append($.cloudinary.unsigned_upload_tag("ptpupbzx", {
    cloud_name: 'dqn5eqmwt'
  }));

  $('#inputimage1').bind('cloudinarydone', function(e, data) {
    inputimage[0] = data.result.url;
  });

  $('#inputimage2').append($.cloudinary.unsigned_upload_tag("ptpupbzx", {
    cloud_name: 'dqn5eqmwt'
  }));

  $('#inputimage2').bind('cloudinarydone', function(e, data) {
    inputimage[1] = data.result.url;
  });

  $('#inputimage3').append($.cloudinary.unsigned_upload_tag("ptpupbzx", {
    cloud_name: 'dqn5eqmwt'
  }));

  $('#inputimage3').bind('cloudinarydone', function(e, data) {
    inputimage[2] = data.result.url;
  });

  $('#inputimage4').append($.cloudinary.unsigned_upload_tag("ptpupbzx", {
    cloud_name: 'dqn5eqmwt'
  }));

  $('#inputimage4').bind('cloudinarydone', function(e, data) {
    inputimage[3] = data.result.url;
  });
});

//Validation: checking for email validity
$(function() {
  $("#txtaccemail").change(function() {
    console.log("change action function 1");
    // Check input( $( this ).val() ) for validity here
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var result = re.test($("#txtaccemail").val());
    if (!result) {
      alert("Email does not appear to be valid. Please re-check before submission");
    }
  });
});

// Validation: checking if email already exists in db
$(function() {
  $(document.body).on('change', '#txtaccemail', function() {
    console.log("change action function 2");
    var email = $('#txtaccemail').val();
    $.ajax({
      url: '/signup-email.htm',
      type: 'POST',
      data: {
        email: email
      },
      dataType: 'json',
      success: function(data) {
        if (data) {
          alert("Email aready exists. Please enter a different email");
        }
      }
    })
  });
});

/*
--AJAX POST call to db from signup page
--insert all fields on click of create
--Validation: no empty cells, no repeated fnames, at least one kid
*/
$(function() {
  $('#signup-button').on('click', addUser);
});
var addUser = function() {
  console.log("entering addUser function");
  var email = $('#txtaccemail').val();
  var numberOfKids = $('#NumChildren').val();
  $.ajax({
    url: '/signup-email.htm',
    type: 'POST',
    data: {
      email: email
    },
    dataType: 'json',
    success: function(data) {
      if (data) {
        alert("Email aready exists. Please enter a different email");
      } else {
        var childfname = [];
        var childlname = [];
        var childage = [];
        var pwd = $('#txtaccpassword').val();
        var fname = $('#txtaccfname').val();
        var lname = $('#txtacclname').val();
        for (var i = 0; i < numberOfKids; i++) {
          var j = i + 1;
          childfname[i] = $('#txtchildfname' + j).val();
          childlname[i] = $('#txtchildlname' + j).val();
          childage[i] = $('#txtchildage' + j).val();
        }
        var conditionAdd = true;
        var fnameAdd = false;
        for (var i = 1; i < numberOfKids; i++) {
          conditionAdd = conditionAdd && childfname[i] && childage[i];
          fnameAdd = fnameAdd || (childfname[i] == childfname[i - 1]);
        }
        var condition = email && pwd && fname && lname && childfname[0] && childage[0] && conditionAdd;
        console.log("condition:" + condition);
        console.log("conditionAdd:" + conditionAdd);
        console.log("fnameAdd:" + fnameAdd);
        if (!fnameAdd) {
          if (condition) {
            $.ajax({
              url: '/signup.htm',
              type: 'POST',
              data: {
                email: email,
                pwd: pwd,
                fname: fname,
                lname: lname,
                numberOfKids: numberOfKids,
                childfname: JSON.stringify(childfname),
                childlname: JSON.stringify(childlname),
                childage: JSON.stringify(childage),
                inputimage: JSON.stringify(inputimage)
              },
              dataType: 'json',
              success: function(data) {
                console.log("success -return to ajax");
                window.location.href = data.redirect;
              }
            });
          } else {
            if (numberOfKids == null) {
              alert("Enter at least one kid's details");
              return false;
            } else {
              alert("Email, password, your name and kids' first names and ages are mandatory");
              return false;
            }
          }
        } else {
          alert("First names of kids need to be different");
          return false;
        }
      }
    }
  });
};
