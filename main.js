"use strict";
// Katalog bo'limini DOM elementiga olish
const katalog__bottom__right = document.querySelector(".katalog__bottom__right");
// API URL manzili
const apii = "https://6718988a7fc4c5ff8f4a1f17.mockapi.io/users";
// API'dan ma'lumotlarni olish
fetch(apii)
    .then((response) => response.json())
    .then((data) => renderProducts(data))
    .catch((error) => console.error("Error:", error.message));
// Ma'lumotlarni ekranga chiqarish funksiyasi
function renderProducts(products) {
    katalog__bottom__right.innerHTML = ''; // Avvalgi ma'lumotlarni tozalash
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
// Plus va minus tugmalariga click hodisasini qo'shish
katalog__bottom__right.addEventListener("click", (e) => {
    var _a;
    const target = e.target;
    if (target.classList.contains("plus") || target.classList.contains("minus")) {
        const totalElement = (_a = target.closest('.plus_minus')) === null || _a === void 0 ? void 0 : _a.querySelector(".total");
        let num = parseInt(totalElement.textContent || '0');
        if (target.classList.contains("plus")) {
            num += 1;
        }
        else if (target.classList.contains("minus") && num > 0) {
            num -= 1;
        }
        totalElement.textContent = num.toString();
    }
});
// Kategoriya bo'yicha ma'lumotlarni filtrlash
const ul = document.querySelector("ul");
ul === null || ul === void 0 ? void 0 : ul.addEventListener("click", (e) => {
    const target = e.target.closest('a'); // 'a' tegi uchun 'closest' dan foydalaning
    if (target) {
        const id = target.id;
        filterData(id); // Filtrlash funksiyasi
    }
});
// Filtr funksiyasi: API'dan ma'lumotlarni olish va filtrlash
function filterData(id) {
    fetch(apii)
        .then((response) => response.json())
        .then((data) => {
        const filteredData = data.filter((item) => item.category === id);
        renderFilteredProducts(filteredData); // Filtrlashdan keyin ekranga chiqarish
    })
        .catch((error) => console.error('Error:', error.message));
}
// Filtrlangan ma'lumotlarni ekranga chiqarish funksiyasi
function renderFilteredProducts(filteredProducts) {
    katalog__bottom__right.innerHTML = ''; // Avvalgi ma'lumotlarni tozalash
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
//# sourceMappingURL=main.js.map