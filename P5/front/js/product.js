let url = new URL(window.location.href);
    let id = url.searchParams.get('id');
    console.log(id);

fetch("http://localhost:3000/api/products/"+ id)
.then(function(res) {
  if (res.ok) {
    return res.json();
  }
})
.then(function(value) {
    let products = value;
  for(const product of products) {
    console.log(product);
    
let image = doucment.getElementByClassName('item__img'); 
let title = document.getElementById('title');
let price = document.getElementByIdprice('price');
let description = document.getElementById('description');
let colors = colors;
image.src=product.imageUrl;
image.alt=product.altTxt;
title.innerText = product.name;
price.innerText = product.price;
description.innerText = product.description;
colors.value = product.colors;

  }});
