$('#table-parts').bootstrapTable({
    locale: 'es-ES',
    pagination: false,
    search: true,
});

window.customSearchFormatter = function(value, searchText) {
    return value.toString().replace(new RegExp('(' + searchText + ')', 'gim'), '<span style="background-color: #bdd7fa;border: 1px solid blue;border-radius:90px;padding:4px">$1</span>')
}

$(document).ready(function(){
    $(".button-add").click(function(){
        var now_id = $(this).attr('id');
        var productCode = $('.codeModal');
        var productName = $('.nameModal');
        var productDescription = $('.descriptionModal');
        var productPrice = $('.priceModal');
        var i;
        
        for (i = 0; i < productCode.length; i++) {
            var product_code = productCode[i];
            var product_name = productName[i];
            var product_description = productDescription[i];
            var product_price = productPrice[i];

            if (String(now_id) == String(product_code.id) && String(product_code.id) != undefined && String(now_id) != undefined) {
                var code = product_code.value;
                var name = product_name.value;
                var description = product_description.value;
                var price = product_price.value;

            }
        }

        var markup = "<tr><td class='prueba[$i]'><input type='checkbox' name='record'></td><td>" + code + "</td><td>" + name + "</td><td class='subtotal prueba{{$i}}'>" + price + "</td></tr><?php $i++ ?>";
        $("#table-shop tbody").append(markup);

        $('#table-shop .subtotal').each(function() {
            calculateColumn();
        });
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
