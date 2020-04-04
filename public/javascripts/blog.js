var modal;
var btn;
var span;
function myFunction(title){
  modal = document.getElementById(title);
  btn = document.getElementById("myBtn");
  span = document.getElementsByClassName("close")[0];
  title = document.getElementsByClassName("blog-title");
    
  modal.style.display = "block";
  
}
function myFunction2() {
  modal.style.display = "none";
}
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}