

window.onload = pre_loader;

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


//document.getElementById('one').style.opacity=0;

}


function showChildrenInfo() {

		var display = document.getElementById('NumChildren').value;

	if (document.getElementById('NumChildren').value == "1")
	{
		pre_loader();
		document.getElementById('childInfoHeader').style.display='table-row';
		document.getElementById('one').style.display='table-row';
		document.getElementById('two').style.display='table-row';
		document.getElementById('three').style.display='table-row';
		document.getElementById('four').style.display='table-row';

	}
	else if (document.getElementById('NumChildren').value == "2")
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
	else if (document.getElementById('NumChildren').value == "3")
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

	else if(document.getElementById('NumChildren').value == "4")
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


}


//Cloudinary image uploads
var inputimage=[];
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

//Ajax POST call to db from signup page
$(function() {
  $('#signup-button').on('click', addUser);
});
var addUser = function() {
  console.log("enetrign addUser function");
  var childfname=[];
  var childlname=[];
  var childage=[];
  //var inputimage=[];
  var email = $('#txtaccemail').val();
  var pwd = $('#txtaccpassword').val();
  var fname = $('#txtaccfname').val();
  var lname = $('#txtacclname').val();
  var numberOfKids= $('#NumChildren').val();
  for(var i=0;i<numberOfKids;i++){
    var j=i+1;
     childfname[i] = $('#txtchildfname'+j).val();
     childlname[i] = $('#txtchildlname'+j).val();
     childage[i] = $('#txtchildage'+j).val();
     //inputimage[i] = $('#inputimage'+j).val();
  }
  console.log(inputimage[0]);
  $.ajax({
    url: '/signup.htm',
    type: 'POST',
    data: {
      email:email,
      pwd:pwd,
      fname:fname,
      lname:lname,
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
};
