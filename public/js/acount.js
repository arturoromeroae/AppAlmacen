$(document).ready(function () {
    window.localStorage.removeItem('cotizacion');
    if (localStorage.getItem('userId') == "" || localStorage.getItem('userId') == null) {
        window.location.replace("/");
    }

    const user = localStorage.getItem("user");
    const userId = localStorage.getItem("userId");
    const myUserName = localStorage.getItem("userName");
    $(".user").val(myUserName);

    document.querySelector("#acount_name").innerText = `${myUserName}`;
    document.querySelector("#acount_username").innerText = `${user}`;

    $("#show_inputs").click(function (e) { 
        e.preventDefault();
        $(".inputs-container").slideToggle("display");
        $(".down").toggle("display");
        $(".up").toggle("style");
    });

    $("#delete_user").click(function (e) { 
        e.preventDefault();
        $("#deleteIdent").attr('value', userId);
        $("#deleteUsername").attr('value', user);
        $(".user-del").html(`<strong>${user}</strong>`);
    });

    $(".update").click(function (e) {
        e.preventDefault();
        const newName = $(".user").val();
        const new_pass = $(".npass").val();
        const re_new_pass = $(".rnpass").val();

        if (new_pass != "") {
            if (new_pass == re_new_pass) {
                fetch('http://appdemo1.solarc.pe/api/Account/UsuariosActualizar', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        "userName": user,
                        "userPass": new_pass,
                        "nombres": newName,
                        "idPerfil": userId,
                        "idTienda": 1,
                        "estadoReg": 1
                    })
                })
                .then(res => res.json())
                .then(data => {
                    // enter you logic when the fetch is successful
                    window.localStorage.removeItem('user');
                    window.localStorage.removeItem('userId');
                    window.scrollTo(0, 0);

                    $(".alert-user").html(`
                        <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
                            <symbol id="check-circle-fill" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                            </symbol>
                            <symbol id="info-fill" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
                            </symbol>
                            <symbol id="exclamation-triangle-fill" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                            </symbol>
                        </svg>

                        <div class="alert alert-success alert-dismissible fade show mt-5" role="alert">
                            <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Info:"><use xlink:href="#check-circle-fill"/></svg>
                            <strong>Usuario actualizado</strong> correctamente.
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    `);

                    setTimeout(() => {
                        location.reload();
                    }, 3000);
                })
                .catch(error => {
                    // enter your logic for when there is an error (ex. error toast)
                    console.log(error);
                })
            }else{
                alert("Introduzca la contraseña correctamente");
            }
        }else{
            alert("Introduzca la nueva contraseña");
        }
    });

    $("#acceptDelete").click(function (e) { 
        e.preventDefault();
        const did = $("#deleteIdent").val();
        const dus = $("#deleteUsername").val();

        fetch('http://appdemo1.solarc.pe/api/Account/UsuariosActualizar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "userName": dus,
                "userPass": 0,
                "nombres": "string",
                "idPerfil": did,
                "idTienda": 1,
                "estadoReg": 0
            })
        })
        .then(res => res.json())
        .then(data => {
            // enter you logic when the fetch is successful
            window.localStorage.removeItem('user');
            window.localStorage.removeItem('userId');
            location.reload();
        })
        .catch(error => {
            // enter your logic for when there is an error (ex. error toast)
            console.log(error);
        })
    });

    $("#user_list").click(function (e) { 
        e.preventDefault();
        
        $.ajax({
            type: "GET",
            url: "http://appdemo1.solarc.pe/api/Account/Usuarios",
            dataType: "json",
            // antes de cargar el contenido
            beforeSend: function(){
                // muestra spinner loading
                $("#loader").show();
                // esconde el select
                $("#table-users").hide();
            },
            success: function (data) {
                for (let i = 0; i < data.length; i++) {
                    const node = document.createElement("tr");
                    const node2 = document.createElement("td");
                    const node3 = document.createElement("td");
                    const node4 = document.createElement("i")
                    const textnode = document.createTextNode(data[i].userName);
                    const textnode2 = document.createTextNode("delete_forever");
                    const tb = node.appendChild(node2);
                    const tb2 = node.appendChild(node3);
                    tb.appendChild(textnode);
                    let t = tb2.appendChild(node4);
                    t.appendChild(textnode2);
                    node4.className = "material-icons del-users";

                    document.getElementById("tb-body").appendChild(node);
                }
            },
            // despues de cargar el contenido
            complete:function(data){
                // esconde spinner loading
                $("#loader").hide();
                // muestra el select
                $("#table-users").show();
            }
        });
    });

    $(".restart").click(function (e) { 
        e.preventDefault();
        $("#tb-body").html("");
    });

    if (localStorage.getItem("user") == "JGONZALES" || localStorage.getItem("user") == "arturo") {
        $("#user_list").removeClass("d-none");
    }else{
        $("#user_list").hide();
    }
});
