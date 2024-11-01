const katalog__bottom__right = document.querySelector(".katalog__bottom__right") as HTMLElement;

const apii = "https://6718988a7fc4c5ff8f4a1f17.mockapi.io/users";

interface Product {
  img: string;
  title_name: string;
  price: string;
  title: string;
  category: string;  
}

fetch(apii)
  .then((response) => response.json())
  .then((data: Product[]) => renderProducts(data))
  .catch((error) => console.error("Error:", error.message));

function renderProducts(products: Product[]) {
  katalog__bottom__right.innerHTML = ''; 

  products.forEach((product) => {
    if (product.img && product.title_name && product.price && product.title) {
      katalog__bottom__right.innerHTML += `
        <div class="card">
          <div class="card__img">
            <img src="${product.img}" alt="${product.title_name}" />
          </div>
          <div class="card__text">
            <h4>${product.title_name}</h4>
            <p>${product.title}</p>
            <div class="btnlar">
              <button class="price">${product.price}</button>
              <div class="plus_minus">
                <button class="minus">-</button>
                <p class="total">0</p>
                <button class="plus">+</button>
              </div>
              <i class="fa-solid fa-cart-shopping"></i>
            </div>
          </div>
        </div>
      `;
    }
  });
}

katalog__bottom__right.addEventListener("click", (e: MouseEvent) => {
  const target = e.target as HTMLElement;

  if (target.classList.contains("plus") || target.classList.contains("minus")) {
    const totalElement = target.closest('.plus_minus')?.querySelector(".total") as HTMLElement;
    let num: number = parseInt(totalElement.textContent || '0');

    if (target.classList.contains("plus")) {
      num += 1;
    } else if (target.classList.contains("minus") && num > 0) {
      num -= 1;
    }

    totalElement.textContent = num.toString();
  }
});

const ul = document.querySelector("ul") as HTMLElement;

ul?.addEventListener("click", (e: MouseEvent) => {
  const target = (e.target as HTMLElement).closest('a');  // 'a' tegi uchun 'closest' dan foydalaning
  if (target) {
    const id = target.id;
    filterData(id);  
  }
});

function filterData(id: string) {
  fetch(apii)
    .then((response) => response.json())
    .then((data: Product[]) => {
      const filteredData = data.filter((item) => item.category === id);
      renderFilteredProducts(filteredData);   
    })
    .catch((error) => console.error('Error:', error.message));
}

function renderFilteredProducts(filteredProducts: Product[]) {
  katalog__bottom__right.innerHTML = '';  

  filteredProducts.forEach((product) => {
    if (product.img && product.title_name && product.price && product.title) {
      katalog__bottom__right.innerHTML += `
        <div class="card">
          <div class="card__img">
            <img src="${product.img}" alt="" />
          </div>
          <div class="card__text">
            <h4>${product.title_name}</h4>
            <p>${product.title}</p>
            <div class="btnlar">
              <button class="price">${product.price}</button>
              <div class="plus_minus">
                <button class="minus">-</button>
                <p class="total">0</p>
                <button class="plus">+</button>
              </div>
              <i class="fa-solid fa-cart-shopping"></i>
            </div>
          </div>
        </div>
      `;
    }
  });
}
