var modal;
var btn;
var span;
function myFunction(title){
  modal = document.getElementById(title);
  btn = document.getElementById("myBtn");
  span = document.getElementsByClassName("close")[0];
  title = document.getElementsByClassName("blog-title");
  // When the user clicks the button, open the modal 
    
  modal.style.display = "block";
  
  // When the user clicks on <span> (x), close the modal
  
  
  // When the user clicks anywhere outside of the modal, close it
  
}
function myFunction2() {
  modal.style.display = "none";
}
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}