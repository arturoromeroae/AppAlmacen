$(document).ready(function () {
    if (localStorage.getItem('userId') == "" || localStorage.getItem('userId') == null) {
        window.location.replace("http://app-motos.herokuapp.com/");
    }

    window.addEventListener('beforeunload', function (e) {
        e.preventDefault();
        e.returnValue = '';
        alert('Link Clicked');
    });
});