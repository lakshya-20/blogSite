var  top_button = document.getElementById('upBtn');
window.onscroll = function(){
    if (window.pageYOffset >600) {
        top_button.style.display="block";
    }
    else{
        top_button.style.display="none";
    }
}