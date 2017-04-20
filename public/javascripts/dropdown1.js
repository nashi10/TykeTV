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
