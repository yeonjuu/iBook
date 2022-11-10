import * as Api from '/api.js';
import * as useful from '/useful-functions.js';

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
const detailAddress = document.querySelector('#detailAddress');

let reviseOrder = localStorage.getItem('orderId');
let user;
let password;
let checkPassword;
let token = sessionStorage.getItem('token');
let deliveryPrice = 0;
let carts = JSON.parse(localStorage.getItem('carts')) || {};
carts = carts = new Map(Object.entries(carts));
let cart = JSON.parse(localStorage.getItem('cart'));
let totalPriceValue = 0;
let deliveryMin = 0;

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
      <p>${useful.addCommas(price * count)}</p>
      <p>원</p>
    </div>
  </li>`;
}

function buy(a) {
  a.preventDefault();
  const products = document.querySelectorAll('.product');

  const count = document.querySelectorAll('.qty');
  let qty = 0;
  const d = [];
  const productsInfo = [];
  let address1 = address.value + detailAddress.value;
  products.forEach((product, idx) => {
    qty += Number(count[idx].innerHTML);
    productsInfo.push({
      productId: product.id,
      qty: Number(count[idx].innerHTML),
    });
  });

  let data = {
    name: orderer.value,
    userId: user._id || 'none',
    phone: phoneNumber.value,
    address: address1,
    paymentMethod: '현금',
    email: email.value,
    qty: qty,
    products: productsInfo,
  };

  Api.post(`/api/orders/`, data);
  localStorage.removeItem('carts');
  localStorage.removeItem('cart');
  // location.replace('/orderComplete');
  //   if (userCheck) {
  //   } else {
  //     if (checkPassword.value === password.value) {
  //       alert("성공");
  //     } else {
  //       alert("주문조회 비밀번호가 같은지 확인해주세요");
  //     }
  //   }
}
async function revise(e) {
  e.preventDefault();
  const order = await loadOrderInfo();
  if (order.status === '주문취소') {
    alert('이미 취소된 주문건 입니다');
    localStorage.removeItem('orderId');
    return;
  } else if (order.status !== '주문완료') {
    alert('배송이 시작된 주문건 입니다 고객센터에 문의 해주시길 바랍니다');
    localStorage.removeItem('orderId');
  }
  let address1 = address.value + detailAddress.value;
  let data = {
    name: orderer.value,
    userId: user._id || 'none',
    phone: phoneNumber.value,
    address: address1,
    paymentMethod: '현금',
    email: email.value,
    qty: order.qty,
    products: order.products,
  };
  Api.put(`/api/orders/`, order._id, data);
  localStorage.removeItem('orderId');
  location.replace('/orderChange');
}

function rednerCarts() {
  if (cart === null) {
    // cartList.insertAdjacentElement(
    //   'beforeend',
    //   carts
    //     .map(([cartItemId, cartItem]) => {
    //       totalPriceValue += cartItem.price * cartItem.count;
    //       return productTemplate(
    //         cartItem.imgaes[0],
    //         cartItem.title,
    //         cartItem.price,
    //         cartItem.count,
    //         cartItemId
    //       );
    //     })
    //     .join('')
    // );
    let tem = ``;
    for (let [cartItemId, cartItem] of carts) {
      tem +=
        '\n' +
        productTemplate(
          cartItem.imgaes[0],
          cartItem.title,
          cartItem.price,
          cartItem.count,
          cartItemId
        );
      totalPriceValue += cartItem.price * cartItem.count;
    }
    cartList.insertAdjacentHTML('beforeend', tem);
  } else {
    cartList.insertAdjacentHTML(
      'beforeend',
      productTemplate(cart.images, cart.title, cart.price, cart.count, cart.id)
    );
    totalPriceValue += cart.price * cart.count;
  }
}

function rednerReviseOrder(order) {
  const products = order.products;
  cartList.insertAdjacentHTML(
    'beforeend',
    products
      .map((product) => {
        totalPriceValue += product.productId.price * product.qty;
        return productTemplate(
          product.productId.images[0],
          product.productId.title,
          product.productId.price,
          product.qty
        );
      })
      .join('')
  );
}
function renderPrice() {
  productPrice.innerHTML = `${useful.addCommas(totalPriceValue)}원`;
  if (totalPriceValue < deliveryMin) {
    deliveryPrice = 3000;
  }
  delivery.innerHTML = `${deliveryPrice}원`;
  totalPrice.innerHTML = `${useful.addCommas(totalPriceValue + deliveryPrice)}`;
}

function delay(ms) {
  // 카테고리 로딩 실험용
  return new Promise((reslove) => setTimeout(reslove, ms));
}

async function loadUserInfo() {
  return await Api.get(`/api/users/${token}`);
}
async function loadOrderInfo() {
  return await Api.get(`/api/orders/${reviseOrder}`);
}

if (reviseOrder) {
  user = await loadUserInfo();
  const order = await loadOrderInfo();
  submitBtn.innerHTML = '수정하기';
  orderer.value = user.fullName;
  email.value = user.email;
  phoneNumber.value = user.phoneNumber;
  rednerReviseOrder(order);
  renderPrice();
  Info.addEventListener('submit', revise);
} else if (token) {
  user = await loadUserInfo();

  orderer.value = user.fullName;
  email.value = user.email;
  phoneNumber.value = user.phoneNumber;
  rednerCarts();
  renderPrice();
  Info.addEventListener('submit', buy);
} else {
  //   ordererInfoContents.insertAdjacentHTML("beforeend", passwordHtml());
  password = document.querySelector('#password');
  checkPassword = document.querySelector('#checkPassword');
  rednerCarts();
  renderPrice();
  Info.addEventListener('submit', buy);
}
