//장바구니로 바로 가도록 연결해놓고 있음
//장바구니이동 선택 시, 이동
import * as Api from '/api.js';

const pluseBtn = document.querySelector('.plus');
const minusBtn = document.querySelector('.minus');
const countEl = document.querySelector('.count');

const titleEl = document.querySelector('.title');
const authorEl = document.querySelector('.author');
const publisherEl = document.querySelector('.publisher');
const priceEl = document.querySelector('.price');
const descriptionEl = document.querySelector('.description');
const categoryEl = document.querySelector('.category');
const totalPriceEl = document.querySelector('.totalPrice');

const cart = document.querySelector('.cart');
const img = document.querySelector('.img-wrap >img');

//상품 정보 변수 저장
const product = await loadData();

const { title, author, price, publisher, images, description, category } =
  product;

//페이지에 텍스트 변수 전달
renderProduct();

let count = Number(countEl.innerText);
totalPriceEl.textContent = priceSToString(calTotalPrice(price, count));

addAllEvents();

//이벤트 처리
function addAllEvents() {
  pluseBtn.addEventListener('click', function () {
    count++;
    countEl.textContent = count;
    totalPriceEl.textContent = priceSToString(calTotalPrice(price, count));
  });
  minusBtn.addEventListener('click', function () {
    if (count == 1) {
      console.log('수량확인');
      return;
    } else {
      count--;
      countEl.textContent = count;
      totalPriceEl.textContent = priceSToString(calTotalPrice(price, count));
    }
  });
  cart.addEventListener('click', addCarts);
}

//함수
//데이터 로드
async function loadData() {
  const url = window.location.pathname;
  const productId = url.split('/')[2];

  const product = await Api.get('/api/products', productId);
  return product;
}

//데이터 랜더링
function renderProduct() {
  titleEl.textContent = title;
  authorEl.textContent = author;
  priceEl.textContent = priceSToString(price);
  publisherEl.textContent = publisher;
  img.src = images[0];
  descriptionEl.textContent = description;
  categoryEl.textContent = category;
}

//장바구니 추가 함수
function addCarts() {
  let carts = JSON.parse(localStorage.getItem('carts')) || {};
  carts = new Map(Object.entries(carts));
  const id = product._id;
  const cartItem = {
    title: product.title,
    price: product.price,
    count: count,
    totalPrice: calTotalPrice(price, count),
    imgaes: product.images,
  };

  if (carts.has(id)) {
    carts.get(id).count += count;
    carts.get(id).totalPrice += calTotalPrice(price, count);
    localStorage.setItem('carts', JSON.stringify(Object.fromEntries(carts)));
  } else {
    carts.set(id, cartItem);
    localStorage.setItem('carts', JSON.stringify(Object.fromEntries(carts)));
  }
  const isCart = confirm('장바구니로 이동하시겠습니까?');
  if (isCart) {
    window.location.href = '/cart';
  }
  countEl.textContent = 1;
  totalPriceEl.textContent = priceSToString(price);
}

//단위
function priceSToString(price) {
  return `${price.toLocaleString('ko-kr')}원`;
}

//총 금액 계산 및 변경
function calTotalPrice(price, count) {
  return price * count;
}
