window.onscroll = function() {myFunction()};

var navbar = document.getElementById("navbar");
var sticky = navbar.offsetTop;


function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky");
    navbar.style.background = "#000000";
  } else {
    navbar.classList.remove("sticky");
    navbar.style.background = "transparent";
  }
}
