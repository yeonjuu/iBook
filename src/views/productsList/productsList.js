import * as Api from '/api.js';

const booksList = document.querySelector(".booksList");
const categoryName = document.querySelector(".categoryName");

const url = window.location.href;
const categoryId = url.split("/")[4];


//상단 카테고리명 추가
showCategoryName();

async function showCategoryName() {
  const category = await Api.get("/api/categories");
  const currentCategory = category.filter(e => e._id === categoryId);
  const currentCategoryName = currentCategory[0].name;

  categoryName.innerText = currentCategoryName;

}


showProductsList();

async function showProductsList() {
    
    const totalBooks = await Api.get("/api/products");
    //console.log(totalBooks);

    //클릭한 카테고리 id 
    const productsList = totalBooks.filter( (books) => books.category._id === categoryId );
    //console.log(productsList);

    if(productsList.length == 0) {
        const nothingToShow = `<span>표시할 책 내용이 없습니다</span>`;
        booksList.insertAdjacentHTML('beforeend', nothingToShow);
    };

    for (let i=0; i < productsList.length; i++) {
        const toShow = `
        <div class="categoryBooksList">
            <a href="/products/${productsList[i]._id}"><img class="booksImage" src="${productsList[i].images[0]}"/></a>
            
            <div class="booksInformation">
            <h3 class="title"><a href="/products/${productsList[i]._id}">${productsList[i].title}</a></h3>
            <h4 class="price">${productsList[i].price}원</h4>
            <h5 class="author">저자 : ${productsList[i].author}</h5>
            <h5 class="publisher">출판사 : ${productsList[i].publisher}</h5>
            <h5 class="description">${productsList[i].description}</h5>
            </div>

            <div class="buttons">
            <button class="cartBtn">장바구니</button>
            <button class="buyBtn">구매하기</button>
            </div>
        </div>
        <div class="bottomLine"></div>
        `;
        // <div class="booksImage"><a href="/products/${productsList[i]._id}"><img src="${productsList[i].images[0]}"/></a></div>


        booksList.insertAdjacentHTML('beforeend', toShow);
    };


    
    }




//로그인 여부에 따라 상단 메뉴 노출 유무 설정
const login = document.querySelector('#login');
const logout = document.querySelector('#logout');
const edit = document.querySelector('#edit');
const editAtag = document.querySelector('#edit a');
const seeOrder = document.querySelector('#seeOrder');
const register = document.querySelector('#register');

const userToken = sessionStorage.token;

//로그인 유저 확인
checkLogin();

async function checkLogin() {
    const loginUser = await Api.get('/api/users', userToken);
    const isUser = loginUser.role === "user";
    const isAdmin = loginUser.role === "admin";
  
    if (sessionStorage && isUser) {
      login.classList.add('hidden');
      register.classList.add('hidden');
      logout.classList.remove('hidden');
      edit.classList.remove('hidden');
      seeOrder.classList.remove('hidden');
  
      editAtag.innerText = `${loginUser.fullName}님의 프로필`;
      // alert(`${loginUser.fullName}님 안녕하세요!`);
    }
  
    //관리자 계정일 때
    if (sessionStorage && isAdmin) {
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