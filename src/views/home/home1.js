const hamburgerBtn = document.querySelector("#navigation");
const categoriesUl = document.querySelector("#hamburgerMenu");

function createCategory(name) {
  return `<a href="#"><li>${name}</li></a>`;
}

function clickHamBtn() {
  if (categoriesUl.firstChild == null) {
    alert("페이지를 불러오는 중입니다");
  } else {
    categoriesUl.classList.toggle("hidden");
  }
}
let b = [
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
b = JSON.stringify(b);
async function fakefetch(url) {
  return new Promise((resolve, reject) => {
    return resolve(b);
  });
}
function delay(ms) {
  return new Promise((reslove) => setTimeout(reslove, ms));
}
const a = async (val) => {
  await delay(2000);
  let a = await fakefetch("./url");
  a = JSON.parse(a);
  const categories = [];
  a.forEach((element) => {
    categories.push(element.name);
  });
  categories.forEach((category) => {
    categoriesUl.insertAdjacentHTML("beforeend", createCategory(category));
  });
};

a();

hamburgerBtn.addEventListener("click", clickHamBtn);
