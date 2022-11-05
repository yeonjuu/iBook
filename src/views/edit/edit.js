import * as Api from "/api.js";

//로그인 회원 정보 끌고 오기
const fullNameInput = document.querySelector("#fullNameInput");
const emailInput = document.querySelector("#emailInput");
const phoneInput = document.querySelector("#phoneInput");
const addressInput = document.querySelector("#addressInput");
const passwordInput = document.querySelector("#passwordInput");

// getLoginUserData()

// async function getLoginUserData() {
//     const loginUser = await Api.get("api/users")
//     console.log(loginUser);
// }

// fullNameInput.value = "엘리스";
// emailInput.value = 2;
// phoneInput.value = 3;
// addressInput.value = 3;
// emailInput.value = 4;






//회원 정보 수정
const editUserBtn = document.querySelector("#editUserBtn");




//회원 정보 삭제
const deleteUserBtn = document.querySelector("#deleteUserBtn");



//상단 로그아웃 버튼 클릭시
const logoutBtn = document.querySelector("#logoutBtn");

function logoutHandler() {
    sessionStorage.removeItem('token');
}

logoutBtn.addEventListener("click", logoutHandler);
