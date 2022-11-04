import * as Api from '/api.js';

const pluseBtn = document.querySelector('.plus');
const minusBtn = document.querySelector('.minus');
const countSpan = document.querySelector('.count');

const titleSpan = document.querySelector('.title');
const authorSpan = document.querySelector('.author');
const publisherSpan = document.querySelector('.publisher');
const priceSpan = document.querySelector('.price');
const img = document.querySelector('.img-wrap >img');
const descriptionSpan = document.querySelector('.description');
const totalSpan = document.querySelector('.total');
const categorySpan = document.querySelector('.category');
const cart = document.querySelector('.cart');

// const productId = url.split('/')[2];

// const product = await Api.get('/api/products', productId);

//임시데이터
const product = {
  _id: '6364d13edfe25a059f7bd3f3',
  title: '트렌드',
  author: '2023',
  price: 14000,
  publisher: '새로운출판사',
  images: ['/uploads/bookId3.jpg', 'url2'],
  description: '상세설명',
  rate: 0,
  category: null,
  createdAt: '2022-11-04T08:45:50.500Z',
  updatedAt: '2022-11-04T08:45:50.500Z',
  __v: 0,
};

//상품 정보 변수 저장
const { title, author, price, publisher, images, description, category } =
  product;

console.log(images);

//페이지에 텍스트 변수 전달
productRender();

//수량 변경
let count = Number(countSpan.innerText);

const span = document.createElement('span');
span.className = 'totalPrice';
totalSpan.appendChild(span);

let totalPrice = calculateTotalPrice();

//플러스 수량 증가
pluseBtn.addEventListener('click', function () {
  count++;
  countSpan.textContent = count;
  totalPrice = product.price * count;
  calculateTotalPrice();
});

//마이너스 수량 감소
minusBtn.addEventListener('click', function () {
  if (count == 1) {
    console.log('수량확인');
    return;
  } else {
    count--;
    countSpan.textContent = count;
    totalPrice = product.price * count;
    calculateTotalPrice();
  }
});

//장바구니 넣으면 로컬스토리지에 정보전달
cart.addEventListener('click', addCarts);

function addCarts() {
  let isCheck = false;
  let carts = JSON.parse(localStorage.getItem('carts')) || [];
  const cart = {
    title: product.title,
    price: product.price,
    count: count,
    totalPrice: totalPrice,
    imgaes: product.images,
  };
  carts.forEach((c, idx) => {
    if (c.title == cart.title) {
      carts[idx].count += count;
      carts[idx].totalPrice += totalPrice;
      localStorage.setItem('carts', JSON.stringify(carts));
      isCheck = true;
    }
  });
  if (!isCheck) {
    carts.push(cart);
    localStorage.setItem('carts', JSON.stringify(carts));
  }
  console.log('store carts');
}

//데이터 로드
function productRender() {
  titleSpan.textContent = title;
  authorSpan.textContent = author;
  priceSpan.textContent = addCommas(price);
  publisherSpan.textContent = publisher;
  img.src = images[0];
  descriptionSpan.textContent = description;
  categorySpan.textContent = category;
}
//단위
function addCommas(price) {
  return price.toLocaleString('ko-kr');
}
//총 금액 계산 및 변경
function calculateTotalPrice() {
  let totalPrice = product.price * count;
  span.innerText = `${addCommas(totalPrice)}원`;
  return totalPrice;
}
