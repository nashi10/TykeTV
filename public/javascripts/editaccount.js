$(function(){
  var url = window.location.pathname;
  var filename = url.substring(url.lastIndexOf('/')+1);
  if(localStorage.login=="false" && (filename != 'login.htm' || filename != 'signup.htm'))
    window.location.href = "/index.htm";
}) ;

$(function(){
  $("#btnCancel").on('click',function(){
    window.location.href="/selectaccount.htm";
  })
});

//Show and hide placeholders on window resize
$(window).on('resize', function(event){
	if ( $(window).width() < 739) {
		labels=document.getElementsByClassName('label')
		for (var i = 0; i < labels.length; i ++) {
			labels[i].style.display='none';
		}
		 $('#txtaccfname').attr('placeholder','First Name');
		 $('#txtacclname').attr('placeholder','Last Name');
		 $('#txtaccemail').attr('placeholder','Email');
		 $('#txtaccpassword').attr('placeholder','Password');
		 $('#txtchildfname1').attr('placeholder','First Name');
		 $('#txtchildlname1').attr('placeholder','Last Name');
		 $('#txtchildage1').attr('placeholder','Age');
		 $('#txtchildfname2').attr('placeholder','First Name');
		 $('#txtchildlname2').attr('placeholder','Last Name');
		 $('#txtchildage2').attr('placeholder','Age');
		 $('#txtchildfname3').attr('placeholder','First Name');
		 $('#txtchildlname3').attr('placeholder','Last Name');
		 $('#txtchildage3').attr('placeholder','Age');
		 $('#txtchildfname4').attr('placeholder','First Name');
		 $('#txtchildlname4').attr('placeholder','Last Name');
		 $('#txtchildage4').attr('placeholder','Age');
	}
	else{
		labels=document.getElementsByClassName('label')
		for (var i = 0; i < labels.length; i ++) {
			labels[i].style.display='table-cell';
		}
		 $('#txtaccfname').attr('placeholder','');
		 $('#txtacclname').attr('placeholder','');
		 $('#txtaccemail').attr('placeholder','');
		 $('#txtaccpassword').attr('placeholder','');
		 $('#txtchildfname1').attr('placeholder','');
		 $('#txtchildlname1').attr('placeholder','');
		 $('#txtchildage1').attr('placeholder','');
		 $('#txtchildfname2').attr('placeholder','');
		 $('#txtchildlname2').attr('placeholder','');
		 $('#txtchildage2').attr('placeholder','');
		 $('#txtchildfname3').attr('placeholder','');
		 $('#txtchildlname3').attr('placeholder','');
		 $('#txtchildage3').attr('placeholder','');
		 $('#txtchildfname4').attr('placeholder','');
		 $('#txtchildlname4').attr('placeholder','');
		 $('#txtchildage4').attr('placeholder','');
	}
});


//hide all child info boxes on load initially
//window.onload = pre_loader;
function pre_loader() {

		document.getElementById('childInfoHeader').style.display='none';
		document.getElementById('child2InfoHeader').style.display='none';
		document.getElementById('child3InfoHeader').style.display='none';
		document.getElementById('child4InfoHeader').style.display='none';
		document.getElementById('one').style.display='none';
		document.getElementById('two').style.display='none';
		document.getElementById('three').style.display='none';
		document.getElementById('four').style.display='none';
		document.getElementById('five').style.display='none';
		document.getElementById('six').style.display='none';
		document.getElementById('seven').style.display='none';
		document.getElementById('eight').style.display='none';
		document.getElementById('nine').style.display='none';
		document.getElementById('ten').style.display='none';
		document.getElementById('eleven').style.display='none';
		document.getElementById('twelve').style.display='none';
		document.getElementById('thirteen').style.display='none';
		document.getElementById('fourteen').style.display='none';
		document.getElementById('fifteen').style.display='none';
		document.getElementById('sixteen').style.display='none';
}

var numberOfkids; //global variable to hold number of kids from db

//function to retieve data from db based on current login email
$(function(){
  var parentEmail=localStorage.getItem('login-email');
  console.log(parentEmail);
  $.ajax({
    url: '/editaccountRetrieve.htm',
    type: 'POST',
    data: {
      email: parentEmail
    },
    dataType: 'json',
    success: function(data) {
      numberOfkids=data.parent.kids;
      console.log(numberOfkids);
      displayBoxes(numberOfkids);
      insertData(data);
      inputStoreData();
    }
  })
});

//show input boxes based on number of kids data retrieved
function displayBoxes(kids){
  	if (kids==1)
  	{
  		pre_loader();
  		document.getElementById('childInfoHeader').style.display='table-row';
  		document.getElementById('one').style.display='table-row';
  		document.getElementById('two').style.display='table-row';
  		document.getElementById('three').style.display='table-row';
  		document.getElementById('four').style.display='table-row';
  	}
  	else if (kids == 2)
  	{
  		pre_loader();
  		document.getElementById('childInfoHeader').style.display='table-row';
  		document.getElementById('one').style.display='table-row';
  		document.getElementById('two').style.display='table-row';
  		document.getElementById('three').style.display='table-row';
  		document.getElementById('four').style.display='table-row';
  		document.getElementById('five').style.display='table-row';
  		document.getElementById('six').style.display='table-row';
  		document.getElementById('seven').style.display='table-row';
  		document.getElementById('eight').style.display='table-row';
  		document.getElementById('child2InfoHeader').style.display='table-row';

  	}
  	else if (kids == 3)
  	{
  		pre_loader();
  		document.getElementById('childInfoHeader').style.display='table-row';
  		document.getElementById('one').style.display='table-row';
  		document.getElementById('two').style.display='table-row';
  		document.getElementById('three').style.display='table-row';
  		document.getElementById('four').style.display='table-row';
  		document.getElementById('five').style.display='table-row';
  		document.getElementById('six').style.display='table-row';
  		document.getElementById('seven').style.display='table-row';
  		document.getElementById('eight').style.display='table-row';
  		document.getElementById('child2InfoHeader').style.display='table-row';
  		document.getElementById('child3InfoHeader').style.display='table-row';
  		document.getElementById('nine').style.display='table-row';
  		document.getElementById('ten').style.display='table-row';
  		document.getElementById('eleven').style.display='table-row';
  		document.getElementById('twelve').style.display='table-row';
   }
  	else if(kids == 4)
  	{
  		pre_loader();
  		document.getElementById('childInfoHeader').style.display='table-row';
  		document.getElementById('one').style.display='table-row';
  		document.getElementById('two').style.display='table-row';
  		document.getElementById('three').style.display='table-row';
  		document.getElementById('four').style.display='table-row';
  		document.getElementById('five').style.display='table-row';
  		document.getElementById('six').style.display='table-row';
  		document.getElementById('seven').style.display='table-row';
  		document.getElementById('eight').style.display='table-row';
  		document.getElementById('child2InfoHeader').style.display='table-row';
  		document.getElementById('child3InfoHeader').style.display='table-row';
  		document.getElementById('nine').style.display='table-row';
  		document.getElementById('ten').style.display='table-row';
  		document.getElementById('eleven').style.display='table-row';
  		document.getElementById('twelve').style.display='table-row';
  		document.getElementById('child4InfoHeader').style.display='table-row';
  		document.getElementById('thirteen').style.display='table-row';
  		document.getElementById('fourteen').style.display='table-row';
  		document.getElementById('fifteen').style.display='table-row';
  		document.getElementById('sixteen').style.display='table-row';
  	}
};

//insert data into input boxes
//insert image into edit account page within thubnail div
function insertData(data){
  var parent=data.parent;
  var kids=data.kid;
  document.getElementById('txtaccfname').value=parent.fname;
  document.getElementById('txtacclname').value=parent.lname;
  document.getElementById('txtaccemail').value=parent.email;
  document.getElementById('txtaccpassword').value=parent.pwd;
  if(parent.kids==1){
    document.getElementById('txtchildfname1').value=kids[0].fname;
    document.getElementById('txtchildlname1').value=kids[0].lname;
    document.getElementById('txtchildage1').value=kids[0].DOB;
    if(kids[0].image!=null){
        document.getElementById('thumbnail1').src=kids[0].image;
    }
    else {
       document.getElementById('thumbnail1').alt="No image";
    }
  }
  else if(parent.kids==2){
    document.getElementById('txtchildfname1').value=kids[0].fname;
    document.getElementById('txtchildlname1').value=kids[0].lname;
    document.getElementById('txtchildage1').value=kids[0].DOB;
    if(kids[0].image!=null){
        document.getElementById('thumbnail1').src=kids[0].image;
    }
    else {
       document.getElementById('thumbnail1').alt="No image";
    }
    document.getElementById('txtchildfname2').value=kids[1].fname;
    document.getElementById('txtchildlname2').value=kids[1].lname;
    document.getElementById('txtchildage2').value=kids[1].DOB;
    if(kids[1].image!=null){
        document.getElementById('thumbnail2').src=kids[1].image;
    }
    else {
       document.getElementById('thumbnail2').alt="No image";
    }
  }
  else if(parent.kids==3){
    document.getElementById('txtchildfname1').value=kids[0].fname;
    document.getElementById('txtchildlname1').value=kids[0].lname;
    document.getElementById('txtchildage1').value=kids[0].DOB;
    if(kids[0].image!=null){
        document.getElementById('thumbnail1').src=kids[0].image;
    }
    else {
       document.getElementById('thumbnail1').alt="No image";
    }
    document.getElementById('txtchildfname2').value=kids[1].fname;
    document.getElementById('txtchildlname2').value=kids[1].lname;
    document.getElementById('txtchildage2').value=kids[1].DOB;
    if(kids[1].image!=null){
        document.getElementById('thumbnail2').src=kids[1].image;
    }
    else {
       document.getElementById('thumbnail2').alt="No image";
    }
    document.getElementById('txtchildfname3').value=kids[2].fname;
    document.getElementById('txtchildlname3').value=kids[2].lname;
    document.getElementById('txtchildage3').value=kids[2].DOB;
    if(kids[2].image!=null){
        document.getElementById('thumbnail3').src=kids[2].image;
    }
    else {
       document.getElementById('thumbnail3').alt="No image";
    }
  }
  else if(parent.kids==4){
    document.getElementById('txtchildfname1').value=kids[0].fname;
    document.getElementById('txtchildlname1').value=kids[0].lname;
    document.getElementById('txtchildage1').value=kids[0].DOB;
    if(kids[0].image!=null){
        document.getElementById('thumbnail1').src=kids[0].image;
    }
    else {
       document.getElementById('thumbnail1').alt="No image";
    }
    document.getElementById('txtchildfname2').value=kids[1].fname;
    document.getElementById('txtchildlname2').value=kids[1].lname;
    document.getElementById('txtchildage2').value=kids[1].DOB;
    if(kids[1].image!=null){
        document.getElementById('thumbnail2').src=kids[1].image;
    }
    else {
       document.getElementById('thumbnail2').alt="No image";
    }
    //document.getElementById('thumbnail2').src=kids[1].image;
    document.getElementById('txtchildfname3').value=kids[2].fname;
    document.getElementById('txtchildlname3').value=kids[2].lname;
    document.getElementById('txtchildage3').value=kids[2].DOB;
    if(kids[2].image!=null){
        document.getElementById('thumbnail3').src=kids[2].image;
    }
    else {
       document.getElementById('thumbnail3').alt="No image";
    }
    document.getElementById('txtchildfname4').value=kids[3].fname;
    document.getElementById('txtchildlname4').value=kids[3].lname;
    document.getElementById('txtchildage4').value=kids[3].DOB;
    if(kids[3].image!=null){
        document.getElementById('thumbnail4').src=kids[3].image;
    }
    else {
       document.getElementById('thumbnail4').alt="No image";
    }
  }
}

var inputs;
//function to store original content :id and value
function inputStoreData(){
  console.log("inside original input storage");
    inputs = $('input[type="text"],input[type="password"]').each(function() {
    $(this).data('original', this.value);
  });
  console.log("Inputs inside store function:"+inputs);
}

//checking for email validity if input box changes
$(function() {
$("#txtaccemail").change(function() {
	console.log("change action function 1");
  // Check input( $( this ).val() ) for validity here
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  var result= re.test($("#txtaccemail").val());
  if(!result){
		alert("Email does not appear to be valid. Please re-check before submission");
    //swal("Email does not appear to be valid. Please re-check before submission");
  }
	});
});

//checking if email already exists in db
$(function() {
$(document.body).on('change','#txtaccemail', function() {
		console.log("change action function 2");
    var oldEmail=$('#txtaccemail').data('original');
    var email = $('#txtaccemail').val();
    if(oldEmail!=email){
  		$.ajax({
  			url: '/signup-email.htm',
  			type: 'POST',
  			data: {
  				email:email
  			},
  			dataType: 'json',
  			success: function(data) {
  				if(data){
  					alert("Email aready exists. Please enter a different email");
  					//swal("Email aready exists. Please enter a different email");
  				}
    	   }
	     })
    }
});
});

//function to show additional children on click of btnAddChild
$(function(){
  $("#btnAddChild").on('click',function(){
    console.log("Entering click event");
    if ( $('#five').css('display') == 'none' ){
    // element is hidden
      document.getElementById('five').style.display='table-row';
     	document.getElementById('six').style.display='table-row';
    	document.getElementById('seven').style.display='table-row';
    	document.getElementById('eight').style.display='table-row';
    	document.getElementById('child2InfoHeader').style.display='table-row';
    //  document.getElementById('thumbnail2').style.display='none';
      document.getElementById('five').focus();
    }
    else if($('#nine').css('display') == 'none'){
      document.getElementById('child3InfoHeader').style.display='table-row';
  		document.getElementById('nine').style.display='table-row';
  		document.getElementById('ten').style.display='table-row';
  		document.getElementById('eleven').style.display='table-row';
  		document.getElementById('twelve').style.display='table-row';
    //  document.getElementById('thumbnail3').style.display='none';
      document.getElementById('nine').focus();
    }
    else if($('#thirteen').css('display') == 'none'){
       document.getElementById('child4InfoHeader').style.display='table-row';
       document.getElementById('thirteen').style.display='table-row';
       document.getElementById('fourteen').style.display='table-row';
       document.getElementById('fifteen').style.display='table-row';
       document.getElementById('sixteen').style.display='table-row';
    //   document.getElementById('thumbnail4').style.display='none';
       document.getElementById('thirteen').focus();
    }
    else {
      alert("Cannot add more than four children currently. Sorry!");
    }
  });
});

//Cloudinary image uploads
var inputimage=[null,null,null,null];
$(function(){
  $('#inputimage1').append($.cloudinary.unsigned_upload_tag("ptpupbzx",
    { cloud_name: 'dqn5eqmwt' }));

    $('#inputimage1').bind('cloudinarydone', function(e, data) {
      inputimage[0]=data.result.url;
    });

    $('#inputimage2').append($.cloudinary.unsigned_upload_tag("ptpupbzx",
      { cloud_name: 'dqn5eqmwt' }));

      $('#inputimage2').bind('cloudinarydone', function(e, data) {
        inputimage[1]=data.result.url;
      });

      $('#inputimage3').append($.cloudinary.unsigned_upload_tag("ptpupbzx",
        { cloud_name: 'dqn5eqmwt' }));

        $('#inputimage3').bind('cloudinarydone', function(e, data) {
          inputimage[2]=data.result.url;
        });

        $('#inputimage4').append($.cloudinary.unsigned_upload_tag("ptpupbzx",
          { cloud_name: 'dqn5eqmwt' }));

          $('#inputimage4').bind('cloudinarydone', function(e, data) {
            inputimage[3]=data.result.url;
          });
});


//detect input boxes with changes
//update respective fields on click of edit-button
//ensure no empty cells before uploading to db
//if cloudonary uplaod returns null, make no changes in db
var postUpdates=function(){
  var oldEmail=$('#txtaccemail').data('original');
  var email = $('#txtaccemail').val();
  var childfnameOld=[];
  console.log("Old number of kids: "+numberOfkids);
  for(var i=0;i<numberOfkids;i++){
    var j=i+1;
     childfnameOld[i] = $('#txtchildfname'+j).data('original');
  }
  console.log("old email:"+ oldEmail);
  console.log("old fname:"+ childfnameOld[0]);
  var numberOfKidsNew;
  if ( $('#five').css('display') == 'none' ){
    numberOfKidsNew=1;
  }
  else if($('#nine').css('display') == 'none'){
    numberOfKidsNew=2;
  }
  else if($('#thirteen').css('display') == 'none'){
    numberOfKidsNew=3;
  }
  else if($('#thirteen').css('display') == 'table-row'){
    numberOfKidsNew=4;
  }
  console.log("New number of kids: "+numberOfKidsNew);

  var childfname=[];
  var childlname=[];
  var childage=[];
  //var inputimage=[];

  var pwd = $('#txtaccpassword').val();
  var fname = $('#txtaccfname').val();
  var lname = $('#txtacclname').val();
  //var numberOfKids= $('#NumChildren').val();
  for(var i=0;i<numberOfKidsNew;i++){
    var j=i+1;
     childfname[i] = $('#txtchildfname'+j).val();
     childlname[i] = $('#txtchildlname'+j).val();
     childage[i] = $('#txtchildage'+j).val();
     //inputimage[i] = $('#inputimage'+j).val();
  }
  var conditionAdd=true;
  var fnameAdd=false;
  for(var i=1;i<numberOfKidsNew;i++){
    conditionAdd=conditionAdd && childfname[i] && childage[i];
    fnameAdd=fnameAdd || (childfname[i]==childfname[i-1]);
  }
  var condition=email && pwd && fname && lname && childfname[0] && childage[0] && conditionAdd;
  console.log("condition:" + condition);
  console.log("conditionAdd:" + conditionAdd);
  console.log("fnameAdd:" + fnameAdd);
  if(!fnameAdd){
    if(condition){
      $.ajax({
        url: '/editaccount.htm',
        type: 'POST',
        data: {
          emailOld:oldEmail,
          childfnameOld: JSON.stringify(childfnameOld),
          numberOfkidsOld: numberOfkids,
          email:email,
          pwd:pwd,
          fname:fname,
          lname:lname,
          numberOfKids: numberOfKidsNew,
          childfname: JSON.stringify(childfname),
          childlname: JSON.stringify(childlname),
          childage: JSON.stringify(childage),
          inputimage: JSON.stringify(inputimage)
        },
        dataType: 'json',
        success: function(data) {
          console.log("success -return to ajax");
          var result=confirm("Edited account. Do you want to continue editing? ");
          //
          if(result==false)
          {
            window.location.href = data.redirect;
          }
          else {
             location.reload(true);
          }
        }
      });
    }
    else {
        alert("Email, password, your name and kids' first names and ages are mandatory");
        return false;
    }
  }
  else{
    alert("First names of kids need to be different");
    return false;
  }
};


$(function(){
  $("#edit-button").on('click',function(){
    console.log("inside button action");
      //getting original values id, value, numberofkids
      var oldEmail=$('#txtaccemail').data('original');
      var email = $('#txtaccemail').val();
      if(oldEmail!=email){
        $.ajax({
          url: '/signup-email.htm',
          type: 'POST',
          data: {
            email:email
          },
          dataType: 'json',
          success: function(data) {
            if(data){
              alert("Email aready exists. Please enter a different email");
              return(false);
              //swal("Email aready exists. Please enter a different email");
            }
            else{
              postUpdates();
            }
           }
         })
       }
       else{
         postUpdates();
      }
    });
});
