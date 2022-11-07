import * as Api from '/api.js';

const fictionList = document.querySelector(".fictionList");
const categoryName = document.querySelector(".categoryName");

const url = window.location.href;
const categoryId = url.split("/")[4];


//상단 카테고리명 추가
showCategoryName();

async function showCategoryName() {
  const category = await Api.get("http://localhost:5000/api/categories");
  //console.log(category);
  const currentCategory = category.filter(e => e._id === categoryId);
  const currentCategoryName = currentCategory[0].name;

  categoryName.innerText = currentCategoryName;

}


showProductsList();

async function showProductsList() {
    
    const totalBooks = await Api.get("/api/products");
    //console.log(totalBooks);

    //클릭한 카테고리 id 비교
    const productsList = totalBooks.filter( (e) => e.category._id === `${categoryId}` );
    //console.log(productsList[0].images);

    if(productsList.length == 0) {
        const nothingToShow = `<span>표시할 책 내용이 없습니다</span>`;
        fictionList.insertAdjacentHTML('beforeend', nothingToShow);
    };

    for (let i=0; i < productsList.length; i++) {
        const toShow = `
        <div><a href="/products/${productsList[i]._id}"><img src="${productsList[i].images[0]}"/></a></div>
        <li>책이름 : ${productsList[i].title}</li>
        <li>저자 :${productsList[i].author}</li>
        <li>출판사 : ${productsList[i].publisher}</li>
        <li>상세정보 : ${productsList[i].description}</li>
        <li>금액 : ${productsList[i].price}원</li>
        </div>
        `;

        fictionList.insertAdjacentHTML('beforeend', toShow);
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
  //console.log(userData);

  if (sessionStorage) {
    login.classList.add('hidden');
    register.classList.add('hidden');
    logout.classList.remove('hidden');
    edit.classList.remove('hidden');
    seeOrder.classList.remove('hidden');

    editAtag.innerText = `${loginUser.fullName}님의 프로필`;
    // alert(`${loginUser.fullName}님 안녕하세요!`);
  }


}
//로그아웃 버튼 클릭시 토큰 삭제

function logoutHandler() {
  sessionStorage.removeItem('token');
}

logout.addEventListener('click', logoutHandler);