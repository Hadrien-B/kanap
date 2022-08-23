const getProductId = () => {
    return new URL(location.href).searchParams.get("id");
  };
  const orderId = getProductId();
  const cart = JSON.parse(localStorage.getItem("panier"));
  const idConfirmation = document.querySelector("#orderId");
  
  //Affichage de l'orderId dans le DOM
  (function () {
    idConfirmation.innerHTML = `${orderId}`;
    localStorage.clear();
  })();