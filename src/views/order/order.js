const li = document.querySelector(".li");
const productPrice = document.querySelector(".productPrice");
const totalPrice = document.querySelector(".totalPrice");
const delivery = document.querySelector(".deliveryPrice");

let deliveryPrice = 0;
let baskets = JSON.parse(localStorage.getItem("carts")) || [];
let totalPriceValue = 0;
let deliveryMin = 30000;

function template(img, title, price, count) {
  return `<li class="product">
    <div>
      <img src=${img} />
    </div>
    <div id="productInfo">
      <div>${title}</div>
      <div>${count}</div>
    </div>
    <div>
      <p>${price * count}</p>
      <p>원</p>
    </div>
  </li>`;
}

if (baskets.length > 0) {
  baskets.forEach((basket) => {
    li.insertAdjacentHTML(
      "beforeend",
      template(basket.imgaes, basket.title, basket.price, basket.count)
    );
    totalPriceValue += basket.price * basket.count;
  });
}

productPrice.innerHTML = `${totalPriceValue}원`;
if (totalPriceValue >= deliveryMin) {
  deliveryPrice = 3000;
}
delivery.innerHTML = `${deliveryPrice}원`;
totalPrice.innerHTML = `${totalPriceValue + deliveryPrice}`;

console.log(totalPriceValue);
