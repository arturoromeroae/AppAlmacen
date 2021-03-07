$('#table-stock').bootstrapTable({
    locale: 'es-ES',
    pagination: false,
    search: true,
});

window.customSearchFormatter = function(value, searchText) {
    return value.toString().replace(new RegExp('(' + searchText + ')', 'gim'), '<span style="background-color: #bdd7fa;border: 1px solid blue;border-radius:90px;padding:4px">$1</span>')
}

function SumarAutomatico () { 
    
    valor1 = document.getElementById('minumero1').value; // Convertir a numero entero (número).
    valor2 = document.getElementById('minumero2').value;
    porcent = valor1 * valor2/100;
    TotalSuma = (parseFloat(valor1) + parseFloat(porcent));
    console.log(valor2);

    /* Variable genrando la suma. */
    if (typeof(TotalSuma) == undefined || isNaN(TotalSuma)) {
        document.getElementById('MiTotal').innerHTML = valor1;
    }else{
        document.getElementById('MiTotal').innerHTML = TotalSuma;
    }
}
