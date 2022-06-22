let url = new URL(window.location.href);
    let id = url.searchParams.get('id');
    console.log(id);

fetch("http://localhost:3000/api/products/"+id)
.then(function(res) {
  if (res.ok) {
    return res.json();
  }
})
.then(function(value) {
let products = value;

console.log(products);
    
let img = document.getElementsByClassName("item__img");
let price = document.getElementById('price');
let description = document.getElementById('description');

img.src=products.imageUrl;
img.alt=products.altTxt;
title.innerText = products.name;
price.innerText = products.price;
description.innerText = products.description;

});
const button = document.getElementsById('addToCard');    
button.addEventListener('click', function() {          
  
  button.innerText("C'est validé !");            
});