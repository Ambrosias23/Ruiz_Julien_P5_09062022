let url = new URL(window.location.href);
let productId = url.searchParams.get('id');
//console.log(productId);

fetch("http://localhost:3000/api/products/"+productId)
.then(function(res) {
	if (res.ok) {
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
	
	
	// Creating itemCart
	const cartItem = {
		productId: productId,
		color: colors.value,
		quantity: quantity.value,
	}
	

	// Getting cart from localstorage
	let cart = []; // Initialisation au cas ou il n'existe pas dans le LS
	let cartFromLS = localStorage.getItem("cart");
	if(cartFromLS !== null) {
		cart = JSON.parse(cartFromLS);
	}
	if (quantity.value <= 0) {
        console.log ("Il manque des informations");
	};
	
	if(color = value="--SVP, choisissez une couleur --" ){
		console.log ("mqe color");
	};
	// Adding the cartItem to the cart
		cart.push(cartItem);
	// Saving the cart to LS
		localStorage.setItem("cart",JSON.stringify(cart));
	
	
})