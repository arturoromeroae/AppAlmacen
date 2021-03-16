// tabla bootstrap
$('#table-parts').bootstrapTable({
    locale: 'es-ES',
    pagination: false,
    search: true,
});

// formato de busqueda
window.customSearchFormatter = function(value, searchText) {
    return value.toString().replace(new RegExp('(' + searchText + ')', 'gim'), '<span style="background-color: #bdd7fa;border: 1px solid blue;border-radius:90px;padding:4px">$1</span>')
}

$(document).ready(function(){

    // añadir producto al carrito
    $(".button-add").click(function(){

        var now_id = $(this).attr('id');
        var productModalId = $('.idModal');
        var productCode = $('.codeModal');
        var productName = $('.nameModal');
        var productDescription = $('.descriptionModal');
        var productPrice = $('.priceModal');
        var productPriceDefault = $('.priceDefault');
        var productCuantity = $('.cuantityModal');
        
        var i;

        for (i = 0; i < productCode.length; i++) {
            
            var product_code = productCode[i];
            var product_name = productName[i];
            var product_description = productDescription[i];
            var product_price = productPrice[i];
            var product_price_default = productPriceDefault[i];
            var product_cuantity = productCuantity[i];
            var product_id = productModalId[i];

            if (String(now_id) == String(product_code.id) && 
            String(product_code.id) != undefined && 
            String(now_id) != undefined) {
                var code = product_code.value;
                var name = product_name.value;
                var description = product_description.value;
                var price1 = product_price.value;
                var price2 = product_price_default.value;
                if (price1 == null || price1 == undefined || price1 == 0) {
                    var price = price2;
                }else{
                    var price = price1;
                }
                var cuantity = product_cuantity.value;
                var id = product_id.value;
            }
        }

        var idNum = ($('#table-shop tbody').find('tr').length + 1);
        var rowId = 'row-' + idNum;
        var productId = idNum;
        var count = parseInt($('.select').length) + 1;
        var input_count = $('.count').val(count);

        if (cuantity == 0) {
            cuantity = 1;
            var subtotal = price * cuantity;
            var markup = "<tr id=" + rowId + "> <td> <input type='checkbox' name='record' class='select'> </td> <td name=codeTable" + productId + ">" + code + " <input name=idTable" + productId + " type='number' value=" + id + " style='display:none;'> </td> <td name=nameTable" + productId + ">" + name + "</td> <td class='productPrice price'>" + price + " <input name=priceTable" + productId + " type='number' value=" + price + " style='display:none;' hidden> </td> <td class='productCuantity cuantity'>" + cuantity + " <input name=cuantityTable" + productId + " type='number' value=" + cuantity + " style='display:none;'> </td> <td class='productSubtotal subtotal'>" + subtotal + " <input name=subtotalTable" + productId + " type='number' value=" + subtotal + " style='display:none;'></td> </tr>";
            $("#table-shop tbody").append(markup);
        }else{
            var subtotal = price * cuantity;
            var markup = "<tr id=" + rowId + "> <td> <input type='checkbox' name='record' class='select'> </td> <td name=codeTable" + productId + ">" + code + " <input name=idTable" + productId + " type='number' value=" + id + " style='display:none;'> </td> <td name=nameTable" + productId + ">" + name + "</td> <td class='productPrice price'>" + price + " <input name=priceTable" + productId + " type='number' value=" + price + " style='display:none;' hidden> </td> <td class='productCuantity cuantity'>" + cuantity + " <input name=cuantityTable" + productId + " type='number' value=" + cuantity + " style='display:none;'> </td> <td class='productSubtotal subtotal'>" + subtotal + " <input name=subtotalTable" + productId + " type='number' value=" + subtotal + " style='display:none;'></td> </tr>";
            $("#table-shop tbody").append(markup);
        }

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

    // añadir producto al carrito desde boton de tabla
    $(".button-add-table").click(function(){

        var now_id_table = $(this).attr('id');
        var productTableId = $('.idShop');
        var productTableCode = $('.codeShop');
        var productTableName = $('.nameShop');
        var productTableDescription = $('.descriptionModal');
        var productTablePrice = $('.priceModal');
        var productTablePriceDefault = $('.priceShop');
        var productTableCuantity = $('.stockShop');

        var i;

        for (i = 0; i < productTableId.length; i++) {
            var product_id_shop = productTableId[i];
            var product_code_shop = productTableCode[i];
            var product_name_shop = productTableName[i];
            var product_price_shop = productTablePrice[i];
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

        var markup = "<tr id=" + rowIdTable + "> <td> <input type='checkbox' name='record' class='select'> </td> <td name=codeTable" + productIdTable + ">" + code_table + " <input name=idTable" + productIdTable + " type='number' value=" + id_table + " style='display:none;'> </td> <td name=nameTable" + productIdTable + ">" + name_table + "</td> <td class='productPrice price'>" + price_table + " <input name=priceTable" + productIdTable + " type='number' value=" + price_table + " style='display:none;' hidden> </td> <td class='productCuantity cuantity'>" + cuantity_table + " <input name=cuantityTable" + productIdTable + " type='number' value=" + cuantity_table + " style='display:none;'> </td> <td class='productSubtotal subtotal'>" + subtotal + " <input name=subtotalTable" + productIdTable + " type='number' value=" + subtotal + " style='display:none;'></td> </tr>";
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
