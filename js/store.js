const filterButtons = document.querySelectorAll(".filter-btn");
const products = document.querySelectorAll(".product-item");

filterButtons.forEach(btn => {

btn.addEventListener("click", () => {

let category = btn.dataset.filter;

products.forEach(product => {

if(category === "all"){
product.style.display = "block";
}
else if(product.classList.contains(category)){
product.style.display = "block";
}
else{
product.style.display = "none";
}

});

});

});