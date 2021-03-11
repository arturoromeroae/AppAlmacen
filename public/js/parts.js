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
        var productCuantity = $('.cuantityModal');
        var i;
        
        for (i = 0; i < productCode.length; i++) {
            var product_code = productCode[i];
            var product_name = productName[i];
            var product_description = productDescription[i];
            var product_price = productPrice[i];
            var product_cuantity = productCuantity[i];
            var product_id = productModalId[i];

            if (String(now_id) == String(product_code.id) && 
            String(product_code.id) != undefined && 
            String(now_id) != undefined) {
                var code = product_code.value;
                var name = product_name.value;
                var description = product_description.value;
                var price = product_price.value;
                var cuantity = product_cuantity.value;
                var id = product_id.value;
            }
        }

        var idNum = ($('#table-shop tbody').find('tr').length + 1);
        var rowId = 'row-' + idNum;
        var productId = idNum;
        var count = $('.select').length;
        var input_count = $('.count').val(count);

        if (cuantity == 0) {
            cuantity = 1;
            var subtotal = price * cuantity;
            var markup = "<tr name=hola-" + count + " id=" + rowId + "> <td> <input type='checkbox' name='record' class='select'> </td> <td name=codeTable-" + productId + ">" + code + " <input name=idTable-" + productId + " type='number' value=" + id + " style='display:none;'> </td> <td name=nameTable-" + productId + ">" + name + "</td> <td class='productPrice price'>" + price + " <input name=priceTable-" + productId + " type='number' value=" + price + " style='display:none;'> </td> <td class='productCuantity cuantity'>" + cuantity + " <input name=cuantityTable-" + productId + " type='number' value=" + cuantity + " style='display:none;'> </td> <td class='productSubtotal subtotal'>" + subtotal + " <input name=subtotalTable-" + productId + " type='number' value=" + subtotal + " style='display:none;'></td> </tr>";
            $("#table-shop tbody").append(markup);
        }else{
            var subtotal = price * cuantity;
            var markup = "<tr name=hola-" + count + " id=" + rowId + "> <td> <input type='checkbox' name='record' class='select'> </td> <td name=codeTable-" + productId + ">" + code + " <input name=idTable-" + productId + " type='number' value=" + id + " style='display:none;'> </td> <td name=nameTable-" + productId + ">" + name + "</td> <td class='productPrice price'>" + price + " <input name=priceTable-" + productId + " type='number' value=" + price + " style='display:none;'> </td> <td class='productCuantity cuantity'>" + cuantity + " <input name=cuantityTable-" + productId + " type='number' value=" + cuantity + " style='display:none;'> </td> <td class='productSubtotal subtotal'>" + subtotal + " <input name=subtotalTable-" + productId + " type='number' value=" + subtotal + " style='display:none;'></td> </tr>";
            $("#table-shop tbody").append(markup);
        }

        // activa la funcion para calcular precio y cantidad
        $('#table-shop .productSubtotal').each(function() {
            calculateColumn();
        });

        // obtener el precio total
        function calculateColumn() {
            var sumaSubtotal = 0;

            $('#table-shop td.productSubtotal').each(function() {
                sumaSubtotal += parseFloat($(this).text()||0,10)
            });

            $(".resultado_total").val(sumaSubtotal);
        }
    });

});
