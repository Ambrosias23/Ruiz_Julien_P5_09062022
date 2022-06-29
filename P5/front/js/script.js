fetch('http://localhost:3000/api/products')
.then(function(res) {
  if(res.ok) {
    return res.json();
  }
})
.then(function(value) {
	let products = value;
	for(const product of products) {
		//console.log(product);
 
		// Creating <a>
		let a = document.createElement("a");
		a.href = "./product.html?id="+product._id;
 
		// Creating <article>
		let article = document.createElement("article");
		a.appendChild(article)
 
		// Creating <img>
		let img = document.createElement("img");
		img.src = product.imageUrl;
		img.alt = product.altTxt;
		article.appendChild(img);
 
		// Creating <h3>
		let h3 = document.createElement ("h3");
		h3.innerText = product.name;
		h3.classList.add("productName");
		article.appendChild(h3);
 
		// Creating <p>
		let p = document.createElement ("p");
		p.classList.add("productDescription");
		p.innerText = product.description;
		article.appendChild(p);
 
		// Appending tag to existing html
		document.getElementById('items').appendChild(a);
	}
})
.catch(function(err) {
	console.log('Une erreur est survenue');
	console.log(err);
});