/*Récupération de l'id du produit correspondant*/
var str = window.location.href;
var url = new URL(str);
var idProduct = url.searchParams.get("id");
console.log(idProduct);
let sofa = "";


/*Récupération de l'article via l'API*/
fetch("http://localhost:3000/api/products/" + idProduct)
    .then(function (response) {
        return response.json();
    })

    .then((sofa) => {

        /*Création des constantes liées aux détails du produit et implémentation des éléments dans le DOM*/
        /*ajout de l'image*/
        let productImg = document.createElement("img");
        document.querySelector(".item__img").appendChild(productImg);
        productImg.src = sofa.imageUrl;
        productImg.alt = sofa.altTxt;
        
        /*Ajout du nom du canapé*/
        const productTitle = document.getElementById("title");
        productTitle.innerHTML = sofa.name;

        /*Ajout du prix*/
        const productPrice = document.getElementById("price");
        productPrice.innerHTML = sofa.price;

        /*Ajout de la description*/
        const productDescription = document.getElementById("description");
        productDescription.innerHTML = sofa.description;

        /*Ajout des couleurs*/
        const colors = sofa.colors;
        let textColors = "";

        /*Création d'une boucle pour récupérer toutes les couleurs disponibles*/
        for (let colors of sofa.colors){
            console.table(colors);
            let productColors = document.createElement("option");
            document.querySelector("#colors").appendChild(productColors);
            productColors.value = colors;
            productColors.innerHTML = colors;
        }

    })
    .catch(function(error) {
        console.error(error)
    })