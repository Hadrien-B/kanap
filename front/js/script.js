/*Récupération des données via l'API*/
fetch("http://localhost:3000/api/products")
    .then(function (response) {
        return response.json();
    })
    .then(function (listSofa) {
        const articles = document.getElementById("items")/*recherche de l'élément par son id*/

        for (const element of listSofa) {/*On récupère tous les élements de l'API*/
            const sofa = element;

            let text = `<a href="./product.html?id=${sofa._id}"> 
                        <article> <img src="${sofa.imageUrl}" alt="${sofa.altTxt}"> 
                        <h3 class="productName"> ${sofa.name} </h3> 
                        <p class="productDescription"> ${sofa.description}</p></article>`;
            articles.innerHTML += text;/*on implémente tous les éléments de chaque article*/
        }
    })

    .catch(function (error) {
        console.error(error)
    });