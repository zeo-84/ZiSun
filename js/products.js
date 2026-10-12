export async function initProducts() {
  try {
    const response = await fetch("js/data/products.json");
    const data = await response.json();

    const sortedProducts = [...data.products].reverse();

    renderProducts(sortedProducts);
    initLikeButtons();
  } catch (error) {
    console.error("Failed to load products:", error);
  }
}

function renderProducts(products) {
  const grid = document.querySelector(".products__grid");
  if (!grid) return;

  grid.innerHTML = products
    .map(
      (p) => `
        <article class="product-card" data-id="${p.id}">
            <div class="product-card__info">
                <h3 class="product-card__name">${p.name}</h3>
            </div>
            <div class="product-card__image-wrapper">
                <img src="${p.image}" alt="${p.name}" class="product-card__image">
            </div>
            <button class="product-card__like" aria-label="افزودن به علاقه‌مندی‌ها">
                <svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
            </button>
        </article>
    `
    )
    .join("");
}

function initLikeButtons() {
  const likeButtons = document.querySelectorAll(".product-card__like");

  likeButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      btn.classList.toggle("is-liked");
    });
  });
}
