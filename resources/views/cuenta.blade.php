@extends('layouts.navbar')

@section('content')
<div class="alert-user"></div>

<section class="container acount-container">
    <br />
	<br />
    <!-- titulo -->
    <h1 class="h3 text-center mt-3">Mi Cuenta</h1>
    <div class="card">
        <div class="card-body">
            <div class="text-center">
                <i class="material-icons" style="font-size:80px">account_circle</i>
                <h1 id="acount_name" class="h3"></h1>
                <h1 id="acount_username" class="h5"></h1>
            </div>
            <div class="inputs-container row mt-5" style="display: none;">
                <form>
                    <div class="mb-4">
                        <input type="text" class="user form-control" placeholder="Nombre y Apellido" aria-label="Nombre y Apellido" required>
                    </div>
                    <div class="mb-4">
                        <input type="password" class="npass form-control" placeholder="Nueva Contraseña" aria-label="Contraseña" required>
                    </div>
                    <div class="mb-4">
                        <input type="password" class="rnpass form-control" placeholder="Repetir Nueva Contraseña" aria-label="Repetir Contraseña" required>
                    </div>
                    <div class="mb-4">
                        <button type="submit" class="update btn btn-success">Actualizar</button>
                    </div>
                </form>
            </div>
            <div class="col-12 mt-5 text-center">
                <button  id="show_inputs" type="button" class="btn btn-primary">
                    Modificar Usuario 
                    <i class="down material-icons" style="font-size:15px; margin-top:5px;">arrow_downward</i>
                    <i class="up material-icons" style="font-size:15px; margin-top:5px; display:none;">arrow_upward</i>
                </button>
                <button  id="delete_user" type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Eliminar Usuario
                    <i class="material-icons" style="font-size:15px; margin-top:5px;">highlight_off</i>
                </button>
                <button  id="user_list" type="button" class="btn btn-info d-none" data-bs-toggle="modal" data-bs-target="#usersModal">
                    Lista de Usuarios
                    <i class="material-icons" style="font-size:15px; margin-top:5px;">supervisor_account</i>
                </button>
            </div>
        </div>
    </div>
</section>

<!-- Modal Eliminar Mi Usuario -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Eliminar Usuario</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body text-center">
        <input id="deleteUsername" value="" type="text" hidden>
        <input id="deleteIdent" value="" type="text" hidden>
        ¿Esta seguro que desea eliminar el usuario <span class="user-del"></span>?
      </div>
      <div class="modal-footer" style="justify-content: center;">
        <button id="acceptDelete" type="button" class="btn btn-primary">Aceptar</button>
        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
      </div>
    </div>
  </div>
</div>

<!-- Modal Usuarios -->
<div class="modal fade" id="usersModal" tabindex="-1" aria-labelledby="usersModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="usersModalLabel">Lista de Usuarios</h5>
        <button type="button" class="btn-close restart" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body text-center">
        <div id="loader" class="loader mt-3" ></div>
        <table id="table-users" class="table">
            <thead>
                <tr>
                    <th scope="col">Usuarios</th>
                    <th scope="col">Eliminar</th>
                </tr>
            </thead>
            <tbody id="tb-body">
                
            </tbody>
        </table>
      </div>
    </div>
  </div>
</div>

<!-- Modal Eliminar -->
<div class="modal fade" id="tableModal" tabindex="-1" aria-labelledby="tableModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-sm">
    <div class="modal-content">
      <div class="modal-header bg-danger text-white">
        <h5 class="modal-title" id="tableModalLabel">Eliminar Usuario</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body text-center">
        <input id="dUs" type="text" hidden>
        <input id="dId" type="text" hidden>
        ¿Esta seguro que desea eliminar el usuario <span class="user-del-table"></span>?
      </div>
      <div class="modal-footer" style="justify-content: center;">
        <button id="acceptDeleteTable" type="button" class="btn btn-primary" data-bs-dismiss="modal">Aceptar</button>
        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
      </div>
    </div>
  </div>
</div>

<!-- jQuery -->
<script src="https://code.jquery.com/jquery-3.5.1.js" integrity="sha256-QWo7LDvxbWT2tbbQ97B53yJnYU3WhH/C8ycbRAkjPDc=" crossorigin="anonymous"></script>

<!-- script local -->
<script type="text/javascript" src="{{ url('js/acount.js') }}"></script>

@endsection
