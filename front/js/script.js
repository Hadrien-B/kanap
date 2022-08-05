fetch("http://localhost:3000/api/products")
    .then(function(response){
        return response.json();
    })
        .then(function(listSofa){
            const articles = document.getElementById("items")
        


    for (const element of listSofa) {
        const sofa = element;

        let text = `<a href="./prodct01.html?id=${sofa._id}"> <article> <img src="${sofa.imageUrl}" alt="${sofa.altTxt}"> <h3 class="productName"> ${sofa.name} </h3> <p class="productDescription"> ${sofa.description}</p></article>`;
        articles.innerHTML += text;
    }


})
.catch(function(error){
    console.error(error)
});