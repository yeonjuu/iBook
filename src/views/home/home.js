// 아래는 현재 home.html 페이지에서 쓰이는 코드는 아닙니다.
// 다만, 앞으로 ~.js 파일을 작성할 때 아래의 코드 구조를 참조할 수 있도록,
// 코드 예시를 남겨 두었습니다.

import * as Api from "/api.js";
import { randomId } from "/useful-functions.js";


const firstRow = document.querySelector("#firstRow");
const secondRow = document.querySelector("#secondRow");
const thirdRow = document.querySelector("#thirdRow");


//책정보 받기
getProductData();

async function getProductData() {
  const product = await Api.get("api/products");

  //console.log(product); 

  const bookImage = await product.map((e) => e.images[0]);
  const bookTitle = product.map((e) => e.title);
  const bookId = product.map(e => e._id);

  // console.log(bookImage); 
  // console.log(bookTitle);
  // console.log(bookId);

  for (let i = 0; i < 5; i++) {
    const booktags = `<div><a href="/products/${bookId[i]}">
        <img src=${bookImage[i]}/>
        <span>${bookTitle[i]}</span>
        </a></div>`;
    firstRow.insertAdjacentHTML("beforeend", booktags);
    secondRow.insertAdjacentHTML("beforeend", booktags);
    thirdRow.insertAdjacentHTML("beforeend", booktags);
  };

};


//로그인 여부에 따라 상단 메뉴 노출 유무 설정
const loginBtn = document.querySelector("#loginBtn");
const logoutBtn = document.querySelector("#logoutBtn");
const editBtn = document.querySelector("#editBtn");
const seeOrderBtn = document.querySelector("#seeOrderBtn");
const registerBtn = document.querySelector("#registerBtn");

//유저 정보 받기
getUserData();

async function getUserData() {
  const userData = await Api.get("api/users");
  console.log(userData);

  if(sessionStorage) {
    loginBtn.classList.add("hidden");
    registerBtn.classList.add("hidden");
    logoutBtn.classList.remove("hidden");
    editBtn.classList.remove("hidden");
    seeOrderBtn.classList.remove("hidden");
  }

}
//로그아웃 버튼 클릭시 토큰 삭제

function logoutHandler() {
  sessionStorage.removeItem("token");
}

logoutBtn.addEventListener("click", logoutHandler)