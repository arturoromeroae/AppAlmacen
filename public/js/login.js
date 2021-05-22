
// obtener usuarios por ajax
$('#loginButton').click(function (e) { 
    e.preventDefault();
    $.ajax({
        type:"GET",
        datatype: "json",
        url: `http://appdemo1.solarc.pe/api/Account/Login?UserName=${$('#inputUsername').val()}&UserPass=${$('#inputPassword').val()}`,
        success: function(data){
            window.location.href = "/inicio";
            localStorage.setItem('user', data.userName);
        },
        error: function() {
            $('#errorLogin').html('<div class="alert alert-danger d-flex align-items-center alert-dismissible fade show" role="alert"><svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg><div><strong>Usuario</strong> o <strong>Contraseña</strong> incorrecta/o</div><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>');
        }
    });
});
