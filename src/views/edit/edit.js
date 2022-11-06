import * as Api from "/api.js";
import { validateEmail } from "/useful-functions.js";



const fullNameInput = document.querySelector("#fullNameInput");
const emailInput = document.querySelector("#emailInput");
const phoneInput = document.querySelector("#phoneInput");
const addressInput = document.querySelector("#addressInput");
const passwordInput = document.querySelector("#passwordInput");
const passwordConfirmInput = document.querySelector("#passwordConfirmInput");

const editUserBtn = document.querySelector("#editUserBtn");

//로그인 회원 정보 끌고 오기

getLoginUserData()

async function getLoginUserData() {

    const userToken = sessionStorage.token;
    //console.log(userToken);
    console.log(`http://localhost:5000/api/users/${userToken}`);

    const users = await Api.get(`http://localhost:5000/api/users/${userToken}`);
    console.log(loginUser);

    // const logginUser = users.filter(e => )
}

fullNameInput.value = "엘리스";
emailInput.value = "s@n.com";
phoneInput.value = 3;
addressInput.value = 3;
emailInput.value = 4;






//회원 정보 수정

async function editUser(e) {
    e.preventDefault()

    const fullName = fullNameInput.value;
    const email = emailInput.value;
    const phone = phoneInput.value;
    const address = addressInput.value;
    const password = passwordInput.value;
    const passwordConfirm = passwordConfirmInput.value;

    const isPasswordSame = password === passwordConfirm;
    const isEmailValid = validateEmail(email);

    
    if (!fullName || !email || !phone || !address || !password || !passwordConfirm) {
        return alert("모든 항목을 기입 해주세요");
    };

    if (!isPasswordSame) {
        return alert("비밀번호가 일치하지 않습니다");
    };

    if (!isEmailValid) {
        return alert("이메일 형식이 맞지 않습니다.");
      };



    // const data = { fullName, email, phone, address, password };



    // else alert("회원 정보가 수정되었습니다!");
}

editUserBtn.addEventListener("click", editUser);





//회원 정보 삭제
const deleteUserBtn = document.querySelector("#deleteUserBtn");


async function deleteUser() {

}

deleteUserBtn.addEventListener("click", deleteUser);



//상단 로그아웃 버튼 클릭시
const logoutBtn = document.querySelector("#logoutBtn");

function logoutHandler() {
    sessionStorage.removeItem('token');
}

logoutBtn.addEventListener("click", logoutHandler);
