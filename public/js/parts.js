$('#table-parts').bootstrapTable({
    locale: 'es-ES',
    pagination: false,
    search: true,
});

window.customSearchFormatter = function(value, searchText) {
    return value.toString().replace(new RegExp('(' + searchText + ')', 'gim'), '<span style="background-color: #bdd7fa;border: 1px solid blue;border-radius:90px;padding:4px">$1</span>')
}

function addRow() {
    "use strict";

     var table = document.getElementById("table-2");

     var row = document.createElement("tr");
     console.log(row);
     var td1 = document.createElement("td");
     var td2 = document.createElement("td");
     var td3 = document.createElement("td");
     var td4 = document.createElement("td");
     var td5 = document.createElement("td");
     row.style.cssText = "background: #ccc;"

     td1.innerHTML = document.getElementById("code_product").value;
     td2.innerHTML  = document.getElementById("name_product").value;
     td3.innerHTML  = document.getElementById("description_product").value;
     td4.innerHTML  = document.getElementById("cuantity_product").value;
     td5.innerHTML  = document.getElementById("price_base_product").value;

     row.appendChild(td1);
     row.appendChild(td2);
     row.appendChild(td3);
     row.appendChild(td4);
     row.appendChild(td5);

     table.children[0].appendChild(row);
 };
