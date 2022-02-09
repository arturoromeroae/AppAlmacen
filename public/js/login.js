// limpiar local storage
$(document).ready(function () {
    localStorage.clear()
    
    window.addEventListener('beforeunload', function (e) {
        e.preventDefault();
        e.returnValue = 'Yes';
        alert('Link Clicked');
        if (confirm('Are you sure you want to save this thing into the database?')) {
            // Save it!
            console.log('Thing was saved to the database.');
        } else {
            // Do nothing!
            console.log('Thing was not saved to the database.');
        }
    });
});

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
            localStorage.setItem('userId', data.idPerfil);
            localStorage.setItem('userName', data.nombres);
            localStorage.setItem('userProfile', data.perfil);
        },
        error: function() {
            window.scrollTo(0, 0);
            $('#errorLogin').html('<div class="alert alert-danger d-flex align-items-center alert-dismissible fade show" role="alert"><svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg><div><strong>Usuario</strong> o <strong>Contraseña</strong> incorrecta/o</div><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>');
        }
    });
});
