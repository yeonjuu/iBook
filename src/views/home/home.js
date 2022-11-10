import * as Api from '/api.js';

const firstRow = document.querySelector('#firstRow');
const secondRow = document.querySelector('#secondRow');
const thirdRow = document.querySelector('#thirdRow');

const categoryMenu = document.querySelector("#categoryMenu");

//카테고리 메뉴 정보 받기
getCategoryData();

async function getCategoryData() {
  const category = await Api.get('/api/categories');

  for(let i=0; i < category.length; i++) {
  const showCategory = `
  <li><a href="/category/${category[i]._id}">${category[i].name}</a></li>`;
  categoryMenu.insertAdjacentHTML('beforeend', showCategory);
  }

}


//책정보 받기
getProductData();

async function getProductData() {
  const product = await Api.get('/api/products');

  const bookImage = await product.map((e) => e.images[0]);
  const bookTitle = product.map((e) => e.title);
  const bookId = product.map((e) => e._id);

  //메인배너 책 정보 뿌려주기
  for (let i = 0; i < 5; i++) {
    const firstRowBooks = `<div class="rowBooks"><a href="/products/${bookId[i]}">
        <div class="displayBooks">
        <img src=${bookImage[i]} />
        <span>${bookTitle[i]}</span>
        </div>

        </a></div>`;

    const secondRowBooks = `<div class="rowBooks"><a href="/products/${bookId[i+5]}">
        <div class="displayBooks">
        <img src=${bookImage[i+5]} />
        <span>${bookTitle[i+5]}</span>
        </div>
        </a></div>`; 

    const thirdRowBooks = `<div class="rowBooks"><a href="/products/${bookId[i+10]}">
       <div class="displayBooks">
       <img src=${bookImage[i+10]} />
       <span>${bookTitle[i+10]}</span>
       </div>

        </a></div>`; 
    firstRow.insertAdjacentHTML('beforeend', firstRowBooks);
    secondRow.insertAdjacentHTML('beforeend', secondRowBooks);
    thirdRow.insertAdjacentHTML('beforeend', thirdRowBooks);
  };

}

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
