import * as Api from '/api.js';

const li = document.querySelector('.li');
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
const address = document.querySelector('#address');

let password;
let checkPassword;
let userCheck = false;
let deliveryPrice = 0;
let baskets = JSON.parse(localStorage.getItem('carts')) || [];
let cart = JSON.parse(localStorage.getItem('cart'));
let totalPriceValue = 0;
let deliveryMin = 30000;
// if (sessionStorage.getItem('token')) {
//   userCheck = true;
// }
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

function productTemplate(img, title, price, count) {
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

function submit(a) {
  a.preventDefault();
  const d = [];
  baskets.forEach((val) => {
    // title이 아니라 id로 바꿔야됨
    d.push(val.title);
  });
  console.log(d);
  let data = {
    name: orderer.value,
    phone: phoneNumber.value,
    address: address.value,
    paymentMethod: totalPrice.innerHTML,
    email: email.value,
    qty: 1,
    password: 1234,
    productIds: d,
  };
  // 나중에 세션스토리지에 id 값 오면 수정
  data = {
    name: '길동이',
    phone: '010-1234-5678',
    address: '여기가 어디 나는 누구?',
    paymentMethod: '현금',
    email: 'google@google.com',
    qty: 10,
    password: 1234,
    productIds: ['63620e42617d39dce34454c1', '6362325d02731c2524d6955c'],
  };
  console.log(data);
  Api.post('/api/orders', data);

  //   if (userCheck) {
  //   } else {
  //     if (checkPassword.value === password.value) {
  //       alert("성공");
  //     } else {
  //       alert("주문조회 비밀번호가 같은지 확인해주세요");
  //     }
  //   }
}

let b = {
  email: 'tutor-sw2@elicer.com',
  fullName: 'tutor',
  phoneNumber: '010-0000-0000',
};
b = JSON.stringify(b);
if (cart === null) {
  if (baskets.length > 0) {
    baskets.forEach((basket) => {
      li.insertAdjacentHTML(
        'beforeend',
        productTemplate(
          basket.imgaes[0],
          basket.title,
          basket.price,
          basket.count
        )
      );
      totalPriceValue += basket.price * basket.count;
    });
  }
} else {
  li.insertAdjacentHTML(
    'beforeend',
    productTemplate(cart.imgaes[0], cart.title, cart.price, cart.count)
  );
  totalPriceValue += cart.price * cart.count;
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
  const user = await Api.get();
}

if (userCheck) {
  loadUserInfo();
} else {
  body.classList.remove('hidden');
  //   ordererInfoContents.insertAdjacentHTML("beforeend", passwordHtml());
  password = document.querySelector('#password');
  checkPassword = document.querySelector('#checkPassword');
}
Info.addEventListener('submit', submit);
