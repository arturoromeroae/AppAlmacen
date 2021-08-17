// Buscador en tabla
/*$('#table-maintance').bootstrapTable({
    locale: 'es-ES',
    pagination: false,
    search: true,
});*/

oTable = $('#table-maintance').DataTable({
  "ajax": 'http://appdemo1.solarc.pe/api/Productos/GetProductos',
  "columns": [
    {"data" : "codProd"},
    {"data" : "nombreProducto", "width": "20%", "targets": 0},
    {"data" : "descripcion"},
    {"data" : "stock"},
    {"data" : "precioBase"},
    {"data" : "precioVenta"},
    {"data" : "marca"},
    {"data" : "modelo"},
    {"data": "idProducto", render: function (idProducto) { 
        return `<a class="nav-link hover-table" href="#edit-modal-${ idProducto }" data-bs-toggle="modal" data-bs-target="#edit-modal-${ idProducto }">
                  <i class="material-icons" style="font-size:17px;">create</i>
                </a>
                <a class="nav-link hover-table" href="#delete-modal-${ idProducto }" data-bs-toggle="modal" data-bs-target="#delete-modal-${ idProducto }">
                  <i class="material-icons" style="font-size:17px;">delete</i>
                </a>
        `; 
        }
    },
    {"data": "codProd", render: function (codProd) {
      return `
              <div class="text-center">
                  <img src="http://appdemo1.solarc.pe/imagenes/${codProd}"
              </div>
          `;
      }
    }
  ],
  "autoWidth": true,
  responsive: true,
  "processing": true,
  "bInfo": true,
  "language": {
    "sProcessing": "Procesando...",
    "lengthMenu": "Mostrar _MENU_ registros por pagina",
    'sZeroRecords': 'No se encontraron resultados',
    'sEmptyTable': 'Ningún dato disponible en esta tabla',
    'sInfo': 'Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros',
    'sInfoEmpty': 'Mostrando registros del 0 al 0 de un total de 0 registros',
    'sInfoFiltered': '(filtrado de un total de _MAX_ registros)',
    'sInfoPostFix': '',
    'sSearch': 'Buscar:',
    'sUrl': '',
    'sInfoThousands': ',',
    'sLoadingRecords': 'Cargando...',
    'oPaginate': {
      'sFirst': 'Primero ',
      'sLast': 'Último ',
      'sNext': 'Siguiente ',
      'sPrevious': 'Anterior '
    }
  }
});

window.customSearchFormatter = function(value, searchText) {
    return value.toString().replace(new RegExp('(' + searchText + ')', 'gim'), '<span style="background-color: #bdd7fa;border: 1px solid blue;border-radius:90px;padding:4px">$1</span>')
}

var $table = $('#table-maintance');

$(function() {
    $('#toolbar').find('select').change(function () {
      $table.bootstrapTable('destroy').bootstrapTable({
        exportDataType: $(this).val(),
        exportTypes: ['json', 'xml', 'csv', 'txt', 'sql', 'excel', 'pdf'],
        columns: [
          {
            field: 'state',
            checkbox: true,
            visible: $(this).val() === 'selected'
          },
          {
            field: 'id',
            title: 'ID'
          }, {
            field: 'name',
            title: 'Item Name'
          }, {
            field: 'price',
            title: 'Item Price'
          }
        ]
      })
    }).trigger('change')
  })

// Peticion ajax para agregar imagenes de los productos
$.ajax({
  type:"GET",
  datatype: "json",
  url: `http://appdemo1.solarc.pe/api/Productos/GetProductos`,
  success: function(data){
    for (let i = 0; i < data['data'].length; i++) {

      // Agrega imagen al editar un producto
      $(`.send${data['data'][i]['idProducto']}`).click(function () {
        if ($(`.idModalHidden${data['data'][i]['idProducto']}`).val() == `image_product_modal-${data['data'][i]['idProducto']}`) {
          const id = $('.idModalHidden').val(); // input id del producto
          const selectedFile = document.getElementById(`image_product_modal-${data['data'][i]['idProducto']}`); // input del archivo
          const prodCode = $(`.codeModal-${data['data'][i]['idProducto']}`).val(); // input del codigo del producto

          // Formulario editar producto
          var formModal = new FormData();
          formModal.append("FileData", selectedFile.files[0]);
          formModal.append("CodigoProducto", `${prodCode}`);

          var settings = {
            "url": "http://appdemo1.solarc.pe/api/Productos/UploadFilePNG",
            "method": "POST",
            "timeout": 0,
            "processData": false,
            "mimeType": "multipart/form-data",
            "contentType": false,
            "data": formModal
            
          };

          $.ajax(settings).done(function (response) {
            console.log(response);
          });
        }
      });

      // Agrega imagen al crear un producto
      $('.addNew').click(function () {
        
          const selectedImage = document.getElementById('image_product'); // input del archivo
          const prodAddCode = $('#code_product').val(); // input del codigo del producto
          
          // Formulario agregar producto
          var formAdd = new FormData();
          formAdd.append("FileData", selectedImage.files[0]);
          formAdd.append("CodigoProducto", `${prodAddCode}`);

          var settingsAdd = {
            "url": "http://appdemo1.solarc.pe/api/Productos/UploadFilePNG",
            "method": "POST",
            "timeout": 0,
            "processData": false,
            "mimeType": "multipart/form-data",
            "contentType": false,
            "data": formAdd
            
          };

          $.ajax(settingsAdd).done(function (response) {
            console.log(response);
          });
        
      });
    }
  }
});

//////////////////////// Marcas ////////////////////////

// boton agregar marcas
$('#addButtonBrand').click(function (e) { 
  e.preventDefault();
  $("#inputNewBrand").val('');
});

// boton editar marcas
$('#editButtonBrand').click(function (e) { 
  e.preventDefault();
  $("#selectEditBrand").html('');
  $('#inputEditBrand').val('');
  $('#valval').val('');

  if ($('#inputEditBrand').val() == '') {
    $('#addEditBrand').attr('disabled', 'disabled');
    $('#addEditDeleteBrand').attr('disabled', 'disabled');
  }

  // agregar opciones al select editar marcas
  $.ajax({
    type: "GET",
    url: "http://appdemo1.solarc.pe/api/Parametros/GetParametros?Tabla=marca",
    dataType: "json",
    // antes de cargar el contenido
    beforeSend: function(){
      // muestra spinner loading
      $("#loader").show();
      // esconde el select
      $("#selectEditBrand").hide();
    },
    success: function (data) {
      for (let i = 0; i < data['data'].length; i++) {
        var brands = new Option(data['data'][i]['descripcion'], data['data'][i]['id']);
        $("#selectEditBrand").append(brands);
      }
    },
    // despues de cargar el contenido
    complete:function(data){
      // esconde spinner loading
      $("#loader").hide();
      // muestra el select
      $("#selectEditBrand").show();
    }
  });
});

// peticion para agregar marcas
$('#addBrand').click(function (e) { 
  e.preventDefault();
  // valor de input marca
  const brand = $('#inputNewBrand').val();

  fetch('http://appdemo1.solarc.pe/api/Parametros/InsertaParametros', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "tabla": "marca",
          "idParam": 0,
          "descripcion": brand
        })
    })
    .then(res => res.json())
    .then(data => {
      $('#inputNewBrand').val('');
      $('#modal-body-add').append(`
        <div class="alert alert-primary alert-dismissible" role="alert" id="liveAlert">
          <strong>Se agregó</strong> la marca correctamente.
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      `);
      // enter you logic when the fetch is successful
      location.reload();
    })
    .catch(error => {
    // enter your logic for when there is an error (ex. error toast)
    console.log(error)
    })
});

// obtener la marca a editar
$('select').on('change', function() {
  const conceptVal = $('#selectEditBrand').find(":selected").val();
  const conceptText = $('#selectEditBrand').find(":selected").text();
  const conceptInputName = $('#inputEditBrand').val(conceptText);
  const conceptInputVal = $('#valval').val(conceptVal);

  $('#addEditBrand').removeAttr('disabled');
  $('#addEditDeleteBrand').removeAttr('disabled');
});

// peticion para editar marcas
$('#addEditBrand').click(function (e) {
  e.preventDefault();
  // valor de input del select
  const modelEdit = $('#inputEditBrand').val();
  const modelEditVal = $('#valval').val();

  fetch('http://appdemo1.solarc.pe/api/Parametros/ModificarParametros', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "tabla": "marca",
        "idParam": modelEditVal,
        "descripcion": modelEdit
      })
  })
  .then(res => res.json())
  .then(data => {
    // enter you logic when the fetch is successful
    // actualiza el select de editar marcas
    $.ajax({
      type: "GET",
      url: "http://appdemo1.solarc.pe/api/Parametros/GetParametros?Tabla=marca",
      dataType: "json",
      // antes de cargar el contenido
      beforeSend: function(){
        // muestra spinner loading
        $("#loader").show();
        // esconde el select
        $("#selectEditBrand").hide();
      },
      success: function (dataRefresh) {
        $("#selectEditBrand").html('');
        for (let i = 0; i < dataRefresh['data'].length; i++) {
          var brands = new Option(dataRefresh['data'][i]['descripcion'], dataRefresh['data'][i]['id']);
          $("#selectEditBrand").append(brands);
        }
      },
      // despues de cargar el contenido
      complete:function(data){
        // esconde spinner loading
        $("#loader").hide();
        // muestra el select
        $("#selectEditBrand").show();
      }
    });

    location.reload();
  })
  .catch(error => {
    // enter your logic for when there is an error (ex. error toast)
    console.log(error);
  })
});

// modal pregunta para eliminar marca
$('#addEditDeleteBrand').click(function (e) { 
  e.preventDefault();
  $('#modal-delete-brand').html(`
    ¿Desea eliminar ${$('#inputEditBrand').val()}?
  `);
});

// peticion para eliminar marcas
$('#deleteBrand').click(function (e) {
  e.preventDefault();
  // valor de input del select
  const modelEdit = $('#inputEditBrand').val();
  const modelEditVal = $('#valval').val();

  fetch('http://appdemo1.solarc.pe/api/Parametros/EliminarParametros', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "tabla": "marca",
      "idParam": modelEditVal,
      "descripcion": modelEdit
    })
  })
  .then(res => res.json())
  .then(data => {
    // enter you logic when the fetch is successful
    $("#inputEditBrand").val('');
    // actualiza el select de editar marcas
    $.ajax({
      type: "GET",
      url: "http://appdemo1.solarc.pe/api/Parametros/GetParametros?Tabla=marca",
      dataType: "json",
      // antes de cargar el contenido
      beforeSend: function(){
        // muestra spinner loading
        $("#loader").show();
        // esconde el select
        $("#selectEditBrand").hide();
      },
      success: function (dataRefresh) {
        $("#selectEditBrand").html('');
        for (let i = 0; i < dataRefresh['data'].length; i++) {
          var brands = new Option(dataRefresh['data'][i]['descripcion'], dataRefresh['data'][i]['id']);
          $("#selectEditBrand").append(brands);
        }
      },
      // despues de cargar el contenido
      complete:function(data){
        // esconde spinner loading
        $("#loader").hide();
        // muestra el select
        $("#selectEditBrand").show();
      }
    });

    location.reload();
  })
  .catch(error => {
    // enter your logic for when there is an error (ex. error toast)
    console.log(error);
  })
});

//////////////////////// Modelos ////////////////////////

// boton agregar modelos
$('#addButtonModel').click(function (e) { 
  e.preventDefault();
  $("#inputNewModel").val('');
});

// boton editar modelos
$('#editButtonModel').click(function (e) { 
  e.preventDefault();
  $("#selectEditModel").html('');
  $('#inputEditModel').val('');
  $('#valvalModel').val('');

  if ($('#inputEditModel').val() == '') {
    $('#addEditBrand').attr('disabled', 'disabled');
    $('#addEditDeleteBrand').attr('disabled', 'disabled');
  }

  // agregar opciones al select editar modelos
  $.ajax({
    type: "GET",
    url: "http://appdemo1.solarc.pe/api/Parametros/GetParametros?Tabla=modelo",
    dataType: "json",
    // antes de cargar el contenido
    beforeSend: function(){
      // muestra spinner loading
      $("#loader-model").show();
      // esconde el select
      $("#selectEditModel").hide();
    },
    success: function (data) {
      for (let i = 0; i < data['data'].length; i++) {
        var brands = new Option(data['data'][i]['descripcion'], data['data'][i]['id']);
        $("#selectEditModel").append(brands);
      }
    },
    // despues de cargar el contenido
    complete:function(data){
      // esconde spinner loading
      $("#loader-model").hide();
      // muestra el select
      $("#selectEditModel").show();
    }
  });
});

// peticion para agregar modelos
$('#addModel').click(function (e) { 
  e.preventDefault();
  // valor de input modelo
  const model = $('#inputNewModel').val();

  fetch('http://appdemo1.solarc.pe/api/Parametros/InsertaParametros', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "tabla": "modelo",
          "idParam": 0,
          "descripcion": model
        })
    })
    .then(res => res.json())
    .then(data => {
      $('#inputNewModel').val('');
      $('#modal-body-add-model').append(`
        <div class="alert alert-primary alert-dismissible" role="alert" id="liveAlert">
          <strong>Se agregó</strong> el modelo correctamente.
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      `);
      // enter you logic when the fetch is successful
      location.reload();
    })
    .catch(error => {
      // enter your logic for when there is an error (ex. error toast)
      console.log(error)
    })
});

// obtener el modelo a editar
$('select').on('change', function() {
  const modelVal = $('#selectEditModel').find(":selected").val();
  const modelText = $('#selectEditModel').find(":selected").text();
  const modelInputName = $('#inputEditModel').val(modelText);
  const modelInputVal = $('#valvalModel').val(modelVal);

  $('#addEditModel').removeAttr('disabled');
  $('#addEditDeleteModel').removeAttr('disabled');
});

// peticion para editar modelos
$('#addEditModel').click(function (e) {
  e.preventDefault();
  // valor de input del select
  const modelEdit = $('#inputEditModel').val();
  const modelEditVal = $('#valvalModel').val();

  fetch('http://appdemo1.solarc.pe/api/Parametros/ModificarParametros', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "tabla": "modelo",
        "idParam": modelEditVal,
        "descripcion": modelEdit
      })
  })
  .then(res => res.json())
  .then(data => {
    // enter you logic when the fetch is successful
    // actualiza el select de editar modelos
    $.ajax({
      type: "GET",
      url: "http://appdemo1.solarc.pe/api/Parametros/GetParametros?Tabla=modelo",
      dataType: "json",
      // antes de cargar el contenido
      beforeSend: function(){
        // muestra spinner loading
        $("#loader-model").show();
        // esconde el select
        $("#selectEditModel").hide();
      },
      success: function (dataRefresh) {
        $("#selectEditModel").html('');
        for (let i = 0; i < dataRefresh['data'].length; i++) {
          var models = new Option(dataRefresh['data'][i]['descripcion'], dataRefresh['data'][i]['id']);
          $("#selectEditModel").append(models);
        }
      },
      // despues de cargar el contenido
      complete:function(data){
        // esconde spinner loading
        $("#loader-model").hide();
        // muestra el select
        $("#selectEditModel").show();
      }
    });

    location.reload();
  })
  .catch(error => {
    // enter your logic for when there is an error (ex. error toast)
    console.log(error);
  })
});

// modal pregunta para eliminar modelos
$('#addEditDeleteModel').click(function (e) { 
  e.preventDefault();
  $('#modal-delete-model').html(`
    ¿Desea eliminar ${$('#inputEditModel').val()}?
  `);
});

// peticion para eliminar modelos
$('#deleteModel').click(function (e) {
  e.preventDefault();
  // valor de input del select
  const modelEdit = $('#inputEditModel').val();
  const modelEditVal = $('#valvalModel').val();

  fetch('http://appdemo1.solarc.pe/api/Parametros/EliminarParametros', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "tabla": "modelo",
      "idParam": modelEditVal,
      "descripcion": modelEdit
    })
  })
  .then(res => res.json())
  .then(data => {
    // enter you logic when the fetch is successful
    $("#inputEditModel").val('');
    // actualiza el select de editar marcas
    $.ajax({
      type: "GET",
      url: "http://appdemo1.solarc.pe/api/Parametros/GetParametros?Tabla=modelo",
      dataType: "json",
      // antes de cargar el contenido
      beforeSend: function(){
        // muestra spinner loading
        $("#loader-model").show();
        // esconde el select
        $("#selectEditModel").hide();
      },
      success: function (dataRefresh) {
        $("#selectEditModel").html('');
        for (let i = 0; i < dataRefresh['data'].length; i++) {
          var brands = new Option(dataRefresh['data'][i]['descripcion'], dataRefresh['data'][i]['id']);
          $("#selectEditModel").append(brands);
        }
      },
      // despues de cargar el contenido
      complete:function(data){
        // esconde spinner loading
        $("#loader-model").hide();
        // muestra el select
        $("#selectEditModel").show();
      }
    });

    location.reload();
  })
  .catch(error => {
    // enter your logic for when there is an error (ex. error toast)
    console.log(error);
  })
});
