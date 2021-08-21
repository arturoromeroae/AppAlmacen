$(document).ready(function () {
    if (localStorage.getItem('userId') == "" || localStorage.getItem('userId') == null) {
        window.location.replace("http://app-motos.herokuapp.com/");
    }
});