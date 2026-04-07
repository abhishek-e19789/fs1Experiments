const products = [
  { name: "Wireless Headphones", price: "$129.99", category: "electronics" },
  { name: "Cotton T-Shirt", price: "$24.99", category: "clothing" },
  { name: "Bluetooth Speaker", price: "$89.99", category: "electronics" },
  { name: "Denim Jeans", price: "$59.99", category: "clothing" },
];

const productList = document.getElementById("productList");
const categoryFilter = document.getElementById("categoryFilter");

function displayProducts(filter) {
  productList.innerHTML = "";

  const filteredProducts = filter === "all"
    ? products
    : products.filter(product => product.category === filter);

  filteredProducts.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <h3>${product.name}</h3>
      <p>${product.price}</p>
      <p>[${product.category}]</p>
    `;
    productList.appendChild(card);
  });
}

categoryFilter.addEventListener("change", () => {
  displayProducts(categoryFilter.value);
});

displayProducts("all");