/*Récupération des données via l'API*/
fetch("http://localhost:3000/api/products")
    .then(function (response) {
        return response.json();
    })
    .then(function (listSofa) {
        const ARTICLES = document.getElementById("items")/*recherche de l'élément par son id*/

        for (const element of listSofa) {/*On récupère tous les élements de l'API*/
            const SOFA = element;

            let text = `<a href="./product.html?id=${SOFA._id}"> 
                        <article> <img src="${SOFA.imageUrl}" alt="${SOFA.altTxt}"> 
                        <h3 class="productName"> ${SOFA.name} </h3> 
                        <p class="productDescription"> ${SOFA.description}</p></article>`;
            ARTICLES.innerHTML += text;/*on implémente tous les éléments de chaque article*/
        }
    })

    .catch(function (error) {
        console.error(error)
    });