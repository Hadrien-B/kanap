// Récupération du localStorage
let cart = JSON.parse(localStorage.getItem("panier"));

// Variable pour stocker les articles présents dans le panier (utilisés pour créer la commande)
let products = [];

// Variable qui récupère l'orderId envoyé par le serveur
let orderId = "";


// Contenu du panier
async function displayCart() {
  const parser = new DOMParser();
  const emptyCart = document.getElementById("cart__items");
  let cartArray = [];

  // Si le panier est vide
  if (cart === null || cart === 0) {
    emptyCart.textContent = "Votre panier est vide";
  } else {
    console.log("Des produits sont présents dans le panier");
  }

  // Si le panier contient des produits
  for (i = 0; i < cart.length; i++) {
    const product = await getProductById(cart[i].id);
    let price = (product.price);
    const totalPriceItem = (product.price *= cart[i].quantity);

    cartArray += `<article class="cart__item" data-id="${cart[i].id}" data-color="${cart[i].color}">
                  <div class="cart__item__img">
                      <img src="${product.imageUrl}" alt="${product.altTxt}">
                  </div>
                  <div class="cart__item__content">
                      <div class="cart__item__content__description">
                          <h2>${product.name}</h2>
                          <p>${cart[i].color}</p>
                            <p>Prix unitaire: ${price}€</p>
                      </div>
                      <div class="cart__item__content__settings">
                        <div class="cart__item__content__settings__quantity">
                            <p id="quantité">
                              Qté : <input data-id= ${cart[i].id} data-color= ${cart[i].color} type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${cart[i].quantity}>
                            </p>
                            <p id="sousTotal">Prix total pour cet article: ${totalPriceItem}€</p> 
                        </div>
                        <div class="cart__item__content__settings__delete">
                          <p data-id= ${cart[i].id} data-color= ${cart[i].color} class="deleteItem">Supprimer</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  </article>`;
  }

  

  // Boucle d'affichage du nombre total d'articles dans le panier et de la somme totale
  let totalQuantity = 0;
  let totalPrice = 0;

  for (i = 0; i < cart.length; i++) {
    const article = await getProductById(cart[i].id);
    totalQuantity += parseInt(cart[i].quantity);
    totalPrice += parseInt(article.price * cart[i].quantity);
  }

  document.getElementById("totalQuantity").innerHTML = totalQuantity;
  document.getElementById("totalPrice").innerHTML = totalPrice;

  if (i == cart.length) {
    const displayBasket = parser.parseFromString(cartArray, "text/html");
    emptyCart.appendChild(displayBasket.body);
    changeQuantity();
    deleteItem();
  }
}

// Récupération des produits de l'API
async function getProductById(productId) {
  return fetch("http://localhost:3000/api/products/" + productId)
    .then(function (res) {
      return res.json();
    })
    .catch((_err) => {
      // Erreur serveur
      console.log("erreur");
    })
    .then(function (response) {
      return response;
    });
}
displayCart();

// Modification de la quantité
function changeQuantity() {
  const quantityInputs = document.querySelectorAll(".itemQuantity");
  quantityInputs.forEach((quantityInput) => {
    quantityInput.addEventListener("change", (event) => {
      event.preventDefault();
      const inputValue = event.target.value;
      const dataId = event.target.getAttribute("data-id");
      const dataColor = event.target.getAttribute("data-color");
      let cart = localStorage.getItem("panier");
      let items = JSON.parse(cart);

      items = items.map((item, _index) => {
        if (item.id === dataId && item.color === dataColor) {
          item.quantity = inputValue;
        }
        return item;
      });

      let itemsStr = JSON.stringify(items);
      localStorage.setItem("panier", itemsStr);
      // Raffraichissement de la page "Pannier"
      location.reload();
    });
  });
}

// Suppression d'un article
function deleteItem() {
  const deleteButtons = document.querySelectorAll(".deleteItem");
  deleteButtons.forEach((deleteButton) => {
    deleteButton.addEventListener("click", (event) => {
      event.preventDefault();
      const deleteId = event.target.getAttribute("data-id");
      const deleteColor = event.target.getAttribute("data-color");
      cart = cart.filter(
        (element) => !(element.id == deleteId && element.color == deleteColor)
      );
      console.log(cart);

      localStorage.setItem("panier", JSON.stringify(cart));
      // Raffraichissement de la page "Pannier"
      location.reload();
      alert("L'article a été supprimé du panier.");
    });
  });
}

// Formulaire de contact


const btnOrder = document.querySelector("#order");

// Ecoute du bouton "commander" avant la validation de la commande
btnOrder.addEventListener("click", (event) => {
  event.preventDefault();

  let contact = {
    firstName: document.querySelector("#firstName").value,
    lastName: document.querySelector("#lastName").value,
    address: document.querySelector("#address").value,
    city: document.querySelector("#city").value,
    email: document.querySelector("#email").value,
  };

  console.log(contact);

  //Contrôle des champs du formulaire

  // Regex pour des champs "Prénom", "Nom" et "Ville"
  const firstName_LastName_City = (value) => {
    return /^[[A-Za-zâêîôûäëïöüÄËÏÖÜÂÊÎÔÛéèà\s]{3,50}$/.test(value);
  };

  // Regex du champ "Adresse"
  const adressRegex = (value) => {
    return /^[a-zA-Z0-9-_ ]{5,50}[]{0,2}$/.test(value);
  };

  // Regex du champ "Email"
  const emailRegex = (value) => {
    return /^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$/.test(value);
  };

  // Contrôle du champ Prénom:
  function firstNameControl() {
    const prenom = contact.firstName;
    let inputFirstName = document.querySelector("#firstName");
    if (firstName_LastName_City(prenom)) {
      inputFirstName.style.backgroundColor = "green";

      document.querySelector("#firstNameErrorMsg").textContent = "";
      return true;
    } else {
      inputFirstName.style.backgroundColor = "#FF6F61";

      document.querySelector("#firstNameErrorMsg").textContent =
        "Champ Prénom de formulaire invalide, ex: Paul";
      return false;
    }
  }

  // Contrôle du champ Nom:
  function lastNameControl() {
    const nom = contact.lastName;
    let inputLastName = document.querySelector("#lastName");
    if (firstName_LastName_City(nom)) {
      inputLastName.style.backgroundColor = "green";

      document.querySelector("#lastNameErrorMsg").textContent = "";
      return true;
    } else {
      inputLastName.style.backgroundColor = "#FF6F61";

      document.querySelector("#lastNameErrorMsg").textContent =
        "Champ Nom de formulaire invalide, ex: Durand";
      return false;
    }
  }

  // Contrôle du champ Adresse:
  function addressControl() {
    const adresse = contact.address;
    let inputAddress = document.querySelector("#address");
    if (adressRegex(adresse)) {
      inputAddress.style.backgroundColor = "green";

      document.querySelector("#addressErrorMsg").textContent = "";
      return true;
    } else {
      inputAddress.style.backgroundColor = "#FF6F61";

      document.querySelector("#addressErrorMsg").textContent =
        "Champ Adresse de formulaire invalide, ex: 50 rue de la paix";
      return false;
    }
  }

  // Contrôle du champ Ville:
  function cityControl() {
    const ville = contact.city;
    let inputCity = document.querySelector("#city");
    if (firstName_LastName_City(ville)) {
      inputCity.style.backgroundColor = "green";

      document.querySelector("#cityErrorMsg").textContent = "";
      return true;
    } else {
      inputCity.style.backgroundColor = "#FF6F61";

      document.querySelector("#cityErrorMsg").textContent =
        "Champ Ville de formulaire invalide, ex: Paris";
      return false;
    }
  }

  // Contrôle du champ Email:
  function mailControl() {
    const courriel = contact.email;
    let inputMail = document.querySelector("#email");
    if (emailRegex(courriel)) {
      inputMail.style.backgroundColor = "green";

      document.querySelector("#emailErrorMsg").textContent = "";
      return true;
    } else {
      inputMail.style.backgroundColor = "#red";

      document.querySelector("#emailErrorMsg").textContent =
        "L'email renseigné est invalide, ex: contact@kanap.com";
      return false;
    }
  }

  // Contrôle de la validité du formulaire avant de l'envoyer dans le local storage
  if (
    firstNameControl() &&
    lastNameControl() &&
    addressControl() &&
    cityControl() &&
    mailControl()
  ) {
    // Enregistrement du formulaire
    localStorage.setItem("contact", JSON.stringify(contact));

    document.querySelector("#order").value =
      "Votre commande et vos informations sont validées\n CLiquez pour valider !";
    sendToServer();
  } else {
    error("Veuillez bien remplir le formulaire");
  }

  /* FIN GESTION DU FORMULAIRE */

  /* Envoi d'une requête au serveur afin de transmettre les données*/
  function sendToServer() {
    fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      body: JSON.stringify({ contact, products }),
      headers: {
        "Content-Type": "application/json",
      },
      catch(error){
        console.error(error)
      }
    })
      // Récupération et stockage de la réponse de l'API (orderId)
      .then((response) => {
        return response.json();
      })
      .then((server) => {
        orderId = server.orderId;
        console.log(orderId);
      });

    // Si l'orderId a bien été récupéré, on redirige l'utilisateur vers la page de Confirmation
    if (orderId != "") {
      location.href = "confirmation.html?id=" + orderId;
    }
  }  
});





// Maintenir le contenu du localStorage dans le champs du formulaire

let oderForm = JSON.parse(localStorage.getItem("contact"));

console.log(oderForm);
if (oderForm) {
  document.querySelector("#firstName").value = oderForm.firstName;
  document.querySelector("#lastName").value = oderForm.lastName;
  document.querySelector("#address").value = oderForm.address;
  document.querySelector("#city").value = oderForm.city;
  document.querySelector("#email").value = oderForm.email;
} else {
  console.log("Le formulaire est vide");
}