import { inquiryProduct } from './inquiryProduct.js';
import { getAddProduct } from './addProduct.js';
//관리자 권한확인하기
// function checkAdmin() {
//   const token = sessionStorage.getItem('token');

//   if (!token) {
//     alert('접근 불가 (ERROR : 로그인 여부 확인)');
//   } else {
//   }
// }

//default page
inquiryProduct();

//상품조회, 페이지 그리는거 따로 빼서 관리, 메뉴바 관리
const products = document.querySelector('.products');
const add = document.querySelector('.add');

products.addEventListener('click', inquiryProduct);
add.addEventListener('click', getAddProduct);
