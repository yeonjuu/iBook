import { inquiryProduct } from './inquiryProduct.js';
import { getAddProduct } from './addProduct.js';
import * as Api from '../api.js';

//관리자 권한확인하기
try {
  await Api.get('/api/admin/check');
} catch (err) {
  alert('관리자만 접근할 수 있습니다.');
  window.location.href = '/';
}

//default page
inquiryProduct();

//상품조회, 페이지 그리는거 따로 빼서 관리, 메뉴바 관리
const user = document.querySelector('.user');
const products = document.querySelector('.products');
const add = document.querySelector('.add');

const userName = await findUserName();
user.textContent = stringName(userName);

addAllEvents();

function addAllEvents() {
  products.addEventListener('click', inquiryProduct);
  add.addEventListener('click', getAddProduct);
}

async function findUserName() {
  let token = sessionStorage.token;
  const user = await Api.get('/api/users', token);
  return user.fullName;
}

function stringName(name) {
  return `${name}님, 안녕하세요🤠`;
}
