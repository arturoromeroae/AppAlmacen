$(document).ready(function () {
    $('#logoutNav').click(function () { 
        localStorage.clear()
    });
    
    if (localStorage.getItem("user") == "JGONZALES" || localStorage.getItem("user") == "arturo") {
        $("#add-users-menu").removeClass("d-none");
    }else{
        $("#add-users-menu").remove();
    }
});
