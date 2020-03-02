window.onscroll = function() {myFunction()};

var navbar = document.getElementById("navbar");
var sticky = navbar.offsetTop;


window.onscroll=function(){
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky");
    navbar.style.background = "#000000";
  } else {
    navbar.classList.add("sticky");
    navbar.style.background = "transparent";
  }
}
