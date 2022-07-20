let url = new URL(window.location.href);
let productId = url.searchParams.get('id');
//console.log(productId);

fetch("http://localhost:3000/api/products/"+productId)
.then(function(res) {
	if(res.ok) {
		return res.json();
	}
})
.then(function(value) {
	let product = value;
	//console.log(product);
	
	// Assigning img data
	let imgContainer = document.querySelector(".item__img");
	let img = document.createElement("img");
	img.src = product.imageUrl;
	img.alt = product.altTxt;
	imgContainer.appendChild(img);

	// Assigning title data
	title.innerText = product.name;
	
	// Name of page
	let titleOfPage = document.querySelector("title");
    titleOfPage.innerText = product.name;
	
	// Assigning price data
	let price = document.getElementById('price');
	price.innerText = product.price;

	// Assigning description data
	let description = document.getElementById('description');
	description.innerText = product.description;

	// Handling select options
	console.log(product.colors);
	for(const color of product.colors) {
		let selectColors = document.getElementById("colors");
		let option = new Option(color, color);
		selectColors.appendChild(option);
	}
})
.catch(function(err) {
	console.log('Une erreur est survenue');
	console.log(err);
});

// Listening to "click" event on cart button
const button = document.getElementById('addToCart');
button.addEventListener('click',(event)=>{
	// Checking product color
	if(colors.value =="" || colors.value == null){
		alert("Merci de renseigner une couleur");
	}
	else{
		//checking product quantity
		if(quantity.value <= 0){
			alert("Merci de renseigner une quantité");
		}
		else {
			// Creating itemNewCart
			const cartNewItem = {
				productId: productId,
				color: colors.value,
				quantity: quantity.value,
			}
			// Getting cart from localstorage
			let cart = []; // Initialization in case it does not exist in the LS
			let cartFromLS = localStorage.getItem("cart");
			if(cartFromLS !== null) {
				cart = JSON.parse(cartFromLS);
			}
			let isProductAlreadyInCart = false;
			for(let cartItem of cart) {
				if(cartNewItem.productId == cartItem.productId && cartNewItem.color == cartItem.color) {
			  		//The product is already in the basket I modify this quantity
					isProductAlreadyInCart = true;
					cartItem.quantity = parseInt(cartItem.quantity) + parseInt(cartNewItem.quantity);
				}
			}
			// Adding the cartItem to the cart
			if(isProductAlreadyInCart == false){
				cart.push(cartNewItem);
			}
			// Saving the cart to LS
			localStorage.setItem("cart",JSON.stringify(cart));		
		
			button.innerText = " Ajouter dans le panier !"

			setTimeout(() => {
				console.log("Action déclenchée dans une seconde.");
				button.innerText = "Ajouter au panier"; 
			}, "500")
			
		}
	}
});
	




	
	
		
	  
