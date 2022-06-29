let productId = localStorage.productId;
console.log(productId);

fetch("http://localhost:3000/api/products/"+localStorage.getItem("productId"))
.then(function(res) {
  if(res.ok) {
    return res.json();
  }
})

.then(function(value) {
	let product = value; 

// Creating <article>
    let article = document.createElement("article");
    article.classList.add("cart__item");
//article.dataset.add("{product-ID}");
//article.dataset.add("{product-color}");
    cart__items.appendChild(article);

//Creating <div> et <img>
    let divImg = document.createElement("div");
    divImg.classList.add("cart__item__img");
    let img = document.createElement("img");
		img.src = product.imageUrl;
		img.alt = product.altTxt;
    article.appendChild(divImg);
    divImg.appendChild(img);

//Creating divContent
    let divContent = document.createElement("div");
    divContent.classList.add("cart__item__content");
    article.appendChild(divContent);

//Creating divDescription
    let divDescription = document.createElement("div");
    divDescription.classList.add("cart__item__content__description");
    divContent.appendChild(divDescription);

//Creating in divDescription of h2 and p 
    let h2 = document.createElement("h2");
    h2.innerText = product.name;
    let colorProduct = document.createElement("p");
    colorProduct.innerText = localStorage.getItem("color");
    let priceProduct = document.createElement("p");
    priceProduct.innerText = product.price + "€";
    divDescription.appendChild(h2);
    divDescription.appendChild(colorProduct);
    divDescription.appendChild(priceProduct);

//creating divSetting
    let divSetting = document.createElement("div");
    divSetting.classList.add("cart__item__content__settings");
    divContent.appendChild(divSetting);

// creating in divSetting of quantity
    let divQuantity = document.createElement("div");
    divQuantity.classList.add("cart__item__content__settings__quantity");
    divSetting.appendChild(divQuantity);

// Creating in quantity of <p> and <input>
    let pQte = document.createElement("p");
    let input = document.createElement("input");
    input.type = Number;
    input.classList.add("itemQuantity");
    input.name = "itemQuantity";
    input.min = 1;
    input.max = 100;
    input.value = 42;
    divQuantity.appendChild(pQte);
    divQuantity.appendChild(input);

// Creating divDelete and p
    let divDelete = document.createElement("div");
    divDelete.classList.add("cart__item__content__settings__delete");
    let p = document.createElement("p");
    divDelete.classList.add("deleteItem");
    p.innerText = "Supprimer";
    divSetting.appendChild(divDelete);
    divDelete.appendChild(p);
    })
