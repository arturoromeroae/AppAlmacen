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

            if (String(now_id) == String(product_code.id) && String(product_code.id) != undefined && String(now_id) != undefined) {
                var code = product_code.value;
                var name = product_name.value;
                var description = product_description.value;
                var price = product_price.value;
                var cuantity = product_cuantity.value;

            }
        }

        var idNum = ($('#table-shop tbody').find('tr').length + 1);
        var rowId = 'row-' + idNum;

        if (cuantity == 0) {
            cuantity = 1;
            var markup = "<tr id=" + rowId + "><td class='prueba[$i]'><input type='checkbox' name='record'></td><td>" + code + "</td><td>" + name + "</td><td class='subtotal prueba{{$i}}'>" + price + "</td><td>" + cuantity + "</td></tr>";
            $("#table-shop tbody").append(markup);
        }else{
            var markup = "<tr id=" + rowId + "><td class='prueba[$i]'><input type='checkbox' name='record'></td><td>" + code + "</td><td>" + name + "</td><td class='subtotal prueba{{$i}}'>" + price + "</td><td>" + cuantity + "</td></tr>";
            $("#table-shop tbody").append(markup);
        }

        // activa la funcion para calcular precio
        $('#table-shop .subtotal').each(function() {
            calculateColumn();
        });

        // obtener el precio total
        function calculateColumn() {
            var subtotal = parseFloat($('.subtotal').text());
            var hola = parseInt($('#table-shop td.subtotal').text()||0,10)
            var suma = 0;

            $('#table-shop td.subtotal').each(function() {
                
                suma += parseFloat($(this).text()||0,10)
            });

            console.log(suma);

            $(".resultado_total").val(suma);
        }
    });

});
