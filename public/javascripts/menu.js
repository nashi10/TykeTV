
//on click of link get delete account page by passing location storage email
//'/delete.htm/:loginEmail'
$("button").click(function(){
    $.get("demo_test.asp", function(data, status){
        alert("Data: " + data + "\nStatus: " + status);
    });
});
