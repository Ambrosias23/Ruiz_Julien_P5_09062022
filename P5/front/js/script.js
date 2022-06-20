fetch('http://localhost:3000/api/products')
.then(function(res) {
  if (res.ok) {
    return res.json();
  }
})
.then(function(value) {
  let products = value;
for(const product of products) {
  console.log(product);
  let a= document.createElement("a");
  let article = document.createElement("article");
  let img= document.createElement("img");
  let h3 = document.createElement ("h3");
  h3.classList.add("productName");
  let p = document.createElement ("p");
  p.classList.add("productDescription");
document.getElementById('items').appendChild(a);
a.appendChild(article) 
article.appendChild(img);
article.appendChild(h3); 
article.appendChild(p);
a.href= "file:///Users/julien/Documents/OpenClassRooms/P5/P5/front/html/product."+ "product._id";
img.src= product.imageUrl;
img.alt=product.altTxt;
h3.innerText = product.name;
p.innerText= product.description;
}})
.catch(function(err) {
  console.log ('Une erreur est survenue')
  console.log (err)
})
;
