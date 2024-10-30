document.addEventListener("DOMContentLoaded", () => {
    const katalog__bottom__right = document.querySelector(".katalog__bottom__right") as HTMLElement;
  
    const apii = "https://6718988a7fc4c5ff8f4a1f17.mockapi.io/users";
  
    fetch(apii)
      .then((response) => response.json())
      .then((value) => get__information(value))
      .catch((error) => console.error(error.message));
  
    function get__information(value: Array<{ img: string; title_name: string; price: string; title: string }>) {
      value.forEach((element) => {
        if (element.img && element.title_name && element.price && element.title) {
          katalog__bottom__right.innerHTML += `
            <div class="card">
              <div class="card__img">
                <img src="${element.img}" alt="" />
              </div>
              <div class="card__text">
                <h4>${element.title_name}</h4>
                <p>${element.title}</p>
                <div class="btnlar">
                  <button class="price">${element.price}</button>
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
  
    // pluss usuli
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
  });
  

//   Bu sortlashidi