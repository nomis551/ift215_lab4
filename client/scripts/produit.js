const TOKEN_CLIENT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZENsaWVudCI6MSwicm9sZSI6ImNsaWVudCIsImlhdCI6MTYzNjc1MjI1MywiZXhwIjoxODM2NzUyMjUzfQ.qMcKC0NeuVseNSeGtyaxUvadutNAfzxlhL5LYPsRB8k"
const ID_CLIENT = 1

$(function () {
    console.log('ift215');
});

function chargerproduit(){
$.ajax({
    url: "/produits",
    success: function(result) {
      console.log(result)
        $.each(result, function (key, value){
            item = item_to_html(value);
            $('#list_items').append(item);
        });
    }
})
}

function item_to_html(item){
    item_card = $('<div></div>')
        .addClass('card mb-4 rounded-3 shadow-sm');
    item_head = $('<div></div>')
        .addClass('card-header py-3')
        .append('<h4 class="my-0 fw-normal">' + item.nom + '</h4>');
    item_detail = $('<ul></ul>')
        .addClass('list-unstyled mt-3 mb-4')
        .append('<li>Qte :' + item.qte_inventaire +'</li>')
        .append('<li>Categorie :' + item.categorie.nom +'</li><br>')
        .append('<li>' + item.description +'</li>')
    item_body = $('<div></div>')
        .addClass('card-body')
        .append(' <h1 class="card-title text-center"> $' + item.prix +'</h1>');
    item_logo = $('<p></p>')
        .addClass('w-100 display-6 text-center')
        .append('<button type="button" class="btn btn-primary position-relative" onclick="add_item(${id_item})">' + '<i class="bi bi-cart-plus"></i>' + '</button>')
    item_body.append(item_detail).append(item_logo);
    item_card.append(item_head).append(item_body);

return $('<div></div>').addClass('col-md-3') .append(item_card);
}


document.addEventListener('DOMContentLoaded', (event) => {
    fetch('/produits')
      .then(chargerproduit())
})

const add_item = (id_item) => {
    $.ajax({
        url: "/clients/" + 1 + "/panier",
        method: "POST",
        data: {"idProduit": id_item, "quantite": 1},
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', "Basic " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZENsaWVudCI6MSwicm9sZSI6ImNsaWVudCIsImlhdCI6MTYzNjc1MjI1MywiZXhwIjoxODM2NzUyMjUzfQ.qMcKC0NeuVseNSeGtyaxUvadutNAfzxlhL5LYPsRB8k");
        },
        success: function (result) {
            console.log(result)
            total_item_panier(result)
        }
    });
    ;
}

const total_item_panier = (result) => {
    let nb_items = 0;
    for (let i = 0; i < result.item.length; i++) {
        nb_items += result.item[i].quantite
    }
    $('#item_counter').text(nb_items)
}
