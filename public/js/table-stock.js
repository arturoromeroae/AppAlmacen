$('#table-stock').bootstrapTable({
    locale: 'es-ES',
    pagination: false,
    search: true,
});

window.customSearchFormatter = function(value, searchText) {
    return value.toString().replace(new RegExp('(' + searchText + ')', 'gim'), '<span style="background-color: #bdd7fa;border: 1px solid blue;border-radius:90px;padding:4px">$1</span>')
}



$(".button-addon").click(function (e) {
    var info = JSON.toString("{{ json_encode($product['precioBase']) }}");
    const $row = $(this).closest('.row'),
    price = $row.find('input.price-stock').val(),
    stock = $row.find('input.stock-stock').val(),
    // porcent = valor1 * valor2/100;
    total = price + stock;
    $row.find('span.stock-print').html(total);
    console.log(total);

    // if (typeof(TotalSuma) == undefined || isNaN(TotalSuma)) {
    //     document.querySelector('span[name = MiTotal]').innerHTML = valor1;
    // }else{
    //     document.querySelector('span[name = MiTotal]').innerHTML = TotalSuma;
    // }

    $.ajax({
        type: "",
        url: "http://appdemo1.solarc.pe/api/Productos/GetProductos",
        data: "data",
        dataType: "JSON",
        success: function (response) {
            alert('correcto' + response);
        }
    });
});
