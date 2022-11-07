import * as Api from '/api.js';

const cartList = document.querySelector('.li');
const productPrice = document.querySelector('.productPrice');
const totalPrice = document.querySelector('.totalPrice');
const delivery = document.querySelector('.deliveryPrice');
const body = document.querySelector('.hidden');
const orderer = document.querySelector('#orderer');
const email = document.querySelector('#email');
const phoneNumber = document.querySelector('#phoneNumber');
const ordererInfoContents = document.querySelector('.ordererInfoContents');
const submitBtn = document.querySelector('.submitBtn');
const Info = document.querySelector('.Info');
const address = document.querySelector('.address');
const detailAddress = document.querySelector('.detailAddress');

let user;
let password;
let checkPassword;
let token = sessionStorage.getItem('token');
let deliveryPrice = 0;
let carts = JSON.parse(localStorage.getItem('carts')) || {};
carts = carts = new Map(Object.entries(carts));
let cart = JSON.parse(localStorage.getItem('cart'));
let totalPriceValue = 0;
let deliveryMin = 30000;

rednerCarts();
function passwordHtml() {
  return `<div class="password inputSort">
    <div><strong>주문조회 비밀번호</strong></div>
    <div>
      <input
        id="password"
        type="text"
        placeholder="비밀번호를 입력해 주세요"
        required
      />
      <p>
        (주문조회시 필요합니다.)
      </p>
    </div>
  </div>
  <div class="checkPassword inputSort">
    <div><strong>주문조회 비밀번호 확인</strong></div>
    <div>
      <input
        id="checkPassword"
        type="text"
        placeholder="비밀번호를 입력해 주세요"
        required
      />
    </div>
  </div>`;
}

function productTemplate(img, title, price, count, id) {
  return `<li class="product" id=${id}>
    <div>
      <img src=${img} />
    </div>
    <div id="productInfo">
      <div>${title}</div>
      <div class="qty">${count}</div>
    </div>
    <div>
      <p>${price * count}</p>
      <p>원</p>
    </div>
  </li>`;
}

function submit(a) {
  a.preventDefault();
  let qty = 0;
  const d = [];
  const productsInfo = [];
  products.forEach((product) => {
    qty += Number(document.querySelector('.qty').innerHTML);
    productsInfo.push({
      productId: product.id,
      qty: Number(document.querySelector('.qty').innerHTML),
    });
  });
  let data = {
    name: orderer.value,
    userId: user._id || 'none',
    phone: phoneNumber.value,
    address: address.value,
    paymentMethod: '현금',
    email: email.value,
    qty: qty,
    products: productsInfo,
  };
  console.log(data);
  Api.post(`/api/orders/`, data);
  //   if (userCheck) {
  //   } else {
  //     if (checkPassword.value === password.value) {
  //       alert("성공");
  //     } else {
  //       alert("주문조회 비밀번호가 같은지 확인해주세요");
  //     }
  //   }
}

function rednerCarts() {
  if (cart === null) {
    console.log(carts);
    for (let [cartItemId, cartItem] of carts) {
      cartList.insertAdjacentHTML(
        'beforeend',
        productTemplate(
          cartItem.imgaes[0],
          cartItem.title,
          cartItem.price,
          cartItem.count,
          cartItemId
        )
      );
      totalPriceValue += cartItem.price * cartItem.count;
    }
  } else {
    cartList.insertAdjacentHTML(
      'beforeend',
      productTemplate(cart.imgaes[0], cart.title, cart.price, cart.count)
    );
    totalPriceValue += cart.price * cart.count;
  }
}
productPrice.innerHTML = `${totalPriceValue}원`;
if (totalPriceValue < deliveryMin) {
  deliveryPrice = 3000;
}
delivery.innerHTML = `${deliveryPrice}원`;
totalPrice.innerHTML = `${totalPriceValue + deliveryPrice}`;

function delay(ms) {
  // 카테고리 로딩 실험용
  return new Promise((reslove) => setTimeout(reslove, ms));
}

async function loadUserInfo() {
  return await Api.get(`/api/users/${token}`);
}
const products = document.querySelectorAll('.product');
if (token) {
  user = await loadUserInfo();
  body.classList.remove('hidden');
  orderer.value = user.fullName;
  email.value = user.email;
  phoneNumber.value = user.phoneNumber;
} else {
  body.classList.remove('hidden');
  //   ordererInfoContents.insertAdjacentHTML("beforeend", passwordHtml());
  password = document.querySelector('#password');
  checkPassword = document.querySelector('#checkPassword');
}
Info.addEventListener('submit', submit);
