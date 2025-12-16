const params = new URLSearchParams(window.location.search);
const query = params.get("q")?.toLowerCase();

const grid = document.getElementById("searchGrid");
const emptyBox = document.getElementById("emptySearch");
const title = document.getElementById("searchTitle");

title.innerHTML = `Search results for "<em>${query}</em>"`;

const allProducts = getAllProducts();

const matchedProducts = allProducts.filter(
  (p) =>
    p.name.toLowerCase().includes(query) ||
    p.category.toLowerCase().includes(query)
);

if (matchedProducts.length === 0) {
  emptyBox.style.display = "block";
} else {
  emptyBox.style.display = "none";
  renderSearchResults(matchedProducts);
}

function renderSearchResults(products) {
  grid.innerHTML = products
    .map((p, i) => {
      const img = p.colors ? Object.values(p.colors)[0] : p.image;

      return `
      <div class="search-card">
        <img src="${img}" alt="${p.name}">
        <h4>${p.name}</h4>
        <p class="price">${p.price} <del>${p.oldPrice}</del></p>
        <span class="tag">${p.category}</span>
      </div>
    `;
    })
    .join("");
}
