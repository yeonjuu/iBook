// import { addCommas } from '../useful-functions.js';

const pluseBtn = document.querySelector('.plus');
const minusBtn = document.querySelector('.minus');
const countSpan = document.querySelector('.count');

const title = document.querySelector('.title');
const author = document.querySelector('.author');
const publisher = document.querySelector('.publisher');
const price = document.querySelector('.price');
const img = document.querySelector('.img-wrap >img');
const description = document.querySelector('.description');
const total = document.querySelector('.total');
const category = document.querySelector('.category');

const cart = document.querySelector('.cart');

/*
const product = await fetch(){ API.get(~) }
*/
const productDummy = {
  title: '인생의허무를어떻게할것인가',
  author: '김영민',
  price: 15000,
  publisher: '엘리스출판사',
  images: '../../images/bookId2.jpg',
  description: '2023년도 트렌드를 알 수 있는 ,,',
  category: {
    _id: '635f98f046d704367ad6a470',
    name: '인문',
  },
  rate: 5,
};

productRender();

let count = Number(countSpan.innerText);

const span = document.createElement('span');
span.className = 'totalPrice';
total.appendChild(span);

let totalPrice = calculateTotalPrice();

pluseBtn.addEventListener('click', function () {
  count++;
  countSpan.textContent = count;
  totalPrice = productDummy.price * count;
  calculateTotalPrice();
});

minusBtn.addEventListener('click', function () {
  if (count == 1) {
    console.log('수량확인');
    return;
  } else {
    count--;
    countSpan.textContent = count;
    totalPrice = productDummy.price * count;
    calculateTotalPrice();
  }
});

cart.addEventListener('click', addCarts);

function addCarts() {
  let isCheck = false;
  let carts = JSON.parse(localStorage.getItem('carts')) || [];
  const cart = {
    title: productDummy.title,
    price: productDummy.price,
    count: count,
    totalPrice: totalPrice,
    imgaes: productDummy.images,
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

function productRender() {
  title.textContent = productDummy.title;
  author.textContent = productDummy.author;
  price.textContent = addCommas(productDummy.price);
  publisher.textContent = productDummy.publisher;
  img.src = productDummy.images;
  description.textContent = productDummy.description;
  category.textContent = productDummy.category.name;
}

function addCommas(price) {
  return price.toLocaleString('ko-kr');
}

function calculateTotalPrice() {
  let totalPrice = productDummy.price * count;
  span.innerText = `${addCommas(totalPrice)}원`;
  return totalPrice;
}
