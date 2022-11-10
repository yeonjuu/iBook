import * as Api from '/api.js';

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




//로그인 여부에 따라 상단 메뉴 노출 유무 설정
const login = document.querySelector('#login');
const logout = document.querySelector('#logout');
const adminPage = document.querySelector('#adminPage');
const edit = document.querySelector('#edit');
const editAtag = document.querySelector('#edit a');
const seeOrder = document.querySelector('#seeOrder');
const register = document.querySelector('#register');

const userToken = sessionStorage.token;
const isLogin = Boolean(userToken);

//로그인 유저 확인
if (isLogin) {
  checkLogin();
};

async function checkLogin() {
  const loginUser = await Api.get('/api/users', userToken);
  //console.log(loginUser);
  const isUser = loginUser.role === "user";
  const isAdmin = loginUser.role === "admin";

  if (isUser) {
    login.classList.add('hidden');
    register.classList.add('hidden');
    logout.classList.remove('hidden');
    edit.classList.remove('hidden');
    seeOrder.classList.remove('hidden');

    editAtag.innerText = `${loginUser.fullName}님의 프로필`;
    // alert(`${loginUser.fullName}님 안녕하세요!`);
  }

  //관리자 계정일 때
  if (isAdmin) {
    login.classList.add('hidden');
    register.classList.add('hidden');
    adminPage.classList.remove('hidden');
    logout.classList.remove('hidden');
  }


}
//로그아웃 버튼 클릭시 토큰 삭제

function logoutHandler() {
  sessionStorage.removeItem('token');
}

logout.addEventListener('click', logoutHandler);
