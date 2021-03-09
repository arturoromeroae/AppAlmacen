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
            console.log(name, code, description, price);
        }

        var markup = "<tr><td><input type='checkbox' name='record'></td><td>" + code + "</td><td>" + name + "</td><td>" + price + "</td></tr>";
        $("#table-2 tbody").append(markup);

    });
});
