const hamburgerBtn = document.querySelector("#navigation"); // 햄버거바
const categoriesUl = document.querySelector("#hamburgerMenu"); //카테고리ul

function createCategory(name) {
  // 카테고리 추가 html
  return `<a href="#"><li>${name}</li></a>`;
}

function clickHamBtn() {
  //햄버거바 클릭 이벤트
  if (categoriesUl.firstChild == null) {
    // 만약 페이지가 다 불러와지지 않았다면?
    alert("페이지를 불러오는 중입니다");
  } else {
    categoriesUl.classList.toggle("hidden"); // 불러와지면 실행
  }
}
let b = [
  //임의 테스트 데이터
  {
    _id: "635f98f046d704367ad6a470",
    name: "소설",
    createdAt: "2022-10-31T09:44:16.409Z",
    updatedAt: "2022-11-01T02:58:58.393Z",
    __v: 0,
  },
  {
    _id: "6361f8f75192bb1231428a13",
    name: "자기개발",
    createdAt: "2022-11-02T04:58:31.844Z",
    updatedAt: "2022-11-02T04:58:31.844Z",
    __v: 0,
  },
];
b = JSON.stringify(b); //json 으로 변환
async function fakefetch(url) {
  // 가짜 백엔드 호출
  return new Promise((resolve, reject) => {
    return resolve(b);
  });
}
function delay(ms) {
  // 카테고리 로딩 실험용
  return new Promise((reslove) => setTimeout(reslove, ms));
}
const a = async (val) => {
  await delay(2000);
  let a = await fakefetch("./url"); // 데이터 요청
  a = JSON.parse(a); //json 객체로 변환
  const categories = []; // 카테고리만 분류할 리스트
  a.forEach((element) => {
    categories.push(element.name); //카테고리만 분류
  });
  categories.forEach((category) => {
    //카테고리들을 html에 추가
    categoriesUl.insertAdjacentHTML("beforeend", createCategory(category));
  });
};

a();

hamburgerBtn.addEventListener("click", clickHamBtn);
