// Getting back my cart from localstorage
let cart = []; // Initialisation au cas ou il n'existe pas dans le LS
let cartFromLS = localStorage.getItem("cart");
if(cartFromLS !== null) {
	cart = JSON.parse(cartFromLS);
}
//console.log(cart);
//console.log(cart[0]);
//console.log(cart[0].productId);

// Looping on each cartItem from cart
for(key in cart) {
	let cartItem = cart[key];
	fetch("http://localhost:3000/api/products/"+cartItem.productId)
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
		article.setAttribute('data-id', cartItem.productId);
		article.setAttribute('data-color', cartItem.color);
		cart__items.appendChild(article);

		// Creating <div> et <img>
		let divImg = document.createElement("div");
		divImg.classList.add("cart__item__img");
		let img = document.createElement("img");
		img.src = product.imageUrl;
		img.alt = product.altTxt;
		article.appendChild(divImg);
		divImg.appendChild(img);

		// Creating divContent
		let divContent = document.createElement("div");
		divContent.classList.add("cart__item__content");
		article.appendChild(divContent);

		// Creating divDescription
		let divDescription = document.createElement("div");
		divDescription.classList.add("cart__item__content__description");
		divContent.appendChild(divDescription);

		// Creating in divDescription of h2 and p
		let h2 = document.createElement("h2");
		h2.innerText = product.name;
		let colorProduct = document.createElement("p");
		colorProduct.innerText = cartItem.color;
		let priceProduct = document.createElement("p");
		priceProduct.innerText = product.price * cartItem.quantity + "€";
		divDescription.appendChild(h2);
		divDescription.appendChild(colorProduct);
		divDescription.appendChild(priceProduct);

		// Creating divSetting
		let divSetting = document.createElement("div");
		divSetting.classList.add("cart__item__content__settings");
		divContent.appendChild(divSetting);

		// Creating in divSetting of quantity
		let divQuantity = document.createElement("div");
		divQuantity.classList.add("cart__item__content__settings__quantity");
		divSetting.appendChild(divQuantity);

		// Creating in quantity of <p> and <input>
		let pQte = document.createElement("p");
        pQte.innerText= "Qté :";
		let input = document.createElement("input");
		input.type = "Number";
		input.classList.add("itemQuantity");
		input.name = "itemQuantity";
		input.min = 1;
		input.max = 100;
		input.value = cartItem.quantity;
		divQuantity.appendChild(pQte);
		divQuantity.appendChild(input);

		// Creating divDelete and p
        let divDelete = document.createElement("div");
        divDelete.classList.add("cart__item__content__settings__delete");
        let p = document.createElement("p");
        p.classList.add("deleteItem");
        p.innerText = "Supprimer";
        divSetting.appendChild(divDelete);
        divDelete.appendChild(p);
        
        // Computing cart total mount
        let totalCartPrice = document.getElementById('totalPrice');
        let totalCartPriceValue;
        if(totalCartPrice.innerText == '') {
            totalCartPriceValue = 0;
        }
        else {
            totalCartPriceValue = parseInt(totalCartPrice.innerText);
        }
            totalCartPrice.innerText = totalCartPriceValue + (parseInt(product.price) * parseInt(cartItem.quantity));
    
        // Computing cart total items
        let totalCartItemQuantity = document.getElementById('totalQuantity');
        let totalCartItemQuantityValue;
        if(totalCartItemQuantity.innerText == '') {
            totalCartItemQuantityValue = 0;
        }
        else {
            totalCartItemQuantityValue = parseInt(totalCartItemQuantity.innerText);
        }
        totalCartItemQuantity.innerText = totalCartItemQuantityValue + parseInt(cartItem.quantity);
    
        // Handling delete button
		p.addEventListener('click', (event) => {
			// Getting productId & productColor from the product to delete
			console.log('cartItem.productId', cartItem.productId);
			console.log('cartItem.color', cartItem.color);
			// Checking every cartItem from localStorage
			for(tmpKey in cart) {
				let tmpCartItem = cart[tmpKey];
				if(cartItem.productId == tmpCartItem.productId && cartItem.color == tmpCartItem.color) {
				    // Deleting the product from the cart
				    cart.splice(tmpKey, 1);
				    // Saving the updated cart into LocalStorage
				    localStorage.setItem("cart",JSON.stringify(cart));
				    // Refreshing the page
				    document.location.reload();
				}
			}
	    });

		// Handling quantity update
		input.addEventListener('change', (event) => {
		    // Getting productId & productColor from the product to delete
			console.log('cartItem.productId', cartItem.productId);
			console.log('cartItem.color', cartItem.color);
			// Checking every cartItem from localStorage
			    for(tmpKey in cart) {
					let tmpCartItem = cart[tmpKey];
					if(cartItem.productId == tmpCartItem.productId && cartItem.color == tmpCartItem.color) {
						console.log('trouvé');
						// Updating the quantity of the product from the cart
						cartItem.quantity = input.value;
						// Saving the updated cart into LocalStorage
						localStorage.setItem("cart",JSON.stringify(cart));
						// Refreshing the page
						document.location.reload();
					}
				}
		});
    })
	.catch(function(err) {
		console.log('Une erreur est survenue');
		console.log(err);
	});
}

let btnSendForm = document.querySelector('#order');
//Listen for the order button on the click to be able to control, validate and submit the form and products to the back-end:
btnSendForm.addEventListener('click', (e) => {
	e.preventDefault();
	//create contact :
	const contact = {
    	firstName : document.querySelector("#firstName").value,
    	lastName : document.querySelector("#lastName").value,
    	address : document.querySelector("#address").value,
    	city : document.querySelector("#city").value,
    	email : document.querySelector("#email").value,
    };
	function firstNameControle () {     
		//Regex firstName :
		const firstName = contact.firstName;  
		let inputFirstName = document.querySelector("#firstName");
		if (/^([A-Za-z\s]{3,20})?([-]{0,1})?([A-Za-z]{3,20})$/.test(firstName)) {
			inputFirstName.style.border = "solid 2px green";
			document.querySelector("#firstNameErrorMsg").textContent = "";
			return true;
		}else{
			inputFirstName.style.border = "solid 2px red";
			document.querySelector("#firstNameErrorMsg").textContent = "Champ Prénom de formulaire invalide, ex: Bernard";
			return false;
		}
	}
	function lastNameControle () {     
		//Regex lastName :
		const lastName = contact.lastName; 
		let inputLastName = document.querySelector("#lastName"); 
		if (/^([A-Za-z\s]{3,20})?([-]{0,1})?([A-Za-z]{3,20})$/.test(lastName)) {
			inputLastName.style.border = "solid 2px green";
			document.querySelector("#lastNameErrorMsg").textContent = "";
			return true;
		}else{
			inputLastName.style.border = "solid 2px red";
			document.querySelector("#lastNameErrorMsg").textContent = "Champ Nom de formulaire invalide, ex: Durand";
			return false;
		}	
	}
	function addressControl () {     
		// Regex address :
		const adresse = contact.address;  
		let inputAddress = document.querySelector("#address");
		if (/^[A-Za-z0-9\s]{5,100}$/.test(adresse)) {
			inputAddress.style.border = "solid 2px green";
			document.querySelector("#addressErrorMsg").textContent = "";
			return true;
		}else{
			inputAddress.style.border = "solid 2px red";
			document.querySelector("#addressErrorMsg").textContent = "Champ Adresse de formulaire invalide, ex: 50 rue de la paix";
			return false;
		}
	}
	function cityControl () {     
		//Regex city :
		const city = contact.city;  
		let inputCity = document.querySelector("#city");
		if (/^([A-Za-z\s]{3,20})?([-]{0,1})?([A-Za-z]{3,20})$/.test(city)) {
			inputCity.style.border = "solid 2px green";
			document.querySelector("#cityErrorMsg").textContent = "";
			return true;
		}else {
			inputCity.style.border = "solid 2px red";
			document.querySelector("#cityErrorMsg").textContent = "Champ Ville de formulaire invalide, ex: Bordeaux";
			return false;
		}
	}
	function emailControle () {     
		//Regex email :
		const email = contact.email;  
		let inputMail = document.querySelector("#email");
		if (/^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$/.test(email)) {
			inputMail.style.border = "solid 2px green";
			document.querySelector("#emailErrorMsg").textContent = "";
			return true;
		}else{
			inputMail.style.border = "solid 2px red";
			document.querySelector("#emailErrorMsg").textContent = "Champ Email de formulaire invalide, ex: example@contact.fr";
			return false;
		}
	}
	//Control final : 
	if (firstNameControle() && lastNameControle() && addressControl() && cityControl() && emailControle()) {
		localStorage.setItem("contact", JSON.stringify(contact));
		sendFromToServer();
	}else{
		alert("Veillez bien remplir le formulaire")
	}
	// Variable that retrieves the orderId sent as a response by the server during the POST request:
	var orderId = "";
	function sendFromToServer () {
		fetch("http://localhost:3000/api/products/order", {
			method: "POST",
			body:JSON.stringify({contact, cart}) ,
			headers: {
				"Content-Type": "application/json",
			},
		}) 
		.then((res) => {
			return res.json();
		})
		.then((server) => {
			orderId = server.orderId;
			// If the orderId variable is not an empty string, we redirect our user to the confirmation page with the variable:
			if (orderId != "") {
				alert("Votre commande à bient était prise en compte");
				location.href = "confirmation.html?id=" + orderId;
			}
		})
	}
})
