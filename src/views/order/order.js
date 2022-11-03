const li = document.querySelector(".li");
const productPrice = document.querySelector(".productPrice");
const totalPrice = document.querySelector(".totalPrice");
const delivery = document.querySelector(".deliveryPrice");
const body = document.querySelector(".hidden");
const orderer = document.querySelector("#orderer");
const email = document.querySelector("#email");
const phoneNumber = document.querySelector("#phoneNumber");
const ordererInfoContents = document.querySelector(".ordererInfoContents");
const submitBtn = document.querySelector(".submitBtn");
const Info = document.querySelector(".Info");

let password;
let checkPassword;
console.log(submitBtn);

let userCheck = false;
let deliveryPrice = 0;
let baskets = JSON.parse(localStorage.getItem("carts")) || [];
let totalPriceValue = 0;
let deliveryMin = 30000;

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
  email: "tutor-sw2@elicer.com",
  fullName: "tutor",
  phoneNumber: "010-0000-0000",
};
b = JSON.stringify(b);
if (baskets.length > 0) {
  baskets.forEach((basket) => {
    li.insertAdjacentHTML(
      "beforeend",
      productTemplate(basket.imgaes, basket.title, basket.price, basket.count)
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

async function fakefetch(url) {
  // 가짜 백엔드 호출
  return new Promise((resolve, reject) => {
    return resolve(b);
  });
}
function delay(ms) {
  // 카테고리 로딩 실험용
  return new Promise((reslove) => setTimeout(reslove, ms));
}

const a = async () => {
  await delay(1000);
  const json = await fakefetch("url");
  const data = JSON.parse(json);
  body.classList.remove("hidden");
  orderer.value = data.fullName;
  email.value = data.email;
  phoneNumber.value = data.phoneNumber;
};

if (userCheck) {
  a();
} else {
  body.classList.remove("hidden");
  //   ordererInfoContents.insertAdjacentHTML("beforeend", passwordHtml());
  password = document.querySelector("#password");
  checkPassword = document.querySelector("#checkPassword");
}
Info.addEventListener("submit", submit);
