// Buscador en tabla
/*$('#table-maintance').bootstrapTable({
    locale: 'es-ES',
    pagination: false,
    search: true,
});*/

oTable = $('#table-maintance').DataTable({
			responsive: true,
            processing: true,
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
            //"serverSide": true,
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

