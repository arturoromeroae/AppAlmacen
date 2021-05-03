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
