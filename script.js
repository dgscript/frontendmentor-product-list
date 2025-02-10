const addToCartButton = document.querySelectorAll(".add-to-cart-button");
const itemAmountContainer = document.querySelectorAll(".item-amount-container");
const addToCart = document.querySelectorAll(".add-to-cart");
const increaseAmount = document.querySelectorAll(".increaseAmount");
const decreaseAmount = document.querySelectorAll(".decreaseAmount");
const itemAmountCounter = document.querySelectorAll("item-amount-counter");
const yourCartItems = document.getElementById("your-cart");
const priceTotal = document.getElementById("price-total");
let itemAmountCache = 0;
let cartPriceTotal = 0.00;

/* load the products */
async function loadProducts() {
    const response = await fetch("./data.json")
    const data = await response.json();
    
    data.forEach(item => {
        document.querySelector("#cart-product-amount").innerHTML = "";

        const newCard = document.createElement("div");
        newCard.classList.add("card");
        newCard.innerHTML = `
            <div class="card-image-container">
              <img src="${item.image.desktop}" width="100%" class="card-image">
                <!-- add to cart button -->
                <div class="add-to-cart">
                  <button class="add-to-cart-button"><img src="assets/images/icon-add-to-cart.svg">Add to Cart</button>
                  <div class="item-amount-container">
                    <button class="increaseAmount">+</button>
                    <span class="item-amount-counter" data-amount="0">0</span>
                    <button class="decreaseAmount">-</button>
                  </div>
                </div>
            </div>
            <div class="card-content">
              <p class="product-name1">${item.category}</p>
              <p class="product-name2">${item.name}</p>
              <p class="content-price">$${item.price}</p>
            </div>
        `;
        const cardsContainer = document.getElementById("cards-container");
        cardsContainer.appendChild(newCard);

        const itemAmountContainer = newCard.querySelector(".item-amount-container")
        const addToCart = newCard.querySelector(".add-to-cart");
        const itemAmount = newCard.querySelector(".item-amount-counter")
        const addToCartButton = newCard.querySelector(".add-to-cart-button");
        const productImage = newCard.querySelector(".card-image");

        const yourCartContainer = document.getElementById("cart-product-amount");

        /* when clicked, the shopping cart button disapears and the product goes to the cart section */
        newCard.querySelector(".add-to-cart-button").addEventListener("click", (event) => {
            const emptyCartPage = document.querySelector(".empty-cart-page");
            const cartProductAmountContainer = document.querySelector(".cart-product-amount-container");
            emptyCartPage.style.display = "none";
            cartProductAmountContainer.style.display = "block";
            
            productImage.style.outline = "2px solid hsl(14, 86%, 42%)";
            addToCartButton.style.display = "none";
            itemAmountContainer.style.display = "flex";
            addToCart.style.backgroundColor = "hsl(14, 86%, 42%)";
            addToCart.style.borderColor = "hsl(14, 86%, 42%)";
            itemAmount.dataset.amount++;
            itemAmount.textContent = itemAmount.dataset.amount;
            const newDiv = document.createElement("div");
            newDiv.classList.add("product-in-cart");
            newDiv.innerHTML = `
              <p class="product-in-cart-title" data-thumbnailImage="${item.image.thumbnail}">${item.name}</p>
              <div style="display: flex; gap: 10px; margin-top: 5px;">
                <p class="product-in-cart-amount">1x</p>
                <p class="product-in-cart-value">@ $${item.price}</p>
                <p class="product-in-cart-value-total">$${item.price}</p>
              </div>
              <button class="remove-cart-item"><svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10"><path fill="#CAAFA7" d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"/></svg></button>
            `;
            yourCartContainer.appendChild(newDiv);

            itemAmountCache++;
            yourCartItems.textContent = `Your Cart (${itemAmountCache})`;

            cartPriceTotal += item.price;
            priceTotal.textContent = `$${cartPriceTotal}`;

            /* removes the in cart item */
            newDiv.querySelector(".remove-cart-item").addEventListener("click", (event)=> {
              cardTotalProducts = Number(newCard.querySelector(".item-amount-counter").dataset.amount);
              itemAmountCache -= cardTotalProducts
              yourCartItems.textContent = `Your Cart (${itemAmountCache})`;

              cardTotalValue = newDiv.querySelector(".product-in-cart-value-total").textContent.slice(1);
              cartPriceTotal -= cardTotalValue;
              const cartPriceTotalValue = priceTotal.textContent.slice(1);
              priceTotal.textContent = `$${cartPriceTotalValue - cardTotalValue}`;
              newDiv.remove();

              productImage.style.outline = "none";
              newCard.querySelector(".item-amount-counter").dataset.amount = "0";
              newCard.querySelector(".item-amount-container").style.display = "none";
              newCard.querySelector(".add-to-cart-button").style.display = "flex";
              newCard.querySelector(".add-to-cart-button").parentElement.style.backgroundColor = "white";
              newCard.querySelector(".add-to-cart-button").parentElement.style.borderColor = "hsl(14, 65%, 9%)";
            });
        })

        /* resets the page when the start new order button is clicked */
        const startNewOrderButton = document.querySelector(".start-new-order");
        const orderConfirmedCardWrapper = document.querySelector(".order-confirmed-cards-wrapper");
        const orderConfirmedWrapper = document.querySelector(".order-confirmed-wrapper");

        startNewOrderButton.addEventListener("click", () => {
          orderConfirmedCardWrapper.innerHTML = "";
          orderConfirmedWrapper.style.display = "none";
          yourCartContainer.innerHTML = "";
          yourCartItems.textContent = "Your Cart (0)"
          priceTotal.textContent = "$0"
          itemAmountCache = 0;
          cartPriceTotal = 0.00;
          itemAmount.dataset.amount = "0";
          itemAmount.textContent = itemAmount.dataset.amount;

          productImage.style.outline = "none";
          itemAmountContainer.style.display = "none";
          addToCartButton.style.display = "flex";
          addToCart.style.backgroundColor = "white";
          addToCart.style.borderColor = "hsl(14, 65%, 9%)";

          const emptyCartPage = document.querySelector(".empty-cart-page");
          const cartProductAmountContainer = document.querySelector(".cart-product-amount-container");
          emptyCartPage.style.display = "flex";
          cartProductAmountContainer.style.display = "none";
        });

        /* increse the amount of products */
        newCard.querySelector(".increaseAmount").addEventListener("click", (event) => {
            itemAmountCache++;
            itemAmount.dataset.amount++;
            itemAmount.textContent = itemAmount.dataset.amount;
            yourCartItems.textContent = `Your Cart (${itemAmountCache})`;

            cartPriceTotal += item.price;
            priceTotal.textContent = `$${cartPriceTotal}`;

            const cartProductAmount = document.querySelector("#cart-product-amount");

            const cardIndex = [...cartProductAmount.children].findIndex(card => card.querySelector(".product-in-cart-title").innerHTML === item.name);

            /* changes the amount value of the in cart item */
            cartProductAmount.children[cardIndex].querySelector(".product-in-cart-amount").textContent = `${event.target.parentElement.querySelector(".item-amount-counter").dataset.amount}x`;

            /* changes the total value of the in cart item */
            cartProductAmount.children[cardIndex].querySelector(".product-in-cart-value-total").textContent = `$${itemAmount.dataset.amount * item.price}`;
        })

        /* decrease the amount of products */
        newCard.querySelector(".decreaseAmount").addEventListener("click", (event) => {
            itemAmountCache--;
            itemAmount.dataset.amount--;
            itemAmount.textContent = itemAmount.dataset.amount;
            if(itemAmount.dataset.amount == "0"){
                itemAmountContainer.style.display = "none";
                addToCartButton.style.display = "flex";
                addToCart.style.backgroundColor = "white";
                addToCart.style.borderColor = "hsl(14, 65%, 9%)";
                productImage.style.outline = "none";
            }
            yourCartItems.textContent = `Your Cart (${itemAmountCache})`;

            cartPriceTotal -= item.price;
            priceTotal.textContent = `$${cartPriceTotal}`;

            cartProductAmount = document.querySelector("#cart-product-amount")

            const cardIndex = [...cartProductAmount.children].findIndex(card => card.querySelector(".product-in-cart-title").innerHTML === item.name);

            /* changes the amount value of the in cart item */
            cartProductAmount.children[cardIndex].querySelector(".product-in-cart-amount").textContent = `${event.target.parentElement.querySelector(".item-amount-counter").dataset.amount}x`;
            if(cartProductAmount.children[cardIndex].querySelector(".product-in-cart-amount").textContent === "0x"){
              cartProductAmount.children[cardIndex].remove();
            }

            /* changes the total value of the in cart item */
            cartProductAmount.children[cardIndex].querySelector(".product-in-cart-value-total").textContent = `$${itemAmount.dataset.amount * item.price}`;
        })

    })

  /* changes the image of the cards depending on the width view */
  setTimeout(() => {
    const screenSize = window.innerWidth;
    const cardsContainer = document.getElementById("cards-container");
    const cardsImage = cardsContainer.querySelectorAll(".card .card-image-container .card-image")

    /* tablet view */
    if(screenSize < 1100){
      for(let i = 0; i < data.length; i++){
        cardsImage[i].src = `${data[i].image.tablet}`;
      }
    };

    /* mobile view */
    if(screenSize < 800){
      for(let i = 0; i < data.length; i++){
        cardsImage[i].src = `${data[i].image.mobile}`;
      }
    }
  }, 100);

  const confirmOrderButton = document.getElementById("confirm-order-button");
  const orderConfirmedWrapper = document.querySelector(".order-confirmed-wrapper");
  const orderConfirmedCardWrapper = document.querySelector(".order-confirmed-cards-wrapper");

  confirmOrderButton.addEventListener("click", ()=>{
  cartProductAmount = document.querySelector("#cart-product-amount");
  Array.from(cartProductAmount.children).forEach(card => {
    orderConfirmedWrapper.style.display = "flex";
    const newCard = document.createElement("div");
    newCard.classList.add("order-confirmed-card");
    newCard.innerHTML = `
      <div style="display: flex;">
        <img src="${card.querySelector(".product-in-cart-title").dataset.thumbnailimage}">
        <div class="order-confirmed-card-description">
            <p class="order-confirmed-card-title">${card.querySelector(".product-in-cart-title").textContent}</p>
            <div style="display: flex; gap: 10px;">
              <p class="order-confirmed-card-amount">${card.querySelector(".product-in-cart-amount").textContent}</p>
              <p class="order-confirmed-card-price">${card.querySelector(".product-in-cart-value").textContent}</p>
            </div>
        </div>
      </div>
      <p class="order-confirmed-card-total">${card.querySelector(".product-in-cart-value-total").textContent}</p>
    `;
    orderConfirmedCardWrapper.appendChild(newCard);
    const orderConfirmedTotalValue = document.querySelector(".order-confirmed-total-value");
    orderConfirmedTotalValue.textContent = priceTotal.textContent;
    });
  })
}
loadProducts()

/* github.com/rezird */