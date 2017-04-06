

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

