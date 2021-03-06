// tabla bootstrap
/*$('#table-parts').bootstrapTable({
    locale: 'es-ES',
    pagination: false,
    search: true,
});*/

$(document).ready(function(){
   
    if (localStorage.getItem('userId') == "" || localStorage.getItem('userId') == null) {
        window.location.replace("/");
    }

    window.localStorage.removeItem('cotizacion');
    
    // url del api productos
    const urlProducts = 'http://appdemo1.solarc.pe/api/Productos/GetProductos'
    // datatable
    oTable = $('#table-parts').DataTable({
        "ajax": urlProducts,
        "columns": [
            {"data" : {codProd : "codProd", idProducto: "idProducto", stock : "stock"}, render: function (data){
                return `
                    <input id="parts-modal-shop${data.idProducto}" type="text" class="form-control codeShop" value="${data.codProd}" hidden>
                    ${data.stock <= 0 ?
                        `
                        <a class="nav-link hover-table click disabled" style="color: black;" aria-disabled="true" href="#edit-modal-${data.idProducto}" data-bs-toggle="modal" data-bs-target="#edit-modal-${data.idProducto}">
                            ${data.codProd}
                        </a>
                        `
                        :
                        `
                        <a class="nav-link hover-table click" href="#edit-modal-${data.idProducto}" data-bs-toggle="modal" data-bs-target="#edit-modal-${data.idProducto}">
                            ${data.codProd}
                        </a>
                        `
                    }
                `
            }},
            {"data" : {idProducto : "idProducto", nombreProducto: "nombreProducto", stock : "stock"}, render: function (data){
                return `
                    <input id="parts-modal-shop${data.idProducto}" type="text" class="form-control nameShop" value="${data.nombreProducto}" hidden>
                    ${data.stock <= 0 ?
                        `
                        <a class="nav-link hover-table click disabled" style="color: black;" aria-disabled="true" href="#edit-modal-${data.idProducto}" data-bs-toggle="modal" data-bs-target="#edit-modal-${data.idProducto}">
                            ${data.nombreProducto}
                        </a>
                        `
                        :
                        `
                        <a class="nav-link hover-table click" href="#edit-modal-${data.idProducto}" data-bs-toggle="modal" data-bs-target="#edit-modal-${data.idProducto}">
                            ${data.nombreProducto}
                        </a>
                        `
                    }
                `
            }},
            {"data" : "descripcion"},
            {"data" : {idProducto : "idProducto", stock : "stock"}, render: function (data) {
                return `
                    <input id="parts-modal-shop${data.idProducto}" type="text" class="form-control stockShop" value="${data.stock}" hidden>
                    ${data.stock == 1 ?
                        `
                        <a class="nav-link hover-table click" style="color: orange;" href="#edit-modal-${data.idProducto}" data-bs-toggle="modal" data-bs-target="#edit-modal-${data.idProducto}">
                            <strong>${data.stock}</strong>
                        </a>
                        `
                        : data.stock <= 0 ?
                        `
                        <a class="nav-link hover-table click disabled" style="color: red;" aria-disabled="true" href="#edit-modal-${data.idProducto}" data-bs-toggle="modal" data-bs-target="#edit-modal-${data.idProducto}">
                        <strong>${data.stock}</strong>
                        </a>
                        `
                        :
                        `
                        <a class="nav-link hover-table click" href="#edit-modal-${data.idProducto}" data-bs-toggle="modal" data-bs-target="#edit-modal-${data.idProducto}">
                            ${data.stock}
                        </a>
                        `
                    }
                `
            }},
            {"data" : {idProducto : "idProducto", precioVenta : "precioVenta", stock : "stock"}, render: function (data) {
                return `
                    <input id="parts-modal-shop${data.idProducto}" type="text" class="form-control priceShop" value="${data.precioVenta}" hidden>
                    ${data.stock <= 0 ?
                        `
                        <a class="nav-link hover-table click disabled" style="color: black;" aria-disabled="true" href="#edit-modal-${data.idProducto}" data-bs-toggle="modal" data-bs-target="#edit-modal-${data.idProducto}">
                            ${data.precioVenta}
                        </a>
                        `
                        :
                        `
                        <a class="nav-link hover-table click" href="#edit-modal-${data.idProducto}" data-bs-toggle="modal" data-bs-target="#edit-modal-${data.idProducto}">
                            ${data.precioVenta}
                        </a>
                        `
                    }`
                }
            },
            {"data" : {idProducto : "idProducto", ubicacion : "ubicacion", stock : "stock"}, render: function (data) {
                let ubi = data.ubicacion;
                if (ubi == null) {
                    ubi = "Desconocida";
                } else {
                    ubi = data.ubicacion;
                } 
                return `
                    <input id="parts-modal-shop${data.idProducto}" type="text" class="form-control priceShop" value="${data.ubicacion}" hidden>
                    ${data.stock <= 0 ?
                        `
                        <a class="nav-link hover-table click disabled" style="color: black;" aria-disabled="true" href="#edit-modal-${data.idProducto}" data-bs-toggle="modal" data-bs-target="#edit-modal-${data.idProducto}">
                            ${ubi}
                        </a>
                        `
                        :
                        `
                        <a class="nav-link hover-table click" href="#edit-modal-${data.idProducto}" data-bs-toggle="modal" data-bs-target="#edit-modal-${data.idProducto}">
                            ${ubi}
                        </a>
                        `
                    }`
                }
            },
            {"data": {idProducto : "idProducto", stock : "stock"}, render: function (data) {
                return `
                    <input id="parts-modal-shop${data.idProducto}" type="text" class="form-control idShop" value="${data.idProducto}" hidden>
                    ${data.stock <= 0 ?
                        `
                        <a id="parts-modal-shop${data.idProducto}" class="nav-link hover-table button-add-table disabled" aria-disabled="true" style="cursor: pointer; color:gray;">
                            <i class="material-icons" style="font-size:30px; margin-left: 40%;">shopping_cart</i>
                        </a>
                        `
                    :
                        `
                        <a id="parts-modal-shop${data.idProducto}" class="nav-link hover-table button-add-table" style="cursor: pointer; color:black;">
                            <i class="material-icons" style="font-size:30px; margin-left: 40%;">shopping_cart</i>
                        </a>
                        `
                    }`
                }
            },
            {"data": {codProd :"codProd", nombreProducto : "nombreProducto"}, render: function (data) {
                // $(document).on('mouseenter', `.image-product${data.codProd}`, function () { 
                //     $(`#text-view-image${data.codProd}`).css("display", "block");
                // })
    
                // $(document).on('mouseleave', `.image-product${data.codProd}`,function(){
                //     $(`#text-view-image${data.codProd}`).css("display", "none");
                // })
    
                const image_url = `http://appdemo1.solarc.pe/imagenes/${data.codProd}.png`
                const image_url_jpg = `http://appdemo1.solarc.pe/imagenes/${data.codProd}.jpg`
    
                $(document).on('click', `.image-stock-s${data.codProd}`, function(){
                    $("#pr-name").html(`${data.nombreProducto}`)
                    $("#increase-image").html(`<img src="${image_url}" onerror="this.onerror=null; this.src='${image_url_jpg}'">`)
                })
                
                return `
                    <div class="text-center contenedor-image-stock image-stock-s${data.codProd}" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                        <p id="text-view-image${data.codProd}" style="display:none;position: absolute;z-index: 100;margin: 20;color:white;">
                            <strong>Ampliar<br>Imagen</strong>
                        </p>
                        <img class="image-product${data.codProd} image-pr" src="${image_url}" onerror="this.onerror=null; this.src='${image_url_jpg}'" width="100" height="100">
                    </div>
                `;
                }
            }
        ],
        responsive: true,
        processing: true,
        "bInfo": true,
        "language": {
            "sProcessing": "Procesando...",
            "lengthMenu": "Mostrar _MENU_ registros por pagina",
            'sZeroRecords': 'No se encontraron resultados',
            'sEmptyTable': 'Ning??n dato disponible en esta tabla',
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
                'sLast': '??ltimo ',
                'sNext': 'Siguiente ',
                'sPrevious': 'Anterior '
            }
        }
        //"serverSide": true,
    });

    // formato de busqueda
    window.customSearchFormatter = function(value, searchText) {
        return value.toString().replace(new RegExp('(' + searchText + ')', 'gim'), '<span style="background-color: #bdd7fa;border: 1px solid blue;border-radius:90px;padding:4px">$1</span>')
    }

    // a??adir producto al carrito desde el modal
    $(".button-add").click(function(){
        // variables para cada input en el modal
        const now_id = $(this).attr('id');
        const productModalId = $('.idModal');
        const productCode = $('.codeModal');
        const productName = $('.nameModal');
        const productDescription = $('.descriptionModal');
        const productPrice = $('.priceModal');
        const productPriceDefault = $('.priceDefault');
        const productCuantity = $('.cuantityModal');
        
        // recorriendo cada input en el modal
        var i;
        for (i = 0; i < productCode.length; i++) {

            const product_code = productCode[i];
            const product_name = productName[i];
            const product_description = productDescription[i];
            const product_price = productPrice[i];
            const product_price_default = productPriceDefault[i];
            const product_cuantity = productCuantity[i];
            const product_id = productModalId[i];

            if (String(now_id) == String(product_code.id) &&
            String(product_code.id) != undefined &&
            String(now_id) != undefined) {
                const code = product_code.value;
                const name = product_name.value;
                const description = product_description.value;
                const price1 = product_price.value;
                const price2 = product_price_default.value;
                if (price1 == null || price1 == undefined || price1 == 0) {
                    var price = price2;
                }else{
                    var price = price1;
                }

                var cuantity = product_cuantity.value;
                var id = product_id.value;
                var idNum = ($('#table-shop tbody').find('tr').length + 1);
                var rowId = 'row-' + idNum;
                var productId = idNum;
                var count = parseInt($('.select').length) + 1;
                var input_count = $('.count').val(count);

                // agregar las filas a la tabla
                if (cuantity == 0) {
                    cuantity = 1;
                    var subtotal = price * cuantity;
                    var markup = "<tr id=" + rowId + "> <td> <input type='checkbox' name='record' class='select'> </td> <td name=codeTable" + productId + ">" + code + " <input name=idTable" + productId + " type='number' value=" + id + " style='display:none;'> </td> <td name=nameTable" + productId + ">" + name + "</td> <td class='productPrice price'>" + price + " <input name=priceTable" + productId + " type='number' step='.01' value=" + price + " style='display:none;' hidden> </td> <td class='productCuantity cuantity'>" + cuantity + " <input name=cuantityTable" + productId + " type='number' value=" + cuantity + " style='display:none;'> </td> <td class='productSubtotal subtotal'>" + subtotal + " <input name=subtotalTable" + productId + " type='number' step='.01' value=" + subtotal + " style='display:none;'></td> </tr>";
                    $("#table-shop tbody").append(markup);
                }else{
                    var subtotal = price * cuantity;
                    var markup = "<tr id=" + rowId + "> <td> <input type='checkbox' name='record' class='select'> </td> <td name=codeTable" + productId + ">" + code + " <input name=idTable" + productId + " type='number' value=" + id + " style='display:none;'> </td> <td name=nameTable" + productId + ">" + name + "</td> <td class='productPrice price'>" + price + " <input name=priceTable" + productId + " type='number' step='.01' value=" + price + " style='display:none;' hidden> </td> <td class='productCuantity cuantity'>" + cuantity + " <input name=cuantityTable" + productId + " type='number' value=" + cuantity + " style='display:none;'> </td> <td class='productSubtotal subtotal'>" + subtotal + " <input name=subtotalTable" + productId + " type='number' step='.01' value=" + subtotal + " style='display:none;'></td> </tr>";
                    $("#table-shop tbody").append(markup);
                }

                // activa la funcion para calcular precio y cantidad
                $('#table-shop .productSubtotal').each(function() {
                    calculateColumn();
                });

                // boton para eliminar productos del carrito
                $('.button-delete').on('click', function(){
                    $('.select:checked').each(function () {
                        $(this).closest('tr').remove()
                    });
                    calculateColumn();
                });

                // obtener el precio total
                function calculateColumn() {
                    var sumaSubtotal = 0;

                    $('#table-shop td.productSubtotal').each(function() {
                        sumaSubtotal += parseFloat($(this).text()||0,10)
                    });

                    $(".resultado_total").val(sumaSubtotal);
                    $(".resultado").val(sumaSubtotal);
                }
            }
        }

    });

    // a??adir producto al carrito desde boton de tabla
    const table = $('#table-parts').DataTable();
    $('#table-parts').on('click', `.button-add-table`, function (){
        // variables para todos los productos
        var now_id_table = table.$(this).attr('id');
        var productTableId = table.$('.idShop');
        var productTableCode = table.$('.codeShop');
        var productTableName = table.$('.nameShop');
        var productTableDescription = $('.descriptionModal');
        var productTablePrice = $('.priceModal');
        var productTablePriceDefault = table.$('.priceShop');
        var productTableCuantity = table.$('.stockShop');

        // recorre cada input en la tabla
        var i;
        for (i = 0; i < productTableId.length; i++) {
            var product_id_shop = productTableId[i];
            var product_code_shop = productTableCode[i];
            var product_name_shop = productTableName[i];
            var product_price_shop = productTablePriceDefault[i];
            var product_cuantity_shop = productTableCuantity[i];

            if (String(now_id_table) == String(product_id_shop.id) &&
            String(product_id_shop.id) != undefined &&
            String(now_id_table) != undefined) {
                var id_table = product_id_shop.value;
                var code_table = product_code_shop.value;
                var name_table = product_name_shop.value;
                var price_table = product_price_shop.value;
                // var cuantity_table = product_cuantity_shop.value;
            }
        }

        var idNumTable = ($('#table-shop tbody').find('tr').length + 1);
        var rowIdTable = 'row-' + idNumTable;
        var productIdTable = idNumTable;
        var cuantity_table = 1;
        var count = parseInt($('.select').length) + 1;
        var input_count = $('.count').val(count);
        var subtotal = price_table * cuantity_table;

        var markup = "<tr id=" + rowIdTable + "> <td> <input type='checkbox' name='record' class='select'> </td> <td name=codeTable" + productIdTable + ">" + code_table + " <input name=idTable" + productIdTable + " type='number' value=" + id_table + " style='display:none;'> </td> <td name=nameTable" + productIdTable + ">" + name_table + "</td> <td class='productPrice price'>" + price_table + " <input name=priceTable" + productIdTable + " type='number' step='.01' value=" + price_table + " style='display:none;' hidden> </td> <td class='productCuantity cuantity'>" + cuantity_table + " <input name=cuantityTable" + productIdTable + " type='number' value=" + cuantity_table + " style='display:none;'> </td> <td class='productSubtotal subtotal'>" + subtotal + " <input name=subtotalTable" + productIdTable + " type='number' step='.01' value=" + subtotal + " style='display:none;'></td> </tr>";
        $("#table-shop tbody").append(markup);

        // activa la funcion para calcular precio y cantidad
        $('#table-shop .productSubtotal').each(function() {
            calculateColumn();
        });

        $('.button-delete').on('click', function(){
            $('.select:checked').each(function () {
                $(this).closest('tr').remove()
            });
            calculateColumn();
        });

        // obtener el precio total
        function calculateColumn() {
            var sumaSubtotal = 0;

            $('#table-shop td.productSubtotal').each(function() {
                sumaSubtotal += parseFloat($(this).text()||0,10)
            });

            $(".resultado_total").val(sumaSubtotal);
            $(".resultado").val(sumaSubtotal);
        }
    });
});
