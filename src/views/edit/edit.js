import * as Api from "/api.js";
import { validateEmail } from "/useful-functions.js";

const fullNameInput = document.querySelector("#fullNameInput");
const emailInput = document.querySelector("#emailInput");
const phoneInput = document.querySelector("#phoneInput");
const addressInput = document.querySelector("#addressInput");
const currentPasswordInput = document.querySelector("#currentPasswordInput");
const passwordInput = document.querySelector("#passwordInput");
const passwordConfirmInput = document.querySelector("#passwordConfirmInput");

const editUserBtn = document.querySelector("#editUserBtn");

const userToken = sessionStorage.token;

let loginId = "";


//로그인 회원 정보 끌고 오기

getLoginUserData()

async function getLoginUserData() {
    
    const loginUser = await Api.get('/api/users', userToken);
    //console.log(loginUser);

    loginId = loginUser._id;
    // console.log(loginId);


    const { fullName, email, phoneNumber, address } = loginUser;

    fullNameInput.value = fullName;
    emailInput.value = email;
    phoneInput.value = phoneNumber;
    addressInput.value = address;
};


//회원 정보 수정

async function editUser(e) {
    e.preventDefault();

    const fullName = fullNameInput.value;
    const email = emailInput.value;
    const phoneNumber = phoneInput.value;
    const address = addressInput.value;
    const currentPassword = currentPasswordInput.value;
    const password = passwordInput.value;
    const passwordConfirm = passwordConfirmInput.value;

    const isPasswordSame = password === passwordConfirm;
    const isEmailValid = validateEmail(email);

    // console.log(fullName, email, phoneNumber);

    
    if (!fullName || !email || !phoneNumber || !address || !currentPassword || !password || !passwordConfirm) {
        return alert("모든 항목을 기입 해주세요");
    };

    if (!isPasswordSame) {
        return alert("비밀번호가 일치하지 않습니다");
    };

    if (!isEmailValid) {
        return alert("이메일 형식이 맞지 않습니다.");
      };

    const data = { fullName, email, phoneNumber, address, currentPassword, password };

    await Api.put('/api/users', loginId, data);

    alert("회원 정보가 수정되었습니다!");
    window.location.href = "/";
};

editUserBtn.addEventListener("click", editUser);





//회원 정보 삭제
const deleteUserBtn = document.querySelector("#deleteUserBtn");


async function deleteUser() {
    const fullName = fullNameInput.value;
    const email = emailInput.value;
    const phoneNumber = phoneInput.value;
    const address = addressInput.value;


    await Api.delete('/api/users', loginId);
    alert("회원 정보가 삭제 되었습니다");

    sessionStorage.removeItem('token')

    window.location.href = "http://localhost:5000";
}

deleteUserBtn.addEventListener("click", deleteUser);



//상단 로그아웃 버튼 클릭시
const logoutBtn = document.querySelector("#logoutBtn");

function logoutHandler() {
    sessionStorage.removeItem('token');
}

logoutBtn.addEventListener("click", logoutHandler);