document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const url = this.getAttribute("href");

    document.body.style.opacity = "0";
    document.body.style.transition = "opacity 0.4s ease";

    setTimeout(() => {
      window.location.href = url;
    }, 400);
  });
});

const productsData = {
  rings: [
    {
      name: "GIOXRNO Waterproof Ring",
      price: "₹79904",
      oldPrice: "₹99904",
      colors: {
        gold: "ringG1.jpg",
        silver: "ringS.jpg",
      },
    },
    {
      name: "Petal Glow Ring",
      price: "₹68904",
      oldPrice: "₹88904",
      colors: {
        gold: "ring2G.jpg",
        silver: "ringS2.jpg",
      },
    },
    {
      name: "Classic Diamond Ring",
      price: "₹85904",
      oldPrice: "₹105904",
      colors: {
        gold: "ringG3.jpg",
        silver: "ring3S.jpg",
      },
    },
  ],
  pendants: [
    {
      name: "Solitaire Drop Pendant",
      price: "₹45,900",
      oldPrice: "₹59,900",
      colors: {
        gold: "p1g.jpg",
        silver: "p1s.jpg",
      },
    },
    {
      name: "Minimal Heart Pendant",
      price: "₹29,900",
      oldPrice: "₹39,900",
      image: "p2.jpg",
    },
  ],

  bracelets: [
    {
      name: "Twisted Petal Bracelet",
      price: "₹79,904",
      oldPrice: "₹99,904",
      colors: {
        gold: "bg2.jpg",
        silver: "bs1.jpg",
      },
    },
    {
      name: "Classic Chain Bracelet",
      price: "₹39,500",
      oldPrice: "₹49,500",
      image: "bg1.jpg",
    },
  ],

  bangles: [
    {
      name: "Royal Gold Bangle",
      price: "₹99,900",
      oldPrice: "₹1,19,900",
      colors: {
        gold: "bangleG.jpg",
        silver: "bangleS1.jpg",
      },
    },
    {
      name: "Elegant Minimal Bangle",
      price: "₹54,900",
      oldPrice: "₹69,900",
      image: "bangleG2.jpg",
    },
  ],

  earrings: [
    {
      name: "Golden Hoop Earrings",
      price: "₹35,900",
      oldPrice: "₹45,900",
      colors: {
        gold: "er1g.jpg",
        silver: "er1S.jpg",
      },
    },
  ],
};

const productGrid = document.getElementById("productGrid");
const tabs = document.querySelectorAll(".tab");

function loadProducts(category, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";

  let items = [];

  if (category === "all") {
    Object.values(productsData).forEach((arr) => {
      items = items.concat(arr);
    });
  } else {
    items = productsData[category] || [];
  }

  items.forEach((product, index) => {
    const card = createProductCard(product, index);
    container.appendChild(card);
  });

  attachColorEvents();
}

function attachColorEvents() {
  document.querySelectorAll(".color-dot").forEach((dot) => {
    dot.addEventListener("click", () => {
      const img = document.getElementById(dot.dataset.img);
      changeImage(img, dot.dataset.src);
    });
  });
}

function changeImage(imgEl, src) {
  imgEl.style.opacity = "0";

  setTimeout(() => {
    imgEl.src = src;
    imgEl.style.opacity = "1";
  }, 250);
}

/* Tab Switch */
tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");

    loadProducts(tab.dataset.category, "productGrid");
  });
});

function createProductCard(product, index) {
  const card = document.createElement("div");
  card.className = "product-card";

  const hasColors = product.colors;
  const defaultImg = hasColors
    ? Object.values(product.colors)[0]
    : product.image;

  card.innerHTML = `
    <div class="product-img">
      <img src="${defaultImg}" id="img-${index}">
    </div>

    <p class="product-title">${product.name}</p>
    <p class="price">${product.price} <del>${product.oldPrice}</del></p>

    ${
      hasColors
        ? `<div class="colors">
            ${Object.entries(product.colors)
              .map(
                ([color, src]) =>
                  `<span class="color-dot"
                    style="background:${color}"
                    data-src="${src}"
                    data-img="img-${index}"></span>`
              )
              .join("")}
          </div>`
        : ""
    }
  `;

  return card;
}

loadProducts("rings", "productGrid");

const mainImage = document.getElementById("mainGiftImage");
const cards = document.querySelectorAll(".gift-card");
cards.forEach((card) => {
  card.addEventListener("click", () => {
    const imgSrc = card.querySelector("img").src;

    // Active state
    cards.forEach((c) => c.classList.remove("active"));
    card.classList.add("active");

    // Smooth transition
    mainImage.style.opacity = "0";
    mainImage.style.transform = "scale(0.98)";

    setTimeout(() => {
      mainImage.src = imgSrc;
      mainImage.style.opacity = "1";
      mainImage.style.transform = "scale(1)";
    }, 200);
  });
});

/* ================= SEARCH FUNCTIONALITY ================= */

const searchInput = document.querySelector(".search-box input");
const searchIcon = document.querySelector(".search-box i");

function getAllProducts() {
  let allProducts = [];

  Object.entries(productsData).forEach(([category, items]) => {
    items.forEach((item) => {
      allProducts.push({
        ...item,
        category,
      });
    });
  });

  return allProducts;
}

function handleSearch() {
  const query = searchInput.value.trim().toLowerCase();
  if (!query) return;

  window.location.href = `search-results.html?q=${encodeURIComponent(query)}`;
}

searchIcon.addEventListener("click", handleSearch);

searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") handleSearch();
});

