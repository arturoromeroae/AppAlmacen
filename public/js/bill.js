$(document).ready(function(){

    $(".button-add-bill").click(function(){

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
                var price_table = 0;
                // var cuantity_table = product_cuantity_shop.value;
            }
        }

        var idNumTable = ($('#table-bill tbody').find('tr').length + 1);
        var rowIdTable = 'row-' + idNumTable;
        var productIdTable = idNumTable;
        var cuantity_table = 1;
        var count = parseInt($('.select').length) + 1;
        var input_count = $('.count').val(count);
        var subtotal = price_table * cuantity_table;

        var markup = "<tr id=" + rowIdTable + "> <td> <input type='checkbox' name='record' class='select'> </td> <td name=codeTable" + productIdTable + ">" + code_table + " <input name=idTable" + productIdTable + " type='number' value=" + id_table + " style='display:none;'> </td> <td name=nameTable" + productIdTable + ">" + name_table + "</td> <td class='productPrice price'>" + price_table + " <input name=priceTable" + productIdTable + " type='number' value=" + price_table + " style='display:none;' hidden> </td> <td class='productCuantity cuantity'>" + cuantity_table + " <input name=cuantityTable" + productIdTable + " type='number' value=" + cuantity_table + " style='display:none;'> </td> <td class='productSubtotal subtotal'>" + subtotal + " <input name=subtotalTable" + productIdTable + " type='number' value=" + subtotal + " style='display:none;'></td> </tr>";
        $("#table-bill tbody").append(markup);

        // activa la funcion para calcular precio y cantidad
        $('#table-bill .productSubtotal').each(function() {
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

            $('#table-bill td.productSubtotal').each(function() {
                sumaSubtotal += parseFloat($(this).text()||0,10)
            });

            $(".resultado_total").val(sumaSubtotal);
            $(".resultado").val(sumaSubtotal);
        }
    });

});