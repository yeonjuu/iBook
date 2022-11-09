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
