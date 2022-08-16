//Récupération de l'id du produit correspondant
const idProduct = new URL(window.location.href).searchParams.get("id");

//Récupération de l'article via l'API
fetch("http://localhost:3000/api/products/" + idProduct)
  .then(function (response) {
    return response.json();
  })


  .then((sofa) => {

    //Création des constantes liées aux détails du produit 
    const title = document.getElementById("title");
    const description = document.getElementById("description");
    const itemImg = document.getElementsByClassName("item__img");
    let price = document.getElementById("price");
    

    //Insertion les constantes dans le code HTML
    description.innerHTML = sofa.description;
    title.innerHTML = sofa.name;
    price.innerHTML = sofa.price;


    let text = "";
    text = text +`<img src="${sofa.imageUrl}"alt ="${sofa.altTxt}"></img>`;
    itemImg[0].innerHTML = text;
   

    //Initialisation de la constante utilisée pour les couleurs
    const colors = sofa.colors;
    let textColors = " ";

    //Boucle récupérant chaque couleur disponible
    colors.forEach((colors,index) =>
    textColors = textColors + `<option value="${colors}">${colors}</option>`);

    //Insertion des couleurs dans le menu déroulant
    const colorSelect = document.getElementById("colors");
      colorSelect.innerHTML = textColors
    
  })  
  .catch(function(error) {
    console.error(error)
  }) 

//Tableau
function getArticle (Array,value){
  let condition = false

  for(elem of Array){
    if (elem.id == value){
      return condition = true
    }
  }
  return condition
};

function getColor (Array,value,id){
  let condition = false

  for(elem of Array){
    if (elem.color == value && elem.id == id){
      return condition = true
    }
  }
  return condition
};


let addToCart = document.getElementById("addToCart");

//Fonction d'ajout au panier en écoutant le 'click' utilisateur sur le bouton 'Ajouter au panier'
addToCart.addEventListener('click',function () {

  let name = document.getElementById('title').textContent;
  
  //Format de l'objet qu'on souhaite avoir dans le panier
  let sofa = {
    id : idProduct,
    color: colors.value,
    quantity: parseInt(quantity.value),
    name : name,
  };
  
//Pop Up de confirmation et ajout au panier

  //Si la quantité choisie est comprise entre 1 et 100
  if (quantity.value >= 1 && quantity.value <= 100){
    //Quantité déjà présente dans le localstorage
    if(localStorage.getItem('panier')){
      let cartStorage = JSON.parse(localStorage.getItem('panier'));
      if (getArticle(cartStorage,sofa.id)){
        if (getColor(cartStorage,sofa.color,sofa.id)){
            cartStorage.forEach(element => {
            if (element.id == sofa.id && element.color == sofa.color){
              element.quantity += sofa.quantity
              localStorage.setItem('panier',JSON.stringify(cartStorage));
             alert('Votre commande a été ajoutée au panier');
            }
          })
        }else{
            cartStorage.push(sofa);
          localStorage.setItem('panier',JSON.stringify(cartStorage));
          alert('Votre commande a été ajoutée au panier');
        }
      }else{
        cartStorage.push(sofa);
      localStorage.setItem('panier',JSON.stringify(cartStorage));
    }
  }else{
    let cartStorage = [];
    cartStorage.push(sofa);
    localStorage.setItem('panier',JSON.stringify(cartStorage));
    alert('Votre commande a été ajoutée au panier');
    // console.log('le panier est vide')
    }
  }else{
    alert("Veuillez choisir un nombre d'article compris entre 1 et 100")
  }
});